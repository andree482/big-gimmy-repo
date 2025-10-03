import { db } from './db.js';
import { productGroups, products, productSizes } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function verifyBatch9Data() {
  console.log('🔍 VERIFICANDO DATI BATCH 9 NEL DATABASE...');
  
  try {
    // Controllo Total Energy
    const totalEnergyGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'total-energy'));
    if (totalEnergyGroup.length > 0) {
      console.log('\n📦 TOTAL ENERGY:');
      console.log('  ✅ Group trovato:', totalEnergyGroup[0].name);
      console.log('  📝 Description:', totalEnergyGroup[0].description);
      
      const products = await db.select().from(products).where(eq(products.groupId, totalEnergyGroup[0].id));
      console.log('  🔗 Products:', products.length);
      for (const product of products) {
        const sizes = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        console.log(`    - ${product.name} | Prezzo: €${(sizes[0]?.price || 0) / 100}`);
      }
    }
    
    // ⚠️ PROBLEMA: Controllo Hard Start X-Plode
    console.log('\n🚨 VERIFICA HARD START X-PLODE:');
    const hardStartCorrect = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-staart-x-plode'));
    const hardStartWrong = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-start-x-plode'));
    
    console.log('  🔍 Slug corretto (hard-staart-x-plode):', hardStartCorrect.length > 0 ? '✅ TROVATO' : '❌ MANCANTE');
    console.log('  🔍 Slug sbagliato (hard-start-x-plode):', hardStartWrong.length > 0 ? '⚠️ TROVATO (ERRORE!)' : '✅ NON PRESENTE');
    
    if (hardStartWrong.length > 0) {
      console.log('  🚨 ERRORE CRITICO: Usato slug sbagliato per Hard Start X-Plode!');
      console.log('     📄 File .md dice: "hard-staart-x-plode" (con due A)');
      console.log('     💾 Database ha: "hard-start-x-plode" (con una A)');
    }
    
    // Controllo Glutamine Pure 1000 (deve avere prezzo base 24,90€)
    const glutamineGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'glutamine-pure-1000'));
    if (glutamineGroup.length > 0) {
      console.log('\n💊 GLUTAMINE PURE 1000:');
      const products = await db.select().from(products).where(eq(products.groupId, glutamineGroup[0].id));
      
      const expectedPrices = {
        '150 compresse': 24.90,
        '300 compresse': 36.90
      };
      
      for (const product of products) {
        const sizes = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        const actualPrice = (sizes[0]?.price || 0) / 100;
        const size = product.size || '';
        const expectedPrice = expectedPrices[size as keyof typeof expectedPrices];
        
        console.log(`    - ${product.name}`);
        console.log(`      💰 Prezzo attuale: €${actualPrice}`);
        console.log(`      💰 Prezzo atteso: €${expectedPrice}`);
        console.log(`      ${actualPrice === expectedPrice ? '✅ CORRETTO' : '❌ SBAGLIATO'}`);
      }
    }
    
    // Controllo High Pro Release (deve avere prezzo base 58,50€)
    const highProGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'high-pro-release'));
    if (highProGroup.length > 0) {
      console.log('\n🥛 HIGH PRO RELEASE:');
      const products = await db.select().from(products).where(eq(products.groupId, highProGroup[0].id));
      
      for (const product of products) {
        const sizes = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        const actualPrice = (sizes[0]?.price || 0) / 100;
        
        console.log(`    - ${product.name}`);
        console.log(`      💰 Prezzo: €${actualPrice} (atteso: €58.50)`);
        console.log(`      ${actualPrice === 58.50 ? '✅ CORRETTO' : '❌ SBAGLIATO'}`);
      }
    }
    
    console.log('\n📊 RIEPILOGO ERRORI TROVATI:');
    if (hardStartWrong.length > 0) {
      console.log('  ❌ Hard Start X-Plode ha slug sbagliato');
    }
    
  } catch (error) {
    console.error('💥 Errore durante la verifica:', error);
    throw error;
  }
}

verifyBatch9Data()
  .then(() => {
    console.log("✅ Verifica dati Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });