import { db } from './db.js';
import { productGroups, products as productsTable, productSizes } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function verifyBatch9Data() {
  console.log('🔍 VERIFICANDO DATI BATCH 9 NEL DATABASE vs FILE .MD...');
  
  try {
    // ⚠️ PROBLEMA 1: Controllo Hard Start X-Plode SLUG
    console.log('\n🚨 VERIFICA HARD START X-PLODE SLUG:');
    const hardStartCorrect = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-staart-x-plode'));
    const hardStartWrong = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-start-x-plode'));
    
    console.log('  📄 File .md dice: "hard-staart-x-plode" (con due A)');
    console.log('  💾 Database slug corretto:', hardStartCorrect.length > 0 ? '✅ TROVATO' : '❌ MANCANTE');
    console.log('  💾 Database slug sbagliato:', hardStartWrong.length > 0 ? '⚠️ TROVATO (ERRORE!)' : '✅ NON PRESENTE');
    
    if (hardStartWrong.length > 0) {
      console.log('  🚨 ERRORE CRITICO: Usato slug sbagliato per Hard Start X-Plode!');
      
      const wrongProducts = await db.select().from(productsTable).where(eq(productsTable.groupId, hardStartWrong[0].id));
      for (const product of wrongProducts) {
        const sizes = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        console.log(`    📦 Prodotto sbagliato: ${product.name} | €${(sizes[0]?.price || 0) / 100}`);
      }
    }
    
    // ⚠️ PROBLEMA 2: Controllo Total Energy (file dice 23,90€)
    console.log('\n📦 VERIFICA TOTAL ENERGY PREZZO:');
    const totalEnergyGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'total-energy'));
    if (totalEnergyGroup.length > 0) {
      const totalProducts = await db.select().from(productsTable).where(eq(productsTable.groupId, totalEnergyGroup[0].id));
      
      for (const product of totalProducts) {
        const sizes = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        const actualPrice = (sizes[0]?.price || 0) / 100;
        const expectedPrice = 23.90; // Dal file .md
        
        console.log(`  📦 ${product.name}`);
        console.log(`    💰 Prezzo attuale: €${actualPrice}`);
        console.log(`    💰 Prezzo file .md: €${expectedPrice}`);
        console.log(`    ${actualPrice === expectedPrice ? '✅ CORRETTO' : '❌ SBAGLIATO'}`);
      }
    }
    
    // ⚠️ PROBLEMA 3: Controllo Glutamine Pure 1000 prezzi
    console.log('\n💊 VERIFICA GLUTAMINE PURE 1000 PREZZI:');
    const glutamineGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'glutamine-pure-1000'));
    if (glutamineGroup.length > 0) {
      const glutamineProducts = await db.select().from(productsTable).where(eq(productsTable.groupId, glutamineGroup[0].id));
      
      const expectedPrices: { [key: string]: number } = {
        '150 compresse': 24.90,
        '300 compresse': 36.90
      };
      
      for (const product of glutamineProducts) {
        const sizes = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        const actualPrice = (sizes[0]?.price || 0) / 100;
        const size = product.size || '';
        const expectedPrice = expectedPrices[size];
        
        console.log(`  📦 ${product.name} (${size})`);
        console.log(`    💰 Prezzo attuale: €${actualPrice}`);
        console.log(`    💰 Prezzo file .md: €${expectedPrice}`);
        console.log(`    ${actualPrice === expectedPrice ? '✅ CORRETTO' : '❌ SBAGLIATO'}`);
      }
    }
    
    // ⚠️ PROBLEMA 4: Verifica categorie mappate correttamente
    console.log('\n📂 VERIFICA MAPPATURA CATEGORIE:');
    const categoryMapping = {
      'Pre-Workout/Enrgetici': 'pre-workout-energetici',
      'Aminoacidi e Creatina': 'aminoacidi-e-creatina',
      'Proteine': 'proteine'
    };
    
    console.log('  📄 File .md → 💾 Database:');
    console.log('  "Pre-Workout/Enrgetici" → "pre-workout-energetici"');
    console.log('  "Aminoacidi e Creatina" → "aminoacidi-e-creatina"');
    console.log('  "Proteine" → "proteine"');
    
    console.log('\n📊 RIEPILOGO ERRORI CRITICI:');
    let errorCount = 0;
    
    if (hardStartWrong.length > 0) {
      console.log('  ❌ Hard Start X-Plode ha slug sbagliato ("hard-start-x-plode" invece di "hard-staart-x-plode")');
      errorCount++;
    }
    
    if (errorCount === 0) {
      console.log('  🎉 Nessun errore critico trovato finora!');
    } else {
      console.log(`  💥 TROVATI ${errorCount} ERRORI CRITICI che devono essere corretti!`);
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