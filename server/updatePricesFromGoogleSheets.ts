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

function loadGoogleCredentials() {
  const fromEnv = process.env.GOOGLE_CREDENTIALS_JSON;
  if (fromEnv && fromEnv.trim().length > 0) {
    return JSON.parse(fromEnv);
  }
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
}

async function authenticate() {
  try {
    const credentials = loadGoogleCredentials();

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    return auth;
  } catch (error) {
    console.error('❌ Errore nell\'autenticazione Google:', error);
    console.log('📝 Configura GOOGLE_CREDENTIALS_JSON (env) o il file google-credentials.json');
    throw error;
  }
}

// Esporta prezzi attuali su Google Sheets
async function exportPricesToGoogleSheets(db: ReturnType<typeof createDb>, spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
  console.log("📤 Esportazione prezzi su Google Sheets...");

  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    // Verifica se il foglio esiste, altrimenti crealo — cattura anche lo sheetId
    let sheetId = 0;
    try {
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
      const sheetData = spreadsheet.data.sheets?.find(
        sheet => sheet.properties?.title === sheetName
      );

      if (!sheetData) {
        console.log(`📝 Creazione del foglio "${sheetName}"...`);
        const addResp = await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{ addSheet: { properties: { title: sheetName } } }]
          }
        });
        sheetId = addResp.data.replies?.[0]?.addSheet?.properties?.sheetId ?? 0;
        console.log(`✅ Foglio "${sheetName}" creato con successo`);
      } else {
        sheetId = sheetData.properties?.sheetId ?? 0;
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
    const rows = allSizes.map((option) => {
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
        basePriceCents / 100,                   // Col F: Prezzo Attuale = original_price_cents (numero, non stringa)
        basePriceCents / 100,                   // Col G: placeholder — sostituito da formula sotto
        discountPct,                             // Col H: Sconto % — numero, non stringa
        (option.currentPrice / 100).toFixed(2), // Col I: placeholder — sostituito da formula sotto
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

    // Reset formato celle a NUMBER (previene formato Time che divide i valori per 24)
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            repeatCell: {
              range: { sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
              cell: { userEnteredFormat: { numberFormat: { type: 'NUMBER' } } },
              fields: 'userEnteredFormat.numberFormat',
            }
          }]
        }
      });
      console.log(`📋 Formato celle reimpostato a NUMBER`);
    } catch (fmtErr: any) {
      console.log(`⚠️ Impossibile resettare formato celle: ${fmtErr?.message}`);
    }

    // Inserisce i dati statici con RAW (evita che brand/nomi siano interpretati come formule)
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetName}'!A1`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    // Scrive le formule nelle colonne G e I con USER_ENTERED (solo formule, non dati statici)
    const gFormulas = allSizes.map((_, i) => [`=F${i + 2}`]);
    const iFormulas = allSizes.map((_, i) => [`=F${i + 2}*(100-H${i + 2})/100`]);
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: [
          { range: `'${sheetName}'!G2`, values: gFormulas },
          { range: `'${sheetName}'!I2`, values: iFormulas },
        ],
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
        const rawDiscount = parseFloat(row[7]);
        const discountPct = isNaN(rawDiscount) ? 20 : rawDiscount;  // Col H: Sconto % (default 20, ma 0 è valido)
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

        // Aggiorna inStock SOLO se la colonna J ha un valore esplicito (SI o NO)
        if (availability === 'SI' || availability === 'NO') {
          const newAvailability = availability === 'SI';
          if (targetOption.inStock !== newAvailability) {
            updates.inStock = newAvailability;
            hasUpdates = true;
            console.log(`📦 Disponibilità cambiata: ${brandName} - ${productName} (ID: ${productId}), ${size}${unit}: ${targetOption.inStock ? 'SI' : 'NO'} → ${newAvailability ? 'SI' : 'NO'}`);
            availabilityUpdatedCount++;
          }
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