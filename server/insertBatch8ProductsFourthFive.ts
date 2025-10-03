import { db } from "./db";
import { products, brands, productCategories, productImages, productSizes } from "@shared/schema";
import { eq } from "drizzle-orm";

interface ProductVariant {
  flavor: string;
  size: string;
  price: number;
  image: string;
  available: boolean;
}

interface ProductData {
  name: string;
  slug: string;
  brand: string;
  category: string;
  basePrice: number;
  shortDescription: string;
  longDescription: string;
  howToUse: string;
  features: any;
  variants: ProductVariant[];
}

// Mapping delle categorie
const getCategoryId = (categoryName: string): number => {
  const categoryMap: Record<string, number> = {
    'Proteine': 1,
    'Alimenti Fit': 8,
    'Aminoacidi e Creatina': 2,
    'Supplementi': 7,
    'Pre-workout/Energetici': 3,
  };
  return categoryMap[categoryName] || 1;
};

// Prodotti 16-20
const batch8ProductsFourthFive: ProductData[] = [
  {
    name: "Hard ZMA XP",
    slug: "hard-zma-xp",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 35.00,
    shortDescription: "HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.",
    longDescription: `HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.
Integratore alimentare di ZMA® dell'azienda americana InterHealth USA, specializzata in ricerca, sviluppo e distribuzione di ingredienti nutraceutici. HARD ZMA XP contiene esclusivamente ZMA® U.S. PATENT costituito da zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6 e arricchito con N-acetilcisteina, vitamine C ed E.

ZMA® aumenta i livelli di testosterone totale e libero, il fattore di crescita insulino-simile (IGF-1), la forza e la potenza muscolare. Il testosterone e l'IGF-1 sono inoltre coinvolti nei processi di recupero e rigenerazione muscolare.`,
    howToUse: "Assumere fino a 2 compresse al giorno con acqua.",
    features: {
      "titolo": "ZMA, Vitamine e N-Acetylcisteina",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "2 compresse",
          "zma": "1,3 g",
          "di_cui_zinco": "15 mg (150% VNR)",
          "di_cui_magnesio": "250 mg (66,6% VNR)",
          "di_cui_vitamina_b6": "6 mg (428% VNR)",
          "n_acetylcisteina": "120 mg",
          "vitamina_c": "180 mg (225% VNR)",
          "vitamina_e": "30 mg (250% VNR)"
        }
      },
      "ingredienti": "ZMA® [zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6 (cloridrato di piridossina)], Vitamina C (Acido Ascorbico), N-Acetilcisteina, Vitamina E (Tocoferilacetato), Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; Agente di carica: cellulosa microcristallina.",
      "nota": "VNR = valore nutrizionale di riferimento"
    },
    variants: [
      { flavor: "Unico", size: "90 compresse", price: 35.00, image: "ZMA-SITO-PREMIERINTEGRATORI.png", available: true }
    ]
  },
  {
    name: "Arginine NO",
    slug: "arginine-no",
    brand: "Premier",
    category: "Pre-workout/Energetici",
    basePrice: 24.90,
    shortDescription: "ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6.",
    longDescription: `ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6. ARGININE NO è indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività ﬁsiche intense e prolungate. ARGININE NO non contiene glutine.
ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6. ARGININE NO è indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività ﬁsiche intense e prolungate. ARGININE NO non contiene glutine.

L'uso di Arginina in ambito sportivo è soprattutto legato al suo ruolo di antiossidante ed immunomodulante, importante soprattutto durante allenamenti particolarmente intensi e competizioni prolungate.

Non trascurabile anche il potenziale ruolo ergogenico, legato all'attività gluconeogenica dell'Arginina, e il ruolo detossificante nei confronti delle scorie azotate, solitamente più elevate negli sportivi.`,
    howToUse: "Assumere ﬁno a 3 compresse al giorno in funzione dell'entità globale dello sforzo muscolare.",
    features: {
      "titolo": "Integratore Arginina e Vitamine",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "3 compresse",
          "l_arginina": "3 g",
          "vitamina_b6": "2,1 mg (150% VNR)",
          "selenio": "75 mcg (135% VNR)"
        }
      },
      "ingredienti": "L-Arginina, Stabilizzanti: biossido di silicio, sali di magnesio degli acidi grassi, Polivinilpirrolidone; Agente di carica: cellulosa microcristallina; Selenio chelato tit. 0,2%, Vitamina B6 (cloridrato di piridossina).",
      "nota": "VNR = Valori nutritivi di riferimento"
    },
    variants: [
      { flavor: "Unico", size: "90 compresse", price: 24.90, image: "ARGININE-NO-SITO.png", available: true }
    ]
  },
  {
    name: "Total EGG",
    slug: "total-egg",
    brand: "Premier",
    category: "Proteine",
    basePrice: 49.00,
    shortDescription: "TOTAL EGG è un integratore alimentare in polvere di proteine dell'albume d'uovo arricchito con vitamine C, E, B1, B2, B6, B12.",
    longDescription: `TOTAL EGG è un integratore alimentare in polvere di proteine dell'albume d'uovo arricchito con vitamine C, E, B1, B2, B6, B12. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Le vitamine B1, B2, B6 e B12 contribuiscono al normale metabolismo energetico.

TOTAL EGG è un prodotto per sportivi monoproteico di albume d'uovo in polvere (EUROVO) arricchito con vitamine. Il prodotto fornisce un elevato apporto proteico, presenta un elevato valore biologico ed un profilo aminoacidico ottimale. TOTAL EGG può essere considerato una fonte di proteine nobili e complete.

Le ovoalbumine rappresentano la tradizionale alternativa alle proteine del latte, infatti il loro valore biologico e l'efficienza proteica sono simili.

Le proteine d'albume d'uovo rappresentano la scelta ideale per tutti quegli sportivi che non tollerano i derivati del latte. Le ovoalbumine godono di un ottimale profilo aminoacidico, perché caratterizzato da un ottimo equilibrio tra i vari aminoacidi essenziali. Le proteine dell'albume d'uovo sono proteine intermedie, quindi possiedono un ottimo potere saziante e sono indicate in varie fasi della giornata oltre che nel post workout.`,
    howToUse: "Assumere fino 40 g di prodotto (4 misurini) in 250 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore a base di Albumina d'uovo",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "350,5 kcal / 1489,63 kj",
          "grassi": "1 g",
          "di_cui_saturi": "0,5 g",
          "carboidrati": "6,0 g",
          "di_cui_zuccheri": "3,5 g",
          "proteine": "79 g",
          "sale": "1,4 g",
          "vitamina_c": "60 mg",
          "vitamina_b1": "0,82 mg",
          "vitamina_b2": "1,05 mg",
          "vitamina_b6": "1,05 mg",
          "vitamina_b12": "1,87 mcg"
        },
        "per_dose_40g": {
          "energia": "140 kcal / 593 kj",
          "grassi": "0,4 g",
          "di_cui_saturi": "0,2 g",
          "carboidrati": "2,4 g",
          "di_cui_zuccheri": "1,5 g",
          "proteine": "32 g",
          "sale": "0,6 g",
          "vitamina_c": "24 mg (30% VNR)",
          "vitamina_b1": "0,33 mg (30% VNR)",
          "vitamina_b2": "0,42 mg (30% VNR)",
          "vitamina_b6": "0,42 mg (30% VNR)",
          "vitamina_b12": "0,75 mcg (30% VNR)"
        }
      },
      "ingredienti": "ALBUME D'UOVO in polvere, fruttosio, aromi, edulcoranti: Sucralosio; vitamina C (acido ascorbico), Vitamina B6 (cloridrato di piridossina), Vitamina B2 (riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (cianocobalamina).",
      "nota": "VNR = valore nutrizionale di riferimento"
    },
    variants: [
      { flavor: "Cacao", size: "1kg", price: 49.00, image: "TOTAL-EGG-SITO.png", available: true }
    ]
  },
  {
    name: "BCAA Powder 2:1:1",
    slug: "bcaa-powder-2-1-1-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 30.00,
    shortDescription: "BCAA POWDER 2:1:1 è un integratore in polvere al gusto arancia di aminoacidi ramificati: L-Leucina, L-Valina, L-Isoleucina indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate.",
    longDescription: `BCAA POWDER 2:1:1 è un integratore in polvere al gusto arancia di aminoacidi ramificati: L-Leucina, L-Valina, L-Isoleucina indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate.
BCAA POWDER 2:1:1 è un prodotto in polvere a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, caratterizzato da una formulazione bilanciata: 2 L-Leucina, 1 L-Valina, 1 L-Isoleucina (rapporto 2:1:1) e arricchito con vitamina B6, coinvolta in tutte le fasi del metabolismo aminoacidico.

È scientificamente riconosciuta l'importanza dei BCAA per l'organismo, soprattutto in contesti di attività fisica e sportiva. Prima dell'allenamento forniscono energia per sostenere intensi sforzi muscolari, hanno una funzione anticatabolica, e favoriscono recupero e aumento massa.

Premier Integratori si affida a materie prime di qualità per la sua formulazione di aminoacidi 2:1:1 purissimi, 100% sugar free, gluten free e lactose free. I BCAA Premier Integratori garantiscono migliori prestazioni e una maggiore efficacia, sia nel breve che nel lungo periodo.`,
    howToUse: "Assumere 5 g di prodotto (1 misurino) con un bicchiere d'acqua mezz'ora prima dell'allenamento. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore BCAA",
      "valori_nutrizionali": {
        "per_dose_5g": {
          "l_leucina": "2,4 g",
          "l_isoleucina": "1,2 g",
          "l_valina": "1,2 g",
          "vitamina_b6": "1 mg (70% VNR)"
        }
      },
      "ingredienti": "L-Leucina, L-Isoleucina, L-Valina, Aromi, Edulcoranti: Acesulfame K, Sucalosio; Vitamina B6 (Cloridrato di piridossina).",
      "nota": "*VNR% = valori nutrizionali di riferimento"
    },
    variants: [
      { flavor: "Arancia", size: "200g", price: 30.00, image: "BCAA-POWDER-SITO.png", available: true },
      { flavor: "Arancia", size: "400g", price: 55.00, image: "BCAA-POWDER-SITO.png", available: true }
    ]
  },
  {
    name: "Hard EAA 8:1",
    slug: "hard-eaa-8-1-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 36.00,
    shortDescription: "HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.",
    longDescription: `HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.
EAA 8:1 FREE FORM è un integratore di Aminoacidi Essenziali in compresse arricchito con L-Istidina e Vitamina B2.

Gli Aminoacidi Essenziali sono 8 e fanno parte dei 20 aminoacidi che partecipano alla sintesi proteica e quindi al corretto svolgimento delle funzioni dell'organismo umano. Sono definiti essenziali quegli aminoacidi che il corpo non riesce a sintetizzare in quantità sufficiente a far fronte ai propri bisogni: Fenilalanina, Isoleucina, Lisina, Leucina, Metionina, Treonina, Triptofano e Valina. La scarsità o la mancanza di un aminoacido essenziale agisce infatti come fattore limitante della sintesi proteica endogena.`,
    howToUse: "Assumere fino a 5 compresse al giorno con acqua.",
    features: {
      "titolo": "Integratore di Aminoacidi Essenziali",
      "valori_nutrizionali": {
        "per_dose_5_compresse": {
          "l_leucina": "1,3 g",
          "l_isoleucina": "0,650 g",
          "l_valina": "0,650 g",
          "l_lisina": "0,680 g",
          "l_fenilalanina": "0,630 g",
          "l_treonina": "0,525 g",
          "l_metionina": "0,315 g",
          "l_triptofano": "0,180 g",
          "l_istidina": "0,250 g",
          "vitamina_b2": "7 mg (500% VNR)"
        }
      },
      "ingredienti": "L-Leucina, L-Lisina, L-Isoleucina, L-Valina, L-Fenilalanina, L-Treonina, agente di carica: cellulosa microcristallina; L-Metionina, L-Istidina, L-Triptofano, stabilizzanti: sali di magnesio degli acidi grassi; Riboflavina (Vitamina B2).",
      "nota": "*VNR = Valori nutritivi di riferimento"
    },
    variants: [
      { flavor: "Unico", size: "150 compresse", price: 36.00, image: "EAA-SITO.png", available: true }
    ]
  }
];

export async function insertBatch8ProductsFourthFive() {
  console.log("🚀 Iniziando inserimento prodotti 16-20 del Batch 8...");
  
  try {
    // Verifica brand Premier
    const [premierBrand] = await db.select().from(brands).where(eq(brands.name, "Premier"));
    if (!premierBrand) {
      throw new Error("Brand Premier non trovato nel database");
    }
    console.log(`✅ Brand Premier trovato: ID ${premierBrand.id}`);

    let totalVariants = 0;
    
    for (const productData of batch8ProductsFourthFive) {
      console.log(`\n📦 Inserendo prodotto: ${productData.name}`);
      
      const categoryId = getCategoryId(productData.category);
      console.log(`📂 Categoria: ${productData.category} (ID: ${categoryId})`);

      // Per ogni variante, crea un prodotto separato
      for (let i = 0; i < productData.variants.length; i++) {
        const variant = productData.variants[i];
        const variantSlug = `${productData.slug}-${variant.flavor.toLowerCase().replace(/\s+/g, '-')}-${variant.size.toLowerCase().replace(/\s+/g, '-')}`;
        
        console.log(`  🔹 Inserendo variante: ${variant.flavor} ${variant.size} - €${variant.price}`);

        // Inserisci il prodotto
        const [insertedProduct] = await db.insert(products).values({
          slug: variantSlug,
          name: `${productData.name} ${variant.flavor} ${variant.size}`,
          brandId: premierBrand.id,
          categoryId: categoryId,
          description: productData.shortDescription,
          longDescription: productData.longDescription,
          features: productData.features,
          howToUse: productData.howToUse,
          flavor: variant.flavor,
          size: variant.size,
          isNew: false,
          isBestSeller: false,
          hasSpecialOffer: false
        }).returning();

        console.log(`    ✅ Prodotto inserito: ID ${insertedProduct.id}`);

        // Inserisci l'immagine
        await db.insert(productImages).values({
          productId: insertedProduct.id,
          src: `/images/products/${variant.image}`,
          alt: `${productData.name} ${variant.flavor} ${variant.size}`,
          isPrimary: true
        });

        console.log(`    🖼️ Immagine inserita: ${variant.image}`);

        // Inserisci il prezzo
        await db.insert(productSizes).values({
          productId: insertedProduct.id,
          value: variant.size,
          unit: 'pz',
          price: Math.round(variant.price * 100) // Prezzo in centesimi
        });

        console.log(`    💰 Prezzo inserito: €${variant.price}`);
        totalVariants++;
      }
      
      console.log(`✅ Prodotto ${productData.name} completato con ${productData.variants.length} varianti`);
    }

    console.log(`\n🎉 Inserimento completato!`);
    console.log(`📊 Totale prodotti base: ${batch8ProductsFourthFive.length}`);
    console.log(`📊 Totale varianti inserite: ${totalVariants}`);

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertBatch8ProductsFourthFive()
    .then(() => {
      console.log("✅ Script completato con successo!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script fallito:", error);
      process.exit(1);
    });
}