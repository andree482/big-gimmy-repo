import { db } from "./db";
import { products, brands, productCategories, productImages, productSizes, productGroups } from "@shared/schema";
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

// Tutti i 20 prodotti del batch 8 con la struttura corretta
const batch8Products: ProductData[] = [
  // Prodotto 1: Creatine Monohydrate
  {
    name: "Creatine Monohydrate",
    slug: "creatine-monohydrate-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 18.00,
    shortDescription: "CREATINE MONOHYDRATE è un integratore di creatina monoidrato micronizzata della purezza del 99,9%.",
    longDescription: `CREATINE MONOHYDRATE è un integratore di creatina monoidrato micronizzata della purezza del 99,9%. La creatina aumenta le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata. Gli effetti benefici si ottengono con l'assunzione giornaliera di 3 g di creatina.

La creatina è una fonte energetica del tutto naturale, contenuta nei vertebrati e anche nell'organismo umano come fosfocreatina. Viene sintetizzata dal fegato e in piccola parte dal pancreas e dai reni, a partire da tre aminoacidi: L-Arginina, Glicina e L-Metionina. Nella maggior parte dei casi (95%) viene immagazzinata nei muscoli scheletrici, sotto forma di creatina libera (40%) e come creatina-fosfato (60%). 

La creatina partecipa al rifornimento energetico necessario alle contrazioni muscolari tramite il sistema anaerobico alattacido, in sinergia con l'ATP.

CREATINE MONOHYDRATE è un prodotto privo di stimolanti, vegano, gluten free e senza coloranti.`,
    howToUse: "Sciogliere 3 g di prodotto (1 misurino) in un bicchiere d'acqua al giorno preferibilmente lontano dai pasti. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore di Creatina Monoidrato",
      "valori_nutrizionali": {
        "per_dose_3g": {
          "creatina_monoidrato": "3 g"
        }
      },
      "ingredienti": "Creatina monoidrato micronizzata.",
      "nota": "Effetti benefici si ottengono con l'assunzione giornaliera di 3 g di creatina"
    },
    variants: [
      { flavor: "Unflavored", size: "300g", price: 18.00, image: "CREATINA-PURE-100-SITO.png", available: true }
    ]
  },

  // Prodotto 2: Glutamine Ajinomoto
  {
    name: "Glutamine Ajinomoto",
    slug: "glutamine-ajinomoto-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 29.90,
    shortDescription: "GLUTAMINE AJINOMOTO è un integratore alimentare di L-Glutammina pura in polvere.",
    longDescription: `GLUTAMINE AJINOMOTO è un integratore alimentare di L-Glutammina pura in polvere, ottenuta mediante fermentazione naturale Ajinomoto®, senza derivati animali.

La glutammina è l'amminoacido più abbondante nel plasma e nel tessuto muscolare. Durante l'esercizio fisico intenso e prolungato, la concentrazione di glutammina nel sangue e nel muscolo diminuisce sostanzialmente e può rimanere bassa per diverse ore durante il periodo di recupero.

La L-glutammina rappresenta da sola il 61% degli aminoacidi presenti nel muscolo scheletrico. Durante i periodi di intenso stress fisico, la richiesta di glutammina da parte dell'organismo supera la capacità di sintesi, con conseguente diminuzione della glutammina muscolare.

GLUTAMINE AJINOMOTO contribuisce alla sintesi proteica ed è coinvolta nella regolazione dell'equilibrio acido-base.`,
    howToUse: "Assumere fino a 6 g di prodotto (1 misurino e mezzo) disciolti in un bicchiere d'acqua al giorno, preferibilmente lontano dai pasti principali. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore di L-Glutammina",
      "valori_nutrizionali": {
        "per_dose_6g": {
          "l_glutammina": "6 g"
        }
      },
      "ingredienti": "L-Glutammina Ajinomoto®.",
      "nota": "Prodotto ottenuto mediante fermentazione naturale, senza derivati animali"
    },
    variants: [
      { flavor: "Unflavored", size: "500g", price: 29.90, image: "GLUTAMMINE-PREMIER-SITO.png", available: true }
    ]
  },

  // Prodotto 3: Taurine
  {
    name: "Taurine",
    slug: "taurine-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 14.90,
    shortDescription: "TAURINE è un integratore alimentare a base di Taurina in compresse da 1000 mg.",
    longDescription: `TAURINE è un integratore alimentare a base di Taurina in compresse da 1000 mg. La taurina è un amminoacido non essenziale che si forma a partire dalla cisteina con l'intervento della vitamina B6.

La taurina è coinvolta nella stabilizzazione delle membrane cellulari e nella modulazione del flusso di calcio. È particolarmente concentrata nel muscolo cardiaco, nei muscoli scheletrici, nel sistema nervoso centrale e nei globuli bianchi.

Durante l'esercizio fisico intenso, i livelli di taurina possono diminuire. La supplementazione di taurina può aiutare a mantenere i livelli ottimali di questo importante aminoacido.

TAURINE è un prodotto vegano e gluten free.`,
    howToUse: "Assumere 1 compressa al giorno con un bicchiere d'acqua, preferibilmente ai pasti.",
    features: {
      "titolo": "Integratore di Taurina",
      "valori_nutrizionali": {
        "per_compressa": {
          "taurina": "1000 mg"
        }
      },
      "ingredienti": "Taurina, Agenti di carica: cellulosa microcristallina; Stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio.",
      "nota": "Prodotto vegano e gluten free"
    },
    variants: [
      { flavor: "Unico", size: "100 compresse", price: 14.90, image: "TAURINE-SITO.png", available: true }
    ]
  },

  // Prodotto 4: Citrulline Malate  
  {
    name: "Citrulline Malate",
    slug: "citrulline-malate-premier",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 24.90,
    shortDescription: "CITRULLINE MALATE è un integratore di L-Citrullina Malato in polvere nel rapporto 2:1.",
    longDescription: `CITRULLINE MALATE è un integratore di L-Citrullina Malato in polvere nel rapporto 2:1. La L-Citrullina è un aminoacido non essenziale coinvolto nel ciclo dell'urea e nella sintesi dell'ossido nitrico.

L'integrazione con citrullina malato può aiutare a migliorare le prestazioni durante l'esercizio fisico intenso. La citrullina viene convertita in arginina nell'organismo, contribuendo alla produzione di ossido nitrico.

Il malato è coinvolto nel ciclo di Krebs per la produzione di energia. La combinazione di citrullina e malato nel rapporto 2:1 offre benefici sinergici per le prestazioni sportive.

CITRULLINE MALATE è un prodotto vegano, gluten free e privo di stimolanti.`,
    howToUse: "Assumere 3 g di prodotto (1 misurino) sciolti in un bicchiere d'acqua 30 minuti prima dell'allenamento. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore di L-Citrullina Malato",
      "valori_nutrizionali": {
        "per_dose_3g": {
          "l_citrullina_malato_2_1": "3 g",
          "di_cui_l_citrullina": "2 g",
          "di_cui_malato": "1 g"
        }
      },
      "ingredienti": "L-Citrullina Malato (2:1).",
      "nota": "Rapporto ottimale 2:1 per massima efficacia"
    },
    variants: [
      { flavor: "Unflavored", size: "250g", price: 24.90, image: "CITRULLINA-MALATO-SITO.png", available: true }
    ]
  },

  // Prodotto 5: Pre-Workout Dynamine
  {
    name: "Pre-Workout Dynamine",
    slug: "pre-workout-dynamine-premier",
    brand: "Premier",
    category: "Pre-workout/Energetici",
    basePrice: 34.90,
    shortDescription: "PRE-WORKOUT DYNAMINE è un integratore pre-allenamento in polvere con Dynamine®, TeaCrine®, caffeina, beta-alanina, L-arginina e vitamine.",
    longDescription: `PRE-WORKOUT DYNAMINE è un integratore pre-allenamento in polvere con Dynamine®, TeaCrine®, caffeina, beta-alanina, L-arginina e vitamine del gruppo B.

Dynamine® (metilliberina) è un alcaloide purinico che si trova naturalmente nelle foglie di tè kucha. Offre energia rapida senza il crash tipico della caffeina, migliorando concentrazione e umore.

TeaCrine® (teacrina) è un alcaloide purinico che fornisce energia sostenibile e migliora la concentrazione mentale. Non crea tolleranza e ha un effetto sinergico con la caffeina.

La beta-alanina migliora la resistenza muscolare ritardando la fatica, mentre L-arginina supporta la vasodilatazione. Le vitamine del gruppo B contribuiscono al normale metabolismo energetico.`,
    howToUse: "Sciogliere 15 g di prodotto (1 misurino) in 250-300 ml d'acqua e assumere 30 minuti prima dell'allenamento. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Pre-workout con Dynamine® e TeaCrine®",
      "valori_nutrizionali": {
        "per_dose_15g": {
          "energia": "44 kcal / 188 kj",
          "carboidrati": "9 g",
          "di_cui_zuccheri": "7 g",
          "dynamine": "100 mg",
          "teacrine": "100 mg", 
          "caffeina": "200 mg",
          "beta_alanina": "2000 mg",
          "l_arginina": "1500 mg",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)"
        }
      },
      "ingredienti": "Destrosio, L-Arginina, Beta-Alanina, Aromi, Caffeina anidra, Acidificante: acido citrico; Dynamine® (metilliberina), TeaCrine® (teacrina), Colorante: succo di barbabietola disidratato; Edulcorante: sucralosio; Vitamine (B1, B2, B6, B12).",
      "nota": "VNR = Valori nutritivi di riferimento. Contiene caffeina (200mg per dose). Non raccomandato per bambini e donne in gravidanza."
    },
    variants: [
      { flavor: "Arancia", size: "300g", price: 34.90, image: "PRE-WORKOUT-DYNAMINE-SITO.png", available: true }
    ]
  },

  // Prodotto 6: Isowhey Pro-Zyme
  {
    name: "Isowhey Pro-Zyme",
    slug: "isowhey-pro-zyme-premier",
    brand: "Premier",
    category: "Proteine",
    basePrice: 34.90,
    shortDescription: "ISOWHEY PRO-ZYME è un integratore in polvere di proteine Isolate del siero di latte arricchito con DigeZyme® (complesso di enzimi digestivi).",
    longDescription: `ISOWHEY PRO-ZYME è un integratore in polvere di proteine Isolate del siero di latte arricchito con DigeZyme® (complesso di enzimi digestivi) e vitamine del gruppo B.

Le proteine isolate del siero di latte hanno un contenuto proteico superiore al 90% con un bassissimo contenuto di grassi e carboidrati. Sono caratterizzate da un elevato valore biologico e un profilo aminoacidico completo.

DigeZyme® è un complesso multi-enzimatico che include alfa-amilasi, proteasi neutra, cellulasi, lattasi e lipasi. Questi enzimi facilitano la digestione e l'assorbimento delle proteine, riducendo eventuali disturbi digestivi.

Le vitamine del gruppo B supportano il normale metabolismo energetico e la riduzione della stanchezza e dell'affaticamento.`,
    howToUse: "Assumere 30 g di prodotto (1 misurino) sciolti in 200 ml di acqua al giorno, preferibilmente dopo l'allenamento o lontano dai pasti principali. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Proteine Isolate con Enzimi Digestivi",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "374 kcal / 1590 kj",
          "grassi": "0,8 g",
          "di_cui_saturi": "0,5 g",
          "carboidrati": "4,2 g", 
          "di_cui_zuccheri": "4,0 g",
          "proteine": "86 g",
          "sale": "0,15 g",
          "vitamina_b1": "3,8 mg",
          "vitamina_b2": "4,9 mg",
          "vitamina_b6": "4,9 mg",
          "vitamina_b12": "8,8 mcg"
        },
        "per_dose_30g": {
          "energia": "112 kcal / 477 kj",
          "grassi": "0,3 g",
          "di_cui_saturi": "0,2 g",
          "carboidrati": "1,3 g",
          "di_cui_zuccheri": "1,2 g", 
          "proteine": "26 g",
          "sale": "0,05 g",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)"
        }
      },
      "ingredienti": "Sieroproteine ISOLATE del LATTE, cacao magro in polvere, aromi, DigeZyme® (miscela di enzimi), edulcoranti: acesulfame K, sucralosio; vitamine del gruppo B.",
      "nota": "VNR = Valore nutrizionale di riferimento"
    },
    variants: [
      { flavor: "Vaniglia", size: "450g", price: 34.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Vaniglia", size: "900g", price: 64.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Vaniglia", size: "2kg", price: 134.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Cioccolato", size: "450g", price: 34.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Cioccolato", size: "900g", price: 64.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Cioccolato", size: "2kg", price: 134.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Cioccolato Bianco", size: "450g", price: 34.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Cioccolato Bianco", size: "900g", price: 64.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Cioccolato Bianco", size: "2kg", price: 134.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Crema Caffè", size: "450g", price: 34.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Crema Caffè", size: "900g", price: 64.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Crema Caffè", size: "2kg", price: 134.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Frutti di Bosco", size: "450g", price: 34.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Frutti di Bosco", size: "900g", price: 64.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true },
      { flavor: "Frutti di Bosco", size: "2kg", price: 134.90, image: "ISOWHEY-PRO-ZYME-SITO.png", available: true }
    ]
  },

  // Prodotto 7: Massive Gain XXL
  {
    name: "Massive Gain XXL",
    slug: "massive-gain-xxl-premier",
    brand: "Premier",
    category: "Proteine",
    basePrice: 59.90,
    shortDescription: "MASSIVE GAIN XXL è un integratore di proteine e carboidrati ad alto contenuto calorico, ideale per aumentare la massa muscolare.",
    longDescription: `MASSIVE GAIN XXL è un integratore di proteine e carboidrati ad alto contenuto calorico, arricchito con creatina, aminoacidi ramificati e vitamine del gruppo B.

Formulato specificamente per gli sportivi che necessitano di un elevato apporto calorico per aumentare la massa muscolare. Contiene un mix di proteine del siero di latte concentrate e caseine per un rilascio proteico graduale.

I carboidrati forniscono energia immediata per gli allenamenti intensi e favoriscono il recupero post-workout. La creatina monoidrato aumenta le prestazioni fisiche negli esercizi ripetitivi di alta intensità.

Gli aminoacidi ramificati (BCAA) supportano la sintesi proteica e riducono il catabolismo muscolare durante e dopo l'allenamento.`,
    howToUse: "Mescolare 100 g di prodotto (2 misurini) con 400 ml di acqua o latte. Assumere 1-2 volte al giorno tra i pasti o dopo l'allenamento. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Mass Gainer ad Alto Contenuto Calorico",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "380 kcal / 1615 kj",
          "grassi": "2,8 g",
          "di_cui_saturi": "1,8 g",
          "carboidrati": "70 g",
          "di_cui_zuccheri": "15 g",
          "proteine": "20 g",
          "sale": "0,3 g",
          "creatina": "2 g",
          "bcaa": "3 g",
          "vitamina_b1": "1,1 mg",
          "vitamina_b2": "1,4 mg",
          "vitamina_b6": "1,4 mg",
          "vitamina_b12": "2,5 mcg"
        }
      },
      "ingredienti": "Maltodestrine, Proteine del LATTE (concentrate del siero e caseine), Destrosio, Cacao magro in polvere, Aromi, Creatina monoidrato, L-Leucina, L-Valina, L-Isoleucina, Edulcoranti: acesulfame K, sucralosio; Vitamine del gruppo B.",
      "nota": "Ad alto contenuto calorico - ideale per aumento massa muscolare"
    },
    variants: [
      { flavor: "Cioccolato", size: "1500g", price: 59.90, image: "MASSIVE-GAIN-XXL-SITO.png", available: true },
      { flavor: "Cioccolato Bianco", size: "1500g", price: 59.90, image: "MASSIVE-GAIN-XXL-SITO.png", available: true }
    ]
  },

  // Prodotto 8: Peanut Butter 
  {
    name: "Peanut Butter",
    slug: "peanut-butter-premier",
    brand: "Premier",
    category: "Alimenti Fit",
    basePrice: 12.90,
    shortDescription: "PEANUT BUTTER è una crema di arachidi 100% naturale, senza zuccheri aggiunti e senza olio di palma.",
    longDescription: `PEANUT BUTTER è una crema di arachidi 100% naturale, ottenuta dalla macinazione di arachidi tostate selezionate. Senza zuccheri aggiunti, senza olio di palma e senza conservanti.

Fonte naturale di proteine vegetali, grassi insaturi e vitamina E. Le arachidi sono ricche di niacina (vitamina B3), folati e magnesio, nutrienti essenziali per il metabolismo energetico.

La texture cremosa e il sapore autentico la rendono perfetta da spalmare su pane, fette biscottate o da utilizzare come ingrediente in ricette dolci e salate. Ideale per sportivi e per chi segue una dieta bilanciata.

Prodotto naturalmente privo di glutine e adatto a vegani e vegetariani.`,
    howToUse: "Consumare 1-2 cucchiai (20-30g) al giorno. Mescolare prima dell'uso in caso di separazione naturale degli oli. Conservare in luogo fresco e asciutto.",
    features: {
      "titolo": "Crema di Arachidi 100% Naturale",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "588 kcal / 2461 kj",
          "grassi": "49 g",
          "di_cui_saturi": "8,2 g",
          "carboidrati": "16 g",
          "di_cui_zuccheri": "5,4 g",
          "fibre": "8,1 g",
          "proteine": "25 g",
          "sale": "0,01 g",
          "vitamina_e": "8,3 mg",
          "niacina": "17,9 mg",
          "magnesio": "168 mg"
        }
      },
      "ingredienti": "Arachidi tostate 100%.",
      "nota": "Senza zuccheri aggiunti, senza olio di palma, naturalmente senza glutine"
    },
    variants: [
      { flavor: "Arachide", size: "570g", price: 12.90, image: "PEANUT-BUTTER-SITO.png", available: true }
    ]
  },

  // Prodotto 9: Whey Concentrate
  {
    name: "Whey Concentrate",
    slug: "whey-concentrate-premier",
    brand: "Premier",
    category: "Proteine",
    basePrice: 39.90,
    shortDescription: "WHEY CONCENTRATE è un integratore di proteine concentrate del siero di latte con un contenuto proteico dell'80%.",
    longDescription: `WHEY CONCENTRATE è un integratore di proteine concentrate del siero di latte con un contenuto proteico dell'80%. Ottenute attraverso un processo di ultrafiltrazione che preserva la struttura delle proteine.

Le proteine del siero di latte sono caratterizzate da un elevato valore biologico e da un profilo aminoacidico completo, ricco di aminoacidi essenziali e ramificati (BCAA). Sono rapidamente assorbite e utilizzate per la sintesi proteica muscolare.

Ideali per sportivi che praticano attività fisiche intense, contribuiscono alla crescita e al mantenimento della massa muscolare. La formula è arricchita con vitamine del gruppo B che supportano il metabolismo energetico.

Prodotto facilmente digeribile, con ottima solubilità e gusto gradevole.`,
    howToUse: "Sciogliere 30 g di prodotto (1 misurino) in 200-250 ml di acqua o latte. Assumere 1-2 volte al giorno, preferibilmente dopo l'allenamento e tra i pasti. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Proteine Concentrate del Siero di Latte",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "381 kcal / 1620 kj",
          "grassi": "5,2 g",
          "di_cui_saturi": "3,4 g",
          "carboidrati": "7,8 g",
          "di_cui_zuccheri": "6,9 g",
          "proteine": "78 g",
          "sale": "0,4 g",
          "vitamina_b1": "3,8 mg",
          "vitamina_b2": "4,9 mg",
          "vitamina_b6": "4,9 mg",
          "vitamina_b12": "8,8 mcg"
        },
        "per_dose_30g": {
          "energia": "114 kcal / 486 kj",
          "grassi": "1,6 g",
          "di_cui_saturi": "1,0 g",
          "carboidrati": "2,3 g",
          "di_cui_zuccheri": "2,1 g",
          "proteine": "23 g",
          "sale": "0,1 g",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)"
        }
      },
      "ingredienti": "Proteine concentrate del siero di LATTE, cacao magro in polvere, aromi, edulcoranti: acesulfame K, sucralosio; vitamine del gruppo B (B1, B2, B6, B12).",
      "nota": "VNR = Valore nutrizionale di riferimento. Contenuto proteico 78%"
    },
    variants: [
      { flavor: "Cacao", size: "1kg", price: 39.90, image: "WHEY-CONCENTRATE-SITO.png", available: true },
      { flavor: "Vaniglia", size: "1kg", price: 39.90, image: "WHEY-CONCENTRATE-SITO.png", available: true }
    ]
  },

  // Prodotto 10: Magnesium Chelated
  {
    name: "Magnesium Chelated",
    slug: "magnesium-chelated-premier",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 19.90,
    shortDescription: "MAGNESIUM CHELATED è un integratore di magnesio chelato con aminoacidi per una biodisponibilità ottimale.",
    longDescription: `MAGNESIUM CHELATED è un integratore di magnesio chelato con aminoacidi, una forma altamente biodisponibile che garantisce un assorbimento superiore rispetto ai tradizionali sali inorganici.

Il magnesio è un minerale essenziale coinvolto in oltre 300 reazioni enzimatiche nell'organismo. Contribuisce al normale funzionamento del sistema nervoso, alla funzione muscolare normale e al mantenimento di ossa e denti normali.

La chelazione con aminoacidi protegge il magnesio dall'interferenza di altri nutrienti e facilita il trasporto attraverso la parete intestinale, migliorando significativamente l'assorbimento e riducendo i disturbi gastrointestinali.

Particolarmente utile per sportivi, in quanto il magnesio contribuisce alla riduzione della stanchezza e dell'affaticamento e supporta il normale metabolismo energetico.`,
    howToUse: "Assumere 1-2 compresse al giorno con un bicchiere d'acqua, preferibilmente durante i pasti.",
    features: {
      "titolo": "Magnesio Chelato ad Alta Biodisponibilità",
      "valori_nutrizionali": {
        "per_compressa": {
          "magnesio": "200 mg (53% VNR)"
        },
        "per_2_compresse": {
          "magnesio": "400 mg (107% VNR)"
        }
      },
      "ingredienti": "Magnesio bisglicinato chelato, Agenti di carica: cellulosa microcristallina; Stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio.",
      "nota": "VNR = Valori nutritivi di riferimento. Forma chelata per assorbimento ottimale"
    },
    variants: [
      { flavor: "Unico", size: "90 compresse", price: 19.90, image: "MAGNESIUM-CHELATED-SITO.png", available: true }
    ]
  },

  // Prodotto 11: Intra Pro Essential+
  {
    name: "Intra Pro Essential+",
    slug: "intra-pro-essential-plus-premier",
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
      { flavor: "Agrumi", size: "200g", price: 40.00, image: "INTRA-PRO-ESSENTIAL-SITO-PREMIERINTEGRATORI.png", available: true }
    ]
  },

  // Prodotto 12: BCAA Powder 8:1:1
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

  // Prodotto 13: D3/K2 Complex
  {
    name: "D3/K2 Complex",
    slug: "d3-k2-complex-premier",
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

  // Prodotto 14: Hard Amx Carbo
  {
    name: "Hard Amx Carbo",
    slug: "hard-amx-carbo-premier",
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

  // Prodotto 15: Hard WPH BV104
  {
    name: "Hard WPH BV104",
    slug: "hard-wph-bv104-premier",
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
  },

  // Prodotto 16: Hard ZMA XP
  {
    name: "Hard ZMA XP",
    slug: "hard-zma-xp-premier",
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

  // Prodotto 17: Arginine NO
  {
    name: "Arginine NO",
    slug: "arginine-no-premier",
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

  // Prodotto 18: Total EGG
  {
    name: "Total EGG",
    slug: "total-egg-premier",
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

  // Prodotto 19: BCAA Powder 2:1:1
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

  // Prodotto 20: Hard EAA 8:1
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

export async function insertBatch8Corrected() {
  console.log("🚀 Iniziando inserimento corretto dei 20 prodotti del Batch 8...");
  
  try {
    // Verifica brand Premier
    const [premierBrand] = await db.select().from(brands).where(eq(brands.name, "Premier"));
    if (!premierBrand) {
      throw new Error("Brand Premier non trovato nel database");
    }
    console.log(`✅ Brand Premier trovato: ID ${premierBrand.id}`);

    let totalVariants = 0;
    
    for (const productData of batch8Products) {
      console.log(`\n📦 Inserendo prodotto: ${productData.name}`);
      
      const categoryId = getCategoryId(productData.category);
      console.log(`📂 Categoria: ${productData.category} (ID: ${categoryId})`);

      // Creo il ProductGroup (prodotto base)
      const [insertedGroup] = await db.insert(productGroups).values({
        slug: productData.slug,
        name: productData.name, // Nome SENZA gusto e quantità
        brandId: premierBrand.id,
        categoryId: categoryId,
        description: productData.shortDescription,
        longDescription: productData.longDescription,
        features: productData.features, // Valori nutrizionali qui
        howToUse: productData.howToUse,
        isNew: false,
        isBestSeller: false,
        hasSpecialOffer: false
      }).returning();

      console.log(`    ✅ ProductGroup inserito: ID ${insertedGroup.id}`);

      // Per ogni variante, creo un product che referenzia il group
      for (let i = 0; i < productData.variants.length; i++) {
        const variant = productData.variants[i];
        const variantSlug = `${productData.slug}-${variant.flavor.toLowerCase().replace(/\s+/g, '-')}-${variant.size.toLowerCase().replace(/\s+/g, '-')}`;
        
        console.log(`  🔹 Inserendo variante: ${variant.flavor} ${variant.size} - €${variant.price}`);

        // Inserisci il prodotto (variante)
        const [insertedProduct] = await db.insert(products).values({
          slug: variantSlug,
          name: `${productData.name} ${variant.flavor} ${variant.size}`,
          groupId: insertedGroup.id, // Collegamento al gruppo
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

        console.log(`    ✅ Product (variante) inserito: ID ${insertedProduct.id}`);

        // Inserisci l'immagine
        await db.insert(productImages).values({
          productId: insertedProduct.id,
          src: `/images/products/${variant.image}`,
          alt: `${productData.name} ${variant.flavor} ${variant.size}`,
          isPrimary: true
        });

        console.log(`    🖼️ Immagine inserita: ${variant.image}`);

        // Inserisci il prezzo (SENZA "pz")
        await db.insert(productSizes).values({
          productId: insertedProduct.id,
          value: variant.size,
          unit: '', // NESSUNA unità, non "pz"
          price: Math.round(variant.price * 100) // Prezzo in centesimi
        });

        console.log(`    💰 Prezzo inserito: €${variant.price}`);
        totalVariants++;
      }
      
      console.log(`✅ Prodotto ${productData.name} completato con ${productData.variants.length} varianti`);
    }

    console.log(`\n🎉 Inserimento completato!`);
    console.log(`📊 Totale prodotti base (ProductGroups): ${batch8Products.length}`);
    console.log(`📊 Totale varianti inserite (Products): ${totalVariants}`);

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertBatch8Corrected()
    .then(() => {
      console.log("✅ Script completato con successo!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script fallito:", error);
      process.exit(1);
    });
}