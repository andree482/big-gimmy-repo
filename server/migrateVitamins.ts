import { db } from "./db";
import { productCategories, brands, products, productImages } from "@shared/schema";

async function migrateVitamins() {
  console.log("🔄 Iniziando migrazione vitamine e minerali...");

  // 1. Creo la categoria
  const [category] = await db.insert(productCategories).values({
    name: "Vitamine e Minerali",
    slug: "vitamine-e-minerali",
    description: "Integratori di vitamine, minerali e nutrienti essenziali per il benessere quotidiano"
  }).returning();
  console.log(`✅ Categoria creata: ${category.name}`);

  // 2. Creo i brand
  const [advanceBrand] = await db.insert(brands).values({
    name: "Advance Care",
    slug: "advance-care"
  }).returning();
  console.log(`✅ Brand creato: ${advanceBrand.name}`);

  const [wattBrand] = await db.insert(brands).values({
    name: "+Watt",
    slug: "watt"
  }).returning();
  console.log(`✅ Brand creato: ${wattBrand.name}`);

  const categoryId = category.id;
  const advanceBrandId = advanceBrand.id;
  const wattBrandId = wattBrand.id;

  // 3. Inserisco i prodotti
  const vitaminsProducts = [
    {
      name: "Antiradical Mix+",
      slug: "antiradical-mix-plus",
      description: "Integratore antiossidante con vitamina C, vitamina E e beta-carotene",
      price: 24.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "Antiradical mix+ 60 capsule q FRONTE.jpg"
    },
    {
      name: "Ashwagandha Pura",
      slug: "ashwagandha-pura",
      description: "Estratto secco di radice di Ashwagandha per gestire stress e benessere",
      price: 19.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "ASHWAGANDHA PURA_Fronte.jpg"
    },
    {
      name: "Astaxantina Softgel",
      slug: "astaxantina-softgel",
      description: "Potente antiossidante naturale con astaxantina, vitamina C e vitamina E",
      price: 22.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "ASTAXANTINA SOFTGEL_FRONTE.jpg"
    },
    {
      name: "CLA+",
      slug: "cla-plus",
      description: "Acido linoleico coniugato per il supporto del metabolismo dei grassi",
      price: 29.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "ADVANCE CLA_FRONTE.jpg"
    },
    {
      name: "Depur NAC",
      slug: "depur-nac",
      description: "N-acetil-L-cisteina con cardo mariano, inositolo e vitamina C",
      price: 26.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "ADVANCE DEPUR NAC_FRONTE.jpg"
    },
    {
      name: "Bromelina+ Enzymatic Activator",
      slug: "bromelina-plus",
      description: "Enzima proteolitico con bromelina e vitamina C per la digestione",
      price: 18.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "Bromelina_Fronte.jpg"
    },
    {
      name: "B Strong",
      slug: "b-strong",
      description: "Complesso di vitamine del gruppo B per energia e sistema nervoso",
      price: 16.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "B STRONG_Fronte.jpg"
    },
    {
      name: "Collagene+ Silicio Stabilizzato",
      slug: "collagene-plus",
      description: "Peptidi di collagene con silicio, magnesio, vitamina C e zinco",
      price: 34.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "Collagene_Fronte.jpg"
    },
    {
      name: "Comfort Vision",
      slug: "comfort-vision",
      description: "Supporto per la vista con luteina, astaxantina, zinco e vitamine",
      price: 21.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "Comfort Vision_Fronte.jpg"
    },
    {
      name: "Berberina+",
      slug: "berberina-plus",
      description: "Estratto naturale di berberina per il controllo del glucosio",
      price: 23.90,
      brandId: advanceBrandId,
      categoryId: categoryId,
      image: "BERBERINA 60 CAPSULE_FRONTE.jpg"
    },
    {
      name: "Dretox+",
      slug: "dretox-plus",
      description: "Integratore detox a base di estratti vegetali per depurare l'organismo",
      price: 19.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "DRETOX 450ML_FRONTE.jpg"
    },
    {
      name: "D-Ribosio",
      slug: "d-ribosio",
      description: "Integratore di D-ribosio per energia cellulare e performance",
      price: 28.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "D RIBOSIO_Fronte.jpg"
    },
    {
      name: "Electrolyte",
      slug: "electrolyte",
      description: "Reintegro di sali minerali ed elettroliti per l'idratazione",
      price: 15.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "ELECTROLYTE_Arancia_Fronte.jpg"
    },
    {
      name: "Energy Pump",
      slug: "energy-pump",
      description: "Integratore energetico al limone per prestazioni intense",
      price: 17.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "ENERGY PUMP_Limone_Fronte.jpg"
    },
    {
      name: "Enziplus",
      slug: "enziplus",
      description: "Complesso enzimatico per supportare la digestione e l'assorbimento",
      price: 20.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "ENZIPLUS CAPSULE fronte.jpg"
    },
    {
      name: "Ferro",
      slug: "ferro",
      description: "Integratore di ferro al gusto ribes per combattere la carenza",
      price: 14.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "FERRO_Ribes_Fronte.jpg"
    },
    {
      name: "Fluid Cramp",
      slug: "fluid-cramp",
      description: "Prevenzione crampi muscolari con magnesio e potassio",
      price: 16.90,
      brandId: wattBrandId,
      categoryId: categoryId,
      image: "FLUID CRAMP_Arancia_Fronte.jpg"
    }
  ];

  console.log(`🔄 Inserimento di ${vitaminsProducts.length} prodotti...`);

  for (const product of vitaminsProducts) {
    try {
      const [insertedProduct] = await db.insert(products).values({
        name: product.name,
        slug: product.slug,
        description: product.description,
        brandId: product.brandId,
        categoryId: product.categoryId
      }).returning();

      // Inserisco l'immagine principale
      await db.insert(productImages).values({
        productId: insertedProduct.id,
        src: `/images/${product.image}`,
        alt: product.name,
        isPrimary: true
      });

      console.log(`✅ Prodotto inserito: ${product.name}`);
    } catch (error) {
      console.error(`❌ Errore inserimento ${product.name}:`, error);
    }
  }

  console.log("✅ Migrazione vitamine e minerali completata!");
}

if (require.main === module) {
  migrateVitamins().catch(console.error);
}

export { migrateVitamins };