import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function fixBatch9Products_Phase2() {
  console.log("🔧 Avvio correzione problemi Batch 9 - Fase 2...");

  try {
    // ===================
    // PROBLEMA 9: Dietary Bar - Sistemare forma, aggiungere dati completi
    // ===================
    console.log("9. Correggendo Dietary Bar...");
    
    const dietaryBarGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'dietary-bar-premier'));
    if (dietaryBarGroup.length > 0) {
      const correctFeatures = [
        "Barretta proteica 30% proteine",
        "Senza olio di palma e aspartame free",
        "Arricchita con L-Glutammina KYOWA",
        "Vitamine C, E, B6, B1 per il metabolismo",
        "Altamente digeribile e gustosa"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere fino a due barrette al giorno lontano dai pasti principali.",
          longDescription: "DIETARY BAR è una gustosa barretta proteica di 50 g con aggiunta di Glutammina e Vitamine, indicata per sportivi che praticano un esercizio fisico intenso. Integratore alimentare in forma di barretta proteica da 50 g costituito da una miscela di proteine ad alto valore biologico senza olio di palma e aspartame free, indicato per sportivi che praticano un esercizio fisico intenso. DIETARY BAR è una barretta completa e bilanciata, gustosa di altissima qualità e altamente digeribile, che contiene ben il 30% di proteine ed è potenziata con L-Glutammina Kyowa Quality® e vitamine."
        })
        .where(eq(productGroups.id, dietaryBarGroup[0].id));

      // Aggiornare immagini e correggere formato prodotti
      const dietaryBarProducts = await db.select().from(products).where(eq(products.groupId, dietaryBarGroup[0].id));
      for (const product of dietaryBarProducts) {
        await db.update(productImages)
          .set({ src: "dietary-bar-cocco-website.png" })
          .where(eq(productImages.productId, product.id));
          
        // Correggere il formato del prodotto (da "unità" a "barretta")
        if (product.size?.includes("50g")) {
          await db.update(products)
            .set({ size: "50g barretta" })
            .where(eq(products.id, product.id));
        } else if (product.size?.includes("Box") || product.size?.includes("24")) {
          await db.update(products)
            .set({ size: "Box 24 barrette" })
            .where(eq(products.id, product.id));
        }
      }
    }

    // ===================
    // PROBLEMA 10: Hard Nitrox Xtreme - Sistemare forma, aggiungere dati completi
    // ===================
    console.log("10. Correggendo Hard Nitrox Xtreme...");
    
    const hardNitroxGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-nitrox-xtreme-premier'));
    if (hardNitroxGroup.length > 0) {
      const correctFeatures = [
        "L-Citrullina DL-Malato e L-Arginina KYOWA",
        "Arginina Alfa Chetoglutarato",
        "Vitamina B6 per il metabolismo energetico",
        "Rapporto 1:1 Citrullina e Arginina",
        "Massima produzione di Ossido Nitrico"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 3 compresse al giorno con abbondante acqua.",
          longDescription: "HARD NITOX XTREME è un integratore alimentare in compresse di L-CITRULLINA DL-MALATO e L-ARGININA KYOWA, arricchito con Arginina Alfa Chetoglutarato e Vitamina B6. Studi scientifici dimostrano che la supplementazione di L-Citrullina è in grado di elevare i livelli di Arginina nel corpo del 160% rispetto alla sola integrazione con L-Arginina. Il rapporto 1:1 CITRULLINA e ARGININA garantisce il massimo della produzione di Ossido Nitrico che ha un'azione benefica sull'aumento del flusso sanguigno, sul trasporto di ossigeno e sull'assorbimento dei nutrienti, oltre a supportare funzioni muscolari per un miglior rendimento e sviluppo."
        })
        .where(eq(productGroups.id, hardNitroxGroup[0].id));

      // Aggiornare immagini
      const hardNitroxProducts = await db.select().from(products).where(eq(products.groupId, hardNitroxGroup[0].id));
      for (const product of hardNitroxProducts) {
        await db.update(productImages)
          .set({ src: "HARD-NITOX-XTREME-SITO.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 11: Whey 100% Pro-Zyme - Aggiungere modalità d'uso e immagini
    // ===================
    console.log("11. Correggendo Whey 100% Pro-Zyme...");
    
    const wheyProZymeGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'whey-100-pro-zyme-premier'));
    if (wheyProZymeGroup.length > 0) {
      await db.update(productGroups)
        .set({ 
          howToUse: "Assumere 30g di prodotto (3 misurini) in 250ml di acqua o latte, 1-3 volte al giorno. Utilizzare un misurino dosatore. Mescolare bene fino alla completa dissoluzione."
        })
        .where(eq(productGroups.id, wheyProZymeGroup[0].id));

      // Aggiornare immagini per ogni gusto
      const wheyProducts = await db.select().from(products).where(eq(products.groupId, wheyProZymeGroup[0].id));
      for (const product of wheyProducts) {
        let imageName = "whey-100-pro-zyme-";
        if (product.flavor?.toLowerCase().includes("cioccolato")) {
          imageName += "cioccolato.png";
        } else if (product.flavor?.toLowerCase().includes("vaniglia")) {
          imageName += "vaniglia.png";
        } else if (product.flavor?.toLowerCase().includes("fragola")) {
          imageName += "fragola.png";
        } else {
          imageName += "neutral.png";
        }
        
        await db.update(productImages)
          .set({ src: imageName })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 12: Hard Leucine Booster 4:1:1 - Correggere descrizioni e aggiungere dati
    // ===================
    console.log("12. Correggendo Hard Leucine Booster 4:1:1...");
    
    const hardLeucineGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-leucine-booster-4-1-1-premier'));
    if (hardLeucineGroup.length > 0) {
      const correctFeatures = [
        "Leucina potenziata nel rapporto 4:1:1",
        "Stimola la sintesi proteica muscolare",
        "L-Leucina, L-Isoleucina, L-Valina",
        "Supporta il recupero post-allenamento",
        "Formula avanzata per atleti professionisti"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 4 compresse al giorno con abbondante acqua, preferibilmente post-allenamento o tra i pasti.",
          longDescription: "HARD LEUCINE BOOSTER 4:1:1 è un integratore avanzato di aminoacidi ramificati con rapporto potenziato 4:1:1, dove la L-Leucina è presente in quantità doppia rispetto al classico rapporto 2:1:1. La L-Leucina è l'aminoacido chiave per attivare la sintesi proteica muscolare (mTOR pathway). Questo prodotto è specificamente formulato per atleti che vogliono massimizzare la crescita e il recupero muscolare grazie all'azione potenziata della Leucina."
        })
        .where(eq(productGroups.id, hardLeucineGroup[0].id));

      // Aggiornare immagini
      const hardLeucineProducts = await db.select().from(products).where(eq(products.groupId, hardLeucineGroup[0].id));
      for (const product of hardLeucineProducts) {
        await db.update(productImages)
          .set({ src: "hard-leucine-booster.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 13: Hard BCAA Advanced 8:1:1 - Correggere descrizioni e aggiungere dati
    // ===================
    console.log("13. Correggendo Hard BCAA Advanced 8:1:1...");
    
    const hardBCAAGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-bcaa-advanced-8-1-1-premier'));
    if (hardBCAAGroup.length > 0) {
      const correctFeatures = [
        "BCAA avanzati nel rapporto 8:1:1",
        "Leucina ultra-potenziata per mTOR",
        "Massima stimolazione della sintesi proteica",
        "Recupero muscolare accelerato",
        "Formula scientificamente bilanciata"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 4 compresse al giorno con abbondante acqua, preferibilmente post-allenamento o tra i pasti.",
          longDescription: "HARD BCAA ADVANCED 8:1:1 rappresenta l'evoluzione degli aminoacidi ramificati con un rapporto ultra-potenziato 8:1:1. La concentrazione di L-Leucina è quattro volte superiore al classico rapporto 2:1:1, garantendo una stimolazione massimale del pathway mTOR responsabile della sintesi proteica muscolare. Questo prodotto è progettato per atleti avanzati che richiedono il massimo supporto per la crescita e il recupero muscolare."
        })
        .where(eq(productGroups.id, hardBCAAGroup[0].id));

      // Aggiornare immagini
      const hardBCAAProducts = await db.select().from(products).where(eq(products.groupId, hardBCAAGroup[0].id));
      for (const product of hardBCAAProducts) {
        await db.update(productImages)
          .set({ src: "hard-bcaa-advanced.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 14: Ramtech - BCAA 2:1:1 - Correggere descrizioni e aggiungere dati
    // ===================
    console.log("14. Correggendo Ramtech - BCAA 2:1:1...");
    
    const ramtechGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'ramtech-bcaa-2-1-1-ethicsport'));
    if (ramtechGroup.length > 0) {
      const correctFeatures = [
        "BCAA nel rapporto bilanciato 2:1:1",
        "Vitamine B1 e B6 per il metabolismo energetico",
        "Supporta l'alimentazione dello sportivo",
        "Gluten Free e sicuro",
        "Controlli di purezza rigorosi"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Si consiglia di assumere fino a 5 capsule al giorno, preferibilmente dopo l'allenamento o lontano dai pasti. In caso di allenamenti particolarmente lunghi o intensi, i BCAA possono essere utilizzati anche durante l'attività per sostenere l'organismo.",
          longDescription: "Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l'organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari. Per questo sono considerati un valido supporto nutrizionale per chi svolge attività fisica. Le vitamine B1 e B6 svolgono un ruolo chiave nel metabolismo energetico: la vitamina B6, in particolare, contribuisce anche al metabolismo delle proteine e del glicogeno e aiuta a ridurre stanchezza e affaticamento. Ramtech® BCAA 2:1:1 combina BCAA nel rapporto bilanciato 2:1:1 con vitamine B1 e B6 per il corretto metabolismo energetico e proteico."
        })
        .where(eq(productGroups.id, ramtechGroup[0].id));

      // Aggiornare immagini
      const ramtechProducts = await db.select().from(products).where(eq(products.groupId, ramtechGroup[0].id));
      for (const product of ramtechProducts) {
        await db.update(productImages)
          .set({ src: "ramtech-bcaa.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    console.log("✅ Completata la seconda fase di correzioni (problemi 9-14)");

  } catch (error) {
    console.error("💥 Errore durante le correzioni fase 2:", error);
    throw error;
  }
}

// Eseguire la funzione
fixBatch9Products_Phase2()
  .then(() => {
    console.log("🎉 Seconda fase di correzioni Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });