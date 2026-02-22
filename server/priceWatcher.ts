import { google } from 'googleapis';
import * as fs from 'fs';
import { db } from './db';
import { productOptions, products, brands } from '../shared/schema';
import { eq } from 'drizzle-orm';

const CREDENTIALS_PATH = 'google-credentials.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const PRIVATE_SHEET_NAME = 'Prezzi Prodotti - Sito Privato';

async function authenticate() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
  return auth;
}

async function syncPricesFromSheet(spreadsheetId: string, sheetName: string) {
  console.log(`📊 [PriceWatcher] Leggo prezzi da "${sheetName}"...`);

  const auth = await authenticate();
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!A:H`,
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) {
    console.log(`[PriceWatcher] Nessun dato nel foglio "${sheetName}"`);
    return;
  }

  let updatedCount = 0;
  let availabilityUpdatedCount = 0;
  let errorCount = 0;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    try {
      const productId = parseInt(row[0]);
      const flavor   = row[3]?.toString() || '';
      const size     = row[4]?.toString() || '';
      const newPrice = parseFloat(row[6]);
      const availability = row[7]?.toString()?.trim()?.toUpperCase();

      if (!productId || isNaN(newPrice) || newPrice <= 0) {
        errorCount++;
        continue;
      }

      const priceInCents  = Math.round(newPrice * 100);
      const newAvailability = availability === 'SI';

      const existingOptions = await db
        .select()
        .from(productOptions)
        .where(eq(productOptions.productId, productId));

      const targetOption = existingOptions.find(o =>
        (o.flavor || '') === flavor && (o.size || '') === size
      );

      if (!targetOption) {
        errorCount++;
        continue;
      }

      const updates: any = {};
      if (targetOption.priceCents !== priceInCents) {
        updates.priceCents = priceInCents;
        updatedCount++;
      }
      if (targetOption.inStock !== newAvailability) {
        updates.inStock = newAvailability;
        availabilityUpdatedCount++;
      }

      if (Object.keys(updates).length > 0) {
        await db.update(productOptions).set(updates).where(eq(productOptions.id, targetOption.id));
      }
    } catch {
      errorCount++;
    }
  }

  console.log(`✅ [PriceWatcher] Sync completata — prezzi: ${updatedCount}, disponibilità: ${availabilityUpdatedCount}, errori: ${errorCount}`);
}

export class PriceWatcher {
  private spreadsheetId: string;
  private sheetName: string;
  private active = false;
  private intervalHandle: ReturnType<typeof setInterval> | null = null;

  constructor(spreadsheetId: string, sheetName: string = PRIVATE_SHEET_NAME) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
  }

  start(intervalMinutes: number = 5) {
    if (this.active) this.stop();

    this.active = true;
    console.log(`📈 PriceWatcher avviato → foglio: "${this.sheetName}" ogni ${intervalMinutes} min`);

    // Sync immediata al via
    this.runSync();

    // Poi ogni N minuti
    this.intervalHandle = setInterval(() => this.runSync(), intervalMinutes * 60 * 1000);
  }

  stop() {
    this.active = false;
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
    console.log(`🛑 PriceWatcher fermato`);
  }

  isActive() {
    return this.active;
  }

  private runSync() {
    const time = new Date().toLocaleTimeString('it-IT');
    console.log(`🔄 [${time}] PriceWatcher: controllo prezzi...`);

    syncPricesFromSheet(this.spreadsheetId, this.sheetName).catch((err) => {
      console.error(`❌ [PriceWatcher] Errore sync:`, err?.message || err);
    });
  }

  // Stub mantenuto per compatibilità API esistenti
  async authenticate(): Promise<any> { return null; }
  async syncDatabaseToGoogleSheets(): Promise<void> {
    console.log(`[PriceWatcher] Per esportare usa: npm run prices-sheets export`);
  }
}
