import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9ProductsFinal() {
  console.log("🚀 Avvio inserimento Batch 9 - FINALE (prodotti 13-20 EthicSport)...");

  try {
    // Ottenere i brand ID necessari
    const ethicsportBrand = await db.select().from(brands).where(eq(brands.name, 'EthicSport'));
    const ethicsportBrandId = ethicsportBrand[0].id;

    // Ottenere le categorie necessarie
    const accessoriCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'accessori'));
    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const supplementiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'supplementi'));

    // ===================
    // PRODOTTO 13: Borraccia
    // ===================
    console.log("13. Inserendo Borraccia EthicSport...");
    
    const borracciaBrandFeatures = [{
      "titolo": "Borraccia Sportiva EthicSport",
      "caratteristiche": {
        "materiale": "Plastica BPA FREE",
        "caratteristiche": "Antiperdita, facile pulizia, graduata",
        "uso": "Ideale per sport e tempo libero",
        "design": "Ergonomica con logo EthicSport"
      }
    }];

    const [borracciaBrandGroup] = await db.insert(productGroups).values({
      slug: "borraccia-ethicsport",
      name: "Borraccia",
      description: "Borraccia sportiva EthicSport in plastica BPA FREE, antiperdita e facile da pulire. Disponibile in diverse dimensioni.",
      longDescription: "Borraccia sportiva EthicSport realizzata in plastica BPA FREE di alta qualità. Design ergonomico e funzionale con sistema antiperdita. Graduata per misurare con precisione la quantità di liquidi. Ideale per accompagnare gli sportivi durante allenamenti e gare. Facile da pulire e riutilizzare.",
      features: borracciaBrandFeatures,
      howToUse: "Riempire con la bevanda desiderata e utilizzare durante l'attività sportiva. Lavare accuratamente dopo l'uso.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 600ml
    const [borraccia600Product] = await db.insert(products).values({
      slug: "borraccia-ethicsport-600ml",
      name: "Borraccia 600ml",
      groupId: borracciaBrandGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Borraccia sportiva EthicSport da 600ml in plastica BPA FREE, antiperdita e facile da pulire.",
      flavor: "Unico",
      size: "600ml",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: borraccia600Product.id,
      value: "600",
      unit: "ml",
      price: 890 // 8,90€
    });

    await db.insert(productImages).values({
      productId: borraccia600Product.id,
      src: "BORRACCIA-ETHICSPORT-SITO.png",
      alt: "Borraccia EthicSport 600ml",
      isPrimary: true
    });

    // Variante 2: 800ml
    const [borraccia800Product] = await db.insert(products).values({
      slug: "borraccia-ethicsport-800ml",
      name: "Borraccia 800ml",
      groupId: borracciaBrandGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Borraccia sportiva EthicSport da 800ml in plastica BPA FREE, antiperdita e facile da pulire.",
      flavor: "Unico",
      size: "800ml",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: borraccia800Product.id,
      value: "800",
      unit: "ml",
      price: 990 // 9,90€
    });

    await db.insert(productImages).values({
      productId: borraccia800Product.id,
      src: "BORRACCIA-ETHICSPORT-SITO.png",
      alt: "Borraccia EthicSport 800ml",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 14: Sacca
    // ===================
    console.log("14. Inserendo Sacca EthicSport...");
    
    const saccaFeatures = [{
      "titolo": "Sacca Sportiva EthicSport",
      "caratteristiche": {
        "materiale": "Tessuto resistente",
        "caratteristiche": "Leggera, pratica, con logo EthicSport",
        "uso": "Ideale per palestra e sport",
        "design": "Funzionale con manici comodi"
      }
    }];

    const [saccaGroup] = await db.insert(productGroups).values({
      slug: "sacca-ethicsport",
      name: "Sacca",
      description: "Sacca sportiva EthicSport in tessuto resistente, leggera e pratica per trasportare l'attrezzatura sportiva.",
      longDescription: "Sacca sportiva EthicSport realizzata in tessuto resistente e di qualità. Design funzionale e leggero, ideale per trasportare indumenti e attrezzature per la palestra o lo sport. Dotata di manici comodi e logo EthicSport. Facile da ripiegare e conservare quando non utilizzata.",
      features: saccaFeatures,
      howToUse: "Utilizzare per trasportare indumenti e attrezzature sportive. Lavare a mano quando necessario.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    const [saccaProduct] = await db.insert(products).values({
      slug: "sacca-ethicsport-taglia-unica",
      name: "Sacca Taglia Unica",
      groupId: saccaGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Sacca sportiva EthicSport in tessuto resistente, leggera e pratica per trasportare l'attrezzatura sportiva.",
      flavor: "Unico",
      size: "Taglia Unica",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: saccaProduct.id,
      value: "1",
      unit: "pz",
      price: 1490 // 14,90€
    });

    await db.insert(productImages).values({
      productId: saccaProduct.id,
      src: "SACCA-ETHICSPORT-SITO.png",
      alt: "Sacca EthicSport Taglia Unica",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 15: T-Shirt EthicSport Limited Edition
    // ===================
    console.log("15. Inserendo T-Shirt EthicSport Limited Edition...");
    
    const tshirtFeatures = [{
      "titolo": "T-Shirt Sportiva Limited Edition",
      "caratteristiche": {
        "materiale": "100% Cotone di qualità",
        "caratteristiche": "Traspirante, comoda, stampa di qualità",
        "design": "Limited Edition con logo EthicSport",
        "taglie": "Disponibile in S, M, L, XL"
      }
    }];

    const [tshirtGroup] = await db.insert(productGroups).values({
      slug: "t-shirt-ethicsport-limited-edition",
      name: "T-Shirt EthicSport Limited Edition",
      description: "T-Shirt sportiva EthicSport Limited Edition in cotone 100%, traspirante e comoda. Edizione limitata con stampa di qualità.",
      longDescription: "T-Shirt sportiva EthicSport Limited Edition realizzata in cotone 100% di alta qualità. Traspirante e comoda, ideale per l'allenamento e il tempo libero. Stampa Limited Edition di qualità con logo EthicSport. Design moderno e vestibilità perfetta. Disponibile in diverse taglie per adattarsi a ogni fisicità.",
      features: tshirtFeatures,
      howToUse: "Indossare durante l'allenamento o nel tempo libero. Lavare in lavatrice a 30°C.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    // 4 varianti: S, M, L, XL
    const sizes = ['S', 'M', 'L', 'XL'];
    for (const size of sizes) {
      const [tshirtProduct] = await db.insert(products).values({
        slug: `t-shirt-ethicsport-limited-edition-${size.toLowerCase()}`,
        name: `T-Shirt EthicSport Limited Edition ${size}`,
        groupId: tshirtGroup.id,
        brandId: ethicsportBrandId,
        categoryId: accessoriCategory[0].id,
        description: `T-Shirt sportiva EthicSport Limited Edition in cotone 100%, taglia ${size}.`,
        flavor: "Unico",
        size: size,
        isNew: false
      }).returning();

      await db.insert(productSizes).values({
        productId: tshirtProduct.id,
        value: "1",
        unit: "pz",
        price: 1990 // 19,90€
      });

      await db.insert(productImages).values({
        productId: tshirtProduct.id,
        src: "T-SHIRT-ETHICSPORT-LIMITED-EDITION-SITO.png",
        alt: `T-Shirt EthicSport Limited Edition ${size}`,
        isPrimary: true
      });

      console.log(`  ✅ Inserito: T-Shirt ${size}`);
    }

    // ===================
    // PRODOTTO 16: Cappellino
    // ===================
    console.log("16. Inserendo Cappellino EthicSport...");
    
    const cappellinoFeatures = [{
      "titolo": "Cappellino Sportivo EthicSport",
      "caratteristiche": {
        "materiale": "Tessuto tecnico traspirante",
        "caratteristiche": "Regolabile, leggero, protezione UV",
        "design": "Moderno con logo EthicSport ricamato",
        "taglia": "Taglia unica regolabile"
      }
    }];

    const [cappellinoGroup] = await db.insert(productGroups).values({
      slug: "cappellino-ethicsport",
      name: "Cappellino",
      description: "Cappellino sportivo EthicSport in tessuto tecnico traspirante, regolabile e con protezione UV.",
      longDescription: "Cappellino sportivo EthicSport realizzato in tessuto tecnico traspirante. Regolabile per adattarsi perfettamente a ogni testa. Leggero e confortevole, offre protezione dai raggi UV durante l'attività all'aperto. Logo EthicSport ricamato di alta qualità. Design moderno e sportivo, ideale per running, ciclismo e attività outdoor.",
      features: cappellinoFeatures,
      howToUse: "Indossare durante l'attività sportiva all'aperto per protezione e comfort. Lavare a mano quando necessario.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    const [cappellinoProduct] = await db.insert(products).values({
      slug: "cappellino-ethicsport-taglia-unica",
      name: "Cappellino Taglia Unica",
      groupId: cappellinoGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Cappellino sportivo EthicSport in tessuto tecnico traspirante, regolabile e con protezione UV.",
      flavor: "Unico",
      size: "Taglia Unica",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: cappellinoProduct.id,
      value: "1",
      unit: "pz",
      price: 1290 // 12,90€
    });

    await db.insert(productImages).values({
      productId: cappellinoProduct.id,
      src: "CAPPELLINO-ETHICSPORT-SITO.png",
      alt: "Cappellino EthicSport Taglia Unica",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 17: Ramtech - BCAA 2:1:1
    // ===================
    console.log("17. Inserendo Ramtech - BCAA 2:1:1...");
    
    const ramtechFeatures = [{
      "titolo": "Aminoacidi Ramificati BCAA 2:1:1",
      "valori_nutrizionali": {
        "per_porzione_4_capsule": {
          "l_leucina": "1000 mg",
          "l_isoleucina": "500 mg",
          "l_valina": "500 mg"
        }
      },
      "ingredienti": "L-Leucina, L-Isoleucina, L-Valina, involucro della capsula: gelatina; agente antiagglomerante: sali di magnesio degli acidi grassi."
    }];

    const [ramtechGroup] = await db.insert(productGroups).values({
      slug: "ramtech-bcaa-2-1-1-ethicsport",
      name: "Ramtech - BCAA 2:1:1",
      description: "RAMTECH - BCAA 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in capsule nel rapporto 2:1:1.",
      longDescription: "RAMTECH - BCAA 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in capsule nel rapporto 2:1:1. Gli aminoacidi ramificati sono componenti essenziali delle proteine muscolari e vengono utilizzati come fonte energetica durante l'attività fisica. La pratica forma in capsule facilita l'assunzione e il dosaggio preciso.",
      features: ramtechFeatures,
      howToUse: "Assumere 4 capsule al giorno con acqua, preferibilmente prima e dopo l'allenamento.",
      brandId: ethicsportBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    const [ramtechProduct] = await db.insert(products).values({
      slug: "ramtech-bcaa-2-1-1-120-capsule",
      name: "Ramtech - BCAA 2:1:1 120 capsule",
      groupId: ramtechGroup.id,
      brandId: ethicsportBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "RAMTECH - BCAA 2:1:1 è un integratore alimentare di aminoacidi ramificati (BCAA) in capsule nel rapporto 2:1:1.",
      flavor: "Unico",
      size: "120 capsule",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: ramtechProduct.id,
      value: "120",
      unit: "capsule",
      price: 2190 // 21,90€
    });

    await db.insert(productImages).values({
      productId: ramtechProduct.id,
      src: "RAMTECH-BCAA-2-1-1-SITO.png",
      alt: "Ramtech - BCAA 2:1:1 120 capsule",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 18: OMNIA Active Formula
    // ===================
    console.log("18. Inserendo OMNIA Active Formula...");
    
    const omniaFeatures = [{
      "titolo": "Multivitaminico e Minerali per Sportivi",
      "valori_nutrizionali": {
        "per_capsula": {
          "vitamina_c": "80 mg (100% VNR)",
          "vitamina_e": "12 mg (100% VNR)",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)",
          "acido_folico": "200 mcg (100% VNR)",
          "biotina": "50 mcg (100% VNR)",
          "acido_pantotenico": "6 mg (100% VNR)",
          "ferro": "14 mg (100% VNR)",
          "zinco": "10 mg (100% VNR)",
          "rame": "1 mg (100% VNR)",
          "manganese": "2 mg (100% VNR)",
          "iodio": "150 mcg (100% VNR)",
          "selenio": "55 mcg (100% VNR)"
        }
      },
      "ingredienti": "Agente di carica: cellulosa microcristallina; solfato ferroso, ossido di zinco, acido L-ascorbico (vitamina C), DL-alfa tocoferilacetato (vitamina E), solfato di manganese, solfato di rame, involucro della capsula: gelatina; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; tiamina mononitrato (vitamina B1), riboflavina (vitamina B2), piridossina cloridrato (vitamina B6), acido pteroilmonoglutammico (acido folico), D-biotina, acido pantotenico, selenito di sodio, ioduro di potassio, cianocobalamina (vitamina B12).",
      "nota": "VNR = Valori nutrizionali di riferimento"
    }];

    const [omniaGroup] = await db.insert(productGroups).values({
      slug: "omnia-active-formula-ethicsport",
      name: "OMNIA Active Formula",
      description: "OMNIA ACTIVE FORMULA è un integratore alimentare multivitaminico e minerale specificamente formulato per le esigenze degli sportivi attivi.",
      longDescription: "OMNIA ACTIVE FORMULA è un integratore alimentare multivitaminico e minerale completo, specificamente formulato per supportare le esigenze nutrizionali degli sportivi attivi. Contiene un'ampia gamma di vitamine e minerali essenziali al 100% del valore nutrizionale di riferimento per capsula. Ideale per chi pratica sport regolarmente e ha bisogno di un supporto nutrizionale completo.",
      features: omniaFeatures,
      howToUse: "Assumere 1 capsula al giorno con acqua, preferibilmente durante i pasti.",
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      isNew: false
    }).returning();

    const [omniaProduct] = await db.insert(products).values({
      slug: "omnia-active-formula-45-capsule",
      name: "OMNIA Active Formula 45 capsule",
      groupId: omniaGroup.id,
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      description: "OMNIA ACTIVE FORMULA è un integratore alimentare multivitaminico e minerale specificamente formulato per le esigenze degli sportivi attivi.",
      flavor: "Unico",
      size: "45 capsule",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: omniaProduct.id,
      value: "45",
      unit: "capsule",
      price: 1690 // 16,90€
    });

    await db.insert(productImages).values({
      productId: omniaProduct.id,
      src: "OMNIA-ACTIVE-FORMULA-SITO.png",
      alt: "OMNIA Active Formula 45 capsule",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 19: Super Hydro Tabs
    // ===================
    console.log("19. Inserendo Super Hydro Tabs...");
    
    const hydroTabsFeatures = [{
      "titolo": "Integratore Idro-Salino in Compresse Effervescenti",
      "valori_nutrizionali": {
        "per_compressa": {
          "vitamina_c": "80 mg (100% VNR)",
          "sodio": "200 mg",
          "potassio": "150 mg",
          "magnesio": "56 mg (15% VNR)",
          "calcio": "120 mg (15% VNR)"
        }
      },
      "ingredienti": "Acidificanti: acido citrico, acido malico; bicarbonato di sodio, cloruro di potassio, carbonato di magnesio, carbonato di calcio, acido L-ascorbico (vitamina C), aromi, dolcificanti: sorbitolo, sucralosio; agente antiagglomerante: polietilenglicole.",
      "nota": "VNR = Valori nutrizionali di riferimento"
    }];

    const [hydroTabsGroup] = await db.insert(productGroups).values({
      slug: "super-hydro-tabs-ethicsport",
      name: "Super Hydro Tabs",
      description: "SUPER HYDRO TABS è un integratore alimentare idro-salino in compresse effervescenti, con vitamine e minerali per il reintegro dei sali persi con la sudorazione.",
      longDescription: "SUPER HYDRO TABS è un integratore alimentare idro-salino in compresse effervescenti, specificamente formulato per il reintegro dei sali minerali persi con la sudorazione durante l'attività fisica. Arricchito con vitamina C e disponibile in gusti rinfrescanti. Le compresse effervescenti si sciolgono rapidamente in acqua creando una bevanda isotonica dal sapore gradevole.",
      features: hydroTabsFeatures,
      howToUse: "Sciogliere 1 compressa in 500 ml di acqua e assumere durante o dopo l'attività fisica per il reintegro dei sali minerali.",
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: Limone
    const [hydroTabsProduct1] = await db.insert(products).values({
      slug: "super-hydro-tabs-limone-20-compresse",
      name: "Super Hydro Tabs Limone 20 compresse",
      groupId: hydroTabsGroup.id,
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      description: "SUPER HYDRO TABS è un integratore alimentare idro-salino in compresse effervescenti al gusto limone.",
      flavor: "Limone",
      size: "20 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hydroTabsProduct1.id,
      value: "20",
      unit: "compresse",
      price: 890 // 8,90€
    });

    await db.insert(productImages).values({
      productId: hydroTabsProduct1.id,
      src: "SUPER-HYDRO-TABS-SITO.png",
      alt: "Super Hydro Tabs Limone 20 compresse",
      isPrimary: true
    });

    // Variante 2: Arancio
    const [hydroTabsProduct2] = await db.insert(products).values({
      slug: "super-hydro-tabs-arancio-20-compresse",
      name: "Super Hydro Tabs Arancio 20 compresse",
      groupId: hydroTabsGroup.id,
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      description: "SUPER HYDRO TABS è un integratore alimentare idro-salino in compresse effervescenti al gusto arancio.",
      flavor: "Arancio",
      size: "20 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: hydroTabsProduct2.id,
      value: "20",
      unit: "compresse",
      price: 890 // 8,90€
    });

    await db.insert(productImages).values({
      productId: hydroTabsProduct2.id,
      src: "SUPER-HYDRO-TABS-SITO.png",
      alt: "Super Hydro Tabs Arancio 20 compresse",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 20: Pre Gara Endurance
    // ===================
    console.log("20. Inserendo Pre Gara Endurance (ULTIMO PRODOTTO!)...");
    
    const preGaraFeatures = [{
      "titolo": "Integratore Pre-Gara per Endurance",
      "valori_nutrizionali": {
        "per_busta_30g": {
          "valore_energetico": "486 kj / 114 kcal",
          "grassi": "0 g",
          "di_cui_saturi": "0 g",
          "carboidrati": "28 g",
          "di_cui_zuccheri": "20 g",
          "proteine": "0 g",
          "sale": "0,1 g",
          "vitamina_c": "80 mg (100% VNR)",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "caffeina": "75 mg"
        }
      },
      "ingredienti": "Destrosio, fruttosio, maltodestrine, acidificante: acido citrico; aromi, vitamina C (acido L-ascorbico), colorante: betacarotene; caffeina, vitamina B1 (tiamina mononitrato), vitamina B6 (piridossina cloridrato), dolcificante: sucralosio.",
      "nota": "VNR = Valori nutrizionali di riferimento"
    }];

    const [preGaraGroup] = await db.insert(productGroups).values({
      slug: "pre-gara-endurance-ethicsport",
      name: "Pre Gara Endurance",
      description: "PRE GARA ENDURANCE è un integratore alimentare specifico per la preparazione pre-gara negli sport di endurance, con carboidrati, vitamine e caffeina.",
      longDescription: "PRE GARA ENDURANCE è un integratore alimentare specificamente formulato per la preparazione pre-gara negli sport di endurance. Contiene un mix bilanciato di carboidrati a diversa velocità di assorbimento (destrosio, fruttosio, maltodestrine), vitamine del gruppo B e vitamina C per il supporto energetico, e caffeina per migliorare la concentrazione e le prestazioni. Ideale da assumere prima di gare di lunga durata.",
      features: preGaraFeatures,
      howToUse: "Sciogliere il contenuto di 1 busta (30g) in 500 ml di acqua e assumere 30-60 minuti prima della gara o dell'allenamento intenso.",
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      isNew: false
    }).returning();

    const [preGaraProduct] = await db.insert(products).values({
      slug: "pre-gara-endurance-20-buste",
      name: "Pre Gara Endurance 20 buste",
      groupId: preGaraGroup.id,
      brandId: ethicsportBrandId,
      categoryId: supplementiCategory[0].id,
      description: "PRE GARA ENDURANCE è un integratore alimentare specifico per la preparazione pre-gara negli sport di endurance, con carboidrati, vitamine e caffeina.",
      flavor: "Arancia",
      size: "20 buste",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: preGaraProduct.id,
      value: "20",
      unit: "buste",
      price: 1990 // 19,90€
    });

    await db.insert(productImages).values({
      productId: preGaraProduct.id,
      src: "PRE-GARA-ENDURANCE-SITO.png",
      alt: "Pre Gara Endurance 20 buste",
      isPrimary: true
    });

    console.log("🎉 COMPLETATO! Tutti i 20 prodotti del Batch 9 sono stati inseriti con successo!");

  } catch (error) {
    console.error("💥 Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9ProductsFinal()
  .then(() => {
    console.log("🎉🎉🎉 INSERIMENTO BATCH 9 COMPLETATO AL 100%! 🎉🎉🎉");
    console.log("✅ Tutti i 20 prodotti sono stati inseriti correttamente nel database!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });