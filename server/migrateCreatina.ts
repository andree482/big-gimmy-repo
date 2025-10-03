import { db } from "./db";
import { products, productImages, productSizes, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function migrateCreatinaProducts() {
  console.log("Migrating Creatina products...");
  
  // Ensure brands exist
  const plusWattBrand = await ensureBrandExists("+WATT", "plus-watt");
  const advanceCareBrand = await ensureBrandExists("Advance Care", "advance-care");
  
  // Ensure category exists
  const creatinaCategory = await ensureCategoryExists("Creatina", "creatina");
  
  // PRODOTTO 1: Creatina+ Compresse Extra Gold (FOTO 1-4)
  const product1 = await db.insert(products).values({
    slug: "creatina-compresse-extra-gold",
    name: "Creatina+ Compresse Extra Gold",
    brandId: plusWattBrand.id,
    categoryId: creatinaCategory.id,
    description: "Integratore di creatina monoidrato e magnesio in compresse e polvere per massime prestazioni sportive",
    longDescription: "Creatina monoidrato ad alta purezza per forza e resistenza muscolare. Disponibile in comodi formati compresse e polvere.",
    features: ["Creatina monoidrato", "Con magnesio", "Massime prestazioni", "Formati multipli"],
    howToUse: "Assumere 3-5g al giorno prima o dopo l'allenamento",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini."
  }).returning();

  // Aggiungi immagini per prodotto 1
  await db.insert(productImages).values([
    { productId: product1[0].id, src: "creatina-compresse-300.jpg", alt: "Creatina+ Compresse Extra Gold 300 compresse", isPrimary: true },
    { productId: product1[0].id, src: "creatina-compresse-100.jpg", alt: "Creatina+ Compresse Extra Gold 100 compresse", isPrimary: false },
    { productId: product1[0].id, src: "creatina-polvere-100g.jpg", alt: "Creatina+ Polvere Extra Gold 100g", isPrimary: false },
    { productId: product1[0].id, src: "creatina-polvere-350g.jpg", alt: "Creatina+ Polvere Extra Gold 350g", isPrimary: false }
  ]);

  // Aggiungi varianti di formato per prodotto 1
  await db.insert(productSizes).values([
    { productId: product1[0].id, value: "300", unit: "compresse", price: 3590 }, // €35.90
    { productId: product1[0].id, value: "100", unit: "compresse", price: 1890 }, // €18.90
    { productId: product1[0].id, value: "100", unit: "g polvere", price: 1590 }, // €15.90
    { productId: product1[0].id, value: "350", unit: "g polvere", price: 3290 }  // €32.90
  ]);

  // PRODOTTO 2: Creatina+ Polvere Gold (FOTO 5)
  const product2 = await db.insert(products).values({
    slug: "creatina-polvere-gold",
    name: "Creatina+ Polvere Gold",
    brandId: plusWattBrand.id,
    categoryId: creatinaCategory.id,
    description: "Creatina monoidrato micronizzata 200 mesh per un assorbimento ottimale",
    longDescription: "Creatina monoidrato micronizzata per assorbimento superiore. Tecnologia 200 mesh per massima solubilità.",
    features: ["Creatina micronizzata", "200 mesh", "Assorbimento ottimale", "Alta solubilità"],
    howToUse: "Assumere 3-5g al giorno sciolti in acqua",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini."
  }).returning();

  await db.insert(productImages).values([
    { productId: product2[0].id, src: "creatina-gold-350g.jpg", alt: "Creatina+ Polvere Gold 350g", isPrimary: true }
  ]);

  await db.insert(productSizes).values([
    { productId: product2[0].id, value: "350", unit: "g", price: 2890 } // €28.90
  ]);

  // PRODOTTO 3: Creanized (FOTO 6)
  const product3 = await db.insert(products).values({
    slug: "creanized-advance-care",
    name: "Creanized",
    brandId: advanceCareBrand.id,
    categoryId: creatinaCategory.id,
    description: "Creatina monoidrato micronizzata per massima biodisponibilità e performance",
    longDescription: "Creatina monoidrato micronizzata ad alta purezza. Formula avanzata per performance ottimali.",
    features: ["Creatina micronizzata", "Alta biodisponibilità", "Performance superiori", "Formula avanzata"],
    howToUse: "Assumere 3g al giorno sciolti in acqua",
    warnings: "Non superare la dose consigliata. Consultare il medico in caso di patologie."
  }).returning();

  await db.insert(productImages).values([
    { productId: product3[0].id, src: "creanized-250g.jpg", alt: "Creanized 250g", isPrimary: true }
  ]);

  await db.insert(productSizes).values([
    { productId: product3[0].id, value: "250", unit: "g", price: 2290 } // €22.90
  ]);

  console.log("Creatina products migration completed!");
}

async function ensureBrandExists(name: string, slug: string) {
  // Try by name first
  const [existingBrandByName] = await db.select().from(brands).where(eq(brands.name, name));
  if (existingBrandByName) {
    return existingBrandByName;
  }
  
  // Then try by slug
  const [existingBrand] = await db.select().from(brands).where(eq(brands.slug, slug));
  if (existingBrand) {
    return existingBrand;
  }
  
  const [newBrand] = await db.insert(brands).values({
    name,
    slug,
    description: `Prodotti ${name}`
  }).returning();
  
  return newBrand;
}

async function ensureCategoryExists(name: string, slug: string) {
  const [existingCategory] = await db.select().from(productCategories).where(eq(productCategories.slug, slug));
  
  if (existingCategory) {
    return existingCategory;
  }
  
  const [newCategory] = await db.insert(productCategories).values({
    name,
    slug,
    description: `Prodotti per ${name.toLowerCase()}`
  }).returning();
  
  return newCategory;
}

// Run migration if script is executed directly
migrateCreatinaProducts()
  .then(() => {
    console.log("Migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });