import { google } from 'googleapis';
import { productOptions, products, brands } from '../shared/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../shared/schema';
import dotenv from 'dotenv';

dotenv.config();

// Determina quale DB usare in base all'argomento "sito privato"
const PRIVATE_SITE_FLAG = 'sito privato';

function createDb(usePrivate: boolean) {
  const connectionString = usePrivate
    ? process.env.DATABASE_URL_PRIVATO
    : process.env.DATABASE_URL;

  if (!connectionString) {
    const varName = usePrivate ? 'DATABASE_URL_PRIVATO' : 'DATABASE_URL';
    console.error(`❌ Variabile d'ambiente ${varName} non trovata nel file .env`);
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
    max: 5,
    idleTimeoutMillis: 30000,
    allowExitOnIdle: true,
  });

  const label = usePrivate ? 'SITO PRIVATO' : 'DB PRINCIPALE';
  console.log(`🗄️  Connessione a: [${label}] ${connectionString.split('@')[1]}`);

  return drizzle(pool, { schema });
}

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

interface AvailabilityUpdate {
  productId: number;
  size: string;
  unit: string;
  currentAvailability: boolean;
  newAvailability: boolean;
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
async function exportPricesToGoogleSheets(db: ReturnType<typeof createDb>, spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
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
        originalPrice: productOptions.originalPriceCents,
        inStock: productOptions.inStock
      })
      .from(productOptions)
      .innerJoin(products, eq(productOptions.productId, products.id))
      .innerJoin(brands, eq(products.brandId, brands.id))
      .orderBy(productOptions.productId);

    // Prepara i dati per Google Sheets
    // Colonne:
    //   A: ID Prodotto  B: Marca  C: Nome  D: Gusto  E: Unità
    //   F: Prezzo Attuale  (MODIFICA QUI → salva in original_price_cents)
    //   G: Prezzo Aggiornato (sola lettura — uguale a F, si aggiorna dopo la sync)
    //   H: Sconto %        (% di sconto per variante — modifica per cambiare)
    //   I: Prezzo Finale   (sola lettura — price_cents = F × (1 - H%))
    //   J: Disponibile
    const headers = ['ID Prodotto', 'Marca', 'Nome', 'Gusto', 'Unità', 'Prezzo Attuale', 'Prezzo Aggiornato', 'Sconto %', 'Prezzo Finale', 'Disponibile'];
    const rows = allSizes.map(option => {
      const basePriceCents = option.originalPrice && option.originalPrice > 0
        ? option.originalPrice
        : option.currentPrice; // fallback quando original_price_cents è NULL
      const discountPct = basePriceCents > 0
        ? Math.round((1 - option.currentPrice / basePriceCents) * 100)
        : 20;
      return [
        option.productId,
        option.brandName,
        option.productName,
        option.flavor || '',
        option.size || '',
        (basePriceCents / 100).toFixed(2),      // Col F: Prezzo Attuale = original_price_cents (MODIFICA QUI)
        (basePriceCents / 100).toFixed(2),      // Col G: Prezzo Aggiornato (sola lettura, si allinea a F dopo sync)
        discountPct.toString(),                  // Col H: Sconto %
        (option.currentPrice / 100).toFixed(2), // Col I: Prezzo Finale = price_cents (sola lettura)
        option.inStock ? 'SI' : 'NO',           // Col J: Disponibile
      ];
    });

    const values = [headers, ...rows];

    // Prova a cancellare il contenuto esistente (opzionale)
    try {
      await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `'${sheetName}'!A:J`,
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
async function updatePricesFromGoogleSheets(db: ReturnType<typeof createDb>, spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
  console.log("📊 Aggiornamento prezzi da Google Sheets...");

  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    // Legge i dati dal foglio
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheetName}'!A:J`,
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
        const brandName = row[1]?.toString(); // Marca del prodotto
        const productName = row[2]?.toString(); // Nome del prodotto
        const size = row[3]?.toString(); // Flavor
        const unit = row[4]?.toString(); // Unit/Size
        const newPrice = parseFloat(row[5]);           // Col F: Prezzo Attuale = price_cents (da modificare)
        // row[6] = Prezzo Originale (sola lettura, ignorato in input)
        const discountPct = parseFloat(row[7]) || 20;  // Col H: Sconto % (default 20)
        // row[8] = Prezzo Finale (sola lettura, ignorato in input)
        const availability = row[9]?.toString()?.trim()?.toUpperCase(); // Col J: Disponibile

        console.log(`📊 Dati estratti - ID: ${productId}, Marca: ${brandName}, Nome: ${productName}, Size: ${size}, Unit: ${unit}, Prezzo Attuale: ${newPrice}, Sconto: ${discountPct}%, Disponibile: ${availability}`);

        // Validazione dati (flavor e unit possono essere vuoti per alcuni prodotti)
        if (!productId || isNaN(newPrice) || newPrice <= 0) {
          console.log(`❌ Riga ${i + 1} invalida: Product ID: ${productId}, Marca: ${brandName}, Nome: ${productName}, Size: ${size}, Unit: ${unit}, Prezzo Aggiornato: ${newPrice}`);
          errorCount++;
          continue;
        }

        // Calcola i centesimi
        // F = Prezzo Attuale → original_price_cents (prezzo base, quello che si modifica)
        // price_cents = original_price_cents × (1 - sconto%) → prezzo che paga il cliente (col I)
        const basePriceCents = Math.round(newPrice * 100);
        const finalPriceCents = Math.round(basePriceCents * (1 - discountPct / 100));

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

        // Aggiorna original_price_cents (prezzo base, col F) se cambiato
        if (targetOption.originalPriceCents !== basePriceCents) {
          updates.originalPriceCents = basePriceCents;
          hasUpdates = true;
          console.log(`📋 Prezzo base (F) cambiato: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: €${((targetOption.originalPriceCents ?? 0)/100).toFixed(2)} → €${newPrice.toFixed(2)}`);
        }

        // Aggiorna price_cents (prezzo finale scontato, col I) se cambiato
        if (targetOption.priceCents !== finalPriceCents) {
          updates.priceCents = finalPriceCents;
          hasUpdates = true;
          console.log(`💰 Prezzo finale (I) cambiato: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: €${(targetOption.priceCents/100).toFixed(2)} → €${(finalPriceCents/100).toFixed(2)} (sconto ${discountPct}%)`);
          updatedCount++;
        }

        // Confronta la disponibilità del DATABASE con la nuova disponibilità dal Google Sheets
        if (targetOption.inStock !== newAvailability) {
          updates.inStock = newAvailability;
          hasUpdates = true;
          console.log(`📦 Disponibilità cambiata: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: ${targetOption.inStock ? 'SI' : 'NO'} → ${newAvailability ? 'SI' : 'NO'}`);
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

// Controlla se il terzo argomento è "sito privato" (flag speciale) o un nome foglio
const thirdArg = args[2] || '';
const usePrivateDb = thirdArg.toLowerCase() === PRIVATE_SITE_FLAG;
const sheetName = usePrivateDb ? 'Prezzi Prodotti - Sito Privato' : (thirdArg || 'Prezzi Prodotti');

if (command === 'export' || command === 'update') {
  if (!spreadsheetId) {
    console.error(`❌ Specifica l'ID del Google Sheets: npm run prices-sheets ${command} <spreadsheet-id> ["sito privato"]`);
    console.log("💡 L'ID del foglio si trova nell'URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit");
    process.exit(1);
  }

  const db = createDb(usePrivateDb);
  const action = command === 'export'
    ? exportPricesToGoogleSheets(db, spreadsheetId, sheetName)
    : updatePricesFromGoogleSheets(db, spreadsheetId, sheetName);

  action
    .then(() => {
      console.log(`✅ ${command === 'export' ? 'Esportazione' : 'Aggiornamento'} completato!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ Errore:`, error);
      process.exit(1);
    });

} else {
  console.log(`
📊 Script di gestione prezzi tramite Google Sheets

Comandi disponibili:
  npm run prices-sheets export <spreadsheet-id> ["sito privato"]  - Esporta prezzi su Google Sheets
  npm run prices-sheets update <spreadsheet-id> ["sito privato"]  - Aggiorna prezzi da Google Sheets

  Senza "sito privato"  → usa DATABASE_URL        (DB principale)
  Con    "sito privato" → usa DATABASE_URL_PRIVATO (secondo sito)

Esempi:
  npm run prices-sheets export 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
  npm run prices-sheets export 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms "sito privato"
  npm run prices-sheets update 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms "sito privato"

💡 Aggiungi DATABASE_URL_PRIVATO=... nel file .env per il secondo sito
  `);
}