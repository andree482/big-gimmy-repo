import { db } from './db';
import { products, productSizes, productOptions, productImages } from '../shared/schema.js';
import { eq, and, isNotNull, count, gt } from 'drizzle-orm';

/**
 * Script per consolidare i 4 gruppi rimanenti con duplicati:
 * - Group 17: Prime Casein (3 prodotti)
 * - Group 37: BCAA 8:1:1 (2 prodotti) 
 * - Group 51: Mass Matrix (2 prodotti)
 * - Group 59: Isowhey Pro-Zyme (3 prodotti)
 */

interface GroupConsolidation {
  groupId: number;
  keepProductId: number; // ID del prodotto da mantenere
  consolidateIds: number[]; // ID dei prodotti da convertire in options
  groupName: string;
}

const GROUPS_TO_CONSOLIDATE: GroupConsolidation[] = [
  {
    groupId: 17,
    keepProductId: 1146, // Prime Casein (neutro)
    consolidateIds: [1147, 1148], // Altri Prime Casein
    groupName: 'Prime Casein'
  },
  {
    groupId: 37,
    keepProductId: 1205, // BCAA 8:1:1 150g
    consolidateIds: [1206], // BCAA 8:1:1 350g
    groupName: 'BCAA 8:1:1'
  },
  {
    groupId: 51,
    keepProductId: 1266, // Mass Matrix cioccolato 1.3kg
    consolidateIds: [1277], // Mass Matrix cookies cream 2.8kg
    groupName: 'Mass Matrix'
  },
  {
    groupId: 59,
    keepProductId: 1370, // Isowhey Cioccolato 450g
    consolidateIds: [1375, 1376], // Altri Isowhey variants
    groupName: 'Isowhey Pro-Zyme'
  }
];

async function consolidateRemainingGroups() {
  console.log('🔄 Avvio consolidamento dei 4 gruppi rimanenti...');
  
  for (const group of GROUPS_TO_CONSOLIDATE) {
    console.log(`\n📦 Consolidamento ${group.groupName} (Group ${group.groupId})`);
    
    // 1. Ottieni i prodotti da consolidare
    const productsToConsolidate = await db
      .select()
      .from(products)
      .where(eq(products.id, group.consolidateIds[0]));
    
    for (const productId of group.consolidateIds) {
      console.log(`   🔍 Elaborazione prodotto ID ${productId}...`);
      
      // Ottieni dettagli del prodotto da consolidare
      const [productToConsolidate] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));
      
      if (!productToConsolidate) {
        console.log(`   ⚠️  Prodotto ${productId} non trovato, skip`);
        continue;
      }
      
      // 2. Ottieni i prezzi dal prodotto da consolidare
      const existingSizes = await db
        .select()
        .from(productSizes)
        .where(eq(productSizes.productId, productId));
      
      // 3. Crea product_option per questo prodotto
      let optionPrice = 0; // Default
      if (existingSizes.length > 0) {
        optionPrice = existingSizes[0].price; // Usa il primo prezzo trovato
      }
      
      // Estrai variante dal nome/size del prodotto
      let flavor = null;
      let size = null;
      
      if (group.groupId === 17) { // Prime Casein
        if (productToConsolidate.name.includes('Vaniglia')) {
          flavor = 'Vaniglia';
        } else if (productToConsolidate.slug.includes('cocco')) {
          flavor = 'Cocco';
        } else {
          flavor = 'Neutro';
        }
      } else if (group.groupId === 37) { // BCAA
        if (productToConsolidate.slug.includes('150g')) {
          size = '150g';
          flavor = 'Arancia';
        } else if (productToConsolidate.slug.includes('350g')) {
          size = '350g';
          flavor = 'Arancia';
        }
      } else if (group.groupId === 51) { // Mass Matrix
        if (productToConsolidate.slug.includes('cioccolato')) {
          flavor = 'Cioccolato';
          size = '1.3kg';
        } else if (productToConsolidate.slug.includes('cookies')) {
          flavor = 'Cookies & Cream';
          size = '2.8kg';
        }
      } else if (group.groupId === 59) { // Isowhey
        if (productToConsolidate.name.includes('Cioccolato Bianco')) {
          flavor = 'Cioccolato Bianco';
          size = '2kg';
        } else if (productToConsolidate.name.includes('Crema Caffè')) {
          flavor = 'Crema Caffè';
          size = '450g';
        } else {
          flavor = 'Cioccolato';
          size = '450g';
        }
      }
      
      // Inserisci la product_option
      await db.insert(productOptions).values({
        productId: group.keepProductId,
        flavor,
        size,
        priceCents: optionPrice,
        inStock: true,
        image: null
      });
      
      console.log(`   ✅ Creata option: ${flavor} ${size} - ${optionPrice/100}€`);
      
      // 4. Elimina tutte le references prima di eliminare il prodotto
      // Elimina product_options esistenti che referenziano questo prodotto
      await db.delete(productOptions)
        .where(eq(productOptions.productId, productId));
      
      // Elimina product_images che referenziano questo prodotto
      await db.delete(productImages)
        .where(eq(productImages.productId, productId));
      
      // Elimina product_sizes che referenziano questo prodotto
      await db.delete(productSizes)
        .where(eq(productSizes.productId, productId));
      
      // 5. Ora elimina il prodotto consolidato (tutte le FK sono state pulite)
      await db.delete(products)
        .where(eq(products.id, productId));
      
      console.log(`   🗑️  Eliminato prodotto ${productId}`);
    }
    
    console.log(`✅ ${group.groupName} consolidato con successo!`);
  }
  
  // Verifica finale
  console.log('\n🔍 Verifica finale...');
  
  const [totalCount] = await db
    .select({ count: count() })
    .from(products);
  
  console.log(`📊 Prodotti totali dopo consolidamento: ${totalCount.count}`);
  
  // Controllo gruppi duplicati rimanenti
  const groupsWithDuplicates = await db
    .select({
      groupId: products.groupId,
      count: count()
    })
    .from(products)
    .where(isNotNull(products.groupId))
    .groupBy(products.groupId)
    .having(gt(count(), 1));
  
  if (groupsWithDuplicates.length > 0) {
    console.log(`⚠️  Ancora ${groupsWithDuplicates.length} gruppi con duplicati:`);
    for (const group of groupsWithDuplicates) {
      console.log(`   - Group ${group.groupId}: ${group.count} prodotti`);
    }
  } else {
    console.log('✅ Nessun gruppo duplicato rimanente!');
  }
  
  console.log('\n🎉 Consolidamento completato!');
}

// Esegui lo script se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  consolidateRemainingGroups()
    .then(() => {
      console.log('Script completato con successo');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Errore durante il consolidamento:', error);
      process.exit(1);
    });
}

export { consolidateRemainingGroups };