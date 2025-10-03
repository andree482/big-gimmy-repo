import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertPreGaraEndurance() {
  console.log("🚀 Inserimento ultimo prodotto Batch 9: Pre Gara Endurance");

  try {
    // Ottieni il brand EthicSport
    const ethicsportBrand = (await db.select().from(brands).where(eq(brands.slug, 'ethicsport')))[0];
    if (!ethicsportBrand) {
      throw new Error("Brand EthicSport non trovato");
    }

    // Ottieni le categorie esistenti
    const allCategories = await db.select().from(productCategories);
    const getCategory = (slug: string) => allCategories.find(c => c.slug === slug);

    // ===================
    // PRODOTTO 20: Pre Gara Endurance
    // ===================
    console.log("20. Pre Gara Endurance");
    
    const preGaraGroup = await db.insert(productGroups).values([
      {
        name: "Pre Gara Endurance",
        slug: "pre-gara-endurance-ethicsport",
      description: "PRE GARA ENDURANCE è un preparato energetico da utilizzare prima dell'attività sportiva per aumentare la resistenza alla fatica negli sport di lunga durata.",
      longDescription: "PRE GARA ENDURANCE è un preparato energetico da utilizzare prima dell'attività sportiva per migliorare la performance negli sport di lunga durata. La formulazione bilancia carboidrati ad alta digeribilità con fruttosio per fornire energia rapida e prolungata. È arricchito con vitamine del gruppo B, vitamina C e magnesio per supportare il metabolismo energetico e ridurre la stanchezza e l'affaticamento.",
      howToUse: "Sciogliere il contenuto di una busta (45g) in 300ml di acqua. Assumere 1-2 ore prima dell'attività sportiva.",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      features: [
        "Preparato energetico per sport di lunga durata",
        "Bilancia carboidrati ad alta digeribilità con fruttosio",
        "Arricchito con vitamine del gruppo B, vitamina C e magnesio",
        "Supporta il metabolismo energetico",
        "Riduce stanchezza e affaticamento"
      ]
      }
    ]).returning();

    const preGaraProduct = await db.insert(products).values({
      name: "Pre Gara Endurance 20 buste",
      slug: "pre-gara-endurance-20-buste",
      description: "Preparato energetico per sport di lunga durata",
      flavor: "Unico",
      size: "20 buste",
      brandId: ethicsportBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      groupId: preGaraGroup[0].id,
      features: preGaraGroup[0].features
    }).returning();

    await db.insert(productSizes).values([{
      productId: preGaraProduct[0].id,
      value: "20",
      unit: "buste",
      price: 2650
    }]);

    await db.insert(productImages).values({
      productId: preGaraProduct[0].id,
      src: "pre-gara-endurance.png",
      alt: "Pre Gara Endurance - Preparato energetico",
      isPrimary: true
    });

    console.log("✅ Inserito Pre Gara Endurance!");
    console.log("🎉 Batch 9 completato al 100% - Tutti i 20 prodotti inseriti!");

  } catch (error) {
    console.error("💥 Errore:", error);
    throw error;
  }
}

// Eseguire la funzione
insertPreGaraEndurance()
  .then(() => {
    console.log("🎉 Inserimento ultimo prodotto Batch 9 completato!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });