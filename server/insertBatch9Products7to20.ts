import { db } from "./db";
import { 
  productGroups, products, productCategories, brands, productSizes, productImages,
  type InsertProductGroup, type InsertProduct
} from "@shared/schema";

async function insertBatch9Products9to20() {
  console.log("🚀 Inserimento prodotti Batch 9 dal 9° al 20° (12 prodotti)...");

  try {
    // Ottieni i brand esistenti
    const allBrands = await db.select().from(brands);
    const premierBrand = allBrands.find(b => b.slug === 'premier');
    const ethicsportBrand = allBrands.find(b => b.slug === 'ethicsport');

    if (!premierBrand || !ethicsportBrand) {
      throw new Error("Brand Premier o EthicSport non trovati!");
    }

    // Ottieni le categorie esistenti
    const allCategories = await db.select().from(productCategories);
    const getCategory = (slug: string) => allCategories.find(c => c.slug === slug);

    console.log("📦 Inserimento prodotti 9-20 (prodotti 7-8 già presenti):");

    // ===================
    // PRODOTTO 9: Whey 100% Pro-Zyme
    // ===================
    console.log("9. Whey 100% Pro-Zyme");
    
    const whey100Group = await db.insert(productGroups).values({
      name: "Whey 100% Pro-Zyme",
      slug: "whey-100-pro-zyme-premier",
      description: "WHEY 100% PRO-ZYME è un integratore alimentare in polvere di proteine del siero di latte concentrate Volactive® UltraWhey Concentrate, ottenute mediante processo di filtrazione a flusso incrociato (Cross-Flow), arricchito con il complesso multi-enzimatico Digezyme®.",
      longDescription: "WHEY 100% PRO-ZYME è un integratore alimentare in polvere di proteine del siero di latte concentrate Volactive® UltraWhey Concentrate, ottenute mediante processo di filtrazione a flusso incrociato (Cross-Flow), arricchito con il complesso multi-enzimatico Digezyme®. Il 100% di VNR di vitamine B1-B2-B6-B12 completano la formulazione, contribuendo al metabolismo energetico. La formulazione di WHEY 100% PRO-ZYME di Premier è un concentrato di proteine del siero del latte Volactive® di altissima qualità provenienti da latte fresco ottenuto da pascoli certificati e controllati. WHEY 100% PRO-ZYME contiene l' 81% di proteine (valore riferito al gusto cioccolato bianco e vaniglia) e presenta un'elevata biodisponibilità e un'incredibile solubilità. WHEY 100% PRO-ZYME fornisce inoltre un livello eccezionalmente alto di aminoacidi essenziali e ramificati. WHEY 100%PRO-ZYME è arricchito con il complesso multi-enzimatico DigeZyme® (alfa-amilasi, proteasi, lattasi, cellulasi, lipasi) miscela deputata alla scomposizione delle sostanze nutritive che accelera la digestione e il completo e migliore assorbimento dei nutrienti contenuti nel prodotto.",
      howToUse: "Assumere 30 g di prodotto in 100 ml d'acqua al giorno lontano dai pasti principali.",
      brandId: premierBrand.id,
      categoryId: getCategory('proteine')!.id,
      features: JSON.stringify({
        "titolo": "Integratore Proteico con Enzimi",
        "valori_nutrizionali": {
          "per_100g": {
            "energia": "403 kcal / 1712 kj",
            "grassi": "7 g",
            "di_cui_acidi_grassi_saturi": "0,6 g",
            "carboidrati": "4 g",
            "di_cui_zuccheri": "4 g",
            "proteine": "81 g",
            "sale": "0,19 g",
            "vitamina_b1": "3,6 mg",
            "vitamina_b2": "4,6 mg",
            "vitamina_b6": "4,6 mg",
            "vitamina_b12": "8,3 mcg"
          },
          "per_dose_30g": {
            "energia": "120,9 kcal / 514 kj",
            "grassi": "2,1 g",
            "di_cui_acidi_grassi_saturi": "0,2 g",
            "carboidrati": "1,2 g",
            "di_cui_zuccheri": "1,2 g",
            "proteine": "24,3 g",
            "sale": "0,06 g",
            "vitamina_b1": "1,1 mg (100% VNR)",
            "vitamina_b2": "1,4 mg (100% VNR)",
            "vitamina_b6": "1,4 mg (100% VNR)",
            "vitamina_b12": "2,5 mcg (100% VNR)",
            "miscela_di_enzimi_digezyme": "150 mg"
          }
        },
        "ingredienti": "proteine del siero di LATTE concentrate (sieroproteine ottenute mediante processo di ultrafiltrazione) 97%, aroma, emulsionante: lecitina di girasole, miscela di enzimi [DigeZyme® (alfa-amilasi, proteasi, lattasi, cellulasi, lipasi)], edulcoranti: edulcoranti: acesulfame K, sucralosio; vitamina B6 (piridossina cloridrato), vitamina B2 (riboflavina), vitamina B1 (cloridrato di tiamina), vitamina B12 (cianocobalamina).",
        "nota": "VNR = Valori nutritivi di riferimento"
      })
    }).returning();

    const whey100Products = await db.insert(products).values([
      { name: "Whey 100% Pro-Zyme Cioccolato Bianco 900g", slug: "whey-100-pro-zyme-cioccolato-bianco-900g", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Cioccolato Bianco", size: "900g", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Cioccolato Bianco 2kg", slug: "whey-100-pro-zyme-cioccolato-bianco-2kg", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Cioccolato Bianco", size: "2kg", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Cioccolato Bianco 3kg", slug: "whey-100-pro-zyme-cioccolato-bianco-3kg", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Cioccolato Bianco", size: "3kg", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Cioccolato 900g", slug: "whey-100-pro-zyme-cioccolato-900g", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Cioccolato", size: "900g", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Cioccolato 2kg", slug: "whey-100-pro-zyme-cioccolato-2kg", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Cioccolato", size: "2kg", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Cioccolato 3kg", slug: "whey-100-pro-zyme-cioccolato-3kg", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Cioccolato", size: "3kg", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Vaniglia 900g", slug: "whey-100-pro-zyme-vaniglia-900g", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Vaniglia", size: "900g", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Vaniglia 2kg", slug: "whey-100-pro-zyme-vaniglia-2kg", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Vaniglia", size: "2kg", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features },
      { name: "Whey 100% Pro-Zyme Vaniglia 3kg", slug: "whey-100-pro-zyme-vaniglia-3kg", description: "Proteine del siero di latte concentrate con enzimi digestivi", flavor: "Vaniglia", size: "3kg", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: whey100Group[0].id, features: whey100Group[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: whey100Products[0].id, value: "900", unit: "g", price: 5390, isAvailable: true },
      { productId: whey100Products[1].id, value: "2", unit: "kg", price: 10690, isAvailable: true },
      { productId: whey100Products[2].id, value: "3", unit: "kg", price: 14990, isAvailable: true },
      { productId: whey100Products[3].id, value: "900", unit: "g", price: 5390, isAvailable: true },
      { productId: whey100Products[4].id, value: "2", unit: "kg", price: 10690, isAvailable: true },
      { productId: whey100Products[5].id, value: "3", unit: "kg", price: 14990, isAvailable: true },
      { productId: whey100Products[6].id, value: "900", unit: "g", price: 5390, isAvailable: true },
      { productId: whey100Products[7].id, value: "2", unit: "kg", price: 10690, isAvailable: true },
      { productId: whey100Products[8].id, value: "3", unit: "kg", price: 14990, isAvailable: true }
    ]);

    for (const product of whey100Products) {
      await db.insert(productImages).values({
        productId: product.id,
        src: "WHEY-WEB-PREMIER.png",
        alt: `${product.name} - Immagine prodotto`,
        isPrimary: true
      });
    }

    // ===================
    // PRODOTTO 10: Amino Pool BV104
    // ===================
    console.log("10. Amino Pool BV104");
    
    const aminoPoolGroup = await db.insert(productGroups).values({
      name: "Amino Pool BV104",
      slug: "amino-pool-bv104-premier",
      description: "AMINO POOL BV 104 è un integratore a base di proteine del siero di latte isolate idrolizzate OPTIPEP® 90 con un alto grado di idrolisi (DH8) perfetto per tutte le fasi della giornata e post allenamento.",
      longDescription: "AMINO POOL BV 104 è un integratore a base di proteine del siero di latte isolate idrolizzate OPTIPEP® 90 con un alto grado di idrolisi (DH8) perfetto per tutte le fasi della giornata e post allenamento. Amino Pool BV 104 sono proteine del latte isolate idrolizzate con un alto grado di idrolisi (DH8) e quindi con un maggior apporto di peptidi a basso peso molecolare rispetto alle DH4. Questo consente il più alto grado di assorbimento e l'immediata disponibilità degli amminoacidi BCAA e EAA di cui sono composte. Agiscono a pochi minuti dall'assunzione sul rifornimento delle riserve di glicogeno, rispristinando quelle utilizzate a scopo energetico e riparando i danni muscolari, contribuendo ad alleviare i dolori post allenamento e ottimizzando i tempi di recupero.",
      howToUse: "Assumere 10 compresse al giorno con acqua.",
      brandId: premierBrand.id,
      categoryId: getCategory('proteine')!.id,
      features: JSON.stringify({
        "titolo": "Integratore Proteico Idrolizzato in compresse",
        "valori_nutrizionali": {
          "per_100g": {
            "valore_energetico": "357,81 Kcal / 1520,69 Kj",
            "proteine": "87,38 g",
            "carboidrati": "0,97 g",
            "di_cui_zuccheri": "0,97 g",
            "grassi": "0,49 g",
            "di_cui_saturi": "0 g",
            "fibre": "0 g",
            "sale": "0,165 g"
          },
          "per_dose_10_compresse": {
            "valore_energetico": "36,85 Kcal / 156,63 Kj",
            "proteine": "9 g",
            "carboidrati": "0,1 g",
            "di_cui_zuccheri": "0,1 g",
            "grassi": "0,05 g",
            "di_cui_saturi": "0 g",
            "fibre": "0 g",
            "sale": "0,017 g"
          }
        },
        "ingredienti": "Sieroproteine Isolate Idrolizzate del LATTE (Optipep® 90 DH8); Antiagglomerante: Biossido di Silicio, Magnesio Stearato."
      })
    }).returning();

    const aminoPoolProducts = await db.insert(products).values([
      { name: "Amino Pool BV104 250 compresse", slug: "amino-pool-bv104-250-compresse", description: "Proteine del siero di latte isolate idrolizzate", flavor: "Unico", size: "250 compresse", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: aminoPoolGroup[0].id, features: aminoPoolGroup[0].features },
      { name: "Amino Pool BV104 500 compresse", slug: "amino-pool-bv104-500-compresse", description: "Proteine del siero di latte isolate idrolizzate", flavor: "Unico", size: "500 compresse", brandId: premierBrand.id, categoryId: getCategory('proteine')!.id, groupId: aminoPoolGroup[0].id, features: aminoPoolGroup[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: aminoPoolProducts[0].id, value: "250", unit: "compresse", price: 3900, isAvailable: true },
      { productId: aminoPoolProducts[1].id, value: "500", unit: "compresse", price: 5900, isAvailable: true }
    ]);

    for (const product of aminoPoolProducts) {
      await db.insert(productImages).values({
        productId: product.id,
        src: "POO-250.png",
        alt: `${product.name} - Immagine prodotto`,
        isPrimary: true
      });
    }

    // ===================
    // PRODOTTO 11: Hard Leucine Booster 4:1:1
    // ===================
    console.log("11. Hard Leucine Booster 4:1:1");
    
    const hardLeucineGroup = await db.insert(productGroups).values({
      name: "Hard Leucine Booster 4:1:1",
      slug: "hard-leucine-booster-4-1-1-premier",
      description: "HARD LEUCINE BOOSTER integratore a base di aminoacidi a catena ramificata (BCAA) con rapporto anabolico 4:1:1 (4 L-Leucina,1 L-Isoleucina, 1 L-Valina) realizzato con un contenuto di eccipienti bassissimo grazie alle nuove tecnologie di produzione e garantito di qualità farmaceutica",
      longDescription: "HARD LEUCINE BOOSTER integratore a base di aminoacidi a catena ramificata (BCAA) con rapporto anabolico 4:1:1 (4 L-Leucina,1 L-Isoleucina, 1 L-Valina) realizzato con un contenuto di eccipienti bassissimo grazie alle nuove tecnologie di produzione e garantito di qualità farmaceutica. Arricchito con Vitamina B6. HARD LEUCINE BOOSTER è un prodotto per sportivi a base di aminoacidi a catena ramificata (BCAA) con rapporto anabolico 4:1:1 (4 L-Leucina,1 L-Isoleucina, 1 L-Valina). Le formulazioni di BCAA Premier Integratori garantiscono un migliore assorbimento e una maggiore efficacia e sono realizzati con un contenuto di eccipienti bassissimo grazie alle nuove tecnologie di produzione e garantiti di qualità farmaceutica.",
      howToUse: "5 compresse assunte preferibilmente dopo l'allenamento, poiché gli aminoacidi a catena ramificata (BCAA) sono essenziali per il recupero e la riparazione del tessuto muscolare.",
      brandId: premierBrand.id,
      categoryId: getCategory('aminoacidi-e-creatina')!.id,
      features: JSON.stringify({
        "titolo": "Integratore BCAA 4:1:1",
        "valori_nutrizionali": {
          "per_dose_5_compresse": {
            "valore_energetico": "0 kcal / 0 kj",
            "l_leucina": "3,33 g",
            "l_isoleucina": "0,835 g",
            "l_valina": "0,835 g",
            "vitamina_b6": "1,4 mg (100% VNR)"
          }
        },
        "ingredienti": "L-Leucina, L-Isoleucina, L-Valina; Antiagglomeranti: biossido di silicio, magnesio stearato vegetale; amido di mais; addensante: cellulosa microcristallina.",
        "nota": "VNR = valore nutrizionale di riferimento"
      })
    }).returning();

    const hardLeucineProducts = await db.insert(products).values([
      { name: "Hard Leucine Booster 4:1:1 100 compresse", slug: "hard-leucine-booster-4-1-1-100-compresse", description: "BCAA con rapporto 4:1:1 in compresse", flavor: "Unico", size: "100 compresse", brandId: premierBrand.id, categoryId: getCategory('aminoacidi-e-creatina')!.id, groupId: hardLeucineGroup[0].id, features: hardLeucineGroup[0].features },
      { name: "Hard Leucine Booster 4:1:1 200 compresse", slug: "hard-leucine-booster-4-1-1-200-compresse", description: "BCAA con rapporto 4:1:1 in compresse", flavor: "Unico", size: "200 compresse", brandId: premierBrand.id, categoryId: getCategory('aminoacidi-e-creatina')!.id, groupId: hardLeucineGroup[0].id, features: hardLeucineGroup[0].features },
      { name: "Hard Leucine Booster 4:1:1 400 compresse", slug: "hard-leucine-booster-4-1-1-400-compresse", description: "BCAA con rapporto 4:1:1 in compresse", flavor: "Unico", size: "400 compresse", brandId: premierBrand.id, categoryId: getCategory('aminoacidi-e-creatina')!.id, groupId: hardLeucineGroup[0].id, features: hardLeucineGroup[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: hardLeucineProducts[0].id, value: "100", unit: "compresse", price: 2200, isAvailable: true },
      { productId: hardLeucineProducts[1].id, value: "200", unit: "compresse", price: 3800, isAvailable: true },
      { productId: hardLeucineProducts[2].id, value: "400", unit: "compresse", price: 6600, isAvailable: true }
    ]);

    for (const product of hardLeucineProducts) {
      await db.insert(productImages).values({
        productId: product.id,
        src: "LEUCINE-411-SITO-INTEGRATORI.png",
        alt: `${product.name} - Immagine prodotto`,
        isPrimary: true
      });
    }

    // ===================
    // PRODOTTO 12: Hard BCAA Advanced 8:1:1
    // ===================
    console.log("12. Hard BCAA Advanced 8:1:1");
    
    const hardBCAAGroup = await db.insert(productGroups).values({
      name: "Hard BCAA Advanced 8:1:1",
      slug: "hard-bcaa-advanced-8-1-1-premier",
      description: "HARD BCAA 8:1:1 ADVANCED è un prodotto per sportivi a base di aminoacidi a catena ramificata (BCAA) con rapporto anabolico 8:1:1 (8 L-Leucina,1 L-Isoleucina, 1 L-Valina) realizzato con un contenuto di eccipienti bassissimo grazie alle nuove tecnologie di produzione e garantito di qualità farmaceutica.",
      longDescription: "HARD BCAA 8:1:1 ADVANCED è un prodotto per sportivi a base di aminoacidi a catena ramificata (BCAA) con rapporto anabolico 8:1:1 (8 L-Leucina,1 L-Isoleucina, 1 L-Valina). Le formulazioni di BCAA Premier Integratori garantiscono un migliore assorbimento e una maggiore efficacia e sono realizzati con un contenuto di eccipienti bassissimo grazie alle nuove tecnologie di produzione e garantiti di qualità farmaceutica. Di facile assorbimento, gli aminoacidi rappresentano il nutrimento ideale per lo sportivo. I principali benefici della loro assunzione sono una maggiore resistenza, un recupero più rapido e una riduzione del dolore muscolare. Circa il 40% degli amminoacidi essenziali che costituiscono i muscoli sono BCAA (amminoacidi ramificati) che variano nel loro rapporto Leucina, Isoleucina e Valina. L'aminoacido L-Leucina contribuisce alla stimolazione della proteosintesi nei tessuti muscolari. L-Valina e L-Isoleucina favoriscono il mantenimento di un equilibrio positivo di nitrogeno nei muscoli e contribuiscono ad un recupero di qualità per i tessuti muscolari.",
      howToUse: "Assumi 5 compresse al giorno, preferibilmente prima, durante o dopo l'allenamento per il supporto muscolare.",
      brandId: premierBrand.id,
      categoryId: getCategory('aminoacidi-e-creatina')!.id,
      features: JSON.stringify({
        "titolo": "Integratore BCAA 8:1:1",
        "valori_nutrizionali": {
          "per_dose": {
            "porzione": "5 compresse",
            "valore_energetico": "0 kcal / 0 kj",
            "l_leucina": "4 g",
            "l_isoleucina": "0,5 g",
            "l_valina": "0,5 g",
            "vitamina_b6": "1,4 mg (100% VNR)"
          }
        },
        "ingredienti": "L-Leucina, L-Isoleucina, L-Valina; Antiagglomeranti: biossido di silicio, magnesio stearato vegetale; amido di mais; addensante: cellulosa microcristallina.",
        "nota": "VNR = valore nutrizionale di riferimento"
      })
    }).returning();

    const hardBCAAProducts = await db.insert(products).values([
      { name: "Hard BCAA Advanced 8:1:1 100 compresse", slug: "hard-bcaa-advanced-8-1-1-100-compresse", description: "BCAA con rapporto 8:1:1 in compresse", flavor: "Unico", size: "100 compresse", brandId: premierBrand.id, categoryId: getCategory('aminoacidi-e-creatina')!.id, groupId: hardBCAAGroup[0].id, features: hardBCAAGroup[0].features },
      { name: "Hard BCAA Advanced 8:1:1 200 compresse", slug: "hard-bcaa-advanced-8-1-1-200-compresse", description: "BCAA con rapporto 8:1:1 in compresse", flavor: "Unico", size: "200 compresse", brandId: premierBrand.id, categoryId: getCategory('aminoacidi-e-creatina')!.id, groupId: hardBCAAGroup[0].id, features: hardBCAAGroup[0].features },
      { name: "Hard BCAA Advanced 8:1:1 400 compresse", slug: "hard-bcaa-advanced-8-1-1-400-compresse", description: "BCAA con rapporto 8:1:1 in compresse", flavor: "Unico", size: "400 compresse", brandId: premierBrand.id, categoryId: getCategory('aminoacidi-e-creatina')!.id, groupId: hardBCAAGroup[0].id, features: hardBCAAGroup[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: hardBCAAProducts[0].id, value: "100", unit: "compresse", price: 2200, isAvailable: true },
      { productId: hardBCAAProducts[1].id, value: "200", unit: "compresse", price: 3800, isAvailable: true },
      { productId: hardBCAAProducts[2].id, value: "400", unit: "compresse", price: 6600, isAvailable: true }
    ]);

    for (const product of hardBCAAProducts) {
      await db.insert(productImages).values({
        productId: product.id,
        src: "BCAA-811-SITOWEB-INTEGRATORI.png",
        alt: `${product.name} - Immagine prodotto`,
        isPrimary: true
      });
    }

    console.log("✅ Inseriti prodotti 9-12 del Batch 9 (17 varianti totali)");

    // Continua con i prodotti EthicSport...
    console.log("📦 Inserimento prodotti EthicSport 13-20:");

    // ===================
    // PRODOTTO 13: Borraccia 600/800 ml
    // ===================
    console.log("13. Borraccia EthicSport");
    
    const borracceGroup = await db.insert(productGroups).values({
      name: "Borraccia 600/800 ml",
      slug: "borraccia-ethicsport",
      description: "Borraccia da 800ml in materiale pregiato, adatta per ciclismo e MTB. Lavabile, igienica, riutilizzabile, morbida, idonea alla conservazione di alimenti.",
      longDescription: "Borraccia da 800ml in materiale pregiato, adatta per ciclismo e MTB. Lavabile, igienica, riutilizzabile, morbida, idonea alla conservazione di alimenti.",
      howToUse: "Si consiglia il lavaggio a mano.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('merchandising-e-cosmetici')!.id,
      features: JSON.stringify({
        "titolo": "Borraccia Sportiva",
        "caratteristiche": [
          "Materiale pregiato di alta qualità",
          "Adatta per ciclismo e MTB",
          "Lavabile e riutilizzabile",
          "Idonea alla conservazione di alimenti"
        ]
      })
    }).returning();

    const borracceProducts = await db.insert(products).values([
      { name: "Borraccia EthicSport 600ml", slug: "borraccia-ethicsport-600ml", description: "Borraccia sportiva da 600ml", flavor: "Unico", size: "600ml", brandId: ethicsportBrand.id, categoryId: getCategory('merchandising-e-cosmetici')!.id, groupId: borracceGroup[0].id, features: borracceGroup[0].features },
      { name: "Borraccia EthicSport 800ml", slug: "borraccia-ethicsport-800ml", description: "Borraccia sportiva da 800ml", flavor: "Unico", size: "800ml", brandId: ethicsportBrand.id, categoryId: getCategory('merchandising-e-cosmetici')!.id, groupId: borracceGroup[0].id, features: borracceGroup[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: borracceProducts[0].id, value: "600", unit: "ml", price: 300, isAvailable: true },
      { productId: borracceProducts[1].id, value: "800", unit: "ml", price: 350, isAvailable: true }
    ]);

    await db.insert(productImages).values([
      { productId: borracceProducts[0].id, src: "borraccia-600.jpeg", alt: "Borraccia EthicSport 600ml", isPrimary: true },
      { productId: borracceProducts[1].id, src: "thumb.jpeg", alt: "Borraccia EthicSport 800ml", isPrimary: true }
    ]);

    // ===================
    // PRODOTTO 14: Sacca
    // ===================
    console.log("14. Sacca EthicSport");
    
    const saccaGroup = await db.insert(productGroups).values({
      name: "Sacca",
      slug: "sacca-ethicsport",
      description: "Esclusiva sacca con logo EthicSport in poliestere 44X33 cm",
      longDescription: "Sacca con logo EthicSport adatta per tutte le occasioni.",
      howToUse: "Si consiglia il lavaggio a mano.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('merchandising-e-cosmetici')!.id,
      features: JSON.stringify({
        "titolo": "Sacca Sportiva",
        "caratteristiche": [
          "Logo EthicSport esclusivo",
          "Materiale: poliestere",
          "Dimensioni: 44x33 cm",
          "Adatta per tutte le occasioni"
        ]
      })
    }).returning();

    const saccaProduct = await db.insert(products).values({
      name: "Sacca EthicSport Taglia Unica",
      slug: "sacca-ethicsport-taglia-unica",
      description: "Esclusiva sacca con logo EthicSport",
      flavor: "Unico",
      size: "Taglia Unica",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('merchandising-e-cosmetici')!.id,
      groupId: saccaGroup[0].id,
      features: saccaGroup[0].features
    }).returning();

    await db.insert(productSizes).values({
      productId: saccaProduct[0].id,
      value: "Unica",
      unit: "taglia",
      price: 600,
      isAvailable: true
    });

    await db.insert(productImages).values({
      productId: saccaProduct[0].id,
      src: "sacca.jpeg",
      alt: "Sacca EthicSport",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 15: T-Shirt EthicSport Limited Edition
    // ===================
    console.log("15. T-Shirt EthicSport Limited Edition");
    
    const tshirtGroup = await db.insert(productGroups).values({
      name: "T-Shirt EthicSport Limited Edition",
      slug: "t-shirt-ethicsport-limited-edition",
      description: "Esclusiva T-Shirt EthicSport in cotone di elevata qualità.",
      longDescription: "Esclusiva T-Shirt EthicSport in cotone di elevata qualità. E' un articolo esclusivo indossato dai nostri atleti e dai nostri ambassador. Disponibile nelle taglie: S, M, L, XL.",
      howToUse: "???",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('merchandising-e-cosmetici')!.id,
      features: JSON.stringify({
        "titolo": "T-Shirt Limited Edition",
        "caratteristiche": [
          "Cotone di elevata qualità",
          "Articolo esclusivo",
          "Indossato dai nostri atleti",
          "Design Limited Edition"
        ]
      })
    }).returning();

    const tshirtProducts = await db.insert(products).values([
      { name: "T-Shirt EthicSport Limited Edition S", slug: "t-shirt-ethicsport-limited-edition-s", description: "T-Shirt esclusiva EthicSport", flavor: "Unico", size: "S", brandId: ethicsportBrand.id, categoryId: getCategory('merchandising-e-cosmetici')!.id, groupId: tshirtGroup[0].id, features: tshirtGroup[0].features },
      { name: "T-Shirt EthicSport Limited Edition M", slug: "t-shirt-ethicsport-limited-edition-m", description: "T-Shirt esclusiva EthicSport", flavor: "Unico", size: "M", brandId: ethicsportBrand.id, categoryId: getCategory('merchandising-e-cosmetici')!.id, groupId: tshirtGroup[0].id, features: tshirtGroup[0].features },
      { name: "T-Shirt EthicSport Limited Edition L", slug: "t-shirt-ethicsport-limited-edition-l", description: "T-Shirt esclusiva EthicSport", flavor: "Unico", size: "L", brandId: ethicsportBrand.id, categoryId: getCategory('merchandising-e-cosmetici')!.id, groupId: tshirtGroup[0].id, features: tshirtGroup[0].features },
      { name: "T-Shirt EthicSport Limited Edition XL", slug: "t-shirt-ethicsport-limited-edition-xl", description: "T-Shirt esclusiva EthicSport", flavor: "Unico", size: "XL", brandId: ethicsportBrand.id, categoryId: getCategory('merchandising-e-cosmetici')!.id, groupId: tshirtGroup[0].id, features: tshirtGroup[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: tshirtProducts[0].id, value: "S", unit: "taglia", price: 1990, isAvailable: true },
      { productId: tshirtProducts[1].id, value: "M", unit: "taglia", price: 1990, isAvailable: true },
      { productId: tshirtProducts[2].id, value: "L", unit: "taglia", price: 1990, isAvailable: true },
      { productId: tshirtProducts[3].id, value: "XL", unit: "taglia", price: 1990, isAvailable: true }
    ]);

    for (const product of tshirtProducts) {
      await db.insert(productImages).values({
        productId: product.id,
        src: "magliette-ethicsport.png",
        alt: `${product.name} - Immagine prodotto`,
        isPrimary: true
      });
    }

    // ===================
    // PRODOTTO 16: Cappellino EthicSport
    // ===================
    console.log("16. Cappellino EthicSport");
    
    const cappellinoGroup = await db.insert(productGroups).values({
      name: "Cappellino EthicSport",
      slug: "cappellino-ethicsport",
      description: "CAPPELLINO EthicSport con ricamo in 3D e dettagli sportivi",
      longDescription: "Cappellino EthicSport con visiera piatta. Ricamo in 3D e dettagli laterali stampati in tono su tono, per un look moderno e sportivo. Struttura a sei pannelli. Visiera a sandwich bicolore. Interno personalizzato e rifinito in arancio. Chiusura regolabile sul retro per una vestibilità perfetta. Occhielli ricamati per un'eccellente traspirazione.",
      howToUse: "Si consiglia il lavaggio a mano.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('merchandising-e-cosmetici')!.id,
      features: JSON.stringify({
        "titolo": "Cappellino Sportivo",
        "caratteristiche": [
          "Ricamo in 3D",
          "Visiera piatta",
          "Struttura a sei pannelli",
          "Chiusura regolabile",
          "Occhielli per traspirazione"
        ]
      })
    }).returning();

    const cappellinoProduct = await db.insert(products).values({
      name: "Cappellino EthicSport Taglia Unica",
      slug: "cappellino-ethicsport-taglia-unica",
      description: "Cappellino EthicSport con ricamo in 3D",
      flavor: "Unico",
      size: "Taglia Unica",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('merchandising-e-cosmetici')!.id,
      groupId: cappellinoGroup[0].id,
      features: cappellinoGroup[0].features
    }).returning();

    await db.insert(productSizes).values({
      productId: cappellinoProduct[0].id,
      value: "Unica",
      unit: "taglia",
      price: 1990,
      isAvailable: true
    });

    await db.insert(productImages).values({
      productId: cappellinoProduct[0].id,
      src: "cappellino.jpeg",
      alt: "Cappellino EthicSport",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 17: Ramtech - BCAA 2:1:1
    // ===================
    console.log("17. Ramtech - BCAA 2:1:1");
    
    const ramtechGroup = await db.insert(productGroups).values({
      name: "Ramtech - BCAA 2:1:1",
      slug: "ramtech-bcaa-2-1-1-ethicsport",
      description: "Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l'organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari.",
      longDescription: "Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l'organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari. Per questo sono considerati un valido supporto nutrizionale per chi svolge attività fisica. Le vitamine B1 e B6 svolgono un ruolo chiave nel metabolismo energetico: la vitamina B6, in particolare, contribuisce anche al metabolismo delle proteine e del glicogeno e aiuta a ridurre stanchezza e affaticamento. Ramtech® BCAA 2:1:1 è un integratore che combina: BCAA nel rapporto bilanciato 2:1:1 (Leucina, Valina, Isoleucina), utili a sostenere la dieta dello sportivo. Vitamine B1 e B6, per il corretto metabolismo energetico e proteico. La formulazione è indicata per chi si allena in modo intenso e costante. È Gluten Free e adatta anche a chi segue un'alimentazione priva di glutine. Tutti i lotti sono prodotti secondo elevati standard qualitativi e sottoposti a rigorosi controlli di purezza e sicurezza, per garantire un'integrazione affidabile nel tempo.",
      howToUse: "Si consiglia di assumere fino a 5 capsule al giorno, preferibilmente dopo l'allenamento o lontano dai pasti. In caso di allenamenti particolarmente lunghi o intensi, i BCAA possono essere utilizzati anche durante l'attività per sostenere l'organismo.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('aminoacidi-e-creatina')!.id,
      features: JSON.stringify({
        "titolo": "Integratore BCAA",
        "valori_nutrizionali": {
          "per_porzione": {
            "porzione": "5 caps",
            "bcaa": "5000 mg",
            "di_cui_l_leucina": "2500 mg",
            "di_cui_l_valina": "1250 mg",
            "di_cui_l_isoleucina": "1250 mg",
            "vitamina_b1": "0.83 mg (75% VNR)",
            "vitamina_b6": "1.8 mg (129% VNR)"
          }
        },
        "ingredienti": "Aminoacidi a catena ramificata BCAA (L-leucina, L-valina, L-isoleucina, emulsionante lecitina), agente di carica: idrossipropilmetilcellulosa; cloridrato di pirossidina (Vitamina B6), cloridrato di tiamina (Vitamina B1).",
        "nota": "NRV (Valore Nutritivo di Riferimento- Reg UE n.1169/2011)"
      })
    }).returning();

    const ramtechProduct = await db.insert(products).values({
      name: "Ramtech BCAA 2:1:1 120 capsule",
      slug: "ramtech-bcaa-2-1-1-120-capsule",
      description: "BCAA 2:1:1 con vitamine B1 e B6",
      flavor: "Unico",
      size: "120 capsule",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('aminoacidi-e-creatina')!.id,
      groupId: ramtechGroup[0].id,
      features: ramtechGroup[0].features
    }).returning();

    await db.insert(productSizes).values({
      productId: ramtechProduct[0].id,
      value: "120",
      unit: "capsule",
      price: 2390,
      isAvailable: true
    });

    await db.insert(productImages).values({
      productId: ramtechProduct[0].id,
      src: "ramtech-bcaa.png",
      alt: "Ramtech BCAA 2:1:1",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 18: OMNIA Active Formula
    // ===================
    console.log("18. OMNIA Active Formula");
    
    const omniaGroup = await db.insert(productGroups).values({
      name: "OMNIA Active Formula",
      slug: "omnia-active-formula-ethicsport",
      description: "Integratore di vitamine e minerali ad alto dosaggio, per contrastare debilitazione e stanchezza, o per chi svolge attività fisiche intense. Utile per ricaricare l'organismo di vitamine.",
      longDescription: "OMNIA® Active Formula è un integratore alimentare di vitamine e minerali con fosfatidilcolina. La formulazione apporta il 100% dei valori nutritivi (NRV) delle vitamine utili all'organismo umano e molti dei minerali coinvolti nei processi metabolici ed enzimatici. In particolare, le vitamine (C, B2, B3, B5, B6, B12) contribuiscono al corretto metabolismo energetico1 e alla riduzione della stanchezza e dell'affaticamento2. Le vitamine B2, B3, B8, A, C insieme a Ca, Mg e Zn contribuiscono al mantenimento di una pelle normale3 e di ossa normali4. Le Vitamine A, B6, B9, B12, C, D, insieme a Fe, Cu, Se, Zn contribuiscono alla normale funzione del sistema immunitario5. Infine, contribuisce alla protezione delle cellule dallo stress ossidativo6 per la presenza delle vitamine B2, C, E, insieme a Cu, Se, Zn. Il prodotto è Gluten Free, è pertanto adatto anche per soggetti celiaci o con intolleranza al glutine.",
      howToUse: "1 Capsula al giorno.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('supplementi')!.id,
      features: JSON.stringify({
        "titolo": "Integratore Multivitaminico e Multiminerale",
        "valori_nutrizionali": {
          "per_porzione": {
            "porzione": "1 capsula",
            "vitamina_a": "800 mcg (100% NRV)",
            "vitamina_d": "5,0 mcg (100% NRV)",
            "vitamina_e": "12 mg (100% NRV)",
            "vitamina_k": "75 mcg (100% NRV)",
            "vitamina_c": "80 mg (100% NRV)",
            "tiamina_b1": "1,1 mg (100% NRV)",
            "riboflavina_b2": "1,4 mg (100% NRV)",
            "niacina_b3": "16 mg (100% NRV)",
            "vitamina_b6": "1,4 mg (100% NRV)",
            "acido_folico": "200 mcg (100% NRV)",
            "vitamina_b12": "2,5 mcg (100% NRV)",
            "biotina": "50 mcg (100% NRV)",
            "acido_pantotenico_b5": "6 mg (100% NRV)",
            "calcio": "160 mg (20% NRV)",
            "magnesio": "75 mg (20% NRV)",
            "ferro": "14 mg (100% NRV)",
            "zinco": "7,5 mg (75% NRV)",
            "rame": "1 mg (100% NRV)",
            "manganese": "1,8 mg (100% NRV)",
            "selenio": "55 mcg (100% NRV)",
            "iodio": "150 mcg (100% NRV)",
            "fosfolipidi": "100 mg",
            "di_cui_fosfatidilcolina": "20 mg"
          }
        },
        "ingredienti": "Carbonato di calcio anidro, magnesio diglicinato, Agente di carica: idrossipropilmetilcellulosa; Fosfolipidi da olio di girasole in polvere (di cui 20% fosfatidilcolina), Vitamina C (acido l-ascorbico); Diglicinato ferroso, zinco picolinato, Vitamina E (acetato di dl-alfa-tocoferile), agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; Niacina (Esanicotinato di inositolo), l-selenometionina, diglicinato di manganese, Vitamina A (acetato di retinile), Vitamina B5 (acido pantotenico), diglicinato di rame, Vitamina D (colecalciferolo), Vitamina B6 (cloridrato di piridossina), Vitamina K (fillochinone), Vitamina B2 (riboflavina), Vitamina B1 (cloridrato di tiamina), acido folico (acido pteroil monoglutammico), ioduro di potassio, Vitamina B8 (biotina), Vitamina B12 (metilcobalamina)."
      })
    }).returning();

    const omniaProduct = await db.insert(products).values({
      name: "OMNIA Active Formula 45 capsule",
      slug: "omnia-active-formula-45-capsule",
      description: "Integratore multivitaminico e multiminerale",
      flavor: "Unico",
      size: "45 capsule",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('supplementi')!.id,
      groupId: omniaGroup[0].id,
      features: omniaGroup[0].features
    }).returning();

    await db.insert(productSizes).values({
      productId: omniaProduct[0].id,
      value: "45",
      unit: "capsule",
      price: 1990,
      isAvailable: true
    });

    await db.insert(productImages).values({
      productId: omniaProduct[0].id,
      src: "omina-active-formula.png",
      alt: "OMNIA Active Formula",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 19: Super Hydro Tabs
    // ===================
    console.log("19. Super Hydro Tabs");
    
    const hydroTabsGroup = await db.insert(productGroups).values({
      name: "Super Hydro Tabs",
      slug: "super-hydro-tabs-ethicsport",
      description: "Integratore alimentare idrosalino, senza zuccheri, ipotonico e zero calorie!",
      longDescription: "SuperHydro Tabs è un integratore alimentare idrosalino in compresse, senza zuccheri aggiunti e senza calorie1. La speciale formulazione consente un'ottimale idratazione e ottimizza l'assorbimento di acqua durante l'attività intensa. Sodio, potassio, magnesio, calcio e cloro sono elettroliti bilanciati che generano una soluzione con 487mg di sali minerali per compressa. Le vitamine B1, B2, B6 contribuiscono alla riduzione della stanchezza e dell'affaticamento e al normale metabolismo energetico. La vitamina B1 contribuisce alla normale funzione cardiaca e la vitamina B6 contribuisce inoltre alla normale formazione dei globuli rossi.",
      howToUse: "Sciogliere 1 compressa in circa 500 ml di acqua. Assumere ad intervalli regolari di 15-20 minuti. È preferibile non superare la dose massima di 3 compresse, pari a circa 3 borracce di soluzione, a meno di casi eccezionali, come gare o allenamenti occasionali molto lunghi.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      features: JSON.stringify({
        "titolo": "Integratore Multivitaminico e Minerale",
        "valori_nutrizionali": {
          "per_100g": {
            "valore_energetico": "190 kcal / 795 kJ",
            "grassi": "0 g",
            "di_cui_saturi": "0 g",
            "carboidrati": "14 g",
            "di_cui_zuccheri": "0 g",
            "di_cui_polioli": "13 g",
            "proteine": "0 g",
            "sale": "12,9 g",
            "vitamina_b1": "13,25 mg (1205 % NRV)",
            "vitamina_b2": "16,87 mg (1205 % NRV)",
            "vitamina_b6": "16,87 mg (1205 % NRV)",
            "zinco": "120 mg (1205 % NRV)",
            "magnesio": "686,7 mg (183 % NRV)",
            "cloro": "1205 mg (145 % NRV)",
            "calcio": "1566 mg (193 % NRV)",
            "potassio": "3133 mg (157 % NRV)",
            "sodio": "5132 mg"
          },
          "per_compressa_4_15g": {
            "valore_energetico": "8 kcal / 34 kJ",
            "grassi": "0 g",
            "di_cui_saturi": "0 g",
            "carboidrati": "0,6 g",
            "di_cui_zuccheri": "0 g",
            "di_cui_polioli": "0,5 g",
            "proteine": "0 g",
            "sale": "0,53 g",
            "vitamina_b1": "0,55 mg (50 % NRV)",
            "vitamina_b2": "0,7 mg (50 % NRV)",
            "vitamina_b6": "0,7 mg (50 % NRV)",
            "zinco": "5 mg (50 % NRV)",
            "magnesio": "28,5 mg (7,6 % NRV)",
            "cloro": "50 mg (6 % NRV)",
            "calcio": "65 mg (8 % NRV)",
            "potassio": "130 mg (6,5 % NRV)",
            "sodio": "213 mg"
          }
        },
        "ingredienti": "Acido citrico, correttore di acidità: carbonato acido di sodio, agente di carica: sorbitolo, potassio carbonato acido, carbonato di calcio, carbonato di magnesio, cloruro di potassio, aroma naturale (limone), edulcorante: sucralosio, aroma naturale (arancia), citrato di zinco, riboflavina 5'-fosfato sodico, piridossina cloridrato, tiamina cloridrato."
      })
    }).returning();

    const hydroTabsProducts = await db.insert(products).values([
      { name: "Super Hydro Tabs Limone 20 compresse", slug: "super-hydro-tabs-limone-20-compresse", description: "Integratore idrosalino in compresse effervescenti", flavor: "Limone", size: "20 compresse effervescenti", brandId: ethicsportBrand.id, categoryId: getCategory('pre-workout-energetici')!.id, groupId: hydroTabsGroup[0].id, features: hydroTabsGroup[0].features },
      { name: "Super Hydro Tabs Arancio 20 compresse", slug: "super-hydro-tabs-arancio-20-compresse", description: "Integratore idrosalino in compresse effervescenti", flavor: "Arancio", size: "20 compresse effervescenti", brandId: ethicsportBrand.id, categoryId: getCategory('pre-workout-energetici')!.id, groupId: hydroTabsGroup[0].id, features: hydroTabsGroup[0].features }
    ]).returning();

    await db.insert(productSizes).values([
      { productId: hydroTabsProducts[0].id, value: "20", unit: "comp. effervescenti", price: 950, isAvailable: true },
      { productId: hydroTabsProducts[1].id, value: "20", unit: "comp. effervescenti", price: 950, isAvailable: true }
    ]);

    await db.insert(productImages).values([
      { productId: hydroTabsProducts[0].id, src: "super-hydro-tabs-limone.png", alt: "Super Hydro Tabs Limone", isPrimary: true },
      { productId: hydroTabsProducts[1].id, src: "super-hydro-tabs-arancio.png", alt: "Super Hydro Tabs Arancio", isPrimary: true }
    ]);

    // ===================
    // PRODOTTO 20: Pre Gara Endurance
    // ===================
    console.log("20. Pre Gara Endurance");
    
    const preGaraGroup = await db.insert(productGroups).values({
      name: "Pre Gara Endurance",
      slug: "pre-gara-endurance-ethicsport",
      description: "Integratore alimentare studiato per massimizzare la resistenza.",
      longDescription: "Il prodotto permette di realizzare una soluzione di carboidrati complessi ed elettroliti, utile al mantenimento di prestazioni di resistenza durante l'esercizio fisico prolungato. Pre Gara Endurance fornisce maltodestrine a lunga catena, amminoacidi glucogenici e amminoacidi ramificati, in grado di essere metabolizzati in tempi diversi. La presenza di vitamine (B2, B5, B6, C e Folato) coadiuva la riduzione della stanchezza e dell'affaticamento, mentre gli elettroliti presenti (Ca, Mg, K) contribuiscono alla normale funzione muscolare. Le vitamine (B1, B2, B6, C, Biotina) permettono un fisiologico metabolismo energetico e la Vit. B6 supporta il normale metabolismo delle proteine e del glicogeno. La vitamina C, al dosaggio proposto di 2 buste, contribuisce al mantenimento della normale funzione del sistema immunitario durante e dopo uno sforzo fisico intenso e protegge le cellule dallo stress ossidativo. Questo effetto benefico si ottiene con l'assunzione giornaliera di 200 mg in aggiunta all'apporto giornaliero raccomandato di vitamina C. Il prodotto non contiene glutine (Gluten Free) è pertanto indicato anche per soggetti celiaci o con intolleranza al glutine.",
      howToUse: "Si consiglia l'utilizzo del prodotto circa 30min. prima dell'impegno sportivo. Utilizzare 1 busta in circa 200 ml di acqua per attività di media durata, 2 buste (in circa 400 ml di acqua) in caso di impegno fisico intenso e prolungato. Per ottimizzare l'assimilazione del prodotto, quando la temperatura esterna è particolarmente elevata, è utile bere circa 200 cc di acqua circa 10-15 minuti prima dell'inizio della prestazione.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      features: JSON.stringify({
        "titolo": "Integratore Pre-Workout/Energetico",
        "valori_nutrizionali": {
          "per_100g": {
            "valore_energetico_kcal": "365",
            "valore_energetico_kj": "1533",
            "grassi": "0.02 g",
            "di_cui_saturi": "0.01 g",
            "carboidrati": "75 g",
            "di_cui_zuccheri": "16.36 g",
            "proteine": "0 g",
            "sale": "1.6 g",
            "vitamina_c": "526.3 mg (658% NRV)",
            "vitamina_b1": "1.8 mg (165% NRV)",
            "vitamina_b2": "2.1 mg (149% NRV)",
            "acido_pantotenico": "7.9 mg (132% NRV)",
            "vitamina_b6": "1.3 mg (94% NRV)",
            "biotina": "197.4 mcg (395% NRV)",
            "vitamina_e": "26.3 mg (219% NRV)",
            "folato": "263.2 mcg (132% NRV)",
            "magnesio": "186.8 mg (50% NRV)",
            "potassio": "789.5 mg (40% NRV)",
            "cloruro": "478.8 mg (61% NRV)",
            "calcio": "315.8 mg (35% NRV)",
            "creatina": "1716 mg",
            "taurina": "658 mg",
            "l_leucina": "1974 mg",
            "l_isoleucina": "987 mg",
            "l_valina": "987 mg",
            "l_glutammina": "263 mg",
            "glicina": "1053 mg",
            "l_alanina": "1579 mg",
            "l_acetilcarnitina": "132 mg",
            "acido_l_glutammico": "526 mg",
            "eleuterococco_e_s": "263 mg"
          },
          "per_2_buste": {
            "valore_energetico_kcal": "139",
            "valore_energetico_kj": "590",
            "grassi": "0.01 g",
            "di_cui_saturi": "0 g",
            "carboidrati": "28 g",
            "di_cui_zuccheri": "6.22 g",
            "proteine": "0 g",
            "sale": "0.6 g",
            "vitamina_c": "200 mg (250% NRV)",
            "vitamina_b1": "0.7 mg (64% NRV)",
            "vitamina_b2": "0.8 mg (57% NRV)",
            "acido_pantotenico": "3 mg (50% NRV)",
            "vitamina_b6": "0.5 mg (36% NRV)",
            "biotina": "75 mcg (150% NRV)",
            "vitamina_e": "10 mg (83% NRV)",
            "folato": "100 mcg (50% NRV)",
            "magnesio": "71 mg (19% NRV)",
            "potassio": "300 mg (15% NRV)",
            "cloruro": "181.9 mg (23% NRV)",
            "calcio": "120 mg (15% NRV)",
            "creatina": "652 mg",
            "taurina": "250 mg",
            "l_leucina": "750 mg",
            "l_isoleucina": "375 mg",
            "l_valina": "375 mg",
            "l_glutammina": "100 mg",
            "glicina": "400 mg",
            "l_alanina": "600 mg",
            "l_acetilcarnitina": "50 mg",
            "acido_l_glutammico": "200 mg",
            "eleuterococco_e_s": "100 mg"
          }
        },
        "ingredienti": "Maltodestrine da mais, Fruttosio, Creatina monoidrato, L-Leucina, L-Alanina, Glicina, L-Isoleucina, L-Valina, acidificante: acido citrico; L-acido glutammico, L-Glutammina, Citrato di potassio, Cloruro di sodio, Vitamina C (acido L-ascorbico), Citrato di magnesio, L-acetilcarnitina tartrato, Eleuterococco e.s. [Eleutherococcus senticosus (Rupr. et Maxim.) Maxim.], Citrato di calcio, aromi, cloruro di potassio, Vitamina E (acetato di DL-alfa-tocoferile), edulcorante: sucralosio; colorante: betacarotene; acido pantotenico (D-pantotenato di calcio), Vitamina B2 (riboflavina), Vitamina B6 (piridossina cloridrato), Vitamina B1 (cloridrato di tiamina), acido folico (acido pteroil-monoglutammico), biotina (D-biotina).",
        "nota": "NRV: Valori Nutritivi di Riferimento (adulti) ai sensi del Reg. UE 1169/2011"
      })
    }).returning();

    const preGaraProduct = await db.insert(products).values({
      name: "Pre Gara Endurance 20 buste",
      slug: "pre-gara-endurance-20-buste",
      description: "Integratore pre-gara per massimizzare la resistenza",
      flavor: "Unico",
      size: "20 buste",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      groupId: preGaraGroup[0].id,
      features: preGaraGroup[0].features
    }).returning();

    await db.insert(productSizes).values({
      productId: preGaraProduct[0].id,
      value: "20",
      unit: "buste",
      price: 2650,
      isAvailable: true
    });

    await db.insert(productImages).values({
      productId: preGaraProduct[0].id,
      src: "pre-gara-endurance.png",
      alt: "Pre Gara Endurance",
      isPrimary: true
    });

    console.log("✅ Inseriti tutti i prodotti 9-20 del Batch 9!");
    console.log("🎉 Totale inserito: 12 prodotti con 23 varianti totali");

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9Products9to20()
  .then(() => {
    console.log("🎉 Inserimento prodotti 9-20 del Batch 9 completato!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });