import { db } from "./db";
import { productCategories, brands, products } from "@shared/schema";
import { proteinProducts, aminoacidProducts } from "../client/src/lib/products";

async function migrateProducts() {
  console.log("Iniziando migrazione prodotti al database...");

  try {
    // 1. Crea le categorie principali
    const categories = [
      {
        name: "Proteine",
        slug: "proteine",
        description: "Proteine del siero del latte, caseine e proteine isolate per la crescita muscolare",
        image: null
      },
      {
        name: "Aminoacidi",
        slug: "aminoacidi", 
        description: "BCAA, EAA e aminoacidi essenziali per il recupero e la performance",
        image: null
      },
      {
        name: "Pre-Workout",
        slug: "pre-workout",
        description: "Integratori energetici e stimolanti per massimizzare l'allenamento",
        image: null
      },
      {
        name: "Creatina",
        slug: "creatina",
        description: "Creatina monoidrato e altre forme per forza e potenza muscolare",
        image: null
      },
      {
        name: "Vitamine e Minerali",
        slug: "vitamine-minerali",
        description: "Multivitaminici e integratori per il benessere generale",
        image: null
      },
      {
        name: "Accessori",
        slug: "accessori",
        description: "Shaker, abbigliamento e accessori per il fitness",
        image: null
      }
    ];

    const insertedCategories = await db.insert(productCategories).values(categories).returning();
    console.log(`✓ Create ${insertedCategories.length} categorie`);

    // 2. Crea i brand
    const brandData = [
      {
        name: "+Watt",
        slug: "plus-watt",
        description: "Brand italiano leader negli integratori sportivi",
        website: "https://www.pluswatt.it",
        logo: null
      },
      {
        name: "MyProtein", 
        slug: "myprotein",
        description: "Brand britannico specializzato in nutrizione sportiva",
        website: "https://www.myprotein.it",
        logo: null
      }
    ];

    const insertedBrands = await db.insert(brands).values(brandData).returning();
    console.log(`✓ Creati ${insertedBrands.length} brand`);

    // 3. Trova gli ID delle categorie e brand
    const proteineCategory = insertedCategories.find(c => c.slug === "proteine");
    const aminoacidiCategory = insertedCategories.find(c => c.slug === "aminoacidi");
    const plusWattBrand = insertedBrands.find(b => b.slug === "plus-watt");
    const myProteinBrand = insertedBrands.find(b => b.slug === "myprotein");

    if (!proteineCategory || !aminoacidiCategory || !plusWattBrand) {
      throw new Error("Categorie o brand +Watt non trovati");
    }

    // 4. Migra i prodotti proteine esistenti
    const proteinProductData = proteinProducts.map(product => {
      let brandId = plusWattBrand.id;
      if (product.brand === "MyProtein") {
        brandId = myProteinBrand?.id || plusWattBrand.id;
      }

      return {
        slug: product.id,
        name: product.name,
        brandId: brandId,
        categoryId: proteineCategory.id,
        description: product.description,
        longDescription: product.longDescription || null,
        features: product.features,
        howToUse: product.howToUse || null,
        warnings: product.warnings?.join("; ") || null,
        specialOfferText: product.specialOfferText || null,
        isNew: product.isNew || false,
        isBestSeller: product.isBestSeller || false,
        hasSpecialOffer: product.hasSpecialOffer || false
      };
    });

    const insertedProteinProducts = await db.insert(products).values(proteinProductData).returning();
    console.log(`✓ Migrati ${insertedProteinProducts.length} prodotti proteine`);

    // 5. Migra i prodotti aminoacidi
    const aminoacidProductData = aminoacidProducts.map(product => ({
      slug: product.id,
      name: product.name,
      brandId: plusWattBrand.id,
      categoryId: aminoacidiCategory.id,
      description: product.description,
      longDescription: product.longDescription || null,
      features: product.features,
      howToUse: product.howToUse || null,
      warnings: product.warnings?.join("; ") || null,
      specialOfferText: product.specialOfferText || null,
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false,
      hasSpecialOffer: product.hasSpecialOffer || false
    }));

    const insertedAminoacidProducts = await db.insert(products).values(aminoacidProductData).returning();
    console.log(`✓ Migrati ${insertedAminoacidProducts.length} prodotti aminoacidi`);

    console.log("✅ Migrazione completata con successo!");
    console.log("\nProdotti organizzati per categoria:");
    console.log(`- Proteine: ${insertedProteinProducts.length} prodotti (+Watt)`);
    console.log(`- Aminoacidi: ${insertedAminoacidProducts.length} prodotti (+Watt)`);
    console.log("- Pre-Workout: 0 prodotti (da aggiungere)");
    console.log("- Creatina: 0 prodotti (da aggiungere)");
    console.log("- Vitamine e Minerali: 0 prodotti (da aggiungere)");
    console.log("- Accessori: 0 prodotti (da aggiungere)");

  } catch (error) {
    console.error("Errore durante la migrazione:", error);
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProducts().then(() => process.exit(0));
}

export { migrateProducts };