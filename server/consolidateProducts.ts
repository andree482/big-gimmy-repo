import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { products, productOptions, productImages, productSizes, productAvailability } from "@shared/schema";

// Lista completa dei 31 gruppi di prodotti duplicati da consolidare
const DUPLICATE_GROUPS = [
  // Gruppo 1 - Mass Matrix
  { keepId: 1266, consolidateIds: [1274] },
  
  // Gruppo 2 - Amino Pool BV104
  { keepId: 1439, consolidateIds: [1440] },
  
  // Gruppo 3 - BCAA 2:1:1 Proram
  { keepId: 1202, consolidateIds: [1203, 1204] },
  
  // Gruppo 4 - BCAA 8:1:1 Peptide
  { keepId: 1207, consolidateIds: [1208] },
  
  // Gruppo 5 - BCAA Sport 4:1:1
  { keepId: 1209, consolidateIds: [1210] },
  
  // Gruppo 6 - Borraccia 600/800 ml
  { keepId: 1522, consolidateIds: [1523] },
  
  // Gruppo 7 - Creatina Micronizzata 100%
  { keepId: 1213, consolidateIds: [1214] },
  
  // Gruppo 8 - Creatina Tabs Monoidrata
  { keepId: 1215, consolidateIds: [1216] },
  
  // Gruppo 9 - EGG Protein
  { keepId: 1260, consolidateIds: [1259] },
  
  // Gruppo 10 - Fish Oil
  { keepId: 1262, consolidateIds: [1261] },
  
  // Gruppo 11 - Glutamine Pure 100%
  { keepId: 1531, consolidateIds: [1532] },
  
  // Gruppo 12 - Glutamine Pure 1000
  { keepId: 1517, consolidateIds: [1518] },
  
  // Gruppo 13 - Glutamine Pure di WHY Sport
  { keepId: 1263, consolidateIds: [1264, 1265] },
  
  // Gruppo 14 - Glutammina Peptide
  { keepId: 1219, consolidateIds: [1220] },
  
  // Gruppo 15 - Hard WPH BV104
  { keepId: 1392, consolidateIds: [1393] },
  
  // Gruppo 16 - High Pro Release
  { keepId: 1519, consolidateIds: [1520, 1521] },
  
  // Gruppo 17 - Isowhey Pro-Zyme
  { keepId: 1370, consolidateIds: [1371, 1372, 1373, 1374, 1378, 1381, 1379, 1377, 1380, 1369, 1367, 1368] },
  
  // Gruppo 18 - Mass Matrix (duplicato del gruppo 1)
  { keepId: 1266, consolidateIds: [1274, 1275, 1276] },
  
  // Gruppo 19 - Massive Gain XXL
  { keepId: 1382, consolidateIds: [1383] },
  
  // Gruppo 20 - Omega 3 Super
  { keepId: 1240, consolidateIds: [1241] },
  
  // Gruppo 21 - Power Whey Amino Support
  { keepId: 1140, consolidateIds: [1141, 1142, 1143, 1144, 1145] },
  
  // Gruppo 22 - Prime Casein
  { keepId: 1148, consolidateIds: [1149] },
  
  // Gruppo 23 - Prime Oat
  { keepId: 1150, consolidateIds: [1151, 1152, 1153] },
  
  // Gruppo 24 - Prime WPI
  { keepId: 1157, consolidateIds: [1158] },
  
  // Gruppo 25 - Prime Whey Hydro Plus
  { keepId: 1154, consolidateIds: [1155, 1156] },
  
  // Gruppo 26 - Pure Soy Isolate
  { keepId: 1159, consolidateIds: [1160] },
  
  // Gruppo 27 - RAM 1000 BCAA
  { keepId: 1161, consolidateIds: [1162, 1163, 1164] },
  
  // Gruppo 28 - Super Hydro Tabs
  { keepId: 1535, consolidateIds: [1536] },
  
  // Gruppo 29 - T-Shirt EthicSport Limited Edition
  { keepId: 1525, consolidateIds: [1526, 1527, 1528] },
  
  // Gruppo 30 - Total Protein Blend
  { keepId: 1167, consolidateIds: [1168, 1169] },
  
  // Gruppo 31 - Vitamin C 1000 mg
  { keepId: 1171, consolidateIds: [1172] },
  
  // Gruppo 32 - Whey Iso
  { keepId: 1176, consolidateIds: [1175, 1177, 1178, 1179, 1180, 1181, 1182] },
];

async function consolidateProductGroup(keepId: number, consolidateIds: number[]) {
  console.log(`\n🔄 Consolidando gruppo: mantieni ID ${keepId}, consolida IDs [${consolidateIds.join(', ')}]`);
  
  try {
    // 1. Ottieni info del prodotto principale
    const [mainProduct] = await db.select().from(products).where(eq(products.id, keepId));
    if (!mainProduct) {
      console.log(`❌ Prodotto principale ID ${keepId} non trovato`);
      return;
    }
    
    console.log(`📦 Prodotto principale: ${mainProduct.name}`);
    
    // 2. Per ogni prodotto da consolidare
    for (const consolidateId of consolidateIds) {
      const [productToConsolidate] = await db.select().from(products).where(eq(products.id, consolidateId));
      if (!productToConsolidate) {
        console.log(`⚠️  Prodotto da consolidare ID ${consolidateId} non trovato`);
        continue;
      }
      
      console.log(`🔗 Consolidando: ${productToConsolidate.name}`);
      
      // 3. Ottieni il prezzo dal productSizes se esiste
      const [productSize] = await db.select().from(productSizes).where(eq(productSizes.productId, consolidateId));
      const priceCents = productSize?.price || 0;
      
      // 4. Ottieni l'immagine principale se esiste
      const [primaryImage] = await db.select().from(productImages)
        .where(sql`${productImages.productId} = ${consolidateId} AND ${productImages.isPrimary} = true`);
      
      // 5. Crea productOption per il prodotto principale
      const optionData = {
        productId: keepId,
        flavor: productToConsolidate.flavor || null,
        size: productToConsolidate.size || productToConsolidate.quantity || null,
        priceCents: priceCents,
        originalPriceCents: null,
        image: primaryImage?.src || null,
        inStock: true,
      };
      
      await db.insert(productOptions).values(optionData);
      console.log(`✅ Creata option: ${optionData.flavor || 'N/A'} ${optionData.size || 'N/A'} - €${(priceCents / 100).toFixed(2)}`);
      
      // 6. Trasferisci le immagini al prodotto principale se non esistono già
      const existingImages = await db.select().from(productImages).where(eq(productImages.productId, keepId));
      const imagesToTransfer = await db.select().from(productImages).where(eq(productImages.productId, consolidateId));
      
      for (const image of imagesToTransfer) {
        const imageExists = existingImages.some(ei => ei.src === image.src);
        if (!imageExists) {
          await db.insert(productImages).values({
            productId: keepId,
            src: image.src,
            alt: image.alt,
            isPrimary: false, // Solo il prodotto principale mantiene l'immagine primaria
          });
          console.log(`📷 Trasferita immagine: ${image.src}`);
        }
      }
      
      // 7. Elimina le relazioni del prodotto da consolidare
      await db.delete(productImages).where(eq(productImages.productId, consolidateId));
      await db.delete(productSizes).where(eq(productSizes.productId, consolidateId));
      await db.delete(productAvailability).where(eq(productAvailability.productId, consolidateId));
      await db.delete(productOptions).where(eq(productOptions.productId, consolidateId));
      
      // 8. Elimina il prodotto duplicato
      await db.delete(products).where(eq(products.id, consolidateId));
      console.log(`🗑️  Eliminato prodotto duplicato ID ${consolidateId}`);
    }
    
    console.log(`✅ Gruppo consolidato con successo!`);
    
  } catch (error) {
    console.error(`❌ Errore durante consolidamento gruppo ${keepId}:`, error);
  }
}

export async function consolidateAllProducts() {
  console.log(`🚀 Inizio consolidamento di ${DUPLICATE_GROUPS.length} gruppi di prodotti duplicati`);
  
  // Conta prodotti iniziali
  const [{ count: initialCount }] = await db.select({ count: sql`count(*)` }).from(products);
  console.log(`📊 Prodotti iniziali: ${initialCount}`);
  
  let totalConsolidated = 0;
  
  // Deduplicazione gruppi (alcuni ID compaiono in più gruppi)
  const uniqueGroups = new Map<number, number[]>();
  
  for (const group of DUPLICATE_GROUPS) {
    if (uniqueGroups.has(group.keepId)) {
      // Unisci gli ID da consolidare
      const existing = uniqueGroups.get(group.keepId) || [];
      const combined = Array.from(new Set([...existing, ...group.consolidateIds]));
      uniqueGroups.set(group.keepId, combined);
    } else {
      uniqueGroups.set(group.keepId, group.consolidateIds);
    }
  }
  
  console.log(`📋 Gruppi unici da processare: ${uniqueGroups.size}`);
  
  // Processa ogni gruppo unico
  for (const [keepId, consolidateIds] of Array.from(uniqueGroups.entries())) {
    await consolidateProductGroup(keepId, consolidateIds);
    totalConsolidated += consolidateIds.length;
  }
  
  // Conta prodotti finali
  const [{ count: finalCount }] = await db.select({ count: sql<number>`count(*)` }).from(products);
  console.log(`\n📊 RISULTATI FINALI:`);
  console.log(`📦 Prodotti iniziali: ${initialCount}`);
  console.log(`📦 Prodotti finali: ${finalCount}`);
  console.log(`🗑️  Prodotti consolidati: ${totalConsolidated}`);
  console.log(`🎯 Obiettivo raggiunto: ${finalCount <= 226 ? '✅' : '❌'} (target: 226)`);
}

// Eseguire solo se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  consolidateAllProducts()
    .then(() => {
      console.log(`✅ Consolidamento completato!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ Errore durante consolidamento:`, error);
      process.exit(1);
    });
}