import { db } from './db.js';
import { productGroups, products, productSizes, productImages } from '../shared/schema.js';
import { inArray, eq } from 'drizzle-orm';

async function deleteBatch9ProductsCascade() {
  console.log('🗑️ ELIMINAZIONE BATCH 9 CON CASCADE MANUALE...');
  
  try {
    // Lista di tutti i productGroups del Batch 9
    const batch9GroupSlugs = [
      'total-energy', 'hard-start-x-plode', 'glutamine-pure-1000', 'high-pro-release',
      'glutamine-pure-100', 'maltodex-pure-100', 'dietary-bar', 'hard-nitrox-xtreme',
      'whey-100-pro-zyme', 'hard-leucine-booster-4-1-1', 'hard-bcaa-advanced-8-1-1',
      'bcaa-powder-2-1-1', 'borraccia-ethicsport', 'sacca-ethicsport',
      't-shirt-ethicsport-limited-edition', 'cappellino-ethicsport',
      'ramtech-bcaa-2-1-1-ethicsport', 'omnia-active-formula-ethicsport',
      'super-hydro-tabs-ethicsport', 'pre-gara-endurance-ethicsport'
    ];

    // Step 1: Trova tutti i productGroups del Batch 9
    const groupsToDelete = await db.select()
      .from(productGroups)
      .where(inArray(productGroups.slug, batch9GroupSlugs));

    if (groupsToDelete.length === 0) {
      console.log('✅ Nessun productGroup del Batch 9 trovato.');
      return;
    }

    console.log(`📦 Trovati ${groupsToDelete.length} productGroups da eliminare`);

    const groupIds = groupsToDelete.map(g => g.id);

    // Step 2: Trova tutti i products collegati
    const productsToDelete = await db.select()
      .from(products)
      .where(inArray(products.groupId, groupIds));

    console.log(`🔗 Trovati ${productsToDelete.length} products collegati`);

    if (productsToDelete.length > 0) {
      const productIds = productsToDelete.map(p => p.id);

      // Step 3: Elimina productSizes
      console.log('🗑️ Eliminando productSizes...');
      const deletedSizes = await db.delete(productSizes)
        .where(inArray(productSizes.productId, productIds))
        .returning();
      console.log(`✅ Eliminati ${deletedSizes.length} productSizes`);

      // Step 4: Elimina productImages  
      console.log('🗑️ Eliminando productImages...');
      const deletedImages = await db.delete(productImages)
        .where(inArray(productImages.productId, productIds))
        .returning();
      console.log(`✅ Eliminati ${deletedImages.length} productImages`);

      // Step 5: Elimina products
      console.log('🗑️ Eliminando products...');
      const deletedProducts = await db.delete(products)
        .where(inArray(products.groupId, groupIds))
        .returning();
      console.log(`✅ Eliminati ${deletedProducts.length} products`);
    }

    // Step 6: Elimina productGroups
    console.log('🗑️ Eliminando productGroups...');
    const deletedGroups = await db.delete(productGroups)
      .where(inArray(productGroups.slug, batch9GroupSlugs))
      .returning();

    console.log(`✅ Eliminati ${deletedGroups.length} productGroups`);

    console.log('\n🎉 BATCH 9 COMPLETAMENTE ELIMINATO!');
    console.log('📝 Motivo: Dati non corrispondenti al file .md originale');
    console.log('   - Slug sbagliati (hard-start-x-plode invece di hard-staart-x-plode)');
    console.log('   - Prezzi sbagliati (borraccia €8.90 invece di €3.00)');
    console.log('   - Altri errori critici trovati');

  } catch (error) {
    console.error('💥 Errore durante l\'eliminazione cascade:', error);
    throw error;
  }
}

deleteBatch9ProductsCascade()
  .then(() => {
    console.log("✅ Eliminazione cascade Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });