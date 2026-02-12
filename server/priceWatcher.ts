
import { google } from 'googleapis';
import { db } from './db';
import { productOptions, products, brands } from '../shared/schema.ts';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

interface PriceChange {
  productId: number;
  productName: string;
  size: string;
  unit: string;
  oldPrice: number;
  newPrice: number;
  optionId: number;
  oldInStock: boolean | null;
  newInStock: boolean;
  availabilityChanged: boolean;
  priceChanged: boolean;
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
    console.log(`🔍 Controllo modifiche prezzi e disponibilità... (${new Date().toLocaleTimeString()})`);

    try {
      const auth = await this.authenticate();
      const sheets = google.sheets({ version: 'v4', auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A:H`,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) {
        console.log('❌ Nessun dato trovato nel Google Sheets');
        return [];
      }

      console.log(`📋 Trovate ${rows.length - 1} righe di dati`);

      const changes: PriceChange[] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        try {
          const productId = parseInt(row[0]);
          const productName = row[2]?.toString();  // Nome
          const size = row[3]?.toString();          // Flavor
          const unit = row[4]?.toString();          // Unit
          const currentPrice = parseFloat(row[5]);  // Prezzo Attuale (editato dall'utente)
          const confirmedPrice = parseFloat(row[6]); // Prezzo Aggiornato (ultimo prezzo confermato)
          const availability = row[7]?.toString()?.trim()?.toUpperCase(); // Disponibile

          if (!productId || isNaN(currentPrice)) continue;

          // Controlla modifiche prezzo
          const priceChanged = !isNaN(confirmedPrice) && Math.abs(currentPrice - confirmedPrice) >= 0.01;

          // Controlla modifiche disponibilità: legge dal DB per confrontare
          const newInStock = availability === 'SI';

          // Cerca nel database
          const existingOptions = await db
            .select()
            .from(productOptions)
            .where(eq(productOptions.productId, productId));

          const targetOption = existingOptions.find(o =>
            (o.flavor || '') === (size || '') && (o.size || '') === (unit || '')
          );

          if (!targetOption) {
            if (priceChanged) console.log(`❌ Non trovato nel DB: Product ID ${productId}, Flavor: ${size}, Unit: ${unit}`);
            continue;
          }

          const availabilityChanged = targetOption.inStock !== newInStock;

          if (priceChanged || availabilityChanged) {
            if (priceChanged) console.log(`🔄 Rilevata modifica prezzo riga ${i + 1}: €${confirmedPrice} → €${currentPrice}`);
            if (availabilityChanged) console.log(`📦 Rilevata modifica disponibilità riga ${i + 1}: ${targetOption.inStock ? 'SI' : 'NO'} → ${availability}`);

            changes.push({
              productId,
              productName: productName || '',
              size: size || '',
              unit: unit || '',
              oldPrice: targetOption.priceCents / 100,
              newPrice: currentPrice,
              optionId: targetOption.id,
              oldInStock: targetOption.inStock,
              newInStock,
              availabilityChanged,
              priceChanged,
            });
          }
        } catch (error) {
          console.error(`❌ Errore elaborando riga ${i + 1}:`, error);
        }
      }

      const priceCount = changes.filter(c => c.priceChanged).length;
      const availCount = changes.filter(c => c.availabilityChanged).length;
      console.log(`📋 Totale modifiche rilevate: ${changes.length} (prezzi: ${priceCount}, disponibilità: ${availCount})`);
      return changes;
    } catch (error) {
      console.error('❌ Errore durante il controllo:', error);
      return [];
    }
  }

  async applyPriceChanges(changes: PriceChange[]): Promise<void> {
    let priceUpdated = 0;
    let availabilityUpdated = 0;

    for (const change of changes) {
      try {
        const updates: any = {};

        if (change.priceChanged) {
          updates.priceCents = Math.round(change.newPrice * 100);
        }
        if (change.availabilityChanged) {
          updates.inStock = change.newInStock;
        }

        if (Object.keys(updates).length > 0) {
          await db
            .update(productOptions)
            .set(updates)
            .where(eq(productOptions.id, change.optionId));

          if (change.priceChanged) {
            console.log(`✅ Prezzo aggiornato: ${change.productName} (ID: ${change.productId}), ${change.size}${change.unit}: €${change.oldPrice.toFixed(2)} → €${change.newPrice.toFixed(2)}`);
            priceUpdated++;
          }
          if (change.availabilityChanged) {
            console.log(`✅ Disponibilità aggiornata: ${change.productName} (ID: ${change.productId}), ${change.size}${change.unit}: ${change.oldInStock ? 'SI' : 'NO'} → ${change.newInStock ? 'SI' : 'NO'}`);
            availabilityUpdated++;
          }
        }
      } catch (error) {
        console.error(`❌ Errore aggiornando ${change.productName}:`, error);
      }
    }

    if (priceUpdated > 0 || availabilityUpdated > 0) {
      console.log(`🎉 Aggiornati automaticamente: ${priceUpdated} prezzi, ${availabilityUpdated} disponibilità!`);
    }
  }

  async syncDatabaseToGoogleSheets(): Promise<void> {
    try {
      console.log('🔄 Sincronizzazione completa database → Google Sheets...');
      
      const auth = await this.authenticate();
      const sheets = google.sheets({ version: 'v4', auth });

      // Estrai tutti i dati da product_options con i nomi dei prodotti e marca
      const allOptions = await db
        .select({
          productId: productOptions.productId,
          productName: products.name,
          brandName: brands.name,
          flavor: productOptions.flavor,
          size: productOptions.size,
          priceCents: productOptions.priceCents,
          inStock: productOptions.inStock,
        })
        .from(productOptions)
        .innerJoin(products, eq(productOptions.productId, products.id))
        .innerJoin(brands, eq(products.brandId, brands.id))
        .orderBy(productOptions.productId);

      // Prepara i dati per Google Sheets (formato 8 colonne allineato a exportPricesToGoogleSheets)
      const header = ['ID', 'Marca', 'Nome', 'Gusto', 'Unità', 'Prezzo Attuale', 'Prezzo Aggiornato', 'Disponibile'];
      const rows = [header];

      for (const option of allOptions) {
        const currentPrice = (option.priceCents / 100).toFixed(2);
        rows.push([
          option.productId.toString(),
          option.brandName,
          option.productName,
          option.flavor || '',
          option.size || '',
          currentPrice,
          currentPrice,
          option.inStock ? 'SI' : 'NO'
        ]);
      }

      // Sovrascrivi completamente il Google Sheets
      await sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A:H`,
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `'${this.sheetName}'!A1:H${rows.length}`,
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
        range: `'${this.sheetName}'!A:H`,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) return;

      const updates: any[][] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const productId = parseInt(row[0]);
        const flavor = row[3]?.toString();       // Flavor
        const unit = row[4]?.toString();          // Unit
        const currentPrice = parseFloat(row[5]);  // Prezzo Attuale (editato dall'utente)

        if (!productId || isNaN(currentPrice)) continue;

        // Legge il valore attuale di inStock dal DB per sincronizzare la colonna Disponibile
        const existingOptions = await db
          .select()
          .from(productOptions)
          .where(eq(productOptions.productId, productId));

        const targetOption = existingOptions.find(o =>
          (o.flavor || '') === (flavor || '') && (o.size || '') === (unit || '')
        );

        const inStockValue = targetOption ? (targetOption.inStock ? 'SI' : 'NO') : (row[7] || 'SI');

        updates.push([
          row[0], // ID
          row[1], // Marca
          row[2], // Nome
          row[3], // Gusto
          row[4], // Unità
          row[5], // Prezzo Attuale (resta com'è)
          currentPrice.toFixed(2), // Prezzo Aggiornato → si allinea a Prezzo Attuale
          inStockValue  // Disponibile → sincronizzato dal DB
        ]);
      }

      if (updates.length > 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `'${this.sheetName}'!A2:H${updates.length + 1}`,
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
        const priceCount = changes.filter(c => c.priceChanged).length;
        const availCount = changes.filter(c => c.availabilityChanged).length;
        console.log(`🔄 Rilevate ${changes.length} modifiche (prezzi: ${priceCount}, disponibilità: ${availCount})`);
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
