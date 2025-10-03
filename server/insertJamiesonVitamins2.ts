
import { db } from "./db.js";
import { brands, productCategories, products, productImages } from "@shared/schema";
import { eq } from "drizzle-orm";

const jamiesonVitaminsProducts = [
  {
    name: "Korean Red Ginseng",
    slug: "korean-red-ginseng",
    description: "Integratore di ginseng rosso coreano con ginsenosidi al 20%, tonico-adattogeno per energia fisica e mentale",
    longDescription: `## Descrizione
Korean Red Ginseng di Jamieson è un integratore alimentare a base di ginseng rosso coreano della specie Panax ginseng C.A Meyer titolato al 20% in ginsenosidi, i principali fitocomponenti attivi che si trovano nel ginseng.

## Benefici Principali
- **Azione adattogena**: aiuta l'organismo ad adattarsi allo stress fisico e mentale
- **Stimolante del sistema immunitario**: supporta le naturali difese dell'organismo
- **Antiossidante**: protegge le cellule dallo stress ossidativo
- **Tonico energizzante**: combatte stanchezza fisica e mentale

## Caratteristiche Tecniche
I ginsenosidi sono saponine estratte dalle radici delle piante di ginseng che hanno dimostrato proprietà adattogene e immunostimolanti. Il ginseng rosso coreano utilizzato da Jamieson è di qualità premium.

## A chi è rivolto
Ideale per adulti che necessitano di supporto energetico, studenti in periodo di esami, sportivi e persone sottoposte a stress fisico o mentale.`,
    
    keyIngredients: ["Ginseng Rosso Coreano", "Ginsenosidi 20%", "Panax ginseng", "Adattogeno"],
    sizes: ["100 compresse"],
    price: 39.90,
    
    nutritionalInfo: {
      per100g: {
        energia: "305 kcal",
        proteine: "0g",
        carboidrati: "76.2g",
        grassi: "0g",
        fibre: "0g",
        sodio: "0mg"
      },
      perPorzione: {
        porzione: "1 compressa",
        ginsengRossoCoreano: "500mg",
        ginsenosidi: "100mg"
      }
    },
    
    instructions: `## Come utilizzare
**Dosaggio:** Assumere 1 compressa al giorno con acqua

**Quando:** 
- Al mattino a stomaco pieno per massima energia
- Prima di attività che richiedono concentrazione mentale

**Durata:** Utilizzare per cicli di 8-12 settimane con pause di 2-3 settimane`,

    ingredients: `Estratto secco di radice di Ginseng rosso coreano (Panax ginseng C.A. Meyer) tit. 20% ginsenosidi, cellulosa microcristallina, calcio fosfato bibasico, **silice**, magnesio stearato vegetale, acido stearico vegetale.`,
    
    warnings: `Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non assumere in gravidanza e allattamento. Consultare il medico prima dell'uso se si assumono farmaci anticoagulanti.`,
    
    expertTip: `Il ginseng rosso coreano è considerato il più pregiato al mondo. Per massimizzare i benefici, assumere sempre a stomaco pieno e evitare nelle ore serali per non interferire con il sonno.`
  },
  
  {
    name: "Echinacea Purpurea",
    slug: "echinacea-purpurea",
    description: "Estratto di Echinacea purpurea per sostenere le naturali difese dell'organismo e il benessere delle vie respiratorie",
    longDescription: `## Descrizione
L'estratto di Echinacea purpurea di Jamieson deriva dalla radice di piante di almeno 3 anni, le quali hanno sintetizzato una maggiore concentrazione di principi attivi.

## Benefici Principali
- **Supporto immunitario**: contribuisce alle naturali difese dell'organismo
- **Benessere respiratorio**: supporta la funzionalità delle prime vie respiratorie
- **Azione preventiva**: utile nei periodi freddi e di cambio stagione
- **Sollievo naturale**: dona sollievo ai sintomi del raffreddore

## Caratteristiche Tecniche
L'Echinacea utilizzata da Jamieson proviene da una varietà di premiata qualità botanica, coltivata secondo un particolare procedimento europeo e sottoposta ad una specializzata tecnica di estrazione dei principi attivi.

## A chi è rivolto
Ideale per adulti e bambini sopra i 12 anni che vogliono sostenere le proprie difese immunitarie, specialmente nei mesi invernali e nei periodi di maggiore esposizione a virus e batteri.`,
    
    keyIngredients: ["Echinacea Purpurea", "Estratto radice", "Immunostimolante", "Vie respiratorie"],
    sizes: ["90 capsule"],
    price: 25.90,
    
    nutritionalInfo: {
      per100g: {
        energia: "320 kcal",
        proteine: "0g",
        carboidrati: "80g",
        grassi: "0g",
        fibre: "0g",
        sodio: "0mg"
      },
      perPorzione: {
        porzione: "1 capsula",
        estrattoEchinacea: "400mg",
        echinosidi: "16mg"
      }
    },
    
    instructions: `## Come utilizzare
**Dosaggio:** Assumere 1-2 capsule al giorno con acqua

**Quando:** 
- Durante i pasti per una migliore tollerabilità
- Al primo accenno di sintomi influenzali
- Come prevenzione nei periodi a rischio

**Durata:** Utilizzare per cicli di 6-8 settimane massimo, con pause di almeno 1 settimana`,

    ingredients: `Estratto secco di radice di Echinacea purpurea (Echinacea purpurea L.) tit. 4% echinosidi, cellulosa microcristallina, **gelatina** (capsula), magnesio stearato vegetale, **silice**.`,
    
    warnings: `Non superare la dose giornaliera consigliata. Non assumere per più di 8 settimane consecutive. Sconsigliato in caso di malattie autoimmuni. Consultare il medico in caso di allergie alle Asteraceae.`,
    
    expertTip: `L'Echinacea è più efficace se assunta ai primi sintomi. Per la prevenzione, iniziare il trattamento prima dell'arrivo della stagione fredda e fare cicli intermittenti.`
  }
];

async function insertJamiesonVitamins2() {
  console.log("🚀 Inserimento nuovi prodotti Jamieson Vitamins...");

  try {
    // Verifica/Crea il brand Jamieson
    let jamiesonBrand = await db.query.brands.findFirst({
      where: (brands, { eq }) => eq(brands.name, "Jamieson")
    });

    if (!jamiesonBrand) {
      console.log("📋 Creazione brand Jamieson...");
      const [newBrand] = await db.insert(brands).values({
        name: "Jamieson",
        slug: "jamieson",
        description: "Leader mondiale negli integratori vitaminici e minerali di alta qualità dal 1922",
        logo: "/images/brands/jamieson-logo.jpg"
      }).returning();
      jamiesonBrand = newBrand;
    }

    // Verifica categoria vitamine-e-minerali (ID 7)
    const vitamineCategory = await db.query.productCategories.findFirst({
      where: (categories, { eq }) => eq(categories.id, 7)
    });

    if (!vitamineCategory) {
      throw new Error("Categoria Vitamine e Minerali (ID 7) non trovata!");
    }

    let successCount = 0;
    let errorCount = 0;

    // Inserisci ogni prodotto
    for (const product of jamiesonVitaminsProducts) {
      try {
        console.log(`\n📦 Inserimento prodotto: ${product.name}...`);

        // Crea il prodotto base
        const [insertedProduct] = await db.insert(products).values({
          name: product.name,
          slug: product.slug,
          description: product.description,
          longDescription: product.longDescription,
          brandId: jamiesonBrand.id,
          categoryId: vitamineCategory.id,
          features: product.keyIngredients,
          howToUse: product.instructions,
          warnings: product.warnings,
          isNew: false,
          isBestSeller: false,
          hasSpecialOffer: false
        }).returning();

        // Inserisci l'immagine principale
        await db.insert(productImages).values({
          productId: insertedProduct.id,
          src: `/images/products/${product.slug}.png`,
          alt: product.name,
          isPrimary: true
        });

        console.log(`✅ Prodotto inserito: ${product.name} (ID: ${insertedProduct.id})`);
        successCount++;

      } catch (error) {
        console.error(`❌ Errore inserimento ${product.name}:`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Inserimento completato!`);
    console.log(`✅ Prodotti inseriti con successo: ${successCount}`);
    console.log(`❌ Errori: ${errorCount}`);

  } catch (error) {
    console.error("💥 Errore durante l'inserimento:", error);
    process.exit(1);
  }
}

// Esegui l'inserimento
insertJamiesonVitamins2()
  .then(() => {
    console.log("✅ Script completato con successo!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script fallito:", error);
    process.exit(1);
  });
