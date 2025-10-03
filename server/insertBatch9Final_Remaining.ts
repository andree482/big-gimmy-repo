import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9FinalRemaining() {
  console.log('🚀 INSERIMENTO FINALE - ULTIMI 11 PRODOTTI CON DATI CORRETTI...');

  try {
    const premierBrand = await db.select().from(brands).where(eq(brands.name, 'Premier'));
    const ethicsportBrand = await db.select().from(brands).where(eq(brands.name, 'EthicSport'));
    
    const premierBrandId = premierBrand[0].id;
    const ethicsportBrandId = ethicsportBrand[0].id;

    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const proteineCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'proteine'));
    const supplementiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'supplementi'));
    const alimentiFitCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'alimenti-fit'));
    const preWorkoutCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'pre-workout-energetici'));

    // Inserimento rapido dei prodotti rimanenti con dati corretti dal file .md

    // PRODOTTO 5: Glutamine Pure 100%
    console.log('5. Inserendo Glutamine Pure 100%...');
    const [glutamine100Group] = await db.insert(productGroups).values({
      slug: "glutamine-pure-100",
      name: "Glutamine Pure 100%",
      description: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere.",
      longDescription: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere. La L-Glutammina è l'aminoacido più presente nel corpo umano.",
      features: [],
      howToUse: "Assumere 10 g di prodotto (1 misurino) al giorno.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // 2 varianti: 200g e 400g con prezzi corretti dal file .md
    const glutamine100Variants = [
      { size: "200g", price: 2490 }, // €24,90
      { size: "400g", price: 4290 }  // €42,90
    ];

    for (const variant of glutamine100Variants) {
      const [product] = await db.insert(products).values({
        slug: `glutamine-pure-100-${variant.size}`,
        name: `Glutamine Pure 100% ${variant.size}`,
        groupId: glutamine100Group.id,
        brandId: premierBrandId,
        categoryId: aminoacidiCategory[0].id,
        description: "GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina in polvere.",
        flavor: "Unico",
        size: variant.size,
        isNew: false
      }).returning();

      await db.insert(productSizes).values({
        productId: product.id,
        value: variant.size.replace('g', ''),
        unit: "g",
        price: variant.price
      });

      await db.insert(productImages).values({
        productId: product.id,
        src: "GLUTAMINE-PURE-100-SITO.png",
        alt: `Glutamine Pure 100% ${variant.size}`,
        isPrimary: true
      });
    }

    // PRODOTTO 6: Maltodex Pure 100%
    console.log('6. Inserendo Maltodex Pure 100%...');
    const [maltodexGroup] = await db.insert(productGroups).values({
      slug: "maltodex-pure-100",
      name: "Maltodex Pure 100%",
      description: "MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais.",
      longDescription: "MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais. Le maltodestrine sono carboidrati complessi.",
      features: [],
      howToUse: "Assumere fino a 60 g di prodotto (3 misurini) in 250 ml d'acqua al giorno.",
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
      price: 1890 // €18,90 dal file .md
    });

    await db.insert(productImages).values({
      productId: maltodexProduct.id,
      src: "MALTODEX-PURE-100-SITO.png",
      alt: "Maltodex Pure 100% 1,1kg",
      isPrimary: true
    });

    // PRODOTTO 18: OMNIA Active Formula (PREZZO CORRETTO €19,90)
    console.log('18. Inserendo OMNIA Active Formula (prezzo corretto €19,90)...');
    const [omniaGroup] = await db.insert(productGroups).values({
      slug: "omnia-active-formula",
      name: "OMNIA Active Formula",
      description: "Integratore di vitamine e minerali ad alto dosaggio, per contrastare debilitazione e stanchezza, o per chi svolge attività fisiche intense. Utile per ricaricare l'organismo di vitamine.",
      longDescription: "OMNIA® Active Formula è un integratore alimentare di vitamine e minerali con fosfatidilcolina.",
      features: [],
      howToUse: "1 Capsula al giorno.",
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
      description: "Integratore di vitamine e minerali ad alto dosaggio per sportivi attivi.",
      flavor: "Unico",
      size: "45 capsule",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: omniaProduct.id,
      value: "45",
      unit: "capsule",
      price: 1990 // €19,90 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: omniaProduct.id,
      src: "omina-active-formula.png",
      alt: "OMNIA Active Formula 45 capsule",
      isPrimary: true
    });

    // PRODOTTO 19: Super Hydro Tabs (SLUG E PREZZO CORRETTI)
    console.log('19. Inserendo Super Hydro Tabs (slug corretto super-hydro-plus e prezzo €9,50)...');
    const [hydroTabsGroup] = await db.insert(productGroups).values({
      slug: "super-hydro-plus", // ⚠️ SLUG CORRETTO DAL FILE .MD
      name: "Super Hydro Tabs",
      description: "Integratore alimentare idrosalino, senza zuccheri, ipotonico e zero calorie!",
      longDescription: "SuperHydro Tabs è un integratore alimentare idrosalino in compresse, senza zuccheri aggiunti e senza calorie.",
      features: [],
      howToUse: "Sciogliere 1 compressa in circa 500 ml di acqua. Assumere ad intervalli regolari di 15-20 minuti.",
      brandId: ethicsportBrandId,
      categoryId: preWorkoutCategory[0].id,
      isNew: false
    }).returning();

    // 2 varianti: Limone e Arancio
    const hydroFlavors = ['Limone', 'Arancio'];
    for (const flavor of hydroFlavors) {
      const [hydroProduct] = await db.insert(products).values({
        slug: `super-hydro-plus-${flavor.toLowerCase()}-20-compresse`,
        name: `Super Hydro Tabs ${flavor} 20 compresse`,
        groupId: hydroTabsGroup.id,
        brandId: ethicsportBrandId,
        categoryId: preWorkoutCategory[0].id,
        description: `Integratore alimentare idrosalino in compresse effervescenti al gusto ${flavor}.`,
        flavor: flavor,
        size: "20 compresse",
        isNew: false
      }).returning();

      await db.insert(productSizes).values({
        productId: hydroProduct.id,
        value: "20",
        unit: "compresse",
        price: 950 // €9,50 (CORRETTO dal file .md)
      });

      const imageName = flavor === 'Limone' ? 'super-hydro-tabs-limone.png' : 'super-hydro-tabs-arancio.png';
      await db.insert(productImages).values({
        productId: hydroProduct.id,
        src: imageName,
        alt: `Super Hydro Tabs ${flavor} 20 compresse`,
        isPrimary: true
      });
    }

    // PRODOTTO 20: Pre Gara Endurance (PREZZO CORRETTO €26,50)
    console.log('20. Inserendo Pre Gara Endurance (prezzo corretto €26,50)...');
    const [preGaraGroup] = await db.insert(productGroups).values({
      slug: "pre-gara-endurance",
      name: "Pre Gara Endurance",
      description: "Integratore alimentare studiato per massimizzare la resistenza.",
      longDescription: "Il prodotto permette di realizzare una soluzione di carboidrati complessi ed elettroliti, utile al mantenimento di prestazioni di resistenza durante l'esercizio fisico prolungato.",
      features: [],
      howToUse: "Si consiglia l'utilizzo del prodotto circa 30min. prima dell'impegno sportivo. Utilizzare 1 busta in circa 200 ml di acqua per attività di media durata.",
      brandId: ethicsportBrandId,
      categoryId: preWorkoutCategory[0].id,
      isNew: false
    }).returning();

    const [preGaraProduct] = await db.insert(products).values({
      slug: "pre-gara-endurance-20-buste",
      name: "Pre Gara Endurance 20 buste",
      groupId: preGaraGroup.id,
      brandId: ethicsportBrandId,
      categoryId: preWorkoutCategory[0].id,
      description: "Integratore alimentare studiato per massimizzare la resistenza durante l'esercizio fisico prolungato.",
      flavor: "Unico",
      size: "19g - 20 buste",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: preGaraProduct.id,
      value: "20",
      unit: "buste",
      price: 2650 // €26,50 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: preGaraProduct.id,
      src: "pre-gara-endurance.png",
      alt: "Pre Gara Endurance 20 buste",
      isPrimary: true
    });

    console.log('🎉 COMPLETATO! Tutti i prodotti rimanenti inseriti con dati corretti!');
    console.log('📊 Riepilogo finale correzioni critiche:');
    console.log('  🔧 Hard Start X-Plode: slug "hard-staart-x-plode" ✓');
    console.log('  🔧 Borraccia: €3,00 e €3,50 (era €8,90 e €9,90) ✓');
    console.log('  🔧 Sacca: €6,00 (era €14,90) ✓');
    console.log('  🔧 T-Shirt: slug "t-shirt-ethcisport-limited-edition" ✓');
    console.log('  🔧 Cappellino: slug "capppellino-ethicsport" + €19,90 ✓');
    console.log('  🔧 OMNIA: €19,90 (era €16,90) ✓');
    console.log('  🔧 Super Hydro: slug "super-hydro-plus" + €9,50 ✓');
    console.log('  🔧 Pre Gara: €26,50 (era €19,90) ✓');

  } catch (error) {
    console.error('💥 Errore durante l\'inserimento finale:', error);
    throw error;
  }
}

insertBatch9FinalRemaining()
  .then(() => {
    console.log("🎉🎉🎉 BATCH 9 COMPLETATO AL 100% CON DATI CORRETTI! 🎉🎉🎉");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });