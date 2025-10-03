import { db } from "./db";
import { products, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function insertVitamineMineraliProducts() {
  console.log("Inserting Vitamine e Minerali products following the prompt exactly...");
  
  // FASE 3: INSERIMENTO DATI BASE per CATEGORIA VITAMINE E MINERALI (FOTO 7-17)
  
  // Verifica brand +WATT esistente
  const [plusWattBrand] = await db.select().from(brands).where(eq(brands.name, "+WATT"));
  if (!plusWattBrand) {
    throw new Error("Brand +WATT not found in database");
  }
  
  // Verifica categoria Vitamine e Minerali esistente o creala
  let [vitamineMineraliCategory] = await db.select().from(productCategories).where(eq(productCategories.slug, "vitamine-e-minerali"));
  if (!vitamineMineraliCategory) {
    [vitamineMineraliCategory] = await db.insert(productCategories).values({
      name: "Vitamine e Minerali",
      slug: "vitamine-e-minerali", 
      description: "Prodotti per vitamine, minerali e integrazione nutrizionale"
    }).returning();
  }

  // PRODOTTO 4: Sali+ Activator (FOTO 7-8)
  // Gestione Gusti: Arancia Rossa, Fragola e Banana
  const product4 = await db.insert(products).values({
    slug: "sali-activator-plus-watt",
    name: "Sali+ Activator",
    brandId: plusWattBrand.id,
    categoryId: vitamineMineraliCategory.id,
    description: "Maltodestrine e fruttosio in rapporto 1:0,8 con vitamine, minerali e carboidrati ad assorbimento sequenziale",
    longDescription: `## Benefici del prodotto
- Energia immediata e sostenuta durante l'attività fisica
- Reintegro di sali minerali persi con la sudorazione
- Carboidrati ad assorbimento sequenziale per performance prolungate

## Caratteristiche principali
- Rapporto maltodestrine/fruttosio 1:0,8 ottimale
- Arricchito con Vitargo® per energia rapida
- Vitamine C e B6 per supporto metabolico
- Disponibile in gusti Arancia Rossa e Fragola e Banana

## A chi è rivolto
Ideale per atleti di endurance e sport di lunga durata che necessitano di energia costante.`,
    features: ["Vitargo®", "Carboidrati sequenziali", "Vitamine C e B6", "Rapporto 1:0,8"],
    howToUse: "Sciogliere 40g (1 misurino) in 500ml di acqua. Assumere prima, durante o dopo l'attività fisica",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini.",
    isNew: false,
    isBestSeller: true,
    hasSpecialOffer: false
  }).returning();

  // PRODOTTO 5: Sali+ Electrolyte (FOTO 9-12)
  // Gestione Gusti e Formati: Arancia/Limone in barattolo 500g e busta 600g
  const product5 = await db.insert(products).values({
    slug: "sali-electrolyte-plus-watt",
    name: "Sali+ Electrolyte",
    brandId: plusWattBrand.id,
    categoryId: vitamineMineraliCategory.id,
    description: "Integratore a base di maltodestrine, fruttosio, Vitargo® e sali minerali con vitamine C e B6",
    longDescription: `## Benefici del prodotto
- Idratazione ottimale durante l'attività sportiva
- Reintegro completo di elettroliti persi
- Supporto energetico con carboidrati di qualità

## Caratteristiche principali
- Formula completa con maltodestrine, fruttosio e Vitargo®
- Elettroliti essenziali per l'idratazione
- Vitamine C e B6 per il metabolismo energetico
- Disponibile in gusti Arancia e Limone

## A chi è rivolto
Perfetto per tutti gli sport che comportano sudorazione intensa e perdita di liquidi.`,
    features: ["Elettroliti completi", "Vitargo®", "Idratazione", "Gusti naturali"],
    howToUse: "Sciogliere 50g in 500ml di acqua. Assumere durante l'attività fisica prolungata",
    warnings: "Non superare la dose consigliata. Consultare il medico in caso di patologie renali.",
    isNew: false,
    isBestSeller: false,
    hasSpecialOffer: false
  }).returning();

  // PRODOTTO 6: Sali+ Performance Electrolyte (FOTO 13-16)
  // Con caffeina per prestazioni potenziate
  const product6 = await db.insert(products).values({
    slug: "sali-performance-electrolyte-plus-watt",
    name: "Sali+ Performance Electrolyte",
    brandId: plusWattBrand.id,
    categoryId: vitamineMineraliCategory.id,
    description: "Integratore energetico con maltodestrine, Vitargo®, sali minerali, vitamine, aminoacidi e caffeina",
    longDescription: `## Benefici del prodotto
- Performance potenziate grazie alla caffeina (100mg/dose)
- Energia immediata e sostenuta per sport intensi
- Recupero accelerato con aminoacidi specifici

## Caratteristiche principali
- Formula avanzata con caffeina per focus mentale
- Aminoacidi ramificati per supporto muscolare
- Coenzima Q10 per energia cellulare
- Vitargo® e carboidrati sequenziali

## A chi è rivolto
Dedicato ad atleti di alto livello che necessitano di performance massime e focus mentale.`,
    features: ["Caffeina 100mg", "Aminoacidi", "Coenzima Q10", "Performance"],
    howToUse: "Sciogliere 40g in 500ml di acqua. Non raccomandato per bambini e donne in gravidanza",
    warnings: "Contiene caffeina (100mg/dose giornaliera). Non raccomandato per bambini e donne in gravidanza o allattamento.",
    isNew: true,
    isBestSeller: false,
    hasSpecialOffer: false
  }).returning();

  // PRODOTTO 7: Sali+ Electrolyte Pocket Minerals (FOTO 17)
  const product7 = await db.insert(products).values({
    slug: "sali-electrolyte-pocket-minerals-plus-watt",
    name: "Sali+ Electrolyte Pocket Minerals",
    brandId: plusWattBrand.id,
    categoryId: vitamineMineraliCategory.id,
    description: "Integratore di sali minerali in formato pocket da 40g con maltodestrine, fruttosio e Vitargo®",
    longDescription: `## Benefici del prodotto
- Formato pratico e portatile per ogni situazione
- Reintegro rapido di sali minerali essenziali
- Energia immediata con carboidrati selezionati

## Caratteristiche principali
- Formato pocket da 40g ultracomodo
- Formula concentrata di alta qualità
- Vitargo® per assorbimento ottimale
- Perfetto per allenamenti e gare

## A chi è rivolto
Ideale per chi cerca praticità senza rinunciare alla qualità dell'integrazione.`,
    features: ["Formato pocket", "40g portatile", "Vitargo®", "Pratico"],
    howToUse: "Sciogliere 40g in 500ml di acqua prima o durante l'attività fisica",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini.",
    isNew: false,
    isBestSeller: false,
    hasSpecialOffer: false
  }).returning();

  console.log("✓ Inserted 4 Vitamine e Minerali products:");
  console.log(`  - ${product4[0].name} (ID: ${product4[0].id})`);
  console.log(`  - ${product5[0].name} (ID: ${product5[0].id})`);
  console.log(`  - ${product6[0].name} (ID: ${product6[0].id})`);
  console.log(`  - ${product7[0].name} (ID: ${product7[0].id})`);
  
  return {
    product4: product4[0],
    product5: product5[0],
    product6: product6[0],
    product7: product7[0]
  };
}

// Run migration
insertVitamineMineraliProducts()
  .then(() => {
    console.log("✓ Vitamine e Minerali products insertion completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Vitamine e Minerali products insertion failed:", error);
    process.exit(1);
  });