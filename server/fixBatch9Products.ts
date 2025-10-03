import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function fixBatch9Products() {
  console.log("🔧 Avvio correzione problemi Batch 9...");

  try {
    // ===================
    // PROBLEMA 1: BCAA Powder 2:1:1 - Rimuovere valori nutrizionali per 100g
    // ===================
    console.log("1. Correggendo BCAA Powder 2:1:1...");
    
    const bcaaPowderGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'bcaa-powder-2-1-1-premier'));
    if (bcaaPowderGroup.length > 0) {
      const correctFeatures = [
        "Aminoacidi ramificati nel rapporto 2:1:1",
        "L-Leucina, L-Isoleucina, L-Valina",
        "Formula in polvere altamente solubile",
        "Supporta il recupero muscolare",
        "Per sportivi che praticano attività intense"
      ];
      
      await db.update(productGroups)
        .set({ features: correctFeatures })
        .where(eq(productGroups.id, bcaaPowderGroup[0].id));
    }

    // ===================
    // PROBLEMA 2: Hard EAA 8:1 - Rimuovere valori nutrizionali per 100g
    // ===================
    console.log("2. Correggendo Hard EAA 8:1...");
    
    const hardEAAGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-eaa-8-1-premier'));
    if (hardEAAGroup.length > 0) {
      const correctFeatures = [
        "Aminoacidi essenziali nel rapporto 8:1:1",
        "Formula avanzata con leucina potenziata",
        "Supporta la sintesi proteica",
        "Ideale per il recupero post-allenamento",
        "Compresse facili da assumere"
      ];
      
      await db.update(productGroups)
        .set({ features: correctFeatures })
        .where(eq(productGroups.id, hardEAAGroup[0].id));
    }

    // ===================
    // PROBLEMA 3: Total Energy - Aggiungere dati completi
    // ===================
    console.log("3. Correggendo Total Energy...");
    
    const totalEnergyGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'total-energy-premier'));
    if (totalEnergyGroup.length > 0) {
      const correctFeatures = [
        "Fruttosio e maltodestrine per energia immediata",
        "Arricchito con L-Carnitina e vitamine",
        "Minerali essenziali: potassio, magnesio, calcio",
        "Vitamine C, E, B6 per il metabolismo energetico",
        "Ideale prima, durante e dopo l'allenamento"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 40 g di prodotto (2 misurini) in 250 ml d'acqua. All'interno della confezione è disponibile un misurino dosatore.",
          longDescription: "TOTAL ENERGY è un integratore energetico per sportivi in polvere a base di Fruttosio e Maltodestrine (zuccheri semplici a media catena), che permettono di ottenere energia immediata a lungo termine; è arricchito con L-Carnitina in grado di veicolare gli acidi grassi favorendo la produzione di energia per le cellule, preservando la massa magra e incrementando le prestazioni durante l'allenamento, vitamine (C, E, B6) e minerali (potassio, magnesio, cromo, fosforo e calcio), essenziali per il benessere complessivo del corpo."
        })
        .where(eq(productGroups.id, totalEnergyGroup[0].id));

      // Aggiornare immagini
      const totalEnergyProducts = await db.select().from(products).where(eq(products.groupId, totalEnergyGroup[0].id));
      for (const product of totalEnergyProducts) {
        await db.update(productImages)
          .set({ src: "TOTAL-ENERGY-SITO.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 4: Hard Start X-Plode - Aggiungere dati completi
    // ===================
    console.log("4. Correggendo Hard Start X-Plode...");
    
    const hardStartGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'hard-start-x-plode-premier'));
    if (hardStartGroup.length > 0) {
      const correctFeatures = [
        "Pre-workout completo con Beta Alanina",
        "Creatina Creapure® e MCT",
        "L-Citrullina e L-Arginina KYOWA",
        "Taurina e Caffeina da Paulinia Cupana",
        "Vitamine B6 e B12 per l'energia"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 15 g di prodotto (20 cc del misurino graduato disponibile all'interno della confezione) con acqua 30 minuti prima dell'allenamento.",
          longDescription: "HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creapure®,  Citrullina KYOWA, L-Arginina KYOWA, L-Arginina Cloridrato, Taurina, Paulinia Cupana, Vitamina B6 e B12. HARD START X-PLODE è un PRE WORK-OUT indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate, favorendo la forza e la durata della performance. Il prodotto svolge un'ottima azione volumizzante."
        })
        .where(eq(productGroups.id, hardStartGroup[0].id));

      // Aggiornare immagini
      const hardStartProducts = await db.select().from(products).where(eq(products.groupId, hardStartGroup[0].id));
      for (const product of hardStartProducts) {
        await db.update(productImages)
          .set({ src: "HARD-START-XPLODE-SITO-1.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 5: Glutamine Pure 1000 - Aggiungere dati completi
    // ===================
    console.log("5. Correggendo Glutamine Pure 1000...");
    
    const glutamine1000Group = await db.select().from(productGroups).where(eq(productGroups.slug, 'glutamine-pure-1000-premier'));
    if (glutamine1000Group.length > 0) {
      const correctFeatures = [
        "L-Glutammina KYOWA® di alta qualità",
        "Aminoacido più presente nel corpo umano",
        "Supporta il recupero muscolare",
        "Potenzia il sistema immunitario",
        "Riduce i rischi di sovrallenamento"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 3 compresse al giorno.",
          longDescription: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento. La L-Glutammina è l'aminoacido più presente nel corpo umano naturalmente prodotto dal nostro organismo, fondamentale quando il corpo è sottoposto a stress psico-fisici."
        })
        .where(eq(productGroups.id, glutamine1000Group[0].id));

      // Aggiornare immagini
      const glutamine1000Products = await db.select().from(products).where(eq(products.groupId, glutamine1000Group[0].id));
      for (const product of glutamine1000Products) {
        await db.update(productImages)
          .set({ src: "GLUTAMINE-PURE-1000-SITO.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 6: High Pro Release - Aggiungere dati completi
    // ===================
    console.log("6. Correggendo High Pro Release...");
    
    const highProGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'high-pro-release-premier'));
    if (highProGroup.length > 0) {
      const correctFeatures = [
        "Mix proteico a rilascio graduale",
        "Caseine, siero e proteine vegetali",
        "Arricchito con DigeZyme® e L-Arginina",
        "Vitamine B1, B2, B6, B12",
        "Elevata digeribilità e solubilità"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere fino a 40 g di prodotto (4 misurini) in 250 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è presente un misurino dosatore.",
          longDescription: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo. HIGH PRO RELEASE fornisce una fonte proteica bilanciata di elevata qualità con un'eccellente solubilità. HIGH PRO RELEASE è arricchito con DigeZyme® (complesso di enzimi: alfa-amilasi, proteasi, lattasi, cellulasi, lipasi), L-Arginina (Kyowa®), Citrullina, vitamine B1, B2, B6 e B12."
        })
        .where(eq(productGroups.id, highProGroup[0].id));

      // Aggiornare immagini
      const highProProducts = await db.select().from(products).where(eq(products.groupId, highProGroup[0].id));
      for (const product of highProProducts) {
        await db.update(productImages)
          .set({ src: "HIGH-PRO-RELEASE-SITO.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 7: Glutamine Pure 100% - Aggiungere dati completi
    // ===================
    console.log("7. Correggendo Glutamine Pure 100%...");
    
    const glutaminePureGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'glutamine-pure-100-premier'));
    if (glutaminePureGroup.length > 0) {
      const correctFeatures = [
        "L-Glutammina KYOWA® 100% pura",
        "In polvere per massimo assorbimento",
        "Migliora il recupero muscolare",
        "Supporta le difese immunitarie",
        "Effetto anticatabolico"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 3g di prodotto (2 misurini) al giorno. All'interno della confezione è presente un misurino dosatore.",
          longDescription: "GLUTAMINE PURE 100% è un integratore alimentare in polvere di L-Glutammina (KYOWA®). La L-Glutammina ricopre un ruolo fondamentale: permette di migliorare il recupero dopo qualsiasi attività fisica intensa. La L-Glutammina è l'aminoacido più presente nel corpo umano naturalmente prodotto dal nostro organismo, fondamentale quando il corpo è sottoposto a stress psico-fisici."
        })
        .where(eq(productGroups.id, glutaminePureGroup[0].id));

      // Aggiornare immagini
      const glutaminePureProducts = await db.select().from(products).where(eq(products.groupId, glutaminePureGroup[0].id));
      for (const product of glutaminePureProducts) {
        await db.update(productImages)
          .set({ src: "GLUTAMINE-PURE-100-SITO.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 8: Maltodex Pure 100% - Aggiungere dati completi
    // ===================
    console.log("8. Correggendo Maltodex Pure 100%...");
    
    const maltodexGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'maltodex-pure-100-premier'));
    if (maltodexGroup.length > 0) {
      const correctFeatures = [
        "Maltodestrine purissime destrosio equivalenza 19",
        "Arricchito con vitamina B6",
        "Energia facilmente utilizzabile",
        "Rilascio energetico prolungato e regolare",
        "Utile prima, durante e dopo l'attività fisica"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Assumere 40 g di prodotto (2 misurini) al giorno in 250 ml d'acqua, lontano dai pasti principali. All'interno della confezione è disponibile un misurino dosatore.",
          longDescription: "MALTODEX PURE 100% è un integratore alimentare energetico in polvere di maltodestrine utile prima, durante e dopo le attività fisiche. È un prodotto dietetico energetico per sportivi in polvere di carboidrati costituito da Maltodestrine purissime, destrosio equivalenza 19, arricchito con vitamina B6. È un carboidrato complesso, che grazie alle sue molecole fornisce energia facilmente e rapidamente utilizzabile con un rilascio energetico prolungato e regolare."
        })
        .where(eq(productGroups.id, maltodexGroup[0].id));

      // Aggiornare immagini
      const maltodexProducts = await db.select().from(products).where(eq(products.groupId, maltodexGroup[0].id));
      for (const product of maltodexProducts) {
        await db.update(productImages)
          .set({ src: "MALTODEX-SITO.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    console.log("✅ Completata la prima fase di correzioni (problemi 1-8)");

  } catch (error) {
    console.error("💥 Errore durante le correzioni:", error);
    throw error;
  }
}

// Eseguire la funzione
fixBatch9Products()
  .then(() => {
    console.log("🎉 Prima fase di correzioni Batch 9 completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });