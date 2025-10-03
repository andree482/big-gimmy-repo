import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9ProductsPart2() {
  console.log("🚀 Avvio inserimento Batch 9 - Parte 2 (prodotti 4-8)...");

  try {
    // Ottenere i brand ID necessari
    const premierBrand = await db.select().from(brands).where(eq(brands.name, 'Premier'));
    const ethicsportBrand = await db.select().from(brands).where(eq(brands.name, 'EthicSport'));
    
    const premierBrandId = premierBrand[0].id;
    const ethicsportBrandId = ethicsportBrand[0].id;

    // Ottenere le categorie necessarie
    const preWorkoutCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'pre-workout-energetici'));
    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const proteineCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'proteine'));
    const alimentiFitCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'alimenti-fit'));
    const supplementiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'supplementi'));

    // ===================
    // PRODOTTO 4: High Pro Release
    // ===================
    console.log("4. Inserendo High Pro Release...");
    
    const highProFeatures = [{
      "titolo": "Integratore Proteico con Enzimi",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "1661 kj / 391 kcal",
          "grassi": "2,5 g",
          "di_cui_saturi": "0,5 g",
          "carboidrati": "3 g",
          "di_cui_zuccheri": "1,9 g",
          "proteine": "87 g",
          "sale": "0,7 g",
          "vitamina_b1": "2,75 mg",
          "vitamina_b2": "3,5 mg",
          "vitamina_b6": "3,5 mg",
          "vitamina_b12": "4 mcg",
          "l_arginina": "1,5 g",
          "citrullina": "1 g",
          "miscela_di_enzimi_digezyme": "150 mg"
        },
        "per_dose_40g": {
          "valore_energetico": "664 kj / 156 kcal",
          "grassi": "1 g",
          "di_cui_saturi": "0,4 g",
          "carboidrati": "1,2 g",
          "di_cui_zuccheri": "0,8 g",
          "proteine": "35 g",
          "sale": "0,33 g",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)",
          "l_arginina": "0,6 g",
          "citrullina": "0,4 g",
          "miscela_di_enzimi_digezyme": {
            "alpha_amilasi": "17,7 mg",
            "proteasi": "9,3 mg",
            "lipasi": "240 mcg",
            "cellulasi": "4,3 mg"
          }
        }
      },
      "ingredienti": "Proteine del LATTE (caseinato di calcio, caseina micellare, sieroproteine concentrate ed isolate), proteine isolate del pisello, aromi, Emulsionante: lecitina di girasole; L-Arginina, Citrullina, DigeZyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais). Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (Piridossina cloridrato), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).",
      "nota": "VNR = Valori nutritivi di riferimento"
    }];

    const [highProGroup] = await db.insert(productGroups).values({
      slug: "high-pro-release",
      name: "High Pro Release",
      description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo.",
      longDescription: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo. HIGH PRO RELEASE fornisce una fonte proteica bilanciata di elevata qualità con un'eccellente solubilità.",
      features: highProFeatures,
      howToUse: "Assumere fino a 40 g di prodotto (4 misurini) in 250 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è presente un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: proteineCategory[0].id,
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    // Variante 1: Caffè Latte
    const [highProProduct1] = await db.insert(products).values({
      slug: "high-pro-release-caffe-latte-1kg",
      name: "High Pro Release Caffè Latte 1kg",
      groupId: highProGroup.id,
      brandId: premierBrandId,
      categoryId: proteineCategory[0].id,
      description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte e del pisello, arricchito con vitamine del gruppo B e enzimi digestivi.",
      flavor: "Caffè Latte",
      size: "1kg",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: highProProduct1.id,
      value: "1",
      unit: "kg",
      price: 5850 // 58,50€
    });

    await db.insert(productImages).values({
      productId: highProProduct1.id,
      src: "HIGH-PRO-RELEASE-SITO.png",
      alt: "High Pro Release Caffè Latte 1kg",
      isPrimary: true
    });

    // Variante 2: Crema Cioccolato
    const [highProProduct2] = await db.insert(products).values({
      slug: "high-pro-release-crema-cioccolato-1kg",
      name: "High Pro Release Crema Cioccolato 1kg",
      groupId: highProGroup.id,
      brandId: premierBrandId,
      categoryId: proteineCategory[0].id,
      description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte e del pisello, arricchito con vitamine del gruppo B e enzimi digestivi.",
      flavor: "Crema Cioccolato",
      size: "1kg",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: highProProduct2.id,
      value: "1",
      unit: "kg",
      price: 5850 // 58,50€
    });

    await db.insert(productImages).values({
      productId: highProProduct2.id,
      src: "HIGH-PRO-RELEASE-SITO.png",
      alt: "High Pro Release Crema Cioccolato 1kg",
      isPrimary: true
    });

    // Variante 3: Crema Vaniglia
    const [highProProduct3] = await db.insert(products).values({
      slug: "high-pro-release-crema-vaniglia-1kg",
      name: "High Pro Release Crema Vaniglia 1kg",
      groupId: highProGroup.id,
      brandId: premierBrandId,
      categoryId: proteineCategory[0].id,
      description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte e del pisello, arricchito con vitamine del gruppo B e enzimi digestivi.",
      flavor: "Crema Vaniglia",
      size: "1kg",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: highProProduct3.id,
      value: "1",
      unit: "kg",
      price: 5850 // 58,50€
    });

    await db.insert(productImages).values({
      productId: highProProduct3.id,
      src: "HIGH-PRO-RELEASE-SITO.png",
      alt: "High Pro Release Crema Vaniglia 1kg",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 5: Glutamine Pure 100%
    // ===================
    console.log("5. Inserendo Glutamine Pure 100%...");
    
    const glutamine100Features = [{
      "titolo": "L-Glutammina in Polvere",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1632 kj / 384 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "0 g",
          "di_cui_zuccheri": "0 g",
          "proteine": "96 g",
          "sale": "0 g",
          "l_glutammina": "96 g"
        },
        "per_dose_10g": {
          "valore_energetico": "163 kj / 38 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "0 g",
          "di_cui_zuccheri": "0 g",
          "proteine": "9,6 g",
          "sale": "0 g",
          "l_glutammina": "9,6 g"
        }
      },
      "ingredienti": "L-Glutammina (Kyowa®)."
    }];

    const [glutamine100Group] = await db.insert(productGroups).values({
      slug: "glutamine-pure-100",
      name: "Glutamine Pure 100%",
      description: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici.",
      longDescription: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento.",
      features: glutamine100Features,
      howToUse: "Assumere 10 g di prodotto (1 misurino) al giorno. All'interno della confezione è disponibile un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 200g
    const [glutamine100Product1] = await db.insert(products).values({
      slug: "glutamine-pure-100-200g",
      name: "Glutamine Pure 100% 200g",
      groupId: glutamine100Group.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere. La L-Glutammina è l'aminoacido più presente nel corpo umano.",
      flavor: "Unico",
      size: "200g",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: glutamine100Product1.id,
      value: "200",
      unit: "g",
      price: 2490 // 24,90€
    });

    await db.insert(productImages).values({
      productId: glutamine100Product1.id,
      src: "GLUTAMINE-PURE-100-SITO.png",
      alt: "Glutamine Pure 100% 200g",
      isPrimary: true
    });

    // Variante 2: 400g
    const [glutamine100Product2] = await db.insert(products).values({
      slug: "glutamine-pure-100-400g",
      name: "Glutamine Pure 100% 400g",
      groupId: glutamine100Group.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere. La L-Glutammina è l'aminoacido più presente nel corpo umano.",
      flavor: "Unico",
      size: "400g",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: glutamine100Product2.id,
      value: "400",
      unit: "g",
      price: 4290 // 42,90€
    });

    await db.insert(productImages).values({
      productId: glutamine100Product2.id,
      src: "GLUTAMINE-PURE-100-SITO.png",
      alt: "Glutamine Pure 100% 400g",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 6: Maltodex Pure 100%
    // ===================
    console.log("6. Inserendo Maltodex Pure 100%...");
    
    const maltodexFeatures = [{
      "titolo": "Maltodestrine",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1554 kj / 365 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "91 g",
          "di_cui_zuccheri": "6 g",
          "proteine": "0 g",
          "sale": "0 g"
        },
        "per_dose_60g": {
          "valore_energetico": "932 kj / 219 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "55 g",
          "di_cui_zuccheri": "4 g",
          "proteine": "0 g",
          "sale": "0 g"
        }
      },
      "ingredienti": "Maltodestrine (da mais)."
    }];

    const [maltodexGroup] = await db.insert(productGroups).values({
      slug: "maltodex-pure-100",
      name: "Maltodex Pure 100%",
      description: "MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais.",
      longDescription: "MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais. Le maltodestrine sono carboidrati complessi ottenuti attraverso l'idrolisi parziale dell'amido di mais. Sono caratterizzate da un assorbimento graduale e sono ideali per fornire energia durante l'attività fisica prolungata.",
      features: maltodexFeatures,
      howToUse: "Assumere fino a 60 g di prodotto (3 misurini) in 250 ml d'acqua al giorno. All'interno della confezione è disponibile un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: supplementiCategory[0].id,
      isNew: false
    }).returning();

    const [maltodexProduct] = await db.insert(products).values({
      slug: "maltodex-pure-100-1-1kg",
      name: "Maltodex Pure 100% 1,1kg",
      groupId: maltodexGroup.id,
      brandId: premierBrandId,
      categoryId: supplementiCategory[0].id,
      description: "MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais.",
      flavor: "Unico",
      size: "1,1kg",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: maltodexProduct.id,
      value: "1.1",
      unit: "kg",
      price: 1890 // 18,90€
    });

    await db.insert(productImages).values({
      productId: maltodexProduct.id,
      src: "MALTODEX-PURE-100-SITO.png",
      alt: "Maltodex Pure 100% 1,1kg",
      isPrimary: true
    });

    console.log("✅ Completata l'inserimento dei prodotti 4-6!");

  } catch (error) {
    console.error("💥 Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9ProductsPart2()
  .then(() => {
    console.log("🎉 Seconda parte inserimento Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });