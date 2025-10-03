
import { db } from "./db";
import { products, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function insertWPCProduct() {
  console.log("Inserimento prodotto WPC 100% - WHY Sport...");
  
  try {
    // 1. Verifica e crea il brand WHY Sport se non esiste
    let [whySportBrand] = await db.select().from(brands).where(eq(brands.name, "WHY Sport"));
    
    if (!whySportBrand) {
      console.log("Creazione brand WHY Sport...");
      [whySportBrand] = await db.insert(brands).values({
        name: "WHY Sport",
        slug: "why-sport",
        description: "Brand italiano leader negli integratori sportivi di alta qualità",
        isActive: true
      }).returning();
    }
    
    // 2. Verifica categoria Proteine
    const [proteineCategory] = await db.select().from(productCategories).where(eq(productCategories.slug, "proteine"));
    if (!proteineCategory) {
      throw new Error("Categoria proteine non trovata nel database");
    }
    
    // 3. Inserisci WPC 100%
    const [wpcProduct] = await db.insert(products).values({
      slug: "wpc-100",
      name: "WPC 100%",
      brandId: whySportBrand.id,
      categoryId: proteineCategory.id,
      description: "Proteine del siero di latte concentrate al 100% con alto valore biologico per la crescita muscolare",
      longDescription: `## Descrizione
WPC 100% di WHY Sport rappresenta l'eccellenza nel mondo delle proteine del siero di latte concentrate. Formulato con tecnologie avanzate, questo integratore offre un profilo aminoacidico completo e una purezza ottimale per supportare la crescita e il mantenimento della massa muscolare.

## Benefici Principali
- **Alto valore biologico**: Proteine complete con tutti gli aminoacidi essenziali
- **Rapido assorbimento**: Ideale per il post-workout e il recupero muscolare
- **Elevata concentrazione proteica**: Oltre l'80% di proteine pure per porzione
- **Gusto eccezionale**: Disponibile in gustosi sapori Cookies & Cream e Yogurt Fragola
- **Qualità WHY Sport**: Garanzia di purezza e controlli rigorosi di qualità

## Caratteristiche Tecniche
Le proteine WPC 100% sono ottenute attraverso processi di ultrafiltrazione che preservano la struttura naturale delle proteine, mantenendo intatti i peptidi bioattivi e garantendo un'ottima solubilità.

## A chi è rivolto
Perfetto per atleti, bodybuilder e sportivi che desiderano incrementare l'apporto proteico giornaliero. Ideale per chi pratica allenamenti intensi e vuole supportare la sintesi proteica muscolare con un prodotto di qualità superiore.`,
      features: ["Alto valore biologico", "Rapido assorbimento", "82% proteine pure", "Gusto eccezionale", "Qualità WHY Sport"],
      howToUse: "Sciogliere 30g di polvere in 250-300ml di acqua o latte. Assumere 1-2 volte al giorno, preferibilmente post-workout.",
      warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini. Conservare in luogo fresco e asciutto. Non adatto a persone allergiche a latte e derivati.",
      isNew: true,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();
    
    console.log("✅ Prodotto inserito con successo:");
    console.log(`  - ${wpcProduct.name} (ID: ${wpcProduct.id}) - Brand: WHY Sport`);
    
    return {
      wpcProduct: wpcProduct,
      whySportBrand: whySportBrand
    };
    
  } catch (error) {
    console.error("✗ Errore durante l'inserimento del prodotto WPC 100%:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertWPCProduct()
    .then(() => {
      console.log("✅ Inserimento WPC 100% completato!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Inserimento WPC 100% fallito:", error);
      process.exit(1);
    });
}
