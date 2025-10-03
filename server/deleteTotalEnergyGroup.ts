import { db } from './db.js';
import { productGroups, products, productSizes, productImages } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function deleteTotalEnergyGroup() {
  console.log('🗑️ Eliminando total-energy residuo...');
  
  try {
    const group = await db.select().from(productGroups).where(eq(productGroups.slug, 'total-energy'));
    if (group.length > 0) {
      const groupId = group[0].id;
      console.log('Trovato group ID:', groupId);
      
      // Elimina i prodotti del gruppo
      const groupProducts = await db.select().from(products).where(eq(products.groupId, groupId));
      for (const product of groupProducts) {
        await db.delete(productSizes).where(eq(productSizes.productId, product.id));
        await db.delete(productImages).where(eq(productImages.productId, product.id));
        await db.delete(products).where(eq(products.id, product.id));
        console.log('Eliminato prodotto:', product.slug);
      }
      
      // Elimina il gruppo
      await db.delete(productGroups).where(eq(productGroups.id, groupId));
      console.log('Eliminato gruppo: total-energy');
    } else {
      console.log('Nessun gruppo total-energy trovato');
    }
    
    console.log('✅ Pulizia completata!');
  } catch (error) {
    console.error('💥 Errore durante la pulizia:', error);
    throw error;
  }
}

deleteTotalEnergyGroup()
  .then(() => {
    console.log("🎉 Pulizia total-energy completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });