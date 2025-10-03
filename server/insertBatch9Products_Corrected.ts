import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9Products() {
  console.log("🚀 Avvio inserimento corretto dei 20 prodotti del Batch 9...");

  try {
    // Ottenere i brand ID necessari
    const premierBrand = await db.select().from(brands).where(eq(brands.name, 'Premier'));
    const ethicsportBrand = await db.select().from(brands).where(eq(brands.name, 'EthicSport'));
    
    if (premierBrand.length === 0 || ethicsportBrand.length === 0) {
      throw new Error("Brand Premier o EthicSport non trovati!");
    }

    const premierBrandId = premierBrand[0].id;
    const ethicsportBrandId = ethicsportBrand[0].id;

    // Ottenere le categorie necessarie
    const preWorkoutCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'pre-workout-energetici'));
    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const proteineCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'proteine'));
    const alimentiFitCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'alimenti-fit'));
    const supplementiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'supplementi'));
    const accessoriCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'accessori'));

    // ===================
    // PRODOTTO 1: Total Energy
    // ===================
    console.log("1. Inserendo Total Energy...");
    
    const totalEnergyFeatures = [{
      "titolo": "Integratore Energetico e di Sali Minerali",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1554 kj / 365 kcal",
          "grassi": "0 g",
          "di_cui_acidi_grassi_saturi": "0 g",
          "carboidrati": "85 g",
          "di_cui_zuccheri": "46 g",
          "proteine": "0 g",
          "sale": "0 g",
          "calcio": "600 mg",
          "fosforo": "600 mg",
          "potassio": "900 mg",
          "magnesio": "225 mg",
          "vitamina_c": "40 mg",
          "vitamina_e": "6,75 mg",
          "vitamina_b6": "1,37 mg",
          "cromo": "60 mcg",
          "l_carnitina_l_tartrato": "250 mg"
        },
        "per_dose_40g": {
          "valore_energetico": "622 kj / 146 kcal",
          "grassi": "0 g",
          "di_cui_acidi_grassi_saturi": "0 g",
          "carboidrati": "34 g",
          "di_cui_zuccheri": "18,4 g",
          "proteine": "0 g",
          "sale": "0 g",
          "calcio": "240 mg (30% VNR)",
          "fosforo": "240 mg (34% VNR)",
          "potassio": "360 mg (18% VNR)",
          "magnesio": "90 mg (24% VNR)",
          "vitamina_c": "16 mg (20% VNR)",
          "vitamina_e": "2,7 mg (22,5% VNR)",
          "vitamina_b6": "0,55 mg (39% VNR)",
          "cromo": "24 mcg (60% VNR)",
          "l_carnitina_l_tartrato": "100 mg"
        }
      },
      "ingredienti": "Maltodestrine, Fruttosio, Acidificante: acido citrico (6.26%), Calcio fosfato, Potassio citrato, Aromi, Magnesio ossido, L-Carnitina-Tartrato, Coloranti (0.3%): succo di barbabietola disidratato, betacarotene; Acido l-ascorbico (Vitamina C), DL-alfa tocoferilacetato (Vitamina E), Piridossina cloridrato (Vitamina B6), Cromo picolinato.",
      "nota": "VNR = valori nutritivi di riferimento"
    }];

    const [totalEnergyGroup] = await db.insert(productGroups).values({
      slug: "total-energy",
      name: "Total Energy",
      description: "TOTAL ENERGY è un integratore in polvere a base di fruttosio e maltodestrine, minerali (potassio, magnesio, cromo, fosforo e calcio), vitamina C-E-B6 e L-Carnitina.",
      longDescription: "TOTAL ENERGY è un integratore energetico per sportivi in polvere a base di Fruttosio e Maltodestrine (zuccheri semplici a media catena), che permettono di ottenere energia immediata a lungo termine; è arricchito con L-Carnitina in grado di veicolare gli acidi grassi favorendo la produzione di energia per le cellule, preservando la massa magra e incrementando le prestazioni durante l'allenamento, vitamine (C, E, B6) e minerali (potassio, magnesio, cromo, fosforo e calcio), essenziali per il benessere complessivo del corpo.",
      features: totalEnergyFeatures,
      howToUse: "assumere 40 g di prodotto (2 misurini) in 250 ml d'acqua. All'interno della confezione è disponibile un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: preWorkoutCategory[0].id,
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    // Inserire la variante come product
    const [totalEnergyProduct] = await db.insert(products).values({
      slug: "total-energy-arancia-300g",
      name: "Total Energy Arancia 300g",
      groupId: totalEnergyGroup.id,
      brandId: premierBrandId,
      categoryId: preWorkoutCategory[0].id,
      description: "TOTAL ENERGY è un integratore in polvere a base di fruttosio e maltodestrine, minerali (potassio, magnesio, cromo, fosforo e calcio), vitamina C-E-B6 e L-Carnitina.",
      flavor: "Arancia",
      size: "300g",
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    // Inserire il prezzo nella tabella productSizes
    await db.insert(productSizes).values({
      productId: totalEnergyProduct.id,
      value: "300",
      unit: "g",
      price: 2390 // 23,90€ in centesimi
    });

    // Inserire l'immagine
    await db.insert(productImages).values({
      productId: totalEnergyProduct.id,
      src: "TOTAL-ENERGY-SITO.png",
      alt: "Total Energy Arancia 300g",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 2: Hard Start X-Plode  
    // ===================
    console.log("2. Inserendo Hard Start X-Plode...");
    
    const hardStartFeatures = [{
      "titolo": "Integratore Pre-Workout",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "1089,7 kj / 256,4 kcal",
          "grassi": "10 g",
          "di_cui_saturi": "10 g",
          "carboidrati": "40 g",
          "di_cui_zuccheri": "16 g",
          "proteine": "0 g",
          "sale": "500 mg",
          "beta_alanina": "13,33 g",
          "mct": "13,33 g",
          "l_arginina": "6,66 g",
          "citrullina": "4 g",
          "arginina_hcl": "3,33 g",
          "di_cui_arginina": "2,76 g",
          "creatina_monoidrato": "9,99 g",
          "di_cui_creatina": "8,79 g",
          "taurina": "3,33 g",
          "paulinia_cupana": "0,5 g",
          "di_cui_caffeina": "125 mg",
          "niacina": "107 mg",
          "vitamina_b6": "9,3 mg"
        },
        "per_dose_15g": {
          "valore_energetico": "163,62 kj / 38,5 kcal",
          "grassi": "1,5 g",
          "di_cui_saturi": "1,5 g",
          "carboidrati": "6 g",
          "di_cui_zuccheri": "2,4 g",
          "proteine": "0 g",
          "sale": "75 mg",
          "beta_alanina": "2 g",
          "mct": "2 g",
          "l_arginina": "1 g",
          "citrullina": "0,6 g",
          "arginina_hcl": "0,5 g",
          "di_cui_arginina": "0,4 g",
          "creatina_monoidrato": "1,5 g",
          "di_cui_creatina": "1,32 g",
          "taurina": "0,5 g",
          "paulinia_cupana": "75 mg",
          "di_cui_caffeina": "18,8 mg",
          "niacina": "16 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)"
        }
      },
      "ingredienti": "Maltodestrine (da mais), Beta Alanina, Trigliceridi a media catena MCT, Fruttosio, L-Arginina (Kyowa®), Citrullina, Acido Citrico, Creatina monoidrato (Creapure®), L-Arginina Cloridrato, Taurina, Aroma, Acido Tartarico, Polvere di Barbabietola, Sodio Bicarbonato, Paulinia Cupana h.s.k. Semen e.s. tit. 10% Caffeina. Edulcoranti: Acelsufame K, Sucralosio; Niacina, Vitamina B6 (Piridossina Cloridrato). Prodotto e confezionato in stabilimento che utilizza anche latte, uova, soia, nocciole e loro derivati.",
      "nota": "*VNR: valori nutrizionali di riferimento"
    }];

    const [hardStartGroup] = await db.insert(productGroups).values({
      slug: "hard-start-x-plode",
      name: "Hard Start X-Plode",
      description: "HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creatina (Creapure®), Citrullina, L-Arginina (Kyowa®), L-Arginina Cloridato, Taurina, Paulinia Cupana, Vitamina B6 e B12.",
      longDescription: "HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creapure®, Citrullina KYOWA, L-Arginina KYOWA, L-Arginina Cloridrato, Taurina, Paulinia Cupana, Vitamina B6 e B12. HARD START X-PLODE è un PRE WORK-OUT indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate, favorendo la forza e la durata della performance. Il prodotto svolge un'ottima azione volumizzante.",
      features: hardStartFeatures,
      howToUse: "assumere 15 g di prodotto (20 cc del misurino graduato disponibile all'interno della confezione) con acqua 30 minuti prima dell'allenamento.",
      brandId: premierBrandId,
      categoryId: preWorkoutCategory[0].id,
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    const [hardStartProduct] = await db.insert(products).values({
      slug: "hard-start-x-plode-arancia-300g",
      name: "Hard Start X-Plode Arancia 300g",
      groupId: hardStartGroup.id,
      brandId: premierBrandId,
      categoryId: preWorkoutCategory[0].id,
      description: "HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creatina (Creapure®), Citrullina, L-Arginina (Kyowa®), L-Arginina Cloridato, Taurina, Paulinia Cupana, Vitamina B6 e B12.",
      flavor: "Arancia",
      size: "300g",
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hardStartProduct.id,
      value: "300",
      unit: "g",
      price: 3900 // 39,00€ in centesimi
    });

    await db.insert(productImages).values({
      productId: hardStartProduct.id,
      src: "HARD-START-XPLODE-SITO-1.png",
      alt: "Hard Start X-Plode Arancia 300g",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 3: Glutamine Pure 1000
    // ===================
    console.log("3. Inserendo Glutamine Pure 1000...");
    
    const glutamine1000Features = [{
      "titolo": "L-Glutammina Integratore",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "3 compresse",
          "l_glutammina": "3 g"
        }
      },
      "ingredienti": "L-Glutammina (Kyowa®), agente di carica: cellulosa microcristallina; amido di mais, stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio."
    }];

    const [glutamine1000Group] = await db.insert(productGroups).values({
      slug: "glutamine-pure-1000",
      name: "Glutamine Pure 1000",
      description: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici.",
      longDescription: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento.",
      features: glutamine1000Features,
      howToUse: "Assumere 3 compresse al giorno.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    // Variante 1: 150 compresse
    const [glutamine1000Product1] = await db.insert(products).values({
      slug: "glutamine-pure-1000-150-compresse",
      name: "Glutamine Pure 1000 150 compresse",
      groupId: glutamine1000Group.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici.",
      flavor: "Unico",
      size: "150 compresse",
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    await db.insert(productSizes).values({
      productId: glutamine1000Product1.id,
      value: "150",
      unit: "compresse",
      price: 2490 // 24,90€ in centesimi
    });

    await db.insert(productImages).values({
      productId: glutamine1000Product1.id,
      src: "GLUTAMINE-PURE-1000-SITO.png",
      alt: "Glutamine Pure 1000 150 compresse",
      isPrimary: true
    });

    // Variante 2: 300 compresse
    const [glutamine1000Product2] = await db.insert(products).values({
      slug: "glutamine-pure-1000-300-compresse",
      name: "Glutamine Pure 1000 300 compresse",
      groupId: glutamine1000Group.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici.",
      flavor: "Unico",
      size: "300 compresse",
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();

    await db.insert(productSizes).values({
      productId: glutamine1000Product2.id,
      value: "300",
      unit: "compresse",
      price: 3690 // 36,90€ in centesimi
    });

    await db.insert(productImages).values({
      productId: glutamine1000Product2.id,
      src: "GLUTAMINE-PURE-1000-SITO.png",
      alt: "Glutamine Pure 1000 300 compresse",
      isPrimary: true
    });

    console.log("✅ Completata l'inserimento dei primi 3 prodotti!");

  } catch (error) {
    console.error("💥 Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9Products()
  .then(() => {
    console.log("🎉 Prima parte inserimento Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });