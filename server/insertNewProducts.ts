
import { db } from "./db";
import { products, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function insertNewProducts() {
  console.log("Inserimento dei nuovi prodotti: Premier Pancake e Pistacchio Crema Proteica...");
  
  try {
    // 1. Verifica e ottieni i brand
    const [premierBrand] = await db.select().from(brands).where(eq(brands.name, "Premier"));
    const [plusWattBrand] = await db.select().from(brands).where(eq(brands.name, "+Watt"));
    
    if (!premierBrand) {
      throw new Error("Brand Premier non trovato. Eseguire prima insertPremierBrand.ts");
    }
    if (!plusWattBrand) {
      throw new Error("Brand +Watt non trovato nel database");
    }
    
    // 2. Verifica categoria Proteine
    const [proteineCategory] = await db.select().from(productCategories).where(eq(productCategories.slug, "proteine"));
    if (!proteineCategory) {
      throw new Error("Categoria proteine non trovata nel database");
    }
    
    // 3. Inserisci Premier Pancake
    const [premierPancake] = await db.insert(products).values({
      slug: "premier-pancake",
      name: "Premier Pancake",
      brandId: premierBrand.id,
      categoryId: proteineCategory.id,
      description: "Mix proteico per pancake naturali con alto contenuto proteico",
      longDescription: `## Descrizione
Premier Pancake è un mix proteico rivoluzionario che trasforma la colazione in un momento di puro piacere e nutrimento. Formulato da Premier, leader nel settore degli integratori, questo prodotto rappresenta l'evoluzione della tradizionale colazione proteica.

## Benefici Principali
- **Alto contenuto proteico**: Supporta la crescita e il mantenimento della massa muscolare
- **Facilità di preparazione**: Basta aggiungere acqua o latte per ottenere pancake perfetti
- **Gusto naturale**: Sapore autentico senza aromi artificiali eccessivi
- **Versatilità d'uso**: Perfetto per colazione, spuntino o post-workout

## Caratteristiche Tecniche
Premier Pancake è stato sviluppato con una formula bilanciata che combina proteine di alta qualità con carboidrati complessi, offrendo un profilo nutrizionale completo per supportare le tue performance quotidiane.

## A chi è rivolto
Ideale per sportivi, atleti professionisti e chiunque desideri una colazione sana e proteica senza rinunciare al gusto. Perfetto per chi segue diete fitness e vuole integrare le proteine in modo gustoso.`,
      features: ["Alto contenuto proteico", "Facilità preparazione", "Gusto naturale", "Post-workout"],
      howToUse: "Mescolare 50g con 60-80ml di acqua o latte. Cuocere in padella per 2-3 minuti per lato.",
      warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini. Conservare in luogo fresco e asciutto.",
      isNew: true,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();
    
    // 4. Inserisci Pistacchio Crema Proteica  
    const [pistacchioCrema] = await db.insert(products).values({
      slug: "pistacchio-crema-proteica",
      name: "Pistacchio Crema Proteica", 
      brandId: plusWattBrand.id,
      categoryId: proteineCategory.id,
      description: "Crema spalmabile proteica al pistacchio con vitamina E e inulina",
      longDescription: `## Descrizione
La Pistacchio Crema Proteica di +Watt rappresenta l'innovazione nel mondo delle creme spalmabili proteiche. Realizzata con pistacchi siciliani di prima qualità e arricchita con proteine nobili, vitamina E e inulina, questa crema unisce il piacere del gusto alla funzionalità nutrizionale.

## Benefici Principali
- **Ricca di proteine**: Contribuisce al mantenimento e crescita della massa muscolare
- **Pistacchi siciliani**: Sapore autentico e nutrienti di qualità superiore
- **Vitamina E**: Potente antiossidante che protegge le cellule dallo stress ossidativo
- **Con inulina**: Fibra prebiotica che favorisce il benessere intestinale
- **Senza glutine**: Adatta anche a chi ha intolleranze

## Caratteristiche Tecniche
Formula sviluppata da +Watt con tecnologie innovative per mantenere intatte le proprietà nutrizionali dei pistacchi. La texture cremosa e il gusto intenso rendono questa crema perfetta per molteplici utilizzi culinari.

## A chi è rivolto
Perfetta per sportivi, fitness enthusiast e tutti coloro che vogliono concedersi un piacere gustoso senza rinunciare ai benefici nutrizionali. Ideale per chi segue diete proteiche e cerca alternative sane ai classici dolci da spalmare.`,
      features: ["Pistacchi siciliani", "Ricca di proteine", "Vitamina E", "Con inulina", "Senza glutine"],
      howToUse: "Consumare 20g per porzione come crema spalmabile su pane, yogurt o frutta. Conservare in frigorifero dopo l'apertura.",
      warnings: "Non superare la dose consigliata. Dopo l'apertura conservare in frigorifero e consumare entro 30 giorni. Un consumo eccessivo può avere effetti lassativi.",
      isNew: true,
      isBestSeller: false, 
      hasSpecialOffer: false
    }).returning();
    
    console.log("✅ Prodotti inseriti con successo:");
    console.log(`  - ${premierPancake.name} (ID: ${premierPancake.id})`);
    console.log(`  - ${pistacchioCrema.name} (ID: ${pistacchioCrema.id})`);
    
    return {
      premierPancake: premierPancake,
      pistacchioCrema: pistacchioCrema
    };
    
  } catch (error) {
    console.error("✗ Errore durante l'inserimento dei prodotti:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertNewProducts()
    .then(() => {
      console.log("✅ Inserimento prodotti completato!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Inserimento prodotti fallito:", error);
      process.exit(1);
    });
}
