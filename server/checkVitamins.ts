
import { db } from "./db.js";

async function checkVitamins() {
  const products = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.categoryId, 3)
  });
  
  console.log('Prodotti vitamine rimasti:', products.length);
  products.forEach(p => console.log('- ' + p.name));
  
  // Controlla anche per nome/descrizione
  const vitaminKeywords = ['vitamina', 'minerali', 'magnesio', 'calcio', 'ferro', 'zinco', 'omega'];
  
  for (const keyword of vitaminKeywords) {
    const keywordProducts = await db.query.products.findMany({
      where: (products, { like, or }) => or(
        like(products.name, `%${keyword}%`),
        like(products.description, `%${keyword}%`)
      )
    });
    
    if (keywordProducts.length > 0) {
      console.log(`\nProdotti con keyword '${keyword}': ${keywordProducts.length}`);
      keywordProducts.forEach(p => console.log('- ' + p.name));
    }
  }
  
  process.exit(0);
}

checkVitamins();
