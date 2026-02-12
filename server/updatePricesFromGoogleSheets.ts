import { google } from 'googleapis';
import { db } from './db';
import { productOptions, products, brands } from '../shared/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

// Configurazione Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = 'google-credentials.json';

interface PriceUpdate {
  productId: number;
  size: string;
  unit: string;
  currentPrice: number;
  newPrice: number;
}

// Autentica con Google Sheets API
async function authenticate() {
  try {
    // Carica le credenziali dal file JSON
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    return auth;
  } catch (error) {
    console.error('❌ Errore nell\'autenticazione Google:', error);
    console.log('📝 Assicurati di aver configurato il file google-credentials.json');
    throw error;
  }
}

// Esporta prezzi attuali su Google Sheets
async function exportPricesToGoogleSheets(spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
  console.log("📤 Esportazione prezzi su Google Sheets...");

  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    // Verifica se il foglio esiste, altrimenti crealo
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId,
      });

      const sheetExists = spreadsheet.data.sheets?.some(
        sheet => sheet.properties?.title === sheetName
      );

      if (!sheetExists) {
        console.log(`📝 Creazione del foglio "${sheetName}"...`);
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: sheetName
                }
              }
            }]
          }
        });
        console.log(`✅ Foglio "${sheetName}" creato con successo`);
      }
    } catch (error) {
      console.log(`⚠️ Errore nella verifica del foglio, procedo comunque: ${error}`);
    }

    // Recupera tutti i prezzi dal database con nome del prodotto e marca
    const allSizes = await db
      .select({
        productId: productOptions.productId,
        productName: products.name,
        brandName: brands.name,
        flavor: productOptions.flavor,
        size: productOptions.size,
        currentPrice: productOptions.priceCents,
        inStock: productOptions.inStock
      })
      .from(productOptions)
      .innerJoin(products, eq(productOptions.productId, products.id))
      .innerJoin(brands, eq(products.brandId, brands.id))
      .orderBy(productOptions.productId);

    // Prepara i dati per Google Sheets (formato 8 colonne)
    const headers = ['ID', 'Marca', 'Nome', 'Gusto', 'Unità', 'Prezzo Attuale', 'Prezzo Aggiornato', 'Disponibile'];
    const rows = allSizes.map(option => [
      option.productId,
      option.brandName,
      option.productName,
      option.flavor || '',
      option.size || '',
      (option.currentPrice / 100).toFixed(2),
      (option.currentPrice / 100).toFixed(2), // Copia il prezzo attuale per facilitare le modifiche
      option.inStock ? 'SI' : 'NO'
    ]);

    const values = [headers, ...rows];

    // Prova a cancellare il contenuto esistente (opzionale)
    try {
      await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `'${sheetName}'!A:H`,
      });
      console.log(`🗑️ Contenuto esistente cancellato`);
    } catch (clearError) {
      console.log(`⚠️ Non è stato possibile cancellare il contenuto esistente, procedo comunque`);
    }

    // Inserisce i nuovi dati
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetName}'!A1`,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log(`✅ Esportati ${allSizes.length} prezzi su Google Sheets`);
    console.log(`📊 Range aggiornato: ${response.data.updatedRange}`);
    console.log(`🔗 Link al foglio: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  } catch (error) {
    console.error("❌ Errore durante l'esportazione:", error);
    throw error;
  }
}

// Aggiorna prezzi dal Google Sheets
async function updatePricesFromGoogleSheets(spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
  console.log("📊 Aggiornamento prezzi da Google Sheets...");

  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    // Legge i dati dal foglio (formato 8 colonne)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheetName}'!A:H`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.log("❌ Nessun dato trovato nel foglio");
      return;
    }

    console.log(`📋 Trovate ${rows.length - 1} righe nel Google Sheets`);

    let updatedCount = 0;
    let availabilityUpdatedCount = 0;
    let errorCount = 0;

    // Salta la riga di intestazione
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      try {
        console.log(`🔍 Elaborando riga ${i + 1}:`, row);

        const productId = parseInt(row[0]);
        const brandName = row[1]?.toString();      // Marca
        const productName = row[2]?.toString();    // Nome
        const size = row[3]?.toString();            // Flavor
        const unit = row[4]?.toString();            // Unit
        const currentPrice = parseFloat(row[5]);    // Current Price
        const newPrice = parseFloat(row[6]);        // New Price
        const availability = row[7]?.toString()?.trim()?.toUpperCase(); // Disponibile

        console.log(`📊 Dati estratti - ID: ${productId}, Marca: ${brandName}, Nome: ${productName}, Flavor: ${size}, Unit: ${unit}, Current: ${currentPrice}, New: ${newPrice}, Disponibile: ${availability}`);

v        // Validazione dati (flavor e unit possono essere vuoti per alcuni prodotti)
        if (!productId || isNaN(newPrice) || newPrice <= 0) {
          console.log(`❌ Riga ${i + 1} invalida: Product ID: ${productId}, Marca: ${brandName}, Nome: ${productName}, Flavor: ${size}, Unit: ${unit}, Price: ${newPrice}`);
          errorCount++;
          continue;
        }

        // Converti il prezzo in centesimi per il confronto
        const priceInCents = Math.round(newPrice * 100);

        // Converti la disponibilità in boolean
        const newAvailability = availability === 'SI';

        // Cerca la riga nel database
        const existingOptions = await db
          .select()
          .from(productOptions)
          .where(eq(productOptions.productId, productId));

        const targetOption = existingOptions.find(o =>
          (o.flavor || '') === (size || '') && (o.size || '') === (unit || '')
        );

        if (!targetOption) {
          console.log(`❌ Riga ${i + 1}: Non trovata combinazione Product ID ${productId} (${brandName} - ${productName}), Flavor: ${size}, Unit: ${unit}`);
          errorCount++;
          continue;
        }

        let hasUpdates = false;
        const updates: any = {};

        // Confronta il prezzo del DATABASE con il nuovo prezzo dal Google Sheets
        if (targetOption.priceCents !== priceInCents) {
          updates.priceCents = priceInCents;
          hasUpdates = true;
          console.log(`💰 Riga ${i + 1}: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: €${(targetOption.priceCents/100).toFixed(2)} → €${newPrice.toFixed(2)}`);
          updatedCount++;
        }

        // Confronta la disponibilità del DATABASE con la nuova disponibilità dal Google Sheets
        if (targetOption.inStock !== newAvailability) {
          updates.inStock = newAvailability;
          hasUpdates = true;
          console.log(`📦 Riga ${i + 1}: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: ${targetOption.inStock ? 'SI' : 'NO'} → ${newAvailability ? 'SI' : 'NO'}`);
          availabilityUpdatedCount++;
        }

        // Applica gli aggiornamenti se necessario
        if (hasUpdates) {
          await db
            .update(productOptions)
            .set(updates)
            .where(eq(productOptions.id, targetOption.id));
        } else {
          console.log(`⏭️ Riga ${i + 1}: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: Nessun cambiamento necessario`);
        }

      } catch (error) {
        console.error(`❌ Errore elaborando riga ${i + 1}:`, row, error);
        errorCount++;
      }
    }

    console.log(`\n📊 Riepilogo aggiornamento:`);
    console.log(`✅ Prezzi aggiornati: ${updatedCount}`);
    console.log(`📦 Disponibilità aggiornate: ${availabilityUpdatedCount}`);
    console.log(`❌ Errori: ${errorCount}`);
    console.log(`📋 Totale righe elaborate: ${rows.length - 1}`);

  } catch (error) {
    console.error("❌ Errore durante l'aggiornamento:", error);
    throw error;
  }
}

// Esecuzione script
const args = process.argv.slice(2);
const command = args[0];
const spreadsheetId = args[1];
const sheetName = args[2] || 'Prezzi Prodotti';

if (command === 'export') {
  if (!spreadsheetId) {
    console.error("❌ Specifica l'ID del Google Sheets: npm run prices-sheets export <spreadsheet-id>");
    console.log("💡 L'ID del foglio si trova nell'URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit");
    process.exit(1);
  }

  exportPricesToGoogleSheets(spreadsheetId, sheetName)
    .then(() => {
      console.log("✅ Esportazione completata!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Errore durante l'esportazione:", error);
      process.exit(1);
    });

} else if (command === 'update') {
  if (!spreadsheetId) {
    console.error("❌ Specifica l'ID del Google Sheets: npm run prices-sheets update <spreadsheet-id>");
    console.log("💡 L'ID del foglio si trova nell'URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit");
    process.exit(1);
  }

  updatePricesFromGoogleSheets(spreadsheetId, sheetName)
    .then(() => {
      console.log("✅ Aggiornamento completato!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Errore durante l'aggiornamento:", error);
      process.exit(1);
    });

} else {
  console.log(`
📊 Script di gestione prezzi tramite Google Sheets

Comandi disponibili:
  npm run prices-sheets export <spreadsheet-id> [sheet-name]  - Esporta prezzi su Google Sheets
  npm run prices-sheets update <spreadsheet-id> [sheet-name]  - Aggiorna prezzi da Google Sheets

Esempi:
  npm run prices-sheets export 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
  npm run prices-sheets update 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms "Prezzi 2025"

Setup iniziale:
1. Crea un progetto su Google Cloud Console
2. Abilita l'API Google Sheets
3. Crea credenziali Service Account
4. Scarica il file JSON delle credenziali come 'google-credentials.json'
5. Condividi il Google Sheets con l'email del Service Account

💡 L'ID del foglio si trova nell'URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
  `);
}