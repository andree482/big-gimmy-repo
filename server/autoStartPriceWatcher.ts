
import { PriceWatcher } from './priceWatcher';

// Configurazione automatica Price Watcher
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID || '1oH-CXTbWUKkvhdIrwa-8bqw5bzHmCON6Eygx38x7XPc';
const CHECK_INTERVAL_MINUTES = 5; // Fisso a 15 secondi
const NODE_ENV = process.env.NODE_ENV || 'development';

export async function startAutomaticPriceWatcher(): Promise<void> {
  // Avvia automaticamente se GOOGLE_SHEETS_ID è configurato
  if (GOOGLE_SHEETS_ID) {
    try {
      console.log('🚀 Avvio automatico Price Watcher...');

      const watcher = new PriceWatcher(GOOGLE_SHEETS_ID);
      watcher.start(CHECK_INTERVAL_MINUTES);

      // Salva il watcher globalmente
      (global as any).priceWatcher = watcher;

      const intervalText = CHECK_INTERVAL_MINUTES < 1 ? `${CHECK_INTERVAL_MINUTES * 60} secondi` : `${CHECK_INTERVAL_MINUTES} minuti`;
      console.log(`✅ Price Watcher attivo: controlla ogni ${intervalText}`);
      console.log(`📊 Monitoraggio Google Sheets: ${GOOGLE_SHEETS_ID}`);

      // Gestione graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Arresto Price Watcher...');
        watcher.stop();
        process.exit(0);
      });

      process.on('SIGTERM', () => {
        console.log('\n🛑 Arresto Price Watcher...');
        watcher.stop();
        process.exit(0);
      });

    } catch (error) {
      console.error('❌ Errore avvio automatico Price Watcher:', error);
    }
  } else {
    console.log('⚠️ GOOGLE_SHEETS_ID non configurato. Price Watcher non avviato automaticamente.');
    console.log('💡 Configura GOOGLE_SHEETS_ID nelle secrets per l\'avvio automatico');
  }
}
