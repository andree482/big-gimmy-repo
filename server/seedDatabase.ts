import { db } from "./db";
import {
  stores,
  brands,
  productCategories,
  products,
  productImages,
  productSizes,
  productAvailability
} from "@shared/schema";

async function seed() {
  console.log("Iniziando il popolamento del database...");

  // Inserimento dei negozi
  const insertedStores = await db.insert(stores).values([
    {
      name: "Sede di Buttigliera Alta",
      address: "Corso Torino, 85, 10090 Buttigliera Alta TO",
      phone: "3385486392",
      email: "info@biggimmy.it",
      hours: "Lunedi-Venerdi 09:30-12:30, 15:30-19:30\nSabato 09:30-12:30",
      mapLink: "https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7",
      isNew: false,
    },
    {
      name: "Sede di Aosta",
      address: "Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO",
      phone: "0165 086006",
      email: "aosta@biggimmy.it",
      hours: "Lunedi-Venerdi 09-12:30, 15-19:30\n",
      mapLink: "https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69",
      isNew: true,
    }
  ]).returning();

  console.log("Inseriti", insertedStores.length, "negozi");

  // Inserimento delle categorie di prodotti
  const insertedCategories = await db.insert(productCategories).values([
    {
      name: "Proteine",
      slug: "proteine",
      description: "Integratori proteici per la crescita e il recupero muscolare",
      image: "/assets/categories/proteine.jpg"
    },
    {
      name: "Aminoacidi",
      slug: "aminoacidi",
      description: "BCAA, EAA e altri aminoacidi essenziali per il recupero e la crescita muscolare",
      image: "/assets/categories/aminoacidi.jpg"
    },
    {
      name: "Abbigliamento e Accessori",
      slug: "abbigliamento-accessori",
      description: "Abbigliamento tecnico, accessori per l'allenamento e il fitness",
      image: "/assets/categories/abbigliamento-accessori.jpg"
    },
    {
      name: "Vitamine e Minerali",
      slug: "vitamine-minerali",
      description: "Vitamine, minerali e micronutrienti per la salute generale",
      image: "/assets/categories/vitamine-minerali.jpg"
    },
    {
      name: "Pre-workout",
      slug: "pre-workout",
      description: "Prodotti per aumentare l'energia e la concentrazione durante l'allenamento",
      image: "/assets/categories/pre-workout.jpg"
    },
    {
      name: "Massa Muscolare",
      slug: "massa-muscolare",
      description: "Integratori specifici per aumentare la massa muscolare e il volume",
      image: "/assets/categories/massa-muscolare.jpg"
    }
  ]).returning();

  console.log("Inserite", insertedCategories.length, "categorie di prodotti");

  // Inserimento dei brand
  const insertedBrands = await db.insert(brands).values([
    {
      name: "Optimum Nutrition",
      slug: "optimum-nutrition",
      description: "Optimum Nutrition è un'azienda leader nel settore degli integratori sportivi.",
      website: "https://www.optimumnutrition.com",
      logo: "/assets/brands/optimum-nutrition-logo.png"
    },
    {
      name: "MyProtein",
      slug: "myprotein",
      description: "MyProtein è uno dei principali produttori europei di integratori sportivi.",
      website: "https://www.myprotein.it",
      logo: "/assets/brands/myprotein-logo.png"
    },
    {
      name: "Yamamoto Nutrition",
      slug: "yamamoto-nutrition",
      description: "Yamamoto Nutrition è un'azienda italiana specializzata in integratori per lo sport.",
      website: "https://www.yamamotonutrition.com",
      logo: "/assets/brands/yamamoto-logo.png"
    }
  ]).returning();

  console.log("Inseriti", insertedBrands.length, "brand");

  // Inserimento dei prodotti
  const proteineCategory = insertedCategories.find(c => c.slug === "proteine")!;

  const insertedProducts = await db.insert(products).values([
    {
      slug: "gold-standard-100-whey",
      name: "Gold Standard 100% Whey",
      brandId: insertedBrands.find(b => b.name === "Optimum Nutrition")!.id,
      categoryId: proteineCategory.id,
      description: "La proteina in polvere più venduta al mondo. 24g di proteine per porzione e solo 1g di zuccheri.",
      longDescription: "Gold Standard 100% Whey è la proteina in polvere più venduta al mondo, con 24g di proteine per porzione e solo 1g di zuccheri. Ideale per supportare la crescita e il mantenimento della massa muscolare.",
      features: ["24g di proteine per porzione", "5.5g di BCAA naturalmente presenti", "4g di glutammina e acido glutammico", "Solo 1g di zuccheri e 1.5g di grassi per porzione", "Certificata Informed Choice (testata per sostanze vietate)"],
      howToUse: "Mescolare 1 misurino (30g) con 180-240ml di acqua fredda. Assumere 1-2 porzioni al giorno, preferibilmente al mattino e/o dopo l'allenamento.",
      isNew: false,
      isBestSeller: true,
      hasSpecialOffer: true,
      specialOfferText: "10% di sconto per l'acquisto di 2 o più confezioni"
    },
    {
      slug: "impact-whey-isolate",
      name: "Impact Whey Isolate",
      brandId: insertedBrands.find(b => b.name === "MyProtein")!.id,
      categoryId: proteineCategory.id,
      description: "Proteine isolate del siero del latte con oltre 90% di contenuto proteico e basso contenuto di grassi.",
      longDescription: "Impact Whey Isolate è un integratore proteico di alta qualità con oltre il 90% di contenuto proteico e un bassissimo contenuto di grassi e carboidrati. Ideale per chi vuole massimizzare l'apporto proteico minimizzando l'assunzione di altri macronutrienti.",
      features: ["Oltre 23g di proteine per porzione", "Meno di 1g di grassi", "Meno di 1g di carboidrati", "Rapido assorbimento", "Disponibile in molti gusti"],
      howToUse: "Mescolare 1 misurino (25g) con 200-300ml di acqua o latte. Assumere 1-3 porzioni al giorno in base alle proprie esigenze proteiche.",
      isNew: true,
      isBestSeller: false,
      hasSpecialOffer: false
    },
    {
      slug: "hydro-whey-zero",
      name: "Hydro Whey Zero",
      brandId: insertedBrands.find(b => b.name === "Yamamoto Nutrition")!.id,
      categoryId: proteineCategory.id,
      description: "Proteine idrolizzate di altissima qualità per un assorbimento ultra-rapido e una digeribilità ottimale.",
      longDescription: "Hydro Whey Zero utilizza proteine del siero idrolizzate, pre-digerite per un assorbimento più rapido e una digeribilità superiore. La formulazione è arricchita con enzimi digestivi per garantire il massimo assorbimento.",
      features: ["Proteine idrolizzate per assorbimento ultra-rapido", "Arricchito con enzimi digestivi", "Zero grassi e carboidrati", "Ideale post-workout", "Formula anti-doping"],
      howToUse: "Mescolare 1 misurino (30g) con 200ml di acqua. Assumere preferibilmente subito dopo l'allenamento.",
      isNew: false,
      isBestSeller: false,
      hasSpecialOffer: true,
      specialOfferText: "15% di sconto fino a fine mese"
    }
  ]).returning();

  console.log("Inseriti", insertedProducts.length, "prodotti");

  // Inserimento delle immagini dei prodotti
  const insertedImages = await db.insert(productImages).values([
    {
      productId: insertedProducts.find(p => p.slug === "gold-standard-100-whey")!.id,
      src: "/attached_assets/WhatsApp Image 2025-04-28 at 7.14.49 AM.jpeg",
      alt: "Gold Standard 100% Whey - Optimum Nutrition",
      isPrimary: true
    },
    {
      productId: insertedProducts.find(p => p.slug === "gold-standard-100-whey")!.id,
      src: "/attached_assets/WhatsApp Image 2025-04-28 at 7.13.02 AM.jpeg",
      alt: "Gold Standard 100% Whey - Tabella nutrizionale",
      isPrimary: false
    },
    {
      productId: insertedProducts.find(p => p.slug === "impact-whey-isolate")!.id,
      src: "/attached_assets/WhatsApp Image 2025-04-28 at 11.26.16 AM.jpeg",
      alt: "Impact Whey Isolate - MyProtein",
      isPrimary: true
    },
    {
      productId: insertedProducts.find(p => p.slug === "hydro-whey-zero")!.id,
      src: "/attached_assets/WhatsApp Image 2025-04-28 at 7.05.17 AM.jpeg",
      alt: "Hydro Whey Zero - Yamamoto Nutrition",
      isPrimary: true
    }
  ]).returning();

  console.log("Inserite", insertedImages.length, "immagini");

  // Inserimento delle taglie dei prodotti
  const insertedSizes = await db.insert(productSizes).values([
    {
      productId: insertedProducts.find(p => p.slug === "gold-standard-100-whey")!.id,
      value: "900",
      unit: "g",
      price: 3200 // 32,00 €
    },
    {
      productId: insertedProducts.find(p => p.slug === "gold-standard-100-whey")!.id,
      value: "2",
      unit: "kg",
      price: 6900 // 69,00 €
    },
    {
      productId: insertedProducts.find(p => p.slug === "impact-whey-isolate")!.id,
      value: "1",
      unit: "kg",
      price: 3000 // 30,00 €
    },
    {
      productId: insertedProducts.find(p => p.slug === "impact-whey-isolate")!.id,
      value: "2.5",
      unit: "kg",
      price: 6500 // 65,00 €
    },
    {
      productId: insertedProducts.find(p => p.slug === "hydro-whey-zero")!.id,
      value: "750",
      unit: "g",
      price: 4500 // 45,00 €
    }
  ]).returning();

  console.log("Inserite", insertedSizes.length, "taglie");

  // Inserimento della disponibilità nei negozi
  const torinoStoreId = insertedStores.find(s => s.name === "Sede di Torino")!.id;
  const aostaStoreId = insertedStores.find(s => s.name === "Sede di Aosta")!.id;

  const insertedAvailability = await db.insert(productAvailability).values([
    // Gold Standard 100% Whey disponibile in entrambi i negozi
    {
      productId: insertedProducts.find(p => p.slug === "gold-standard-100-whey")!.id,
      storeId: torinoStoreId,
      isAvailable: true,
      stockQuantity: 15
    },
    {
      productId: insertedProducts.find(p => p.slug === "gold-standard-100-whey")!.id,
      storeId: aostaStoreId,
      isAvailable: true,
      stockQuantity: 8
    },
    // Impact Whey Isolate disponibile solo a Torino
    {
      productId: insertedProducts.find(p => p.slug === "impact-whey-isolate")!.id,
      storeId: torinoStoreId,
      isAvailable: true,
      stockQuantity: 10
    },
    {
      productId: insertedProducts.find(p => p.slug === "impact-whey-isolate")!.id,
      storeId: aostaStoreId,
      isAvailable: false,
      stockQuantity: 0
    },
    // Hydro Whey Zero disponibile solo ad Aosta
    {
      productId: insertedProducts.find(p => p.slug === "hydro-whey-zero")!.id,
      storeId: torinoStoreId,
      isAvailable: false,
      stockQuantity: 0
    },
    {
      productId: insertedProducts.find(p => p.slug === "hydro-whey-zero")!.id,
      storeId: aostaStoreId,
      isAvailable: true,
      stockQuantity: 12
    }
  ]).returning();

  console.log("Inserite", insertedAvailability.length, "disponibilità");
  console.log("Database popolato con successo!");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Errore durante il popolamento del database:", error);
    process.exit(1);
  });