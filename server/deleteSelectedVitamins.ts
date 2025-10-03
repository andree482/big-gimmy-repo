
import { db } from "./db.js";
import { products, productImages } from "../shared/schema.js";
import { eq, and, not, or } from "drizzle-orm";

async function deleteSelectedVitamins() {
  console.log('🗑️ Eliminazione prodotti vitamine tranne Korean Red Ginseng ed Echinacea...');
  
  try {
    // Trova tutti i prodotti nella categoria vitamine e minerali (ID 7)
    const vitamineProducts = await db.query.products.findMany({
      where: (products, { eq }) => eq(products.categoryId, 7),
      with: {
        images: true
      }
    });
    
    console.log(`📋 Trovati ${vitamineProducts.length} prodotti nella categoria vitamine`);
    
    let deletedCount = 0;
    let keptCount = 0;
    
    for (const product of vitamineProducts) {
      // Mantieni solo Korean Red Ginseng ed Echinacea Purpurea
      if (product.slug === 'korean-red-ginseng' || 
          product.slug === 'echinacea-purpurea' ||
          product.name.toLowerCase().includes('korean red ginseng') ||
          product.name.toLowerCase().includes('echinacea purpurea')) {
        
        console.log(`✅ Mantenuto: ${product.name}`);
        keptCount++;
        continue;
      }
      
      // Elimina prima le immagini
      if (product.images && product.images.length > 0) {
        await db.delete(productImages).where(eq(productImages.productId, product.id));
        console.log(`🖼️ Eliminate ${product.images.length} immagini per: ${product.name}`);
      }
      
      // Poi elimina il prodotto
      await db.delete(products).where(eq(products.id, product.id));
      console.log(`🗑️ Eliminato: ${product.name}`);
      deletedCount++;
    }
    
    // Cerca anche prodotti con keywords vitamine che non sono nella categoria corretta
    const vitaminKeywords = ['vitamina', 'minerali', 'magnesio', 'calcio', 'ferro', 'zinco', 'omega', 'sali+', 'electrolyte', 'antiradical', 'ashwagandha', 'astaxantina', 'berberina', 'bromelina', 'collagene', 'ribosio', 'depur', 'comfort vision'];
    
    for (const keyword of vitaminKeywords) {
      const keywordProducts = await db.query.products.findMany({
        where: (products, { like, or, not }) => and(
          or(
            like(products.name, `%${keyword}%`),
            like(products.description, `%${keyword}%`)
          ),
          not(products.name.toLowerCase().includes('korean red ginseng')),
          not(products.name.toLowerCase().includes('echinacea purpurea'))
        ),
        with: {
          images: true
        }
      });
      
      for (const product of keywordProducts) {
        // Elimina prima le immagini
        if (product.images && product.images.length > 0) {
          await db.delete(productImages).where(eq(productImages.productId, product.id));
        }
        
        // Poi elimina il prodotto
        await db.delete(products).where(eq(products.id, product.id));
        console.log(`🗑️ Eliminato prodotto con keyword '${keyword}': ${product.name}`);
        deletedCount++;
      }
    }
    
    console.log('\n🎉 Pulizia completata!');
    console.log(`✅ Prodotti mantenuti: ${keptCount} (Korean Red Ginseng, Echinacea Purpurea)`);
    console.log(`🗑️ Prodotti eliminati: ${deletedCount}`);
    console.log('📋 Rimangono solo Korean Red Ginseng ed Echinacea Purpurea nella categoria vitamine');
    
  } catch (error) {
    console.error('❌ Errore durante eliminazione:', error);
  }
  
  process.exit(0);
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  deleteSelectedVitamins();
}

export { deleteSelectedVitamins };
