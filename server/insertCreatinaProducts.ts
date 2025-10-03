import { db } from "./db";
import { products, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function insertCreatinaProducts() {
  console.log("Inserting Creatina products following the prompt exactly...");
  
  // FASE 3: INSERIMENTO DATI BASE per CATEGORIA CREATINA (FOTO 1-6)
  
  // Verifica brand +WATT esistente
  const [plusWattBrand] = await db.select().from(brands).where(eq(brands.name, "+WATT"));
  if (!plusWattBrand) {
    throw new Error("Brand +WATT not found in database");
  }
  
  // Verifica categoria Creatina esistente o creala
  let [creatinaCategory] = await db.select().from(productCategories).where(eq(productCategories.slug, "creatina"));
  if (!creatinaCategory) {
    [creatinaCategory] = await db.insert(productCategories).values({
      name: "Creatina",
      slug: "creatina", 
      description: "Prodotti per creatina e performance muscolare"
    }).returning();
  }
  
  // Verifica brand Advance Care
  let [advanceCareBrand] = await db.select().from(brands).where(eq(brands.name, "Advance Care"));
  if (!advanceCareBrand) {
    [advanceCareBrand] = await db.insert(brands).values({
      name: "Advance Care",
      slug: "advance-care",
      description: "Prodotti Advance Care"
    }).returning();
  }

  // PRODOTTO 1: Creatina+ Compresse Extra Gold (FOTO 1-4)
  // Nome prodotto: Estratto esattamente dall'etichetta
  // Marca: Estratto esattamente dall'etichetta  
  // Descrizione: Creata accattivante (1 riga max)
  // Categoria: Creatina
  // Recensioni: Imposta 0 stelle (mantieni sezione vuota)
  const product1 = await db.insert(products).values({
    slug: "creatina-compresse-extra-gold-plus-watt",
    name: "Creatina+ Compresse Extra Gold",
    brandId: plusWattBrand.id,
    categoryId: creatinaCategory.id,
    description: "Integratore di creatina monoidrato e magnesio in compresse e polvere per massime prestazioni sportive",
    longDescription: `## Benefici del prodotto
- Aumenta la forza e la potenza muscolare
- Migliora le prestazioni negli sport ad alta intensità
- Favorisce il recupero muscolare

## Caratteristiche principali  
- Creatina monoidrato di alta qualità
- Arricchita con magnesio
- Disponibile in formati compresse e polvere
- Formula Extra Gold per massima efficacia

## A chi è rivolto
Indicato per sportivi che praticano attività fisica intensa e vogliono migliorare forza e prestazioni.`,
    features: ["Creatina monoidrato", "Con magnesio", "Formati multipli", "Extra Gold"],
    howToUse: "Assumere 3-5g al giorno prima o dopo l'allenamento",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini.",
    isNew: false,
    isBestSeller: false,
    hasSpecialOffer: false
  }).returning();

  // PRODOTTO 2: Creatina+ Polvere Gold (FOTO 5)
  const product2 = await db.insert(products).values({
    slug: "creatina-polvere-gold-plus-watt",
    name: "Creatina+ Polvere Gold",
    brandId: plusWattBrand.id,
    categoryId: creatinaCategory.id,
    description: "Creatina monoidrato micronizzata 200 mesh per un assorbimento ottimale",
    longDescription: `## Benefici del prodotto
- Assorbimento superiore grazie alla micronizzazione
- Maggiore solubilità in acqua
- Efficacia potenziata dalla tecnologia 200 mesh

## Caratteristiche principali
- Creatina monoidrato 100% pura
- Tecnologia di micronizzazione 200 mesh
- Massima solubilità e biodisponibilità
- Formula Gold per prestazioni superiori

## A chi è rivolto
Perfetta per atleti che cercano il massimo assorbimento e efficacia dalla creatina.`,
    features: ["Creatina micronizzata", "200 mesh", "Alta solubilità", "Formula Gold"],
    howToUse: "Assumere 3-5g al giorno sciolti in acqua",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini.",
    isNew: false,
    isBestSeller: false,
    hasSpecialOffer: false
  }).returning();

  // PRODOTTO 3: Creanized (FOTO 6)
  const product3 = await db.insert(products).values({
    slug: "creanized-advance-care",
    name: "Creanized",
    brandId: advanceCareBrand.id,
    categoryId: creatinaCategory.id,
    description: "Creatina monoidrato micronizzata per massima biodisponibilità e performance",
    longDescription: `## Benefici del prodotto
- Massima biodisponibilità della creatina
- Performance atletiche superiori
- Recupero muscolare accelerato

## Caratteristiche principali
- Creatina monoidrato micronizzata
- Tecnologia avanzata Advance Care
- Alta purezza e qualità
- Formato pratico da 250g

## A chi è rivolto
Ideale per atleti professionali e amatori che cercano risultati concreti.`,
    features: ["Creatina micronizzata", "Alta biodisponibilità", "Tecnologia Advance", "250g"],
    howToUse: "Assumere 3g al giorno sciolti in acqua",
    warnings: "Non superare la dose consigliata. Consultare il medico in caso di patologie.",
    isNew: false,
    isBestSeller: false,
    hasSpecialOffer: false
  }).returning();

  console.log("✓ Inserted 3 Creatina products:");
  console.log(`  - ${product1[0].name} (ID: ${product1[0].id})`);
  console.log(`  - ${product2[0].name} (ID: ${product2[0].id})`);
  console.log(`  - ${product3[0].name} (ID: ${product3[0].id})`);
  
  return {
    product1: product1[0],
    product2: product2[0], 
    product3: product3[0]
  };
}

// Run migration
insertCreatinaProducts()
  .then(() => {
    console.log("✓ Creatina products insertion completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Creatina products insertion failed:", error);
    process.exit(1);
  });