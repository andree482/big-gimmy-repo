import { spawn } from 'child_process';

const PRIVATE_SHEET_NAME = 'Prezzi Prodotti - Sito Privato';

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
    if (this.active) {
      console.log(`⚠️  PriceWatcher già attivo, lo fermo prima di riavviarlo`);
      this.stop();
    }

    this.active = true;
    console.log(`📈 PriceWatcher avviato → foglio: "${this.sheetName}" ogni ${intervalMinutes} min [DB: SITO PRIVATO]`);

    // Prima sincronizzazione immediata
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
    console.log(`🔄 [${new Date().toLocaleTimeString('it-IT')}] PriceWatcher: controllo prezzi da "${this.sheetName}"...`);

    const child = spawn(
      'npx',
      ['tsx', 'server/updatePricesFromGoogleSheets.ts', 'update', this.spreadsheetId, this.sheetName],
      {
        stdio: 'inherit',
        env: process.env,
        shell: true,
      }
    );

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ [${new Date().toLocaleTimeString('it-IT')}] PriceWatcher: sincronizzazione completata`);
      } else {
        console.error(`❌ [${new Date().toLocaleTimeString('it-IT')}] PriceWatcher: errore durante la sincronizzazione (exit code ${code})`);
      }
    });
  }

  // Stub mantenuto per compatibilità con le API esistenti
  async authenticate(): Promise<any> {
    return null;
  }

  async syncDatabaseToGoogleSheets(): Promise<void> {
    console.log(`🔁 Sync non supportato in questa direzione — usa "npm run prices-sheets export"`);
  }
}
