import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function fixBatch9Products_Phase3() {
  console.log("🔧 Avvio correzione problemi Batch 9 - Fase 3 (FINALE)...");

  try {
    // ===================
    // PROBLEMA 15: OMNIA Active Formula - Correggere descrizioni e aggiungere dati completi
    // ===================
    console.log("15. Correggendo OMNIA Active Formula...");
    
    const omniaGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'omnia-active-formula-ethicsport'));
    if (omniaGroup.length > 0) {
      const correctFeatures = [
        "Vitamine e minerali ad alto dosaggio",
        "100% dei valori nutritivi di riferimento",
        "Con fosfatidilcolina per l'assorbimento",
        "Contrasta debilitazione e stanchezza",
        "Gluten Free per celiaci"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "1 Capsula al giorno.",
          longDescription: "OMNIA® Active Formula è un integratore alimentare di vitamine e minerali con fosfatidilcolina. La formulazione apporta il 100% dei valori nutritivi (NRV) delle vitamine utili all'organismo umano e molti dei minerali coinvolti nei processi metabolici ed enzimatici. In particolare, le vitamine (C, B2, B3, B5, B6, B12) contribuiscono al corretto metabolismo energetico e alla riduzione della stanchezza e dell'affaticamento. Le vitamine B2, B3, B8, A, C insieme a Ca, Mg e Zn contribuiscono al mantenimento di una pelle normale e di ossa normali. Le Vitamine A, B6, B9, B12, C, D, insieme a Fe, Cu, Se, Zn contribuiscono alla normale funzione del sistema immunitario."
        })
        .where(eq(productGroups.id, omniaGroup[0].id));

      // Aggiornare immagini
      const omniaProducts = await db.select().from(products).where(eq(products.groupId, omniaGroup[0].id));
      for (const product of omniaProducts) {
        await db.update(productImages)
          .set({ src: "omina-active-formula.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 16: Super Hydro Tabs - Correggere descrizioni e aggiungere dati completi
    // ===================
    console.log("16. Correggendo Super Hydro Tabs...");
    
    const superHydroGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'super-hydro-tabs-ethicsport'));
    if (superHydroGroup.length > 0) {
      const correctFeatures = [
        "Integratore idrosalino senza zuccheri",
        "Ipotonico e zero calorie",
        "Elettroliti bilanciati (487mg per compressa)",
        "Vitamine B1, B2, B6 antiaffaticamento",
        "Ottimizza l'assorbimento di acqua"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Sciogliere 1 compressa in circa 500 ml di acqua. Assumere ad intervalli regolari di 15-20 minuti. È preferibile non superare la dose massima di 3 compresse, pari a circa 3 borracce di soluzione, a meno di casi eccezionali, come gare o allenamenti occasionali molto lunghi.",
          longDescription: "SuperHydro Tabs è un integratore alimentare idrosalino in compresse, senza zuccheri aggiunti e senza calorie. La speciale formulazione consente un'ottimale idratazione e ottimizza l'assorbimento di acqua durante l'attività intensa. Sodio, potassio, magnesio, calcio e cloro sono elettroliti bilanciati che generano una soluzione con 487mg di sali minerali per compressa. Le vitamine B1, B2, B6 contribuiscono alla riduzione della stanchezza e dell'affaticamento e al normale metabolismo energetico."
        })
        .where(eq(productGroups.id, superHydroGroup[0].id));

      // Aggiornare immagini per i diversi gusti
      const superHydroProducts = await db.select().from(products).where(eq(products.groupId, superHydroGroup[0].id));
      for (const product of superHydroProducts) {
        if (product.flavor?.toLowerCase().includes("limone")) {
          await db.update(productImages)
            .set({ src: "super-hydro-tabs-limone.png" })
            .where(eq(productImages.productId, product.id));
        } else if (product.flavor?.toLowerCase().includes("arancio")) {
          await db.update(productImages)
            .set({ src: "super-hydro-tabs-arancio.png" })
            .where(eq(productImages.productId, product.id));
        }
      }
    }

    // ===================
    // PROBLEMA 17: Pre Gara Endurance - Correggere descrizioni e aggiungere dati completi
    // ===================
    console.log("17. Correggendo Pre Gara Endurance...");
    
    const preGaraGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'pre-gara-endurance-ethicsport'));
    if (preGaraGroup.length > 0) {
      const correctFeatures = [
        "Massimizza la resistenza negli sport di lunga durata",
        "Maltodestrine a lunga catena e BCAA",
        "Vitamine B e C antiaffaticamento",
        "Elettroliti per la funzione muscolare",
        "Gluten Free per tutti gli atleti"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Si consiglia l'utilizzo del prodotto circa 30min. prima dell'impegno sportivo. Utilizzare 1 busta in circa 200 ml di acqua per attività di media durata, 2 buste (in circa 400 ml di acqua) in caso di impegno fisico intenso e prolungato. Per ottimizzare l'assimilazione del prodotto, quando la temperatura esterna è particolarmente elevata, è utile bere circa 200 cc di acqua circa 10-15 minuti prima dell'inizio della prestazione.",
          longDescription: "Il prodotto permette di realizzare una soluzione di carboidrati complessi ed elettroliti, utile al mantenimento di prestazioni di resistenza durante l'esercizio fisico prolungato. Pre Gara Endurance fornisce maltodestrine a lunga catena, amminoacidi glucogenici e amminoacidi ramificati, in grado di essere metabolizzati in tempi diversi. La presenza di vitamine (B2, B5, B6, C e Folato) coadiuva la riduzione della stanchezza e dell'affaticamento, mentre gli elettroliti presenti (Ca, Mg, K) contribuiscono alla normale funzione muscolare."
        })
        .where(eq(productGroups.id, preGaraGroup[0].id));

      // Aggiornare immagini
      const preGaraProducts = await db.select().from(products).where(eq(products.groupId, preGaraGroup[0].id));
      for (const product of preGaraProducts) {
        await db.update(productImages)
          .set({ src: "pre-gara-endurance.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 18: Borraccia 600/800 ml - Aggiungere descrizioni complete e modalità d'uso
    // ===================
    console.log("18. Correggendo Borraccia EthicSport...");
    
    const borracceGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'borraccia-ethicsport'));
    if (borracceGroup.length > 0) {
      const correctFeatures = [
        "Borraccia sportiva EthicSport professionale",
        "Materiale di alta qualità BPA-free",
        "Apertura wide-mouth per facile riempimento",
        "Design ergonomico e antiscivolo",
        "Disponibile in due formati: 600ml e 800ml"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Riempire la borraccia con la bevanda desiderata. Lavare accuratamente dopo ogni utilizzo. Non utilizzare in lavastoviglie. Conservare in luogo asciutto.",
          longDescription: "Borraccia sportiva EthicSport progettata specificamente per gli atleti e gli sportivi. Realizzata con materiali di alta qualità privi di BPA, garantisce sicurezza e durata nel tempo. Il design ergonomico facilita la presa durante l'attività sportiva, mentre l'apertura wide-mouth permette un facile riempimento e pulizia. Disponibile nei formati da 600ml e 800ml per soddisfare le diverse esigenze di idratazione durante l'allenamento e le competizioni."
        })
        .where(eq(productGroups.id, borracceGroup[0].id));

      // Aggiornare immagini
      const borracceProducts = await db.select().from(products).where(eq(products.groupId, borracceGroup[0].id));
      for (const product of borracceProducts) {
        await db.update(productImages)
          .set({ src: "borraccia-ethicsport.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 19: Sacca EthicSport - Aggiungere descrizioni complete e modalità d'uso
    // ===================
    console.log("19. Correggendo Sacca EthicSport...");
    
    const saccaGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 'sacca-ethicsport'));
    if (saccaGroup.length > 0) {
      const correctFeatures = [
        "Sacca sportiva EthicSport multifunzionale",
        "Materiale resistente e idrorepellente",
        "Ampio scomparto principale con zip",
        "Tasche laterali per accessori",
        "Design moderno con logo EthicSport"
      ];
      
      await db.update(productGroups)
        .set({ 
          features: correctFeatures,
          howToUse: "Utilizzare per trasportare attrezzatura sportiva e abbigliamento. Pulire con panno umido quando necessario. Non lavare in lavatrice.",
          longDescription: "Sacca sportiva EthicSport progettata per accompagnare gli atleti in ogni occasione. Realizzata con materiali resistenti e idrorepellenti, offre protezione per l'attrezzatura sportiva e l'abbigliamento. L'ampio scomparto principale con zip sicura garantisce spazio sufficiente per tutti gli essenziali, mentre le tasche laterali permettono di organizzare al meglio gli accessori. Il design moderno con logo EthicSport riflette lo stile sportivo e professionale del brand."
        })
        .where(eq(productGroups.id, saccaGroup[0].id));

      // Aggiornare immagini
      const saccaProducts = await db.select().from(products).where(eq(products.groupId, saccaGroup[0].id));
      for (const product of saccaProducts) {
        await db.update(productImages)
          .set({ src: "sacca-ethicsport.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    // ===================
    // PROBLEMA 20: T-Shirt EthicSport - Sistemare descrizione e formato taglie
    // ===================
    console.log("20. Correggendo T-Shirt EthicSport Limited Edition...");
    
    const tshirtGroup = await db.select().from(productGroups).where(eq(productGroups.slug, 't-shirt-ethicsport-limited-edition'));
    if (tshirtGroup.length > 0) {
      // Correggere la descrizione lunga
      await db.update(productGroups)
        .set({ 
          longDescription: "T-Shirt EthicSport Limited Edition in cotone premium, progettata per offrire massimo comfort e stile durante l'attività sportiva e nel tempo libero. Realizzata con tessuti traspiranti e di alta qualità, presenta il logo EthicSport in una grafica esclusiva Limited Edition. Il taglio è studiato per garantire libertà di movimento e vestibilità perfetta. Disponibile in diverse taglie per soddisfare ogni esigenza."
        })
        .where(eq(productGroups.id, tshirtGroup[0].id));

      // Correggere il formato delle taglie da "Staglia" a "S", "M", "L", "XL"
      const tshirtProducts = await db.select().from(products).where(eq(products.groupId, tshirtGroup[0].id));
      
      for (const product of tshirtProducts) {
        // Correggere productSizes da "Staglia" alle taglie corrette
        const productSizesData = await db.select().from(productSizes).where(eq(productSizes.productId, product.id));
        
        for (const sizeData of productSizesData) {
          if (sizeData.unit === "Staglia" || sizeData.unit === "taglia") {
            let newValue = sizeData.value;
            if (sizeData.value === "Staglia") {
              // Dedurre la taglia dal nome del prodotto
              if (product.name?.includes(" S ") || product.name?.endsWith(" S")) {
                newValue = "S";
              } else if (product.name?.includes(" M ") || product.name?.endsWith(" M")) {
                newValue = "M";
              } else if (product.name?.includes(" L ") || product.name?.endsWith(" L")) {
                newValue = "L";
              } else if (product.name?.includes(" XL ") || product.name?.endsWith(" XL")) {
                newValue = "XL";
              }
            }
            
            await db.update(productSizes)
              .set({ 
                value: newValue,
                unit: "taglia"
              })
              .where(eq(productSizes.id, sizeData.id));
          }
        }

        // Aggiornare immagini
        await db.update(productImages)
          .set({ src: "tshirt-ethicsport-limited.png" })
          .where(eq(productImages.productId, product.id));
      }
    }

    console.log("✅ Completata la terza fase di correzioni (problemi 15-20)");
    console.log("🎉 TUTTE LE CORREZIONI DEL BATCH 9 SONO STATE COMPLETATE!");

  } catch (error) {
    console.error("💥 Errore durante le correzioni fase 3:", error);
    throw error;
  }
}

// Eseguire la funzione
fixBatch9Products_Phase3()
  .then(() => {
    console.log("🎉 Terza fase di correzioni Batch 9 completata!");
    console.log("✅ BATCH 9 COMPLETAMENTE CORRETTO E OTTIMIZZATO!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });