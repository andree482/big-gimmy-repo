import { db } from "./db";
import { storage } from "./storage";

const newProducts = [
  // PRODOTTO 1: PROTEIN WAFER LOW SUGAR (immagini 1-2)
  {
    name: "PROTEIN+ Wafer Low Sugar",
    slug: "protein-wafer-low-sugar",
    description: "Wafer proteico ricoperto di cioccolato al latte, con edulcoranti e basso contenuto di zuccheri",
    category: "proteine",
    brand: "+WATT",
    images: [
      "PROTEIN WAFER LOW SUGAR_Cacao_Fronte.jpg",
      "PROTEIN WAFER LOW SUGAR_Vaniglia_Fronte.jpg"
    ],
    flavors: ["Cacao", "Vaniglia"],
    sizes: [{ value: "35", unit: "g", price: 3.50 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "145 kcal",
      protein: "10g",
      carbs: "8g",
      fat: "8g",
      fiber: "2g",
      sugar: "1.5g"
    },
    ingredients: "Wafer proteico (farina di frumento, proteine del latte, edulcoranti), cioccolato al latte (edulcoranti, burro di cacao, latte in polvere), aromi naturali.",
    usage: "Consumare 1 wafer al giorno come spuntino proteico. Non superare la dose consigliata."
  },

  // PRODOTTO 2: PROTEIN+ White (immagini 3-5) 
  {
    name: "PROTEIN+ White 31%",
    slug: "protein-white-31",
    description: "Barretta proteica gluten free con proteine del latte concentrate al 31%",
    category: "proteine", 
    brand: "+WATT",
    images: [
      "Protein+ white crema limone FRONTE.jpg",
      "Protein+ white tiramisu FRONTE.jpg", 
      "Protein+ white vaniglia FRONTE.jpg"
    ],
    flavors: ["Crema Limone", "Tiramisu", "Vaniglia"],
    sizes: [{ value: "40", unit: "g", price: 4.20 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "158 kcal",
      protein: "12.4g", 
      carbs: "14g",
      fat: "6g",
      fiber: "1.8g",
      sugar: "8g"
    },
    ingredients: "Proteine del latte concentrate, sciroppo di glucosio, copertura al cioccolato bianco, aromi naturali, edulcoranti (sucralosio).",
    usage: "Consumare 1-2 barrette al giorno prima o dopo l'allenamento. Ideale come spuntino proteico."
  },

  // PRODOTTO 3: SOY PROTEIN 221 (immagini 6-7)
  {
    name: "Soy Protein 221",
    slug: "soy-protein-221", 
    description: "Integratore alimentare di proteine isolate della soia e vitamine, prodotto 100% vegan friendly",
    category: "proteine",
    brand: "Vegetal +WATT",
    images: [
      "SAY PROTEIN 221 CACAO fronte.jpg",
      "SAY PROTEIN 221 NOCCIOLA fronte.jpg"
    ],
    flavors: ["Cacao", "Nocciola"],
    sizes: [{ value: "750", unit: "g", price: 28.90 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "371 kcal",
      protein: "72g",
      carbs: "8g", 
      fat: "3g",
      fiber: "4g",
      sugar: "2g"
    },
    ingredients: "Proteine isolate della soia (90%), cacao in polvere, aromi naturali, edulcoranti (steviolo glicosidi), vitamine del gruppo B.",
    usage: "Sciogliere 30g (1 misurino) in 250ml di acqua o bevanda vegetale. Assumere 1-2 volte al giorno."
  },

  // PRODOTTO 4: PROTEIN+ Classic (immagini 8-11)
  {
    name: "PROTEIN+ Classic 25%", 
    slug: "protein-classic-25",
    description: "Barretta proteica gluten free con il 25% di proteine e gusti irresistibili",
    category: "proteine",
    brand: "+WATT",
    images: [
      "Protein+ classic_banana_fronte.jpg",
      "Protein+ classic cacao FRONTE.jpg",
      "Protein+ classic cocco FRONTE.jpg", 
      "Protein+ classic yogurt fragola FRONTE.jpg"
    ],
    flavors: ["Banana", "Cacao", "Cocco", "Yogurt Fragola"],
    sizes: [{ value: "40", unit: "g", price: 3.90 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "152 kcal",
      protein: "10g",
      carbs: "16g",
      fat: "5g", 
      fiber: "2g",
      sugar: "12g"
    },
    ingredients: "Proteine del latte, sciroppo di glucosio, copertura al cioccolato, aromi naturali, frutta disidratata (fragola, banana), cocco rapé.",
    usage: "Consumare 1 barretta al giorno come spuntino energetico-proteico. Ideale prima o dopo l'attività fisica."
  },

  // PRODOTTO 5: LIGHT PROTEIN+ BAR (immagini 12-13)
  {
    name: "Light PROTEIN+ Bar",
    slug: "light-protein-bar",
    description: "Barretta proteica light con alto contenuto proteico e basso contenuto di zuccheri", 
    category: "proteine",
    brand: "+WATT",
    images: [
      "LIGHT PROTEIN BAR CARAMELLO Fronte.jpg",
      "LIGHT PROTEIN BAR CHEESECAKE Fronte.jpg"
    ],
    flavors: ["Caramello Salato", "Cheesecake"],
    sizes: [{ value: "45", unit: "g", price: 4.50 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "168 kcal",
      protein: "15g",
      carbs: "12g",
      fat: "7g",
      fiber: "3g", 
      sugar: "3g"
    },
    ingredients: "Proteine del latte concentrate, edulcoranti (maltitolo, sucralosio), aroma caramello/cheesecake, burro di cacao, emulsionanti.",
    usage: "Consumare 1 barretta al giorno come spuntino light. Perfetta per il controllo del peso mantenendo l'apporto proteico."
  },

  // PRODOTTO 6: SMART PROTEIN (immagine 14)
  {
    name: "Smart Protein",
    slug: "smart-protein-cacao",
    description: "Proteine intelligenti con formula avanzata per il massimo assorbimento",
    category: "proteine",
    brand: "+WATT", 
    images: [
      "SMART PROTEIN_CACAO_Fronte.jpg"
    ],
    flavors: ["Cacao"],
    sizes: [{ value: "900", unit: "g", price: 35.90 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "380 kcal",
      protein: "75g",
      carbs: "6g",
      fat: "4g",
      fiber: "2g", 
      sugar: "3g"
    },
    ingredients: "Proteine del siero del latte concentrate e isolate, cacao in polvere, aromi naturali, edulcoranti (sucralosio), lecitina di soia.",
    usage: "Sciogliere 30g (1 misurino) in 250-300ml di acqua o latte. Assumere 1-2 volte al giorno, preferibilmente dopo l'allenamento."
  },

  // PRODOTTO 7: PROTEIN+ EVO (immagini 15-16)
  {
    name: "PROTEIN+ EVO",
    slug: "protein-evo-barrette",
    description: "Barrette proteiche di nuova generazione con formula EVO avanzata",
    category: "proteine",
    brand: "+WATT",
    images: [
      "Protein+ EVO cocco FRONTE.jpg",
      "Protein+ EVO crème caramel FRONTE.jpg"
    ],
    flavors: ["Cocco", "Crème Caramel"],
    sizes: [{ value: "45", unit: "g", price: 4.80 }],
    rating: 0,
    reviewCount: 0,
    nutritionalValues: {
      calories: "172 kcal",
      protein: "15g",
      carbs: "13g",
      fat: "7g",
      fiber: "2.5g",
      sugar: "9g"
    },
    ingredients: "Proteine del latte concentrate, sciroppo di glucosio, copertura al cioccolato, cocco rapé, aroma crème caramel, emulsionanti naturali.",
    usage: "Consumare 1-2 barrette al giorno come spuntino proteico. Ideale prima o dopo l'attività sportiva per supportare la crescita muscolare."
  }
];

async function migrateNewProteins() {
  console.log("Inizio migrazione nuovi prodotti proteici...");
  
  try {
    for (const productData of newProducts) {
      console.log(`Aggiungendo prodotto: ${productData.name}`);
      
      // Trova la categoria proteine
      const category = await storage.getCategoryBySlug(productData.category);
      if (!category) {
        console.error(`Categoria ${productData.category} non trovata`);
        continue;
      }

      // Trova o crea il brand
      let brand = await storage.getBrandBySlug(productData.brand.toLowerCase().replace(/\+/g, '').replace(/\s+/g, '-'));
      if (!brand) {
        brand = await storage.createBrand({
          name: productData.brand,
          slug: productData.brand.toLowerCase().replace(/\+/g, '').replace(/\s+/g, '-'),
          description: `Prodotti ${productData.brand}`
        });
      }

      // Crea il prodotto usando InsertProduct
      const product = await storage.createProduct({
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        categoryId: category.id,
        brandId: brand.id,
        longDescription: `${productData.nutritionalValues.protein} di proteine per porzione. ${productData.usage}`,
        features: productData.flavors,
        howToUse: productData.usage
      });

      console.log(`✓ Prodotto ${productData.name} aggiunto con successo`);
    }
    
    console.log("Migrazione completata con successo!");
  } catch (error) {
    console.error("Errore durante la migrazione:", error);
  }
}

migrateNewProteins();