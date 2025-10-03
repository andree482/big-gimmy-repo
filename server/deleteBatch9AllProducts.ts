import { db } from './db.js';
import { productGroups } from '../shared/schema.js';
import { inArray } from 'drizzle-orm';

async function deleteBatch9Products() {
  console.log('🗑️ ELIMINAZIONE COMPLETA BATCH 9 - DATI ERRATI...');
  
  try {
    // Lista di tutti i productGroups del Batch 9 inseriti con dati sbagliati
    const batch9GroupSlugs = [
      // Premier (1-12)
      'total-energy',
      'hard-start-x-plode', // SLUG SBAGLIATO (dovrebbe essere hard-staart-x-plode)
      'glutamine-pure-1000',
      'high-pro-release',
      'glutamine-pure-100',
      'maltodex-pure-100',
      'dietary-bar',
      'hard-nitrox-xtreme',
      'whey-100-pro-zyme',
      'hard-leucine-booster-4-1-1',
      'hard-bcaa-advanced-8-1-1',
      'bcaa-powder-2-1-1',
      
      // EthicSport (13-20)
      'borraccia-ethicsport',
      'sacca-ethicsport', 
      't-shirt-ethicsport-limited-edition', // SLUG SBAGLIATO (dovrebbe essere t-shirt-ethcisport)
      'cappellino-ethicsport', // SLUG SBAGLIATO (dovrebbe essere capppellino)
      'ramtech-bcaa-2-1-1-ethicsport',
      'omnia-active-formula-ethicsport',
      'super-hydro-tabs-ethicsport', // SLUG SBAGLIATO (dovrebbe essere super-hydro-plus)
      'pre-gara-endurance-ethicsport'
    ];

    console.log('🔍 Controllo productGroups da eliminare...');
    
    // Trova tutti i productGroups del Batch 9
    const groupsToDelete = await db.select()
      .from(productGroups)
      .where(inArray(productGroups.slug, batch9GroupSlugs));

    console.log(`📦 Trovati ${groupsToDelete.length} productGroups da eliminare:`);
    groupsToDelete.forEach(group => {
      console.log(`  - ${group.slug} (${group.name})`);
    });

    if (groupsToDelete.length === 0) {
      console.log('✅ Nessun productGroup del Batch 9 trovato nel database.');
      return;
    }

    // Elimina tutti i productGroups (CASCADE eliminerà automaticamente products, productSizes, productImages)
    console.log('🗑️ Eliminando tutti i productGroups del Batch 9...');
    
    const deletedGroups = await db.delete(productGroups)
      .where(inArray(productGroups.slug, batch9GroupSlugs))
      .returning();

    console.log(`✅ Eliminati ${deletedGroups.length} productGroups del Batch 9:`);
    deletedGroups.forEach(group => {
      console.log(`  ✅ Eliminato: ${group.slug} (${group.name})`);
    });

    console.log('\n🎉 BATCH 9 COMPLETAMENTE ELIMINATO DAL DATABASE!');
    console.log('📝 Motivo: Dati inseriti non corrispondenti al file .md originale');
    console.log('🔧 Prossimo step: Reinserimento con dati corretti');

  } catch (error) {
    console.error('💥 Errore durante l\'eliminazione:', error);
    throw error;
  }
}

deleteBatch9Products()
  .then(() => {
    console.log("✅ Eliminazione Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });