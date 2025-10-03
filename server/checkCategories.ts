import { db } from './db.js';
import { productCategories } from '../shared/schema.js';

async function checkCategories() {
  console.log('🔍 Verificando categorie disponibili...');
  
  try {
    const categories = await db.select().from(productCategories);
    console.log('\n📂 Categorie disponibili nel database:');
    categories.forEach(cat => {
      console.log(`  - slug: "${cat.slug}" | nome: "${cat.name}"`);
    });
    
    console.log(`\n📊 Totale categorie: ${categories.length}`);
    
  } catch (error) {
    console.error('💥 Errore durante la verifica:', error);
    throw error;
  }
}

checkCategories()
  .then(() => {
    console.log("✅ Verifica categorie completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });