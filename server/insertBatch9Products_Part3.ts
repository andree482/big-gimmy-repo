import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9ProductsPart3() {
  console.log("🚀 Avvio inserimento Batch 9 - Parte 3 (prodotti 7-9)...");

  try {
    // Ottenere i brand ID necessari
    const premierBrand = await db.select().from(brands).where(eq(brands.name, 'Premier'));
    const premierBrandId = premierBrand[0].id;

    // Ottenere le categorie necessarie
    const alimentiFitCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'alimenti-fit'));
    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const proteineCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'proteine'));

    // ===================
    // PRODOTTO 7: Dietary Bar
    // ===================
    console.log("7. Inserendo Dietary Bar (12 varianti)...");
    
    const dietaryBarFeatures = [{
      "titolo": "Barretta Proteica",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1534 kj / 361 kcal",
          "grassi": "10 g",
          "di_cui_saturi": "5,7 g",
          "carboidrati": "32 g",
          "di_cui_zuccheri": "22 g",
          "fibre": "10 g",
          "proteine": "35 g",
          "sale": "0,76 g"
        },
        "per_barretta_50g": {
          "valore_energetico": "767 kj / 181 kcal",
          "grassi": "5 g",
          "di_cui_saturi": "2,8 g",
          "carboidrati": "16 g",
          "di_cui_zuccheri": "11 g",
          "fibre": "5 g",
          "proteine": "17,5 g",
          "sale": "0,38 g"
        }
      },
      "ingredienti": "Proteine del latte, Sciroppo di glucosio, Cioccolato al latte (zucchero, burro di cacao, polvere di latte scremato, pasta di cacao, siero di latte in polvere, emulsionante lecitina di soia, aroma vanillina), Agente umidificante (glicerolo), Caseina, Fibre di avena, Olio di girasole, Aroma, Emulsionante (lecitina di soia), Dolcificante (sucralosio)."
    }];

    const [dietaryBarGroup] = await db.insert(productGroups).values({
      slug: "dietary-bar",
      name: "Dietary Bar",
      description: "DIETARY BAR è una barretta proteica con il 35% di proteine ad alto valore biologico derivanti dal latte. Ricca di fibre e disponibile in diversi gusti.",
      longDescription: "DIETARY BAR è una barretta proteica con il 35% di proteine ad alto valore biologico derivanti dal latte. È arricchita con fibre e caratterizzata da un ottimo sapore e una consistenza morbida. Ideale come spuntino proteico per gli sportivi e per chi segue un regime alimentare controllato.",
      features: dietaryBarFeatures,
      howToUse: "Consumare 1 barretta al giorno come spuntino.",
      brandId: premierBrandId,
      categoryId: alimentiFitCategory[0].id,
      isNew: false
    }).returning();

    // 12 varianti: 6 gusti x 2 formati (50g e Box 24 pezzi)
    const flavors = ['Nocciola', 'Yogurt Fragola', 'Frutti di Bosco', 'Cioccolato', 'Zabaione', 'Cocco'];
    const sizes = [
      { size: '50g', price: 290, unit: 'pz' }, // 2,90€
      { size: 'Box 24 pz', price: 6960, unit: 'box' } // 69,60€ (24 x 2,90€)
    ];

    for (const flavor of flavors) {
      for (const sizeInfo of sizes) {
        const slug = `dietary-bar-${flavor.toLowerCase().replace(/\s+/g, '-')}-${sizeInfo.size.toLowerCase().replace(/\s+/g, '-')}`;
        const name = `Dietary Bar ${flavor} ${sizeInfo.size}`;
        
        const [dietaryBarProduct] = await db.insert(products).values({
          slug: slug,
          name: name,
          groupId: dietaryBarGroup.id,
          brandId: premierBrandId,
          categoryId: alimentiFitCategory[0].id,
          description: `DIETARY BAR è una barretta proteica con il 35% di proteine ad alto valore biologico derivanti dal latte. Gusto ${flavor}.`,
          flavor: flavor,
          size: sizeInfo.size,
          isNew: false
        }).returning();

        await db.insert(productSizes).values({
          productId: dietaryBarProduct.id,
          value: sizeInfo.size.includes('Box') ? '24' : '50',
          unit: sizeInfo.unit,
          price: sizeInfo.price
        });

        await db.insert(productImages).values({
          productId: dietaryBarProduct.id,
          src: "DIETARY-BAR-SITO.png",
          alt: name,
          isPrimary: true
        });

        console.log(`  ✅ Inserito: ${name}`);
      }
    }

    // ===================
    // PRODOTTO 8: Hard Nitrox Xtreme
    // ===================
    console.log("8. Inserendo Hard Nitrox Xtreme...");
    
    const hardNitroxFeatures = [{
      "titolo": "Integratore Pre-Workout con Arginina e Citrullina",
      "valori_nutrizionali": {
        "per_porzione_6_compresse": {
          "l_arginina_alfa_chetoglutarato": "3 g",
          "citrullina_malato": "1,5 g",
          "vitamina_c": "240 mg (300% VNR)",
          "vitamina_e": "36 mg (300% VNR)",
          "vitamina_b6": "4,2 mg (300% VNR)",
          "vitamina_b12": "7,5 mcg (300% VNR)",
          "acido_folico": "600 mcg (300% VNR)"
        }
      },
      "ingredienti": "L-Arginina alfa-chetoglutarato, agente di carica: cellulosa microcristallina; Citrullina malato, Acido L-ascorbico (Vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; DL-alfa tocoferilacetato (Vitamina E), Piridossina cloridrato (Vitamina B6), Acido pteroilmonoglutammico (Acido folico), Cianocobalamina (Vitamina B12).",
      "nota": "VNR = Valori nutrizionali di riferimento"
    }];

    const [hardNitroxGroup] = await db.insert(productGroups).values({
      slug: "hard-nitrox-xtreme",
      name: "Hard Nitrox Xtreme",
      description: "HARD NITROX XTREME è un integratore alimentare a base di L-Arginina alfa-chetoglutarato, Citrullina malato e vitamine, formulato specificamente per gli sportivi.",
      longDescription: "HARD NITROX XTREME è un integratore alimentare a base di L-Arginina alfa-chetoglutarato, Citrullina malato e vitamine, formulato specificamente per gli sportivi. La L-Arginina e la Citrullina sono aminoacidi che supportano la produzione di ossido nitrico, importante per il flusso sanguigno durante l'allenamento.",
      features: hardNitroxFeatures,
      howToUse: "Assumere 6 compresse al giorno con acqua, preferibilmente 30-60 minuti prima dell'allenamento.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 90 compresse
    const [hardNitroxProduct1] = await db.insert(products).values({
      slug: "hard-nitrox-xtreme-90-compresse",
      name: "Hard Nitrox Xtreme 90 compresse",
      groupId: hardNitroxGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "HARD NITROX XTREME è un integratore alimentare a base di L-Arginina alfa-chetoglutarato, Citrullina malato e vitamine.",
      flavor: "Unico",
      size: "90 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardNitroxProduct1.id,
      value: "90",
      unit: "compresse",
      price: 2590 // 25,90€
    });

    await db.insert(productImages).values({
      productId: hardNitroxProduct1.id,
      src: "HARD-NITROX-XTREME-SITO.png",
      alt: "Hard Nitrox Xtreme 90 compresse",
      isPrimary: true
    });

    // Variante 2: 180 compresse
    const [hardNitroxProduct2] = await db.insert(products).values({
      slug: "hard-nitrox-xtreme-180-compresse",
      name: "Hard Nitrox Xtreme 180 compresse",
      groupId: hardNitroxGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "HARD NITROX XTREME è un integratore alimentare a base di L-Arginina alfa-chetoglutarato, Citrullina malato e vitamine.",
      flavor: "Unico",
      size: "180 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardNitroxProduct2.id,
      value: "180",
      unit: "compresse",
      price: 4190 // 41,90€
    });

    await db.insert(productImages).values({
      productId: hardNitroxProduct2.id,
      src: "HARD-NITROX-XTREME-SITO.png",
      alt: "Hard Nitrox Xtreme 180 compresse",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 9: Whey 100% Pro-Zyme
    // ===================
    console.log("9. Inserendo Whey 100% Pro-Zyme (9 varianti)...");
    
    const wheyProZymeFeatures = [{
      "titolo": "Proteine del Siero di Latte con Enzimi",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1640 kj / 386 kcal",
          "grassi": "1,5 g",
          "di_cui_saturi": "1 g",
          "carboidrati": "7 g",
          "di_cui_zuccheri": "5,5 g",
          "proteine": "82 g",
          "sale": "0,5 g",
          "miscela_enzimi_digezyme": "125 mg"
        },
        "per_dose_30g": {
          "valore_energetico": "492 kj / 116 kcal",
          "grassi": "0,45 g",
          "di_cui_saturi": "0,3 g",
          "carboidrati": "2,1 g",
          "di_cui_zuccheri": "1,65 g",
          "proteine": "24,6 g",
          "sale": "0,15 g",
          "miscela_enzimi_digezyme": "37,5 mg"
        }
      },
      "ingredienti": "Proteine del siero di latte concentrate, Aromi, Emulsionante: lecitina di girasole; DigeZyme® (miscela di enzimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma longibrachiatum, eccipiente: maltodestrine da mais), Edulcoranti: Acesulfame K, Sucralosio."
    }];

    const [wheyProZymeGroup] = await db.insert(productGroups).values({
      slug: "whey-100-pro-zyme",
      name: "Whey 100% Pro-Zyme",
      description: "WHEY 100% PRO-ZYME è un integratore alimentare di proteine del siero di latte concentrate con aggiunta di enzimi digestivi DigeZyme®.",
      longDescription: "WHEY 100% PRO-ZYME è un integratore alimentare di proteine del siero di latte concentrate con aggiunta di enzimi digestivi DigeZyme®. Le proteine del siero sono caratterizzate da un elevato valore biologico e da una rapida assimilazione. Gli enzimi DigeZyme® favoriscono la digestione e l'assorbimento delle proteine.",
      features: wheyProZymeFeatures,
      howToUse: "Assumere 30 g di prodotto (3 misurini) in 250 ml di acqua o latte scremato. All'interno della confezione è presente un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: proteineCategory[0].id,
      isNew: false
    }).returning();

    // 9 varianti: 3 gusti x 3 formati
    const wheyFlavors = ['Cioccolato Bianco', 'Cioccolato', 'Vaniglia'];
    const wheySizes = [
      { size: '900g', price: 4190 }, // 41,90€
      { size: '2kg', price: 8490 },   // 84,90€  
      { size: '3kg', price: 11990 }   // 119,90€
    ];

    for (const flavor of wheyFlavors) {
      for (const sizeInfo of wheySizes) {
        const slug = `whey-100-pro-zyme-${flavor.toLowerCase().replace(/\s+/g, '-')}-${sizeInfo.size}`;
        const name = `Whey 100% Pro-Zyme ${flavor} ${sizeInfo.size}`;
        
        const [wheyProduct] = await db.insert(products).values({
          slug: slug,
          name: name,
          groupId: wheyProZymeGroup.id,
          brandId: premierBrandId,
          categoryId: proteineCategory[0].id,
          description: `WHEY 100% PRO-ZYME è un integratore alimentare di proteine del siero di latte concentrate con enzimi digestivi. Gusto ${flavor}.`,
          flavor: flavor,
          size: sizeInfo.size,
          isNew: false
        }).returning();

        await db.insert(productSizes).values({
          productId: wheyProduct.id,
          value: sizeInfo.size.replace('kg', '').replace('g', ''),
          unit: sizeInfo.size.includes('kg') ? 'kg' : 'g',
          price: sizeInfo.price
        });

        await db.insert(productImages).values({
          productId: wheyProduct.id,
          src: "WHEY-100-PRO-ZYME-SITO.png",
          alt: name,
          isPrimary: true
        });

        console.log(`  ✅ Inserito: ${name}`);
      }
    }

    console.log("✅ Completata l'inserimento dei prodotti 7-9!");

  } catch (error) {
    console.error("💥 Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9ProductsPart3()
  .then(() => {
    console.log("🎉 Terza parte inserimento Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });