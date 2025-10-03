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

// Prodotti 6-10
const batch8ProductsSecondFive: ProductData[] = [
  {
    name: "Creatina Plus 1000",
    slug: "creatina-plus-1000",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 23.90,
    shortDescription: "CREATINE PLUS 1000 è un integratore alimentare base di Creatina monoidrato (Creapure®). L'assunzione di creatina porta ad un notevole aumento dell'efficienza nell'area della forza massima e della resistenza.",
    longDescription: "CREATINE PLUS 1000 è un integratore alimentare in compresse a base di Creatina monoidrato (Creapure®). Ogni compressa di CREATINE PLUS 1000 contiene 1 g di principio attivo (Creapure®).",
    howToUse: "assumere 3 compresse al giorno. Per gli sportivi fino a 6 compresse al giorno per non più di un mese.",
    features: {
      "titolo": "CREATINE PLUS 1000",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "3 compresse",
          "principio_attivo_creapure": "3 g",
          "di_cui_creatina": "2,64 g"
        }
      },
      "ingredienti": "Creatina monoidrato, addensante: cellulosa microcristallina E460i; destrosio; antiagglomerante: magnesio stearato vegetale E572, silicio biossido E551."
    },
    variants: [
      { flavor: "Unico", size: "100 compresse", price: 23.90, image: "creatine-plus-100.png", available: true },
      { flavor: "Unico", size: "250 compresse", price: 43.00, image: "creatine-plus-100.png", available: true }
    ]
  },
  {
    name: "Omega 3XC 40/20 Gold",
    slug: "omega-3xc-40-20-gold",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 33.00,
    shortDescription: "OMEGA 3-XC 40/20 GOLD è un integratore alimentare di acidi grassi polinsaturi da olio di pesce EPA/DHA nel rapporto 40% EPA 20% DHA.",
    longDescription: `OMEGA 3-XC 40/20 GOLD contiene una bassa percentuale di acidi grassi saturi. La sua elevata qualità lo rende altamente digeribile e privo di retrogusto mantenendo intatte tutte le sue proprietà benefiche.

OMEGA 3-XC 40/20 GOLD contribuisce alla normale funzione cardiaca, cerebrale e visiva e al mantenimento di livelli normali di trigliceridi nel sangue e di una buona pressione sanguigna ad effetto antinfiammatorio, con ricadute sul miglioramento del sistema immunitario.`,
    howToUse: "Modalità d'uso (per la funzionalità cardiaca, cerebrale e visiva): assumere 2 perle al giorno suddivise nell'arco della giornata; Modalità d'uso (per buoni livelli di trigliceridi nel sangue): assumere 3 perle al giorno suddivise nell'arco della giornata; Modalità d'uso (per il mantenimento di una normale pressione sanguigna): assumere 4 perle al giorno suddivise nell'arco della giornata. Non superare il livello di assunzione giornaliera supplementare di 5 g di combinazione di EPA e DHA.",
    features: {
      "titolo": "Integratore Omega 3",
      "valori_nutrizionali": {
        "per_2_softgel": {
          "olio_di_pesce": "2,4 g",
          "epa": "0,96 g",
          "dha": "0,48 g"
        },
        "per_3_softgel": {
          "olio_di_pesce": "3,6 g",
          "epa": "1,44 g",
          "dha": "0,72 g"
        },
        "per_4_softgel": {
          "olio_di_pesce": "4,8 g",
          "epa": "1,92 g",
          "dha": "0,96 g"
        }
      },
      "ingredienti": "Olio di PESCE, gelatina (involucro capsula), umettante: glicerolo. Antiossidanti: estratto ricco in tocoferolo."
    },
    variants: [
      { flavor: "Unico", size: "90 perle", price: 33.00, image: "OMEGA-3-SITO-1.png", available: true }
    ]
  },
  {
    name: "Hard C-Life Plus 1000",
    slug: "hard-c-life-plus-1000",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 15.90,
    shortDescription: "HARD C-LIFE PLUS 1000 è un integratore alimentare in compresse di Vitamina C. HARD C-LIFE PLUS 1000 non contiene glutine.",
    longDescription: `HARD C-LIFE PLUS 1000 è un integratore alimentare in compresse di Vitamina C (acido ascorbico).

La vitamina C fa parte del gruppo di vitamine idrosolubili non accumulabili dall'organismo e quindi da assumere quotidianamente con l'alimentazione.

L'acido ascorbico oltre a partecipare a numerose reazioni metaboliche e alla biosintesi di collagene, di alcuni aminoacidi e ormoni, è un prezioso antiossidante, interviene nelle reazioni allergiche potenziando la risposta immunitaria, neutralizza i radicali liberi e svolge una funzione protettiva a livello di stomaco, inibendo la sintesi di sostanze cancerogene.`,
    howToUse: "Assumere 1 compressa al giorno con acqua.",
    features: {
      "titolo": "Vitamina C 1000mg",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "1 compressa",
          "vitamina_c": "1 g (1250% VNR)"
        }
      },
      "ingredienti": "Vitamina C (acido ascorbico), Agente di carica: cellulosa microcristallina, calcio fosfato; Stabilizzanti: sali di magnesio degli acidi grassi.",
      "nota": "VNR% = Valore nutrizionale di riferimento."
    },
    variants: [
      { flavor: "Unico", size: "60 compresse", price: 15.90, image: "Hard-C-life-plus-1000.png", available: true }
    ]
  },
  {
    name: "Premier Pancake",
    slug: "premier-pancake",
    brand: "Premier",
    category: "Alimenti Fit",
    basePrice: 35.90,
    shortDescription: "PREMIER PANCAKE è un preparato alimentare in polvere per pancake a base di proteine dell'albume d'uovo e farina di avena senza glutine.",
    longDescription: `PREMIER PANCAKE è un preparato alimentare in polvere per pancake a base di proteine dell'albume d'uovo e farina di avena senza glutine.
Inoltre, fornisce una fonte proteica di elevata qualità con un elevato valore biologico, fonte di fibre con un bassissimo contenuto di zuccheri e senza lattosio, semplice da preparare e adatto anche a vegetariani.`,
    howToUse: "Sciogliere 50 g di prodotto ( 3 misurini) in 110 ml d'acqua, agitare con uno shaker fino ad ottenere una miscela densa e omogenea, cuocere in una padella antiaderente a fuoco lento 3/5 minuti per lato. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore per Pancake",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "350 kcal / 1487,5 kj",
          "grassi": "4,30 g",
          "di_cui_saturi": "1,2 g",
          "carboidrati": "38 g",
          "di_cui_zuccheri": "1,2 g",
          "di_cui_lattosio": "0 g",
          "di_cui_polialcoli": "0 g",
          "proteine": "36,2 g",
          "sale": "2,9 g"
        },
        "per_porzione_50g": {
          "valore_energetico": "175 kcal / 743,7 kj",
          "grassi": "2,15 g",
          "di_cui_saturi": "0,6 g",
          "carboidrati": "19 g",
          "di_cui_zuccheri": "0,6 g",
          "di_cui_lattosio": "0 g",
          "di_cui_polialcoli": "0 g",
          "proteine": "18,1 g",
          "sale": "1,45 g"
        }
      },
      "ingredienti": "farina di AVENA senza glutine, albume D'UOVO in polvere, bicarbonato di sodio, pirofosfato di sodio, sucralosio, cloruro di sodio, gomma di cantano, aroma."
    },
    variants: [
      { flavor: "Natural", size: "750g", price: 35.90, image: "Pancake.png", available: true }
    ]
  },
  {
    name: "Algae Epa-Dha Vegan Active",
    slug: "algae-epa-dha-vegan-active",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 36.00,
    shortDescription: "ALGAE EPA-DHA VEGAN ACTIVE è un integratore alimentare di omega 3 epa-dha ottenuto da microalghe.",
    longDescription: `ALGAE EPA-DHA VEGAN ACTIVE è una soluzione sostenibile a base vegetale naturalmente ricca di Omega 3 EPA-DHA dalle proprietà organolettiche eccezionali.

Inoltre, fornisce una vera alternativa vegetale agli Omega 3 marini grazie alla mission di Polaris, azienda francese leader nel settore, e del suo marchio dedicato Omegavie®, che da sempre si impegna per la sostenibilità offrendo olii di qualità eccezionale, ricchi di Omega 3 EPA/DHA e privi di allergeni.`,
    howToUse: "Assumere 1 perla al giorno con acqua.",
    features: {
      "titolo": "Omega 3 Vegano",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "1 softgel",
          "omega_3_totali": "300 mg",
          "dha": "250 mg",
          "epa": "50 mg"
        }
      },
      "ingredienti": "Omega 3 vegano da olio di micro alghe, Amido di mais modificato, glicerolo vegetale, gelatina vegetale: carragenina, sodio carbonato."
    },
    variants: [
      { flavor: "Unico", size: "60 perle", price: 36.00, image: "Algae-epa-vegan.png", available: true }
    ]
  }
];

export async function insertBatch8ProductsSecondFive() {
  console.log("🚀 Iniziando inserimento prodotti 6-10 del Batch 8...");
  
  try {
    // Verifica brand Premier
    const [premierBrand] = await db.select().from(brands).where(eq(brands.name, "Premier"));
    if (!premierBrand) {
      throw new Error("Brand Premier non trovato nel database");
    }
    console.log(`✅ Brand Premier trovato: ID ${premierBrand.id}`);

    let totalVariants = 0;
    
    for (const productData of batch8ProductsSecondFive) {
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
    console.log(`📊 Totale prodotti base: ${batch8ProductsSecondFive.length}`);
    console.log(`📊 Totale varianti inserite: ${totalVariants}`);

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertBatch8ProductsSecondFive()
    .then(() => {
      console.log("✅ Script completato con successo!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script fallito:", error);
      process.exit(1);
    });
}