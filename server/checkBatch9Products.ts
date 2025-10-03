import { db } from './db.js';
import { productGroups, products } from '../shared/schema.js';
import { like, or } from 'drizzle-orm';

async function checkBatch9Products() {
  console.log("🔍 Verificando prodotti Batch 9 esistenti...");

  try {
    // Slug pattern per Batch 9
    const batch9Patterns = [
      'total-energy',
      'hard-start',
      'glutamine-pure', 
      'high-pro-release',
      'maltodex-pure',
      'dietary-bar',
      'hard-nitrox',
      'whey-100-pro-zyme',
      'hard-leucine',
      'hard-bcaa-advanced',
      'bcaa-powder',
      'ramtech-bcaa',
      'omnia-active',
      'super-hydro',
      'pre-gara-endurance',
      'borraccia',
      'sacca',
      't-shirt',
      'cappellino'
    ];

    console.log("\n📦 ProductGroups Batch 9 esistenti:");
    const allGroups = await db.select().from(productGroups);
    const batch9Groups = allGroups.filter(g => 
      batch9Patterns.some(pattern => g.slug.includes(pattern))
    );
    
    batch9Groups.forEach(group => {
      console.log(`  - ${group.slug} (ID: ${group.id})`);
    });

    console.log("\n📋 Products Batch 9 esistenti:");
    const allProducts = await db.select().from(products);
    const batch9Products = allProducts.filter(p => 
      batch9Patterns.some(pattern => p.slug.includes(pattern))
    );
    
    batch9Products.forEach(product => {
      console.log(`  - ${product.slug} (ID: ${product.id}, GroupID: ${product.groupId})`);
    });

    console.log(`\n📊 Riepilogo:`);
    console.log(`  - ProductGroups trovati: ${batch9Groups.length}`);
    console.log(`  - Products trovati: ${batch9Products.length}`);

  } catch (error) {
    console.error("💥 Errore durante la verifica:", error);
    throw error;
  }
}

checkBatch9Products()
  .then(() => {
    console.log("✅ Verifica completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });