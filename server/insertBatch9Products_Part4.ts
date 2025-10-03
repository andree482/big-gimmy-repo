import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9ProductsPart4() {
  console.log("🚀 Avvio inserimento Batch 9 - Parte 4 (prodotti 10-12)...");

  try {
    // Ottenere i brand ID necessari
    const premierBrand = await db.select().from(brands).where(eq(brands.name, 'Premier'));
    const premierBrandId = premierBrand[0].id;

    // Ottenere le categorie necessarie
    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));

    // ===================
    // PRODOTTO 10: Hard Leucine Booster 4:1:1
    // ===================
    console.log("10. Inserendo Hard Leucine Booster 4:1:1...");
    
    const hardLeucineFeatures = [{
      "titolo": "Aminoacidi Ramificati BCAA 4:1:1",
      "valori_nutrizionali": {
        "per_porzione_6_compresse": {
          "l_leucina": "2 g",
          "l_isoleucina": "0,5 g",
          "l_valina": "0,5 g",
          "vitamina_b6": "1,4 mg (100% VNR)"
        }
      },
      "ingredienti": "L-Leucina, agente di carica: cellulosa microcristallina; L-Isoleucina, L-Valina, agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; Piridossina cloridrato (Vitamina B6).",
      "nota": "VNR = Valori nutrizionali di riferimento"
    }];

    const [hardLeucineGroup] = await db.insert(productGroups).values({
      slug: "hard-leucine-booster-4-1-1",
      name: "Hard Leucine Booster 4:1:1",
      description: "HARD LEUCINE BOOSTER 4:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 4:1:1 con prevalenza di L-Leucina, arricchito con Vitamina B6.",
      longDescription: "HARD LEUCINE BOOSTER 4:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 4:1:1 con prevalenza di L-Leucina, arricchito con Vitamina B6. La L-Leucina è l'aminoacido ramificato più importante per la sintesi proteica muscolare. La Vitamina B6 contribuisce al normale metabolismo delle proteine e del glicogeno.",
      features: hardLeucineFeatures,
      howToUse: "Assumere 6 compresse al giorno con acqua, preferibilmente prima e dopo l'allenamento.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 120 compresse
    const [hardLeucineProduct1] = await db.insert(products).values({
      slug: "hard-leucine-booster-4-1-1-120-compresse",
      name: "Hard Leucine Booster 4:1:1 120 compresse",
      groupId: hardLeucineGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "HARD LEUCINE BOOSTER 4:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 4:1:1 con prevalenza di L-Leucina.",
      flavor: "Unico",
      size: "120 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardLeucineProduct1.id,
      value: "120",
      unit: "compresse",
      price: 2590 // 25,90€
    });

    await db.insert(productImages).values({
      productId: hardLeucineProduct1.id,
      src: "HARD-LEUCINE-BOOSTER-4-1-1-SITO.png",
      alt: "Hard Leucine Booster 4:1:1 120 compresse",
      isPrimary: true
    });

    // Variante 2: 240 compresse
    const [hardLeucineProduct2] = await db.insert(products).values({
      slug: "hard-leucine-booster-4-1-1-240-compresse",
      name: "Hard Leucine Booster 4:1:1 240 compresse",
      groupId: hardLeucineGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "HARD LEUCINE BOOSTER 4:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 4:1:1 con prevalenza di L-Leucina.",
      flavor: "Unico",
      size: "240 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardLeucineProduct2.id,
      value: "240",
      unit: "compresse",
      price: 4190 // 41,90€
    });

    await db.insert(productImages).values({
      productId: hardLeucineProduct2.id,
      src: "HARD-LEUCINE-BOOSTER-4-1-1-SITO.png",
      alt: "Hard Leucine Booster 4:1:1 240 compresse",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 11: Hard BCAA Advanced 8:1:1
    // ===================
    console.log("11. Inserendo Hard BCAA Advanced 8:1:1...");
    
    const hardBcaaFeatures = [{
      "titolo": "Aminoacidi Ramificati BCAA 8:1:1",
      "valori_nutrizionali": {
        "per_porzione_6_compresse": {
          "l_leucina": "2,4 g",
          "l_isoleucina": "0,3 g",
          "l_valina": "0,3 g",
          "vitamina_b6": "1,4 mg (100% VNR)"
        }
      },
      "ingredienti": "L-Leucina, agente di carica: cellulosa microcristallina; L-Isoleucina, L-Valina, agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; Piridossina cloridrato (Vitamina B6).",
      "nota": "VNR = Valori nutrizionali di riferimento"
    }];

    const [hardBcaaGroup] = await db.insert(productGroups).values({
      slug: "hard-bcaa-advanced-8-1-1",
      name: "Hard BCAA Advanced 8:1:1",
      description: "HARD BCAA ADVANCED 8:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 8:1:1 con alta concentrazione di L-Leucina, arricchito con Vitamina B6.",
      longDescription: "HARD BCAA ADVANCED 8:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 8:1:1 con alta concentrazione di L-Leucina, arricchito con Vitamina B6. Questo rapporto innovativo massimizza l'apporto di L-Leucina, l'aminoacido chiave per attivare la sintesi proteica muscolare. La Vitamina B6 supporta il metabolismo delle proteine.",
      features: hardBcaaFeatures,
      howToUse: "Assumere 6 compresse al giorno con acqua, preferibilmente prima e dopo l'allenamento.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 120 compresse
    const [hardBcaaProduct1] = await db.insert(products).values({
      slug: "hard-bcaa-advanced-8-1-1-120-compresse",
      name: "Hard BCAA Advanced 8:1:1 120 compresse",
      groupId: hardBcaaGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "HARD BCAA ADVANCED 8:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 8:1:1 con alta concentrazione di L-Leucina.",
      flavor: "Unico",
      size: "120 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardBcaaProduct1.id,
      value: "120",
      unit: "compresse",
      price: 2990 // 29,90€
    });

    await db.insert(productImages).values({
      productId: hardBcaaProduct1.id,
      src: "HARD-BCAA-ADVANCED-8-1-1-SITO.png",
      alt: "Hard BCAA Advanced 8:1:1 120 compresse",
      isPrimary: true
    });

    // Variante 2: 240 compresse
    const [hardBcaaProduct2] = await db.insert(products).values({
      slug: "hard-bcaa-advanced-8-1-1-240-compresse",
      name: "Hard BCAA Advanced 8:1:1 240 compresse",
      groupId: hardBcaaGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "HARD BCAA ADVANCED 8:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) nel rapporto 8:1:1 con alta concentrazione di L-Leucina.",
      flavor: "Unico",
      size: "240 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardBcaaProduct2.id,
      value: "240",
      unit: "compresse",
      price: 4990 // 49,90€
    });

    await db.insert(productImages).values({
      productId: hardBcaaProduct2.id,
      src: "HARD-BCAA-ADVANCED-8-1-1-SITO.png",
      alt: "Hard BCAA Advanced 8:1:1 240 compresse",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 12: BCAA Powder 2:1:1
    // ===================
    console.log("12. Inserendo BCAA Powder 2:1:1...");
    
    const bcaaPowderFeatures = [{
      "titolo": "Aminoacidi Ramificati BCAA 2:1:1 in Polvere",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1632 kj / 384 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "0 g",
          "di_cui_zuccheri": "0 g",
          "proteine": "96 g",
          "sale": "0 g",
          "l_leucina": "48 g",
          "l_isoleucina": "24 g",
          "l_valina": "24 g"
        },
        "per_dose_10g": {
          "valore_energetico": "163 kj / 38 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "0 g",
          "di_cui_zuccheri": "0 g",
          "proteine": "9,6 g",
          "sale": "0 g",
          "l_leucina": "4,8 g",
          "l_isoleucina": "2,4 g",
          "l_valina": "2,4 g"
        }
      },
      "ingredienti": "L-Leucina, L-Isoleucina, L-Valina, Aromi, Acidificante: acido citrico; Edulcoranti: Acesulfame K, Sucralosio; Colorante: betacarotene."
    }];

    const [bcaaPowderGroup] = await db.insert(productGroups).values({
      slug: "bcaa-powder-2-1-1",
      name: "BCAA Powder 2:1:1",
      description: "BCAA POWDER 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in polvere nel rapporto 2:1:1, al gusto arancia.",
      longDescription: "BCAA POWDER 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in polvere nel rapporto 2:1:1. Gli aminoacidi ramificati sono componenti essenziali delle proteine muscolari e vengono utilizzati come fonte energetica durante l'attività fisica intensa. La forma in polvere garantisce un assorbimento rapido e una maggiore praticità d'uso.",
      features: bcaaPowderFeatures,
      howToUse: "Assumere 10 g di prodotto (1 misurino) in 250 ml d'acqua, preferibilmente prima e dopo l'allenamento. All'interno della confezione è disponibile un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 300g
    const [bcaaPowderProduct1] = await db.insert(products).values({
      slug: "bcaa-powder-2-1-1-arancia-300g",
      name: "BCAA Powder 2:1:1 Arancia 300g",
      groupId: bcaaPowderGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "BCAA POWDER 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in polvere nel rapporto 2:1:1, al gusto arancia.",
      flavor: "Arancia",
      size: "300g",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: bcaaPowderProduct1.id,
      value: "300",
      unit: "g",
      price: 2590 // 25,90€
    });

    await db.insert(productImages).values({
      productId: bcaaPowderProduct1.id,
      src: "BCAA-POWDER-2-1-1-SITO.png",
      alt: "BCAA Powder 2:1:1 Arancia 300g",
      isPrimary: true
    });

    // Variante 2: 500g
    const [bcaaPowderProduct2] = await db.insert(products).values({
      slug: "bcaa-powder-2-1-1-arancia-500g",
      name: "BCAA Powder 2:1:1 Arancia 500g",
      groupId: bcaaPowderGroup.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "BCAA POWDER 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in polvere nel rapporto 2:1:1, al gusto arancia.",
      flavor: "Arancia",
      size: "500g",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: bcaaPowderProduct2.id,
      value: "500",
      unit: "g",
      price: 3990 // 39,90€
    });

    await db.insert(productImages).values({
      productId: bcaaPowderProduct2.id,
      src: "BCAA-POWDER-2-1-1-SITO.png",
      alt: "BCAA Powder 2:1:1 Arancia 500g",
      isPrimary: true
    });

    console.log("✅ Completata l'inserimento dei prodotti 10-12!");

  } catch (error) {
    console.error("💥 Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9ProductsPart4()
  .then(() => {
    console.log("🎉 Quarta parte inserimento Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });