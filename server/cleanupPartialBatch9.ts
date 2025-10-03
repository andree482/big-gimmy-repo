import { db } from './db.js';
import { productGroups, products, productSizes, productImages } from '../shared/schema.js';
import { eq, or } from 'drizzle-orm';

async function cleanupPartialBatch9() {
  console.log('🗑️ Pulizia completa prodotti Batch 9 parziali...');
  
  try {
    // Elimina i gruppi specifici che sono stati inseriti parzialmente
    const groupsToDelete = [
      'total-energy',
      'hard-start-x-plode',
      'glutamine-pure-1000',
      'high-pro-release'
    ];

    for (const slug of groupsToDelete) {
      const groups = await db.select().from(productGroups).where(eq(productGroups.slug, slug));
      
      for (const group of groups) {
        console.log(`Eliminando gruppo: ${group.slug} (ID: ${group.id})`);
        
        // Elimina tutti i prodotti del gruppo
        const groupProducts = await db.select().from(products).where(eq(products.groupId, group.id));
        
        for (const product of groupProducts) {
          // Elimina productSizes
          await db.delete(productSizes).where(eq(productSizes.productId, product.id));
          console.log(`  - Eliminato productSizes per: ${product.slug}`);
          
          // Elimina productImages
          await db.delete(productImages).where(eq(productImages.productId, product.id));
          console.log(`  - Eliminato productImages per: ${product.slug}`);
          
          // Elimina il prodotto
          await db.delete(products).where(eq(products.id, product.id));
          console.log(`  - Eliminato prodotto: ${product.slug}`);
        }
        
        // Elimina il gruppo
        await db.delete(productGroups).where(eq(productGroups.id, group.id));
        console.log(`✅ Eliminato gruppo: ${group.slug}`);
      }
    }

    // Verifica finale
    console.log('\n🔍 Verifica finale...');
    const remainingGroups = await db.select().from(productGroups);
    const batch9Groups = remainingGroups.filter(g => 
      ['total-energy', 'hard-start', 'glutamine-pure', 'high-pro-release'].some(pattern => g.slug.includes(pattern))
    );
    
    if (batch9Groups.length === 0) {
      console.log('✅ Nessun gruppo Batch 9 rimanente - pulizia completata!');
    } else {
      console.log('⚠️ Gruppi rimanenti:', batch9Groups.map(g => g.slug));
    }
    
  } catch (error) {
    console.error('💥 Errore durante la pulizia:', error);
    throw error;
  }
}

cleanupPartialBatch9()
  .then(() => {
    console.log("🎉 Pulizia Batch 9 parziale completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });