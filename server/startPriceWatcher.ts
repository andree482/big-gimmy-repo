
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
  }

  console.log(`🚀 Avvio monitoraggio automatico prezzi...`);
  console.log(`📊 Google Sheets ID: ${spreadsheetId}`);
  console.log(`⏰ Intervallo controllo: ${intervalMinutes} minuti`);
  console.log(`🛑 Per fermare: Ctrl+C`);

  const watcher = new PriceWatcher(spreadsheetId);
  watcher.start(intervalMinutes);

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

} else {
  console.log(`
🔄 Monitoraggio Automatico Prezzi

Comandi disponibili:
  npm run watch-prices start <spreadsheet-id> [interval-minutes]  - Avvia monitoraggio automatico

Esempi:
  npm run watch-prices start 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms     - Controlla ogni 2 minuti
  npm run watch-prices start 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms 5   - Controlla ogni 5 minuti

💡 Il sistema controlla automaticamente le modifiche e aggiorna il database in tempo reale!
  `);
}
