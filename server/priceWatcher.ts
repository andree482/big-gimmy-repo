
import { google } from 'googleapis';
import { db } from './db';
import { productOptions, products } from '../shared/schema.ts';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

interface PriceChange {
  productId: number;
  productName: string;
  size: string;
  unit: string;
  oldPrice: number;
  newPrice: number;
}

class PriceWatcher {
  private spreadsheetId: string;
  private sheetName: string;
  private intervalId: NodeJS.Timeout | null = null;
  private lastCheckTime: number = 0;
  private isRunning: boolean = false;

  constructor(spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
  }

  async authenticate() {
    try {
      const credentials = JSON.parse(fs.readFileSync('google-credentials.json', 'utf8'));
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      return auth;
    } catch (error) {
      console.error('❌ Errore nell\'autenticazione Google:', error);
      throw error;
    }
  }

  async checkForPriceChanges(): Promise<PriceChange[]> {
    console.log(`🔍 Controllo modifiche prezzi... (${new Date().toLocaleTimeString()})`);

    try {
      const auth = await this.authenticate();
      const sheets = google.sheets({ version: 'v4', auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A:F`,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) {
        console.log('❌ Nessun dato trovato nel Google Sheets');
        return [];
      }

      console.log(`📋 Struttura foglio - Header:`, rows[0]);
      console.log(`📋 Trovate ${rows.length - 1} righe di dati`);

      const changes: PriceChange[] = [];

      // Controlla le prime 3 righe per debug
      for (let i = 1; i < Math.min(4, rows.length); i++) {
        console.log(`🔍 Riga ${i + 1} completa:`, rows[i]);
      }

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        try {
          const productId = parseInt(row[0]);
          const productName = row[1]?.toString();
          const size = row[2]?.toString();
          const unit = row[3]?.toString();
          const currentPrice = parseFloat(row[4]);
          const newPrice = parseFloat(row[5]);

          // Debug dettagliato per le prime righe
          if (i <= 3) {
            console.log(`📊 Debug riga ${i + 1}:`);
            console.log(`   - Product ID: ${productId} (tipo: ${typeof productId})`);
            console.log(`   - Product Name: "${productName}"`);
            console.log(`   - Size: "${size}"`);
            console.log(`   - Unit: "${unit}"`);
            console.log(`   - Current Price: ${currentPrice} (tipo: ${typeof currentPrice}, isNaN: ${isNaN(currentPrice)})`);
            console.log(`   - New Price: ${newPrice} (tipo: ${typeof newPrice}, isNaN: ${isNaN(newPrice)})`);
            console.log(`   - Differenza prezzi: ${Math.abs(newPrice - currentPrice)}`);
          }

          if (!productId || !size || isNaN(newPrice) || newPrice <= 0) {
            if (i <= 3) console.log(`❌ Riga ${i + 1} invalida - saltata`);
            continue;
          }

          // Controlla se il prezzo è cambiato
          if (!isNaN(currentPrice) && Math.abs(newPrice - currentPrice) >= 0.01) {
            console.log(`🔄 Rilevata modifica prezzo riga ${i + 1}: ${currentPrice} → ${newPrice}`);

            const priceInCents = Math.round(newPrice * 100);

            // Cerca nel database  
            const existingOptions = await db
              .select()
              .from(productOptions)
              .where(eq(productOptions.productId, productId));

            const targetOption = existingOptions.find(o => 
              o.flavor === size && o.size === unit
            );

            if (targetOption) {
              console.log(`📊 Trovato nel DB: Prezzo attuale DB = €${targetOption.priceCents / 100}, Nuovo prezzo = €${newPrice}`);

              console.log(`✅ Aggiunta modifica: ${productName} - ${size}${unit}`);
              changes.push({
                productId,
                productName,
                size,
                unit,
                oldPrice: targetOption.priceCents / 100,
                newPrice
              });
            } else {
              console.log(`❌ Non trovato nel DB: Product ID ${productId}, Size: ${size}, Unit: ${unit}`);
            }
          } else {
            if (i <= 3) console.log(`⏭️ Riga ${i + 1}: Prezzi uguali (${currentPrice} = ${newPrice})`);
          }
        } catch (error) {
          console.error(`❌ Errore elaborando riga ${i + 1}:`, error);
        }
      }

      console.log(`📋 Totale modifiche rilevate: ${changes.length}`);
      return changes;
    } catch (error) {
      console.error('❌ Errore durante il controllo:', error);
      return [];
    }
  }

  async applyPriceChanges(changes: PriceChange[]): Promise<void> {
    let updatedCount = 0;

    for (const change of changes) {
      try {
        const priceInCents = Math.round(change.newPrice * 100);

        const existingOptions = await db
          .select()
          .from(productOptions)
          .where(eq(productOptions.productId, change.productId));

        const targetOption = existingOptions.find(o => 
          o.flavor === change.size && o.size === change.unit
        );

        if (targetOption) {
          await db
            .update(productOptions)
            .set({ priceCents: priceInCents })
            .where(eq(productOptions.id, targetOption.id));

          console.log(`✅ Aggiornato automaticamente: ${change.productName} (ID: ${change.productId}), ${change.size}${change.unit}: €${change.oldPrice.toFixed(2)} → €${change.newPrice.toFixed(2)}`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`❌ Errore aggiornando ${change.productName}:`, error);
      }
    }

    if (updatedCount > 0) {
      console.log(`🎉 Aggiornati automaticamente ${updatedCount} prezzi!`);
    }
  }

  async syncDatabaseToGoogleSheets(): Promise<void> {
    try {
      console.log('🔄 Sincronizzazione completa database → Google Sheets...');
      
      const auth = await this.authenticate();
      const sheets = google.sheets({ version: 'v4', auth });

      // Estrai tutti i dati da product_options con i nomi dei prodotti
      const allOptions = await db
        .select({
          productId: productOptions.productId,
          productName: products.name,
          flavor: productOptions.flavor,
          size: productOptions.size,
          priceCents: productOptions.priceCents,
        })
        .from(productOptions)
        .innerJoin(products, eq(productOptions.productId, products.id))
        .orderBy(productOptions.productId);

      // Prepara i dati per Google Sheets
      const header = ['Product ID', 'Nome', 'Flavor', 'Unit', 'Current Price', 'New Price'];
      const rows = [header];

      for (const option of allOptions) {
        const currentPrice = (option.priceCents / 100).toFixed(2);
        rows.push([
          option.productId.toString(),
          option.productName,
          option.flavor || '',
          option.size || '',
          currentPrice,
          currentPrice
        ]);
      }

      // Sovrascrivi completamente il Google Sheets
      await sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A:F`,
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A1:F${rows.length}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: rows,
        },
      });

      console.log(`✅ Google Sheets sincronizzato: ${allOptions.length} righe di prodotti`);
      console.log(`📊 Prodotti sincronizzati da ID ${allOptions[0]?.productId} a ID ${allOptions[allOptions.length - 1]?.productId}`);

    } catch (error) {
      console.error('❌ Errore sincronizzando Google Sheets:', error);
      throw error;
    }
  }

  async updateGoogleSheetsCurrentPrices(): Promise<void> {
    try {
      const auth = await this.authenticate();
      const sheets = google.sheets({ version: 'v4', auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A:F`,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) return;

      const updates: any[][] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const productId = parseInt(row[0]);
        const size = row[2]?.toString();
        const unit = row[3]?.toString();
        const newPrice = parseFloat(row[5]);

        if (!productId || !size || !unit || isNaN(newPrice)) continue;

        updates.push([
          row[0], // Product ID
          row[1], // Product Name
          row[2], // Size
          row[3], // Unit
          newPrice.toFixed(2), // Current Price (aggiornato)
          newPrice.toFixed(2)  // New Price
        ]);
      }

      if (updates.length > 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `'${this.sheetName}'!A2:F${updates.length + 1}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: updates,
          },
        });
      }
    } catch (error) {
      console.error('❌ Errore aggiornando Google Sheets:', error);
    }
  }

  start(intervalMinutes: number = 2): void {
    if (this.isRunning) {
      console.log('⚠️ Price Watcher è già in esecuzione');
      return;
    }

    const intervalText = intervalMinutes < 1 ? `${intervalMinutes * 60} secondi` : `${intervalMinutes} minuti`;
    console.log(`🚀 Avvio Price Watcher: controllo ogni ${intervalText}`);
    console.log(`📊 Monitoraggio Google Sheets ID: ${this.spreadsheetId}`);

    this.isRunning = true;

    // Primo controllo immediato
    this.performCheck();

    // Controlli periodici
    this.intervalId = setInterval(() => {
      this.performCheck();
    }, intervalMinutes * 60 * 1000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('🛑 Price Watcher fermato');
  }

  private async performCheck(): Promise<void> {
    try {
      const changes = await this.checkForPriceChanges();

      if (changes.length > 0) {
        console.log(`🔄 Rilevate ${changes.length} modifiche di prezzo`);
        await this.applyPriceChanges(changes);
        await this.updateGoogleSheetsCurrentPrices();
      } else {
        console.log(`✓ Nessuna modifica rilevata (${new Date().toLocaleTimeString()})`);
      }
    } catch (error) {
      console.error('❌ Errore durante il controllo automatico:', error);
    }
  }

  isActive(): boolean {
    return this.isRunning;
  }
}

export { PriceWatcher };
