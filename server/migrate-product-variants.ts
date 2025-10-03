import { productVariantsDatabase } from "../client/src/lib/productVariants";
import { storage } from "./storage";
import { db } from "./db";
import { products, productOptions } from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * Migration script to transfer product variants from productVariants.ts to product_options table
 * This implements the pricing directive: ALL prices must come from the database
 */
export async function migrateProductVariants() {
  console.log("🚀 Starting migration from productVariants.ts to product_options table...");
  
  let totalVariants = 0;
  let successfulMigrations = 0;
  let errors: string[] = [];

  try {
    // Clear existing product_options to avoid duplicates
    console.log("🧹 Clearing existing product_options...");
    await db.delete(productOptions);
    
    // Iterate through each product in productVariants.ts
    for (const [slug, productData] of Object.entries(productVariantsDatabase)) {
      console.log(`\n📦 Processing product: ${slug}`);
      
      try {
        // Find corresponding product in database by slug
        const [dbProduct] = await db
          .select()
          .from(products)
          .where(eq(products.slug, slug))
          .limit(1);
          
        if (!dbProduct) {
          const error = `❌ Product not found in database: ${slug}`;
          console.log(error);
          errors.push(error);
          continue;
        }
        
        console.log(`✅ Found product in DB: ${dbProduct.name} (ID: ${dbProduct.id})`);
        
        // Insert each variant into product_options
        for (const variant of productData.variants) {
          totalVariants++;
          
          try {
            await storage.createProductOption({
              productId: dbProduct.id,
              flavor: variant.flavor || null,
              size: variant.size || null,
              priceCents: Math.round(variant.price * 100), // Convert euros to cents
              originalPriceCents: variant.originalPrice ? Math.round(variant.originalPrice * 100) : null,
              image: variant.image || null,
              inStock: variant.inStock !== false
            });
            
            successfulMigrations++;
            console.log(`  ✅ Migrated variant: ${variant.flavor} ${variant.size} - €${variant.price}`);
            
          } catch (variantError) {
            const error = `❌ Failed to migrate variant ${variant.flavor} ${variant.size} for ${slug}: ${variantError}`;
            console.error(error);
            errors.push(error);
          }
        }
        
      } catch (productError) {
        const error = `❌ Error processing product ${slug}: ${productError}`;
        console.error(error);
        errors.push(error);
      }
    }
    
    // Migration summary
    console.log("\n📊 Migration Summary:");
    console.log(`📦 Total products processed: ${Object.keys(productVariantsDatabase).length}`);
    console.log(`🔢 Total variants found: ${totalVariants}`);
    console.log(`✅ Successful migrations: ${successfulMigrations}`);
    console.log(`❌ Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log("\n🚨 Migration errors:");
      errors.forEach(error => console.log(`  ${error}`));
    }
    
    if (successfulMigrations > 0) {
      console.log("\n🎉 Migration completed! All prices are now sourced from the database.");
      console.log("✅ Pricing directive implemented: product_options is the single source of truth.");
    }
    
    return {
      success: successfulMigrations > 0,
      totalVariants,
      successfulMigrations,
      errors
    };
    
  } catch (error) {
    console.error("💥 Migration failed with error:", error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProductVariants()
    .then((result) => {
      if (result.success) {
        console.log("🎯 Migration completed successfully!");
        process.exit(0);
      } else {
        console.error("💥 Migration failed!");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("💥 Migration crashed:", error);
      process.exit(1);
    });
}