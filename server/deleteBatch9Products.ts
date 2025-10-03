import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq, like, or } from 'drizzle-orm';

async function deleteBatch9Products() {
  console.log("🗑️ Avvio eliminazione di tutti i prodotti del Batch 9...");

  try {
    // Lista dei slug dei prodotti del Batch 9 da eliminare
    const batch9Slugs = [
      'total-energy-premier',
      'hard-start-x-plode-premier', 
      'hard-staart-x-plode-premier',
      'glutamine-pure-1000-premier',
      'high-pro-release-premier',
      'glutamine-pure-100-premier',
      'maltodex-pure-100-premier',
      'dietary-bar-premier',
      'hard-nitrox-xtreme-premier',
      'whey-100-pro-zyme-premier',
      'hard-leucine-booster-4-1-1-premier',
      'hard-bcaa-advanced-8-1-1-premier',
      'bcaa-powder-2-1-1-premier',
      'borraccia-ethicsport',
      'sacca-ethicsport',
      't-shirt-ethicsport-limited-edition',
      'cappellino-ethicsport',
      'ramtech-bcaa-2-1-1-ethicsport',
      'omnia-active-formula-ethicsport',
      'super-hydro-tabs-ethicsport',
      'super-hydro-plus-ethicsport',
      'pre-gara-endurance-ethicsport'
    ];

    // Lista degli slug di prodotti individuali che potrebbero esistere (approccio di sicurezza)
    const batch9IndividualSlugs = [
      'total-energy-arancia-300g',
      'hard-start-x-plode-arancia-300g',
      'glutamine-pure-1000-150-compresse',
      'glutamine-pure-1000-300-compresse',
      'high-pro-release-caffe-latte-1kg',
      'high-pro-release-crema-cioccolato-1kg',
      'high-pro-release-crema-vaniglia-1kg',
      'glutamine-pure-100-200g',
      'glutamine-pure-100-400g',
      'maltodex-pure-100-1-1kg',
      'hard-nitrox-xtreme-90-compresse',
      'hard-nitrox-xtreme-180-compresse',
      'borraccia-600ml',
      'borraccia-800ml',
      'sacca-ethicsport',
      't-shirt-ethicsport-s',
      't-shirt-ethicsport-m',
      't-shirt-ethicsport-l',
      't-shirt-ethicsport-xl',
      'cappellino-ethicsport',
      'ramtech-bcaa-2-1-1-120-capsule',
      'omnia-active-formula-45-capsule',
      'super-hydro-tabs-limone-20-compresse',
      'super-hydro-tabs-arancio-20-compresse',
      'pre-gara-endurance-20-buste'
    ];

    let totalDeleted = 0;

    // 1. Elimina product groups con slug batch 9
    console.log("1. Eliminando product groups...");
    for (const slug of batch9Slugs) {
      const groupsToDelete = await db.select().from(productGroups).where(eq(productGroups.slug, slug));
      
      for (const group of groupsToDelete) {
        // Prima elimina tutti i prodotti del gruppo
        const groupProducts = await db.select().from(products).where(eq(products.groupId, group.id));
        
        for (const product of groupProducts) {
          // Elimina product sizes
          await db.delete(productSizes).where(eq(productSizes.productId, product.id));
          // Elimina product images
          await db.delete(productImages).where(eq(productImages.productId, product.id));
          // Elimina il prodotto
          await db.delete(products).where(eq(products.id, product.id));
          totalDeleted++;
          console.log(`   Eliminato prodotto: ${product.slug}`);
        }
        
        // Poi elimina il group
        await db.delete(productGroups).where(eq(productGroups.id, group.id));
        console.log(`   Eliminato product group: ${group.slug}`);
      }
    }

    // 2. Elimina prodotti individuali che potrebbero essere rimasti
    console.log("2. Eliminando prodotti individuali...");
    for (const slug of batch9IndividualSlugs) {
      const productsToDelete = await db.select().from(products).where(eq(products.slug, slug));
      
      for (const product of productsToDelete) {
        // Elimina product sizes
        await db.delete(productSizes).where(eq(productSizes.productId, product.id));
        // Elimina product images
        await db.delete(productImages).where(eq(productImages.productId, product.id));
        // Elimina il prodotto
        await db.delete(products).where(eq(products.id, product.id));
        totalDeleted++;
        console.log(`   Eliminato prodotto individuale: ${product.slug}`);
      }
    }

    // 3. Elimina prodotti che contengono parole chiave del batch 9 (approccio di sicurezza)
    console.log("3. Eliminando prodotti per parole chiave...");
    const keywordPatterns = [
      '%total-energy%',
      '%hard-start%',
      '%glutamine-pure%',
      '%high-pro-release%',
      '%maltodex-pure%',
      '%dietary-bar%',
      '%hard-nitrox%',
      '%whey-100-pro-zyme%',
      '%hard-leucine%',
      '%hard-bcaa-advanced%',
      '%bcaa-powder%',
      '%ramtech-bcaa%',
      '%omnia-active%',
      '%super-hydro-tabs%',
      '%pre-gara-endurance%'
    ];

    for (const pattern of keywordPatterns) {
      const productsToDelete = await db.select().from(products).where(like(products.slug, pattern));
      
      for (const product of productsToDelete) {
        // Elimina product sizes
        await db.delete(productSizes).where(eq(productSizes.productId, product.id));
        // Elimina product images
        await db.delete(productImages).where(eq(productImages.productId, product.id));
        // Elimina il prodotto
        await db.delete(products).where(eq(products.id, product.id));
        totalDeleted++;
        console.log(`   Eliminato prodotto per keyword: ${product.slug}`);
      }
    }

    console.log(`✅ Eliminazione completata! Totale prodotti eliminati: ${totalDeleted}`);

  } catch (error) {
    console.error("💥 Errore durante l'eliminazione:", error);
    throw error;
  }
}

// Eseguire la funzione
deleteBatch9Products()
  .then(() => {
    console.log("🎉 Eliminazione Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });