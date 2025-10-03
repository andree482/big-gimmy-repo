
import { db } from "./db.ts";
import { products, productImages } from "../shared/schema.ts";
import { eq, or, like } from "drizzle-orm";

async function deleteAllVitamineProducts() {
  console.log('🗑️ Eliminazione di tutti i prodotti Vitamine e Minerali...');
  
  try {
    // Trova tutti i prodotti nella categoria vitamine e minerali (ID 3)
    const vitamineProducts = await db.query.products.findMany({
      where: (products, { eq }) => eq(products.categoryId, 3),
      with: {
        images: true
      }
    });
    
    console.log(`📋 Trovati ${vitamineProducts.length} prodotti da eliminare nella categoria vitamine`);
    
    for (const product of vitamineProducts) {
      // Elimina prima le immagini
      if (product.images && product.images.length > 0) {
        await db.delete(productImages).where(eq(productImages.productId, product.id));
        console.log(`🖼️ Eliminate ${product.images.length} immagini per: ${product.name}`);
      }
      
      // Poi elimina il prodotto
      await db.delete(products).where(eq(products.id, product.id));
      console.log(`✅ Eliminato prodotto: ${product.name}`);
    }
    
    // Trova anche prodotti per nome che potrebbero essere vitamine/minerali
    const vitaminKeywords = ['vitamina', 'minerali', 'magnesio', 'calcio', 'ferro', 'zinco', 'omega', 'jamieson', 'sali+', 'electrolyte'];
    
    for (const keyword of vitaminKeywords) {
      const keywordProducts = await db.query.products.findMany({
        where: (products, { like, or }) => or(
          like(products.name, `%${keyword}%`),
          like(products.description, `%${keyword}%`)
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
        console.log(`✅ Eliminato prodotto con keyword '${keyword}': ${product.name}`);
      }
    }
    
    console.log('🎉 Eliminazione completata! Tutti i prodotti vitamine sono stati rimossi.');
    
  } catch (error) {
    console.error('❌ Errore durante eliminazione:', error);
  }
  
  process.exit(0);
}

deleteAllVitamineProducts();
