import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9EthicSportCorrect() {
  console.log('🚀 INSERIMENTO ETHICSPORT CORRETTO - PREZZI ESATTI DAL FILE .MD...');

  try {
    const ethicsportBrand = await db.select().from(brands).where(eq(brands.name, 'EthicSport'));
    const ethicsportBrandId = ethicsportBrand[0].id;

    const accessoriCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'accessori'));
    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const supplementiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'supplementi'));
    const preWorkoutCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'pre-workout-energetici'));

    // ===================
    // PRODOTTO 13: Borraccia (PREZZI CORRETTI €3,00 e €3,50)
    // ===================
    console.log('13. Inserendo Borraccia (prezzi corretti €3,00 e €3,50)...');
    
    const [borracciaBrandGroup] = await db.insert(productGroups).values({
      slug: "borraccia-ethicsport",
      name: "Borraccia 600/800 ml",
      description: "Borraccia da 800ml in materiale pregiato, adatta per ciclismo e MTB. Lavabile, igienica, riutilizzabile, morbida, idonea alla conservazione di alimenti.",
      longDescription: "Borraccia da 800ml in materiale pregiato, adatta per ciclismo e MTB. Lavabile, igienica, riutilizzabile, morbida, idonea alla conservazione di alimenti.",
      features: [],
      howToUse: "Si consiglia il lavaggio a mano.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 600ml - €3,00 (CORRETTO)
    const [borraccia600Product] = await db.insert(products).values({
      slug: "borraccia-ethicsport-600ml",
      name: "Borraccia 600ml",
      groupId: borracciaBrandGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Borraccia sportiva EthicSport da 600ml in materiale pregiato.",
      flavor: "Unico",
      size: "600ml",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: borraccia600Product.id,
      value: "600",
      unit: "ml",
      price: 300 // €3,00 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: borraccia600Product.id,
      src: "borraccia-600.jpeg",
      alt: "Borraccia EthicSport 600ml",
      isPrimary: true
    });

    // Variante 2: 800ml - €3,50 (CORRETTO)
    const [borraccia800Product] = await db.insert(products).values({
      slug: "borraccia-ethicsport-800ml",
      name: "Borraccia 800ml",
      groupId: borracciaBrandGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Borraccia sportiva EthicSport da 800ml in materiale pregiato.",
      flavor: "Unico",
      size: "800ml",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: borraccia800Product.id,
      value: "800",
      unit: "ml",
      price: 350 // €3,50 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: borraccia800Product.id,
      src: "thumb.jpeg",
      alt: "Borraccia EthicSport 800ml",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 14: Sacca (PREZZO CORRETTO €6,00)
    // ===================
    console.log('14. Inserendo Sacca (prezzo corretto €6,00)...');
    
    const [saccaGroup] = await db.insert(productGroups).values({
      slug: "sacca",
      name: "Sacca",
      description: "Esclusiva sacca con logo EthicSport in poliestere 44X33 cm",
      longDescription: "Sacca con logo EthicSport adatta per tutte le occasioni.",
      features: [],
      howToUse: "Si consiglia il lavaggio a mano.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    const [saccaProduct] = await db.insert(products).values({
      slug: "sacca-taglia-unica",
      name: "Sacca Taglia Unica",
      groupId: saccaGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "Esclusiva sacca con logo EthicSport in poliestere 44X33 cm",
      flavor: "Unico",
      size: "Taglia Unica",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: saccaProduct.id,
      value: "1",
      unit: "pz",
      price: 600 // €6,00 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: saccaProduct.id,
      src: "sacca.jpeg",
      alt: "Sacca EthicSport Taglia Unica",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 15: T-Shirt (SLUG CORRETTO E PREZZO €19,90)
    // ===================
    console.log('15. Inserendo T-Shirt (slug corretto t-shirt-ethcisport-limited-edition)...');
    
    const [tshirtGroup] = await db.insert(productGroups).values({
      slug: "t-shirt-ethcisport-limited-edition", // ⚠️ SLUG CORRETTO SENZA "S"
      name: "T-Shirt EthicSport Limited Edition",
      description: "Esclusiva T-Shirt EthicSport in cotone di elevata qualità.",
      longDescription: "Esclusiva T-Shirt EthicSport in cotone di elevata qualità. E' un articolo esclusivo indossato dai nostri atleti e dai nostri ambassador. Disponibile nelle taglie: S, M, L, XL.",
      features: [],
      howToUse: "???", // Come specificato nel file .md
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    const sizes = ['S', 'M', 'L', 'XL'];
    for (const size of sizes) {
      const [tshirtProduct] = await db.insert(products).values({
        slug: `t-shirt-ethcisport-limited-edition-${size.toLowerCase()}`,
        name: `T-Shirt EthicSport Limited Edition ${size}`,
        groupId: tshirtGroup.id,
        brandId: ethicsportBrandId,
        categoryId: accessoriCategory[0].id,
        description: `Esclusiva T-Shirt EthicSport in cotone di elevata qualità, taglia ${size}.`,
        flavor: "Unico",
        size: size,
        isNew: false
      }).returning();

      await db.insert(productSizes).values({
        productId: tshirtProduct.id,
        value: "1",
        unit: "pz",
        price: 1990 // €19,90 (CORRETTO dal file .md)
      });

      await db.insert(productImages).values({
        productId: tshirtProduct.id,
        src: "magliette-ethicsport.png",
        alt: `T-Shirt EthicSport Limited Edition ${size}`,
        isPrimary: true
      });
    }

    // ===================
    // PRODOTTO 16: Cappellino (SLUG CON 3 P E PREZZO €19,90)
    // ===================
    console.log('16. Inserendo Cappellino (slug corretto capppellino-ethicsport)...');
    
    const [cappellinoGroup] = await db.insert(productGroups).values({
      slug: "capppellino-ethicsport", // ⚠️ SLUG CORRETTO CON 3 P
      name: "Cappellino EthicSport",
      description: "CAPPELLINO EthicSport con ricamo in 3D e dettagli sportivi",
      longDescription: "· Cappellino EthicSport con visiera piatta · Ricamo in 3D e dettagli laterali stampati in tono su tono, per un look moderno e sportivo · Struttura a sei pannelli · Visiera a sandwich bicolore · Interno personalizzato e rifinito in arancio · Chiusura regolabile sul retro per una vestibilità perfetta · Occhielli ricamati per un'eccellente traspirazione",
      features: [],
      howToUse: "Si consiglia il lavaggio a mano.",
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      isNew: false
    }).returning();

    const [cappellinoProduct] = await db.insert(products).values({
      slug: "capppellino-ethicsport-taglia-unica",
      name: "Cappellino EthicSport Taglia Unica",
      groupId: cappellinoGroup.id,
      brandId: ethicsportBrandId,
      categoryId: accessoriCategory[0].id,
      description: "CAPPELLINO EthicSport con ricamo in 3D e dettagli sportivi",
      flavor: "Unico",
      size: "Taglia Unica",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: cappellinoProduct.id,
      value: "1",
      unit: "pz",
      price: 1990 // €19,90 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: cappellinoProduct.id,
      src: "cappellino.jpeg",
      alt: "Cappellino EthicSport Taglia Unica",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 17: Ramtech BCAA (PREZZO CORRETTO €23,90)
    // ===================
    console.log('17. Inserendo Ramtech BCAA (prezzo corretto €23,90)...');
    
    const ramtechFeatures = [{
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
    }];

    const [ramtechGroup] = await db.insert(productGroups).values({
      slug: "ramtech-bcaa-2-1-1-ethicsport",
      name: "Ramtech - BCAA 2:1:1",
      description: "Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l'organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari.",
      longDescription: "Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l'organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari. Per questo sono considerati un valido supporto nutrizionale per chi svolge attività fisica.",
      features: ramtechFeatures,
      howToUse: "Si consiglia di assumere fino a 5 capsule al giorno, preferibilmente dopo l'allenamento o lontano dai pasti. In caso di allenamenti particolarmente lunghi o intensi, i BCAA possono essere utilizzati anche durante l'attività per sostenere l'organismo.",
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
      description: "Gli amminoacidi ramificati (BCAA) nel rapporto 2:1:1 con vitamine B1 e B6.",
      flavor: "Unico",
      size: "120 capsule",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: ramtechProduct.id,
      value: "120",
      unit: "capsule",
      price: 2390 // €23,90 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: ramtechProduct.id,
      src: "ramtech-bcaa.png",
      alt: "Ramtech - BCAA 2:1:1 120 capsule",
      isPrimary: true
    });

    console.log('✅ Prodotti EthicSport inseriti con prezzi corretti!');
    console.log('📊 Riepilogo correzioni EthicSport:');
    console.log('  🔧 Borraccia: €3,00 e €3,50 (era €8,90 e €9,90) ✓');
    console.log('  🔧 Sacca: €6,00 (era €14,90) ✓');
    console.log('  🔧 T-Shirt: slug corretto + €19,90 ✓');
    console.log('  🔧 Cappellino: slug corretto + €19,90 ✓');
    console.log('  🔧 Ramtech: €23,90 (era €21,90) ✓');

  } catch (error) {
    console.error('💥 Errore durante l\'inserimento EthicSport:', error);
    throw error;
  }
}

insertBatch9EthicSportCorrect()
  .then(() => {
    console.log("🎉 Inserimento EthicSport corretto completato!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });