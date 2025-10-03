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

// Prodotti da inserire (primi 5)
const batch8Products: ProductData[] = [
  {
    name: "Isowhey Pro-Zyme",
    slug: "isowhey-pro-zyme-premier",
    brand: "Premier",
    category: "Proteine",
    basePrice: 38.90,
    shortDescription: "ISOWHEY PRO-ZYME è un integratore alimentare in polvere di proteine del siero di latte isolate Volactive® Ultrawhey Isolate, ottenute mediante processo di doppia micro-ultrafiltrazione (CFM), arricchito con la miscela di enzimi DigeZyme® e vitamine B1, B2, B6 e B12",
    longDescription: `ISOWHEY PRO-ZYME è un integratore alimentare in polvere di proteine del siero di latte isolate Volactive® Ultrawhey Isolate, ottenute mediante processo di doppia micro-ultrafiltrazione (CFM), arricchito con la miscela di enzimi DigeZyme® e vitamine B1, B2, B6 e B12. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Le vitamine del gruppo B al normale metabolismo energetico.

ISOWHEY PRO-ZYME contiene in media il 91,5% di proteine (valore riferito al gusto cioccolato bianco e vaniglia). Prodotte nel nord Europa dalla Volac, azienda leader nel mercato delle proteine provenienti da pascoli controllati e certificati, le UltraWhey Isolate 90 rappresentano il cosiddetto gold standard tra le proteine isolate del siero del latte, per l'elevata biodisponibilità, il bassissimo contenuto di grassi, lattosio e minerali e l'alta quantità dei nutrienti.`,
    howToUse: "assumere 30 g di prodotto al giorno in 100 ml d'acqua, lontano dai pasti principali.",
    features: {
      "titolo": "Integratore di Siero Proteine Isolate",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "380 kcal/1617 kj",
          "grassi": "0,5 g",
          "di_cui_acidi_grassi_saturi": "0,1 g",
          "carboidrati": "2,2 g",
          "di_cui_zuccheri": "2,2 g",
          "proteine": "91,5 g",
          "sale": "0,19 g",
          "vitamina_b1": "3,6 mg",
          "vitamina_b2": "4,6 mg",
          "vitamina_b6": "4,6 mg",
          "vitamina_b12": "8,3 mcg"
        },
        "per_porzione_30g": {
          "energia": "114 kcal/485 kj",
          "grassi": "0,15 g",
          "di_cui_acidi_grassi_saturi": "0,03 g",
          "carboidrati": "0,7 g",
          "di_cui_zuccheri": "0,7 g",
          "proteine": "27,5 g",
          "sale": "0,06 g",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)",
          "miscela_di_enzimi_digezyme": "150 mg"
        }
      },
      "ingredienti": "siero proteine isolate del LATTE (sieroproteine ottenute mediante processo di doppia micro-ultrafiltrazione CFM) 97%, aroma, emulsionante: lecitina di girasole, miscela di enzimi [DigeZyme® (alfa-amilasi, proteasi, lattasi, cellulasi, lipasi)], edulcoranti: acesulfame K, sucralosio; vitamina B6 (piridossina cloridrato), vitamina B2 (riboflavina), vitamina B1 (cloridrato di tiamina), vitamina B12 (cianocobalamina).",
      "nota": "VNR = Valori nutritivi di riferimento"
    },
    variants: [
      { flavor: "Vaniglia", size: "450g", price: 38.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Vaniglia", size: "900g", price: 69.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Vaniglia", size: "2kg", price: 134.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Cioccolato", size: "450g", price: 38.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Cioccolato", size: "900g", price: 69.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Cioccolato", size: "2kg", price: 134.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Cioccolato Bianco", size: "450g", price: 38.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Cioccolato Bianco", size: "900g", price: 69.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Cioccolato Bianco", size: "2kg", price: 134.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Crema Caffè", size: "450g", price: 38.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Crema Caffè", size: "900g", price: 69.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Crema Caffè", size: "2kg", price: 134.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Frutti di Bosco", size: "450g", price: 38.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Frutti di Bosco", size: "900g", price: 69.90, image: "ISOWHEY-WEB-PREMIER.png", available: true },
      { flavor: "Frutti di Bosco", size: "2kg", price: 134.90, image: "ISOWHEY-WEB-PREMIER.png", available: true }
    ]
  },
  {
    name: "T-One Xtreme Boost",
    slug: "t-one-xtreme-boost",
    brand: "Premier",
    category: "Supplementi",
    basePrice: 46.00,
    shortDescription: "T-ONE XTREME BOOST integratore di estratti secchi di erbe a titolo noto, quali Tribulus terrestris 90%, Fieno greco, Cordiceps, Rodiola, Maca, Bioperine, Ashwanganda, arricchito con acido D-Aspartico, vitamine, minerali e ZMA® U.S. PATENT.",
    longDescription: `T-ONE XTREME BOOST è un integratore, a base di estratti vegetali, utile a supportare la produzione di testosterone, ormone cruciale per il corretto stimolo nell'atleta, per lo sviluppo della muscolatura scheletrica, la perdita di grasso sottocutaneo e l'incremento di forza e resistenza in allenamento.

T-ONE XTREME BOOST è un mix di sostanze ergogeniche e adattogene, con l'aggiunta di vitamine e minerali che, oltre ad agire sui livelli fisiologici del testosterone, argina il catabolismo proteico con aumento del volume e forza muscolare.`,
    howToUse: "assumere 3 compresse al giorno suddivise nell'arco della giornata.",
    features: {
      "titolo": "Integratore T-Booster",
      "valori_nutrizionali": {
        "per_porzione_3_compresse": {
          "valore_energetico": "0 kcal / 0 kj",
          "acido_d_aspartico": "500 mg",
          "e_s_tribulus_terrestris": "800 mg",
          "di_cui_saponine": "720 mg",
          "zma": "433 mg",
          "di_cui_zinco": "5 mg (50% VNR)",
          "di_cui_magnesio": "94 mg (25% VNR)",
          "di_cui_vit_b6": "2 mg (145% VNR)",
          "e_s_fieno_greco": "400 mg",
          "e_s_cordyceps": "200 mg",
          "di_cui_polisaccaridi": "80 mg",
          "e_s_rodiola": "150 mg",
          "di_cui_salidrosidi": "4,5 mg",
          "e_s_maca": "150 mg",
          "e_s_ashwaganda": "200 mg",
          "di_cui_withanolidi": "3 mg",
          "e_s_pepe_nero": "15 mg",
          "di_cui_piperina": "14,25 mg",
          "acido_pantotenico": "12 mg (200% VNR)",
          "vit_d3": "25 mcg (500% VNR)",
          "ferro": "14 mg (100% VNR)",
          "zinco": "10 mg (100% VNR)"
        }
      },
      "ingredienti": "E.S. Tribulus terrestris (Tribulus terrestris L.) frutto 90% saponine, ZMA®-2000E (zinco momo-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6, cloridrato di piridossina) Agenti di carica: Cellulosa microcristallina, Calcio D-fosfato; Acido D-Aspartico, E.S. Fieno greco (Trigonella Foenum Graecum L.) semi 4:1, Antiagglomeranti: Magnesio stearato, Mono e digliceridi degli acidi grassi; E.S. Cordyceps (Cordyceps sinensis) intero corpo fungino 40% polisaccaridi, E.S. Ashwaganda (Withania somnifera L. dunal) radice 1,5% Withanolidi, E.S. Rhodiola (Rhodiola rosea L.) radice 3% salidrosidi, E.S. Maca (Lepidum Meyenii Walp.) radice 4:1, Ferro gluconato, Zinco gluconato, ES. Pepe nero (Piper Nigrum L.) frutto 95% piperina, D-pantotenato di Calcio, Vitamina D3 (Colecaiciferolo).",
      "nota": "VNR: valore nutritivo di riferimento giornaliero (adulti) ai sensi del Reg. EU n. 1169/2011"
    },
    variants: [
      { flavor: "Unico", size: "90 compresse", price: 46.00, image: "t-one-compresse-website.png", available: true }
    ]
  },
  {
    name: "Peanut Butter",
    slug: "peanut-butter",
    brand: "Premier",
    category: "Alimenti Fit",
    basePrice: 12.90,
    shortDescription: "PEANUT BUTTER è una gustosa crema spalmabile ottenuta al 100% da arachidi tostate, 100% naturale.",
    longDescription: `PEANUT BUTTER è una gustosa crema spalmabile ottenuta al 100% da arachidi tostate, 100% naturale.
Crema proteica spalmabile, 100% arachidi, 100% naturale per la tua colazione, i tuoi spuntini veloci e tutte le volte che vuoi gustare qualcosa di buono e sano.

Premier Peanut Butter contiene solo arachidi senza aggiunta di zuccheri, sali e altri olii. Naturalmente ricco di proteine, vitamine, minerali, fibre e preziosi acidi grassi polinsaturi.`,
    howToUse: "Assumere liberamente durante la giornata. Si raccomanda di chiudere accuratamente il barattolo dopo l'uso e conservare il prodotto in luogo fresco e asciutto lontano da fonti di calore e raggi solari.",
    features: {
      "titolo": "Burro di Arachidi 100%",
      "valori_nutrizionali": {
        "per_100g": {
          "valore_energetico": "608 kcal / 2547 kj",
          "grassi": "49,5 g",
          "di_cui_saturi": "9,5 g",
          "carboidrati": "10,6 g",
          "di_cui_zuccheri": "5,5 g",
          "fibre": "8,1 g",
          "proteine": "28,3 g",
          "sale": "0,01 g"
        }
      },
      "ingredienti": "100% arachidi tostate."
    },
    variants: [
      { flavor: "Arachide", size: "570g", price: 12.90, image: "burro-di-arachidi-sito.png", available: true }
    ]
  },
  {
    name: "Massive Gain XXL",
    slug: "massive-gain-xxl",
    brand: "Premier",
    category: "Pre-workout/Energetici",
    basePrice: 52.00,
    shortDescription: "MASSIVE GAIN XXL è un integratore in polvere di carboidrati (Maltodestrine DE19, Vitargo® e Palatinose®), proteine del siero di latte concentrate e isolate (Volactive® Ultrawhey) indicato per l'integrazione nello sport ad alte prestazioni, fornendo al contempo energia, favorendo lo sviluppo e il recupero. Arricchito con DigeZyme® (complesso di enzimi: alfa-amilasi, proteasi, lattasi, cellulasi, lipasi), Creapure®, L-Glutammina (Kyowa®), L-Arginina (Kyowa®), Taurina, Vitamine B1, B2, B6 e B12.",
    longDescription: `MASSIVE GAIN XXL è un integratore in polvere di carboidrati (Maltodestrine DE19, Vitargo® e Palatinose®), proteine del siero di latte concentrate e isolate (Volactive® Ultrawhey) indicato per l'integrazione nello sport ad alte prestazioni, fornendo al contempo energia, favorendo lo sviluppo e il recupero. Arricchito con DigeZyme® (complesso di enzimi: alfa-amilasi, proteasi, lattasi, cellulasi, lipasi), Creapure®, L-Glutammina (Kyowa®), L-Arginina (Kyowa®), Taurina, Vitamine B1, B2, B6 e B12.
MASSIVE GAIN XXL, nuova formula, è un integratore in polvere di carboidrati (Maltodestrine DE19, Vitargo® e Palatinose®), proteine del siero di latte concentrate e isolate, rigorosamente Volactive® Ultrawhey, indicato per l'integrazione nello sport ad alte prestazioni, fornendo al contempo energia, favorendo lo sviluppo e il recupero anche in fase post workout.

è il prodotto ideale perchè unisce una fonte glucidica-proteica di elevata qualità e assolutamente efficace per l'aumento di massa muscolare, indispensabile per sfruttarne in tempi brevi le potenzialità.`,
    howToUse: "assumere fino a 80 g di prodotto (4 misurini) in 250 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è disponibile un misurino dosatore.",
    features: {
      "titolo": "Integratore con Creatina e Aminoacidi",
      "valori_nutrizionali": {
        "per_100g": {
          "energia": "1615 kj / 380 kcal",
          "grassi": "3,5 g",
          "di_cui_saturi": "0,5 g",
          "carboidrati": "56 g",
          "di_cui_zuccheri": "12 g",
          "proteine": "30 g",
          "sale": "0,3 g",
          "vitamina_b1": "1,4 mg",
          "vitamina_b2": "1,75 mg",
          "vitamina_b6": "1,75 mg",
          "vitamina_b12": "3,12 mcg",
          "creatina_monoidrato": "2 g",
          "di_cui_creatina": "1,76 g",
          "l_glutammina": "2 g",
          "l_arginina": "2 g",
          "taurina": "1,25 g",
          "digezyme": "187,5 mg"
        },
        "per_porzione_80g": {
          "energia": "1292 kj / 304 kcal",
          "grassi": "3 g",
          "di_cui_saturi": "0,4 g",
          "carboidrati": "45 g",
          "di_cui_zuccheri": "10 g",
          "proteine": "24 g",
          "sale": "0,2 g",
          "vitamina_b1": "1,1 mg (100% VNR)",
          "vitamina_b2": "1,4 mg (100% VNR)",
          "vitamina_b6": "1,4 mg (100% VNR)",
          "vitamina_b12": "2,5 mcg (100% VNR)",
          "creatina_monoidrato": "1,6 g",
          "di_cui_creatina": "1,40 g",
          "l_glutammina": "1,6 g",
          "l_arginina": "1,6 g",
          "taurina": "1 g",
          "digezyme": {
            "totale": "150 mg",
            "alpha_amilasi": "17,7 mg",
            "proteasi": "9,3 mg",
            "lattasi": "6,8 mg",
            "lipasi": "240 mcg",
            "cellulasi": "4,3 mg"
          }
        }
      },
      "ingredienti": "maltodestrine (da mais), sieroproteine del LATTE (concentrate e isolate Volactive®), isomaltulosio* (Palatinose®), amido di mais ceroso (Vitargo®), cacao magro in polvere, creatina monoidrato (Creapure®), L-glutammina (Kyowa®), L-arginina (Kyowa®), taurina, aromi, Lecitina di girasole, DigeZyme® (miscela di enzimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente maltodestrine da mais) Edulcorante: sucralosio; Vitamina B6 (Piridossina cloridrato), Vitamina B2 (Riboflavina), Vitamina B1 (Tiamina), Vitamina B12 (Cianocobalamina). *L' isomaltulosio è una fonte di glucosio e di fruttosio.",
      "note": {
        "vnr": "valori nutritivi di riferimento",
        "gusto": "Valori riferiti al gusto cioccolato"
      },
      "allergeni": "Può contenere uova, soia, nocciole."
    },
    variants: [
      { flavor: "Cioccolato", size: "1500g", price: 52.00, image: "MASSIVE-GAIN-SITO.png", available: true },
      { flavor: "Cioccolato Bianco", size: "1500g", price: 52.00, image: "MASSIVE-GAIN-SITO.png", available: true }
    ]
  },
  {
    name: "Creatina Pure 100%",
    slug: "creatina-pure-100",
    brand: "Premier",
    category: "Aminoacidi e Creatina",
    basePrice: 36.90,
    shortDescription: "CREATINE PURE 100% è un integratore alimentare in polvere di Creatina monoidrato (Creapure®) indicata per integrare l'alimentazione dello sportivo.",
    longDescription: "CREATINE PURE 100% è un integratore alimentare in polvere di sola Creatina monoidrato senza eccipienti, garantita e certificata dal marchio Creapure®.",
    howToUse: "assumere 3 g di prodotto (2 misurini) al giorno – per gli sportivi fino a 6 g (4 misurini) al giorno per non più di un mese. All'interno della confezione è presente un misurino dosatore.",
    features: {
      "titolo": "Creatina Monoidrato",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "3 g",
          "valore_energetico": "0 kcal / 0 kj",
          "creatina_monoidrato": "3 g"
        }
      },
      "ingredienti": "Creapure® (Creatina monoidrato)."
    },
    variants: [
      { flavor: "Unico", size: "250g", price: 36.90, image: "CREATINE-PURE-SITO.png", available: true },
      { flavor: "Unico", size: "500g", price: 62.00, image: "CREATINE-PURE-SITO.png", available: true }
    ]
  }
];

export async function insertBatch8ProductsFirstFive() {
  console.log("🚀 Iniziando inserimento primi 5 prodotti del Batch 8...");
  
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
    console.log(`📊 Totale prodotti base: ${batch8Products.length}`);
    console.log(`📊 Totale varianti inserite: ${totalVariants}`);

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertBatch8ProductsFirstFive()
    .then(() => {
      console.log("✅ Script completato con successo!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script fallito:", error);
      process.exit(1);
    });
}