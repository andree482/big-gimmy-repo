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

// Prodotti 11-15
const batch8ProductsThirdFive: ProductData[] = [
  {
    name: "Intra Pro Essential+",
    slug: "intra-pro-essential-plus",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 40.00,
    shortDescription: "INTRA PRO ESSENTIAL + è un integratore di aminoacidi essenziali in polvere arricchito con L-istidina, quattro aminoacidi utili a supportare gli allenamenti intensi tra i quali L-glutammina, L-arginina e citrullina (Kyowa® Quality) e vitamine B6 e B2.",
    longDescription: `INTRA PRO ESSENTIAL + è un integratore di Aminoacidi Essenziali in polvere arricchito con L-istidina e L-glutammina, L-arginina, citrullina (Kyowa® Quality), vitamine B6 e B2.

Gli Aminoacidi Essenziali sono 8 e fanno parte dei 20 aminoacidi che partecipano alla sintesi proteica e quindi al corretto svolgimento delle funzioni dell'organismo umano. Sono definiti essenziali quegli aminoacidi che il corpo non riesce a sintetizzare in quantità sufficiente a far fronte ai propri bisogni: Fenilalanina, Isoleucina, Lisina, Leucina, Metionina, Treonina, Triptofano e Valina. La scarsità o la mancanza di un aminoacido essenziale agisce infatti come fattore limitante della sintesi proteica endogena.`,
    howToUse: "Assumere fino a 8 g (due misurini rasi) al giorno con acqua.",
    features: {
      "titolo": "Integratore di Aminoacidi",
      "valori_nutrizionali": {
        "per_dose_8g": {
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "l_leucina": "1,2 g",
          "l_glutammina": "1 g",
          "l_lisina": "0,72 g",
          "l_fenilalanina": "0,72 g",
          "l_isoleucina": "0,6 g",
          "l_valina": "0,6 g",
          "l_treonina": "0,6 g",
          "l_arginina_hcl": "0,5 g",
          "l_metionina": "0,48 g",
          "l_triptofano": "0,24 g",
          "l_istidina": "0,24 g",
          "citrullina": "0,24 g"
        }
      },
      "ingredienti": "miscela di aminoacidi (L-leucina, l-glutammina, L-lisina, L-fenilalanina, L-isoleucina, L-valina, L-treonina, l-arginina cloridrato, l-metionina, L-istidina, L-triptofano, citrullina), acido citrico, acido tartarico, aromi, sodio bicarbonato, edulcoranti: sucralosio, riboflavina (vitamina B2), cloridrato di piridossina (vitamina B6.)",
      "nota": "*%VNR = Valori nutritivi di riferimento"
    },
    variants: [
      { flavor: "Agrumi", size: "200gr", price: 40.00, image: "INTRA-PRO-ESSENTIAL-SITO-PREMIERINTEGRATORI.png", available: true }
    ]
  },
  {
    name: "BCAA Powder 8:1:1",
    slug: "bcaa-powder-8-1-1-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 39.00,
    shortDescription: "BCAA POWDER 8:1:1 è un prodotto in polvere al gusto di agrumi, a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, che per il loro diverso contenuto di Leucina, stimolano la sintesi proteica favorendo un recupero più rapido e l'aumento massa, quindi indicati per il post workout. BCAA POWDER 8:1:1 è arricchito con vitamina B1, B2, B6.",
    longDescription: `BCAA POWDER 8:1:1 è un prodotto in polvere a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, che per il loro diverso contenuto di Leucina, stimolano la sintesi proteica favorendo un recupero più rapido e l'aumento massa, quindi indicati per il post workout. BCAA POWDER 8:1:1 è arricchito con vitamine B1, B2, B6.

È scientificamente riconosciuta l'importanza dei BCAA per l'organismo, soprattutto in contesti di attività fisica e sportiva. Prima dell'allenamento forniscono energia per sostenere intensi sforzi muscolari, hanno una funzione anticatabolica, e favoriscono recupero e aumento massa.

Premier integratori si affida a materie prime di qualità per la sua formulazione di aminoacidi 8:1:1 purissimi, 100% liberi da zuccheri, glutine e lattosio, totalmente privi di carboidrati e adatti ai consumatori vegani. I BCAA Premier Integratori garantiscono migliori prestazioni e una maggiore efficacia, sia nel breve che nel lungo periodo.`,
    howToUse: "Assumere fino a 5,5 grammi (un misurino colmo) al giorno con acqua. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore BCAA e Vitamine",
      "valori_nutrizionali": {
        "per_dose_5_5g": {
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "l_leucina": "4 g",
          "l_isoleucina": "0,5 g",
          "l_valina": "0,5 g"
        }
      },
      "ingredienti": "L-leucina, L-isoleucina, L-valina, acido citrico, acido tartarico, aromi, sodio bicarbonato, edulcoranti: sucralosio; riboflavina (vitamina B2), cloridrato di piridossina (vitamina B6), cloridrato di tiamina (vitamina B1).",
      "nota": "VNR = valori nutrizionali di riferimento"
    },
    variants: [
      { flavor: "Agrumi", size: "250g", price: 39.00, image: "BCAAPOWDER811-SITO-PREMIERINTEGRATORI.png", available: true }
    ]
  },
  {
    name: "D3/K2 Complex",
    slug: "d3-k2-complex",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 22.00,
    shortDescription: "D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali.",
    longDescription: `D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali. La Vitamina K2 è essenziale per l'attivazione di proteine k-dipendenti che sono coinvolte sia nella coagulazione sanguigna che nel metabolismo osseo e nell'inibizione della calcificazione arteriosa.
D3/K2 COMPLEX è un integratore di vitamine D3 e vitamina K2 ideale per lo sportivo ad alte prestazioni.

La Vitamina D è un pro-ormone in grado di svolgere un importante ruolo a livello dei tessuti ossei. La vitamina D mostra azioni extra-scheletriche che regolano molti processi fisiologici: risposta immunitaria, salute cardiovascolare, obesità, diabete, depressione, declino cognitivo, patologie autoimmuni e alcune neoplasie.`,
    howToUse: "Assumere fino a 2 perle al giorno suddivise nell'arco della giornata.",
    features: {
      "titolo": "Integratore Vitamina D3 e K2",
      "valori_nutrizionali": {
        "per_dose_2_softgel": {
          "vitamina_d3": "50 mcg (1000% VNR)",
          "vitamina_k2": "90 mcg (120% VNR)"
        }
      },
      "ingredienti": "Olio di SOIA, gelatina alimentare, glicerolo, acqua, menachinone (Vitamina K2), colecalciferolo (Vitamina D3).",
      "nota": "VNR = Valori nutritivi di riferimento"
    },
    variants: [
      { flavor: "Unico", size: "90 perle", price: 22.00, image: "SITO-D3K2.png", available: true }
    ]
  },
  {
    name: "Hard Amx Carbo",
    slug: "hard-amx-carbo",
    brand: "Premier",
    category: "Pre-workout/Energetici",
    basePrice: 29.00,
    shortDescription: "HARD AMX CARBO è un integratore alimentare in polvere di carboidrati, aminoacidi ramificati, L-glutamina, creatina, taurina, vitamine e minerali.",
    longDescription: `HARD AMX CARBO è un integratore alimentare in polvere di carboidrati, aminoacidi ramificati, L-glutamina, creatina, taurina, vitamine e minerali. HARD AMX CARBO è indicato per integrare l'alimentazione dello sportivo soprattutto dopo attività fisica intensa e prolungata.

è indicato per integrare l'alimentazione soprattutto per il recupero dopo attività fisiche intense e prolungate.I carboidrati e i minerali presenti permettono di recuperare velocemente energia. I BCAA unitamente alla L-glutamina consentono il recupero svolgendo un'importante azione anticatabolica.

La creatina è coinvolta nel mantenimento delle riserve energetiche cellulari, mentre le vitamine e i minerali completano la formulazione contrastando l'azione ossidativa data dallo sforzo intenso.`,
    howToUse: "Assumere 50 g di prodotto (3 misurini) in 250 ml d'acqua. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore Pre-Workout/Recupero",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "1584 kj / 380 kcal",
          "grassi": "0 g",
          "carboidrati": "81 g",
          "di_cui_zuccheri": "17 g",
          "proteine": "0 g",
          "sale": "0 g",
          "potassio": "720 mg",
          "magnesio": "180 mg",
          "vitamina_c": "80 mg",
          "vitamina_b1": "1,1 mg",
          "vitamina_b2": "1,4 mg",
          "vitamina_b6": "1,4 mg",
          "vitamina_b12": "2,5 mcg",
          "l_leucina": "5 g",
          "l_valina": "2,5 g",
          "l_isoleucina": "2,5 g",
          "l_glutammina": "2 g",
          "creatina": "2 g",
          "taurina": "1 g"
        },
        "per_porzione_50g": {
          "energia": "792 kj / 190 kcal",
          "grassi": "0 g",
          "carboidrati": "40,5 g",
          "di_cui_zuccheri": "8,5 g",
          "proteine": "0 g",
          "sale": "0 g",
          "potassio": "360 mg (18% VNR)",
          "magnesio": "90 mg (24% VNR)",
          "vitamina_c": "40 mg (32% VNR)",
          "vitamina_b1": "0,55 mg (50% VNR)",
          "vitamina_b2": "0,7 mg (50% VNR)",
          "vitamina_b6": "0,7 mg (50% VNR)",
          "vitamina_b12": "1,25 mcg (50% VNR)",
          "l_leucina": "2,5 g",
          "l_valina": "1,25 g",
          "l_isoleucina": "1,25 g",
          "l_glutammina": "1 g",
          "creatina": "1 g",
          "taurina": "0,5 g"
        }
      },
      "ingredienti": "Maltodestrina, fruttosio, destrosio, acidificante: acido citrico (6%), L-leucina, acido tartarico, L-valina, L-isoleucina, L-glutammina, creatina monoidrato, potassio cloruro, aromi, taurina, coloranti (0.3%): succo di barbabietola disidratato, ossido di magnesio, acido l-ascorbico (vitamina C), sucralosio, cloridrato di piridossina (Vitamina B6), riboflavina (vitamina B2), cloridrato di tiamina (Vitamina B1), cianocobalamina (vitamina B12).",
      "nota": "*VNR%: valori nutritivi di riferimento"
    },
    variants: [
      { flavor: "Arancia", size: "500g", price: 29.00, image: "HARD-AMX-CARBO-SITO.png", available: true }
    ]
  },
  {
    name: "Hard WPH BV104",
    slug: "hard-wph-bv104",
    brand: "Premier",
    category: "Proteine",
    basePrice: 59.90,
    shortDescription: "HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104.",
    longDescription: `HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104. Il processo di predigestione (idrolisi) rende velocemente disponibili gli aminoacidi contenuti. HARD WPH BV104 ha un elevato valore biologico ed un profilo aminoacidico ottimale particolarmente ricco di aminoacidi ramificati, con un'eccellente solubilità. Arricchito con DigeZyme® (complesso di enzimi), vitamine B1, B2, B6 e B12.

HARD WPH BV104 è un integratore in polvere di proteine del latte isolate idrolizzate con un alto grado di idrolisi. Agiscono a pochi minuti dall'assunzione sul rifornimento delle riserve di glicogeno, ripristinando quelle utilizzate a scopo energetico e riparando i danni muscolari, contribuendo ad alleviare i dolori post allenamento e ottimizzando i tempi di recupero. Questo integratore, per la sua formulazione, è contraddistinto da un alto valore biologico (104) che descrive una proteina dal perfetto equilibrio amminoacidico e da un Pdcaas (Protein Digestibility Corrected Amino Acid Score) pari a 0,98 che indica una proteina considerata completa per l'uomo e in grado di fornire, dopo la digestione, il 100% degli aminoacidi essenziali necessari per una perfetta integrazione.`,
    howToUse: "Assumere fino a 30 g di prodotto (3 misurini) in 100 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è presente un misurino dosatore.",
    features: {
      "titolo": "Integratore Proteico Idrolizzato",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "386 kcal / 1640 kj",
          "grassi": "2 g",
          "di_cui_saturi": "0,5 g",
          "carboidrati": "2 g",
          "di_cui_zuccheri": "1,9 g",
          "proteine": "90 g",
          "sale": "0,2 g",
          "vitamina_b1": "3,6 mg",
          "vitamina_b2": "4,6 mg",
          "vitamina_b6": "4,6 mg",
          "vitamina_b12": "8,3 mcg"
        },
        "per_dose_30g": {
          "valore_energetico": "115 kcal / 492 kj",
          "grassi": "0,6 g",
          "di_cui_saturi": "0,3 g",
          "carboidrati": "0,6 g",
          "di_cui_zuccheri": "0,5 g",
          "proteine": "27 g",
          "sale": "60 mg",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)"
        }
      },
      "ingredienti": "Sieroproteine Idrolizzate del LATTE (Optipep® 90), cacao magro in polvere, NOCCIOLE tostate in polvere, aromi, Emulsionante: lecitina di SOIA; Digezyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais) Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (cloridrato di piridossina), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).",
      "nota": "VNR = valore nutrizionale di riferimento"
    },
    variants: [
      { flavor: "Crema Caffé", size: "750g", price: 59.90, image: "SITO-wph-104-premier-integratori-crema-caffe.png", available: true },
      { flavor: "Cioccolato Nocciola", size: "750g", price: 59.90, image: "SITO-wph-104-premier-integratori-crema-caffe.png", available: true }
    ]
  }
];

export async function insertBatch8ProductsThirdFive() {
  console.log("🚀 Iniziando inserimento prodotti 11-15 del Batch 8...");
  
  try {
    // Verifica brand Premier
    const [premierBrand] = await db.select().from(brands).where(eq(brands.name, "Premier"));
    if (!premierBrand) {
      throw new Error("Brand Premier non trovato nel database");
    }
    console.log(`✅ Brand Premier trovato: ID ${premierBrand.id}`);

    let totalVariants = 0;
    
    for (const productData of batch8ProductsThirdFive) {
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
    console.log(`📊 Totale prodotti base: ${batch8ProductsThirdFive.length}`);
    console.log(`📊 Totale varianti inserite: ${totalVariants}`);

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertBatch8ProductsThirdFive()
    .then(() => {
      console.log("✅ Script completato con successo!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script fallito:", error);
      process.exit(1);
    });
}