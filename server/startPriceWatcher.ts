
import { PriceWatcher } from './priceWatcher';

const args = process.argv.slice(2);
const command = args[0];
const spreadsheetId = args[1];
const intervalMinutes = parseInt(args[2]) || 2;

if (command === 'start') {
  if (!spreadsheetId) {
    console.error("❌ Specifica l'ID del Google Sheets: npm run watch-prices start <spreadsheet-id> [interval-minutes]");
    console.log("💡 L'ID del foglio si trova nell'URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit");
    process.exit(1);
  
  // Gestione graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Arresto in corso...');
    watcher.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Arresto in corso...');
    watcher.stop();
    process.exit(0);
  });


}
