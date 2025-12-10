export class PriceWatcher {
  private spreadsheetId: string;
  private sheetName: string;
  private active = false;

  constructor(spreadsheetId: string, sheetName: string = 'Prezzi Prodotti') {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
  }

  start(intervalMinutes: number = 2) {
    this.active = true;
    console.log(`📈 PriceWatcher started for ${this.spreadsheetId} every ${intervalMinutes} min`);
  }

  stop() {
    this.active = false;
    console.log(`🛑 PriceWatcher stopped`);
  }

  isActive() {
    return this.active;
  }

  async authenticate(): Promise<any> {
    console.log('🔐 PriceWatcher authenticate stub');
    return null;
  }

  async syncDatabaseToGoogleSheets(): Promise<void> {
    console.log(`🔁 Sync database to Google Sheets for ${this.spreadsheetId}/${this.sheetName}`);
  }
}

