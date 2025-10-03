import { google } from 'googleapis';
import { db } from "./db";
import { products, productOptions } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as fs from 'fs';

/**
 * Migration script to transfer pricing data from Google Sheets to product_options table
 * This fixes the critical data integrity issue where only 64/298 products had pricing data
 * 
 * DATA SOURCE: Google Sheets with 368 pricing records
 * Sheet structure: ['ID', 'Nome prodotto', 'Gusto/Quantità', 'Grammatura', 'Prezzo Attuale', 'Prezzo da modificare']
 * 
 * TARGET: product_options table with complete pricing data for all products
 */

interface SheetsPricingRecord {
  productId: number;
  productName: string;
  flavor: string;     // Gusto/Quantità column
  size: string;       // Grammatura column
  currentPrice: number;
  newPrice: number;
}

interface MigrationStats {
  totalRecordsFound: number;
  validRecordsProcessed: number;
  successfulInserts: number;
  duplicatesSkipped: number;
  errors: string[];
  missingProducts: string[];
}

export class GoogleSheetsPricingMigrator {
  private spreadsheetId: string;
  private sheetName: string = 'Prezzi Prodotti';

  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
  }

  /**
   * Authenticate with Google Sheets API using existing credentials
   */
  async authenticate() {
    try {
      const credentials = JSON.parse(fs.readFileSync('../google-credentials.json', 'utf8'));
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      return auth;
    } catch (error) {
      console.error('❌ Google authentication failed:', error);
      throw new Error(`Google Sheets authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fetch all pricing data from Google Sheets
   */
  async fetchSheetsData(): Promise<SheetsPricingRecord[]> {
    console.log(`📊 Fetching pricing data from Google Sheets...`);
    
    const auth = await this.authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `'${this.sheetName}'!A:F`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      throw new Error('No data found in Google Sheets or only header row present');
    }

    console.log(`📋 Sheet header:`, rows[0]);
    console.log(`📋 Found ${rows.length - 1} data rows`);

    const records: SheetsPricingRecord[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      try {
        const productId = parseInt(row[0]);
        const productName = row[1]?.toString() || '';
        const flavor = row[2]?.toString() || '';
        const size = row[3]?.toString() || '';
        const currentPrice = parseFloat(row[4]) || 0;
        const newPrice = parseFloat(row[5]) || 0;

        // Use newPrice if available, otherwise fallback to currentPrice
        const finalPrice = newPrice > 0 ? newPrice : currentPrice;

        if (!productId || !productName || finalPrice <= 0) {
          console.log(`⚠️ Skipping row ${i + 1}: Invalid data - ID: ${productId}, Name: "${productName}", Price: ${finalPrice}`);
          continue;
        }

        records.push({
          productId,
          productName,
          flavor,
          size,
          currentPrice,
          newPrice: finalPrice
        });

      } catch (error) {
        console.error(`❌ Error parsing row ${i + 1}:`, error);
      }
    }

    console.log(`✅ Successfully parsed ${records.length} valid pricing records`);
    return records;
  }

  /**
   * Validate that products exist in database before migration
   */
  async validateProductsExist(records: SheetsPricingRecord[]): Promise<{ validRecords: SheetsPricingRecord[], stats: MigrationStats }> {
    console.log(`🔍 Validating products exist in database...`);
    
    const stats: MigrationStats = {
      totalRecordsFound: records.length,
      validRecordsProcessed: 0,
      successfulInserts: 0,
      duplicatesSkipped: 0,
      errors: [],
      missingProducts: []
    };

    const validRecords: SheetsPricingRecord[] = [];
    const productIds = [...new Set(records.map(r => r.productId))];
    
    console.log(`📦 Checking ${productIds.length} unique product IDs...`);

    // Fetch all products that exist in database
    const existingProducts = await db
      .select({ id: products.id, name: products.name })
      .from(products)
      .where(eq(products.id, productIds[0])); // This will be replaced with proper IN query

    // Better approach: Check each product individually for now
    for (const record of records) {
      try {
        const [dbProduct] = await db
          .select({ id: products.id, name: products.name })
          .from(products)
          .where(eq(products.id, record.productId))
          .limit(1);

        if (dbProduct) {
          validRecords.push(record);
          stats.validRecordsProcessed++;
        } else {
          const errorMsg = `Product ID ${record.productId} ("${record.productName}") not found in database`;
          stats.missingProducts.push(errorMsg);
          console.log(`❌ ${errorMsg}`);
        }
      } catch (error) {
        const errorMsg = `Error validating product ID ${record.productId}: ${error}`;
        stats.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    console.log(`✅ Validation complete:`);
    console.log(`   📦 Total records: ${stats.totalRecordsFound}`);
    console.log(`   ✅ Valid records: ${stats.validRecordsProcessed}`);
    console.log(`   ❌ Missing products: ${stats.missingProducts.length}`);
    console.log(`   💥 Validation errors: ${stats.errors.length}`);

    return { validRecords, stats };
  }

  /**
   * Perform the migration with transaction safety
   */
  async migrateToProductOptions(records: SheetsPricingRecord[]): Promise<MigrationStats> {
    console.log(`🚀 Starting migration of ${records.length} pricing records to product_options table...`);

    const { validRecords, stats } = await this.validateProductsExist(records);

    // Safety threshold - must have at least 300 valid records
    if (validRecords.length < 300) {
      throw new Error(`SAFETY ABORT: Only ${validRecords.length} valid records found, minimum 300 required. Check data quality.`);
    }

    console.log(`✅ Safety check passed: ${validRecords.length} valid records (>= 300 threshold)`);

    // Begin transaction
    try {
      await db.transaction(async (tx) => {
        console.log(`🧹 Clearing existing product_options table...`);
        await tx.delete(productOptions);

        console.log(`📝 Inserting ${validRecords.length} new product options...`);
        
        for (const record of validRecords) {
          try {
            await tx.insert(productOptions).values({
              productId: record.productId,
              flavor: record.flavor || null,
              size: record.size || null,
              priceCents: Math.round(record.newPrice * 100), // Convert euros to cents
              originalPriceCents: null, // No original price data in sheets
              image: null, // Images will be handled separately
              inStock: true // Default to in stock
            });

            stats.successfulInserts++;

            if (stats.successfulInserts % 50 === 0) {
              console.log(`⏳ Progress: ${stats.successfulInserts}/${validRecords.length} records inserted...`);
            }

          } catch (insertError) {
            const errorMsg = `Failed to insert option for product ${record.productId}: ${insertError}`;
            stats.errors.push(errorMsg);
            console.error(`❌ ${errorMsg}`);
            throw insertError; // Rollback transaction on any insert error
          }
        }

        // Final validation - ensure we inserted the expected number of records
        const insertedCount = await tx.select({ count: productOptions.id }).from(productOptions);
        const actualCount = insertedCount.length;
        
        if (actualCount < validRecords.length - 10) { // Allow small discrepancy
          throw new Error(`Transaction validation failed: Expected ~${validRecords.length} records, got ${actualCount}`);
        }

        console.log(`✅ Transaction validation passed: ${actualCount} records inserted`);
      });

      // Success!
      console.log(`🎉 Migration completed successfully!`);
      console.log(`📊 Final Statistics:`);
      console.log(`   📋 Total sheet records: ${stats.totalRecordsFound}`);
      console.log(`   ✅ Successfully inserted: ${stats.successfulInserts}`);
      console.log(`   ❌ Errors: ${stats.errors.length}`);
      console.log(`   🔍 Missing products: ${stats.missingProducts.length}`);
      
      if (stats.errors.length > 0) {
        console.log(`\n🚨 Migration Errors:`);
        stats.errors.forEach(error => console.log(`   ${error}`));
      }

      if (stats.missingProducts.length > 0) {
        console.log(`\n🚨 Missing Products:`);
        stats.missingProducts.slice(0, 10).forEach(product => console.log(`   ${product}`));
        if (stats.missingProducts.length > 10) {
          console.log(`   ... and ${stats.missingProducts.length - 10} more`);
        }
      }

      return stats;

    } catch (transactionError) {
      console.error(`💥 Migration transaction failed - all changes rolled back:`, transactionError);
      throw transactionError;
    }
  }

  /**
   * Run the complete migration process
   */
  async runMigration(): Promise<MigrationStats> {
    try {
      console.log(`🚀 Starting Google Sheets to product_options migration...`);
      console.log(`📊 Source: Google Sheets ID ${this.spreadsheetId}`);
      console.log(`🎯 Target: product_options table`);
      console.log(`⚠️ This will replace ALL existing product_options data!`);

      // Step 1: Fetch data from Google Sheets
      const sheetRecords = await this.fetchSheetsData();

      // Step 2: Migrate with safety checks
      const migrationStats = await this.migrateToProductOptions(sheetRecords);

      console.log(`🏁 Migration process completed!`);
      return migrationStats;

    } catch (error) {
      console.error(`💥 Migration failed:`, error);
      throw error;
    }
  }
}

/**
 * Main migration function
 */
export async function migrateFromGoogleSheets(): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  
  if (!spreadsheetId) {
    throw new Error(`GOOGLE_SHEETS_ID environment variable is required`);
  }

  const migrator = new GoogleSheetsPricingMigrator(spreadsheetId);
  
  try {
    const stats = await migrator.runMigration();
    
    if (stats.successfulInserts >= 300) {
      console.log(`🎯 SUCCESS: Migration completed with ${stats.successfulInserts} product options imported`);
      console.log(`✅ Database pricing directive is now fully implemented!`);
      process.exit(0);
    } else {
      console.error(`💥 FAILURE: Only ${stats.successfulInserts} records imported, expected at least 300`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error(`💥 CRITICAL FAILURE: Migration crashed:`, error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateFromGoogleSheets()
    .then(() => {
      console.log(`🎉 Migration script completed successfully!`);
    })
    .catch((error) => {
      console.error(`💥 Migration script failed:`, error);
      process.exit(1);
    });
}