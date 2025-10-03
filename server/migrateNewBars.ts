import { db } from "./db";
import { products } from "@shared/schema";

async function migrateNewBars() {
  console.log("🚀 Iniziando migrazione di 8 nuovi prodotti barrette...");

  const newProducts = [
    {
      name: "Barrettone 2.0",
      slug: "barrettone-2-0",
      description: "Barretta proteica ad alto contenuto proteico e basso impatto sui carboidrati",
      longDescription: "Il Barrettone 2.0 è una barretta proteica di nuova generazione progettata per chi cerca il massimo delle proteine con il minimo impatto sui carboidrati. Perfetta per prima, durante e dopo l'allenamento. Disponibile in tre irresistibili gusti per soddisfare ogni palato.",
      brandId: 1, // +WATT
      categoryId: 1, // Proteine
      features: ["Burro di Arachidi", "Cacao", "Vaniglia"],
      isNew: true,
      isBestSeller: false,
      specialOfferText: null
    },
    {
      name: "Low Sugar Bar",
      slug: "low-sugar-bar",
      description: "Barretta a basso contenuto di zuccheri, ad alto contenuto di proteine e fibre",
      longDescription: "La Low Sugar Bar è la soluzione ideale per chi vuole mantenere sotto controllo l'apporto di zuccheri senza rinunciare al gusto. Ricca di proteine e fibre, è perfetta come spuntino energetico o post-workout. Formula gluten free per il massimo benessere.",
      brandId: 1, // +WATT
      categoryId: 1, // Proteine
      features: ["Brownie", "Cookie Cream"],
      isNew: true,
      isBestSeller: false,
      specialOfferText: null
    },
    {
      name: "Veggie Ciok",
      slug: "veggie-ciok",
      description: "Barretta proteica alle proteine del pisello ricoperta di cioccolato fondente",
      longDescription: "Veggie Ciok è la barretta 100% vegetale di Vegetal +WATT, realizzata con proteine del pisello e ricoperta di delizioso cioccolato fondente. Ideale per vegani e vegetariani che non vogliono rinunciare al piacere di una barretta proteica gustosa e nutriente.",
      brandId: 2, // Vegetal +WATT
      categoryId: 1, // Proteine
      features: ["Albicocca", "Arancia", "Cacao"],
      isNew: true,
      isBestSeller: false,
      specialOfferText: null
    },
    {
      name: "Turbo Active",
      slug: "turbo-active",
      description: "Barretta energetica non ricoperta con arachidi, frutta secca e mandorle",
      longDescription: "Turbo Active è la barretta energetica perfetta per chi pratica sport di resistenza. Formula non ricoperta arricchita con arachidi, frutta secca e mandorle per un apporto energetico costante e duraturo. Ideale prima, durante e dopo l'attività fisica.",
      brandId: 1, // +WATT
      categoryId: 4, // Energia (assumendo che esista questa categoria)
      features: ["Arachidi", "Cacao"],
      isNew: true,
      isBestSeller: false,
      specialOfferText: null
    },
    {
      name: "FruitForce",
      slug: "fruitforce",
      description: "Barretta energetica al gusto di frutta con anacardi e mandorle",
      longDescription: "FruitForce è la barretta energetica che unisce il gusto della frutta fresca alla croccantezza di anacardi e mandorle. Perfetta per ricaricare le energie durante gli allenamenti più intensi o come spuntino naturale ricco di vitamine e minerali.",
      brandId: 1, // +WATT
      categoryId: 4, // Energia
      features: ["Ananas", "Fragola"],
      isNew: true,
      isBestSeller: true,
      specialOfferText: null
    },
    {
      name: "Big Bar",
      slug: "big-bar",
      description: "Barretta proteica di grandi dimensioni per il massimo apporto energetico",
      longDescription: "Big Bar è la barretta pensata per chi ha bisogno di un apporto energetico importante. Disponibile in due formati e gusti diversi, offre proteine di alta qualità e un sapore irresistibile. Perfetta per i momenti di maggiore necessità energetica.",
      brandId: 1, // +WATT
      categoryId: 1, // Proteine
      features: ["Cookie Nocciola", "Cocco"],
      isNew: false,
      isBestSeller: true,
      specialOfferText: null
    },
    {
      name: "Carbo Energy+",
      slug: "carbo-energy-plus",
      description: "Barretta energetica ai carboidrati per il massimo supporto durante l'attività fisica",
      longDescription: "Carbo Energy+ è la barretta studiata appositamente per fornire energia immediata e prolungata durante l'attività sportiva. Ricca di carboidrati complessi e semplici, è disponibile in quattro gusti rinfrescanti per accompagnarti in ogni momento dell'allenamento.",
      brandId: 1, // +WATT
      categoryId: 4, // Energia
      features: ["Agrumi", "Frutti di Bosco", "Mela Verde", "Albicocca"],
      isNew: true,
      isBestSeller: false,
      specialOfferText: null
    },
    {
      name: "CarboWART",
      slug: "carbowart",
      description: "Barretta energetica innovativa al pistacchio per performance elevate",
      longDescription: "CarboWART rappresenta l'innovazione nel mondo delle barrette energetiche. Con il suo esclusivo gusto pistacchio, offre un profilo nutrizionale ottimale per sostenere le performance sportive più impegnative. Formula avanzata per atleti esigenti.",
      brandId: 1, // +WATT
      categoryId: 4, // Energia
      features: ["Pistacchio"],
      isNew: true,
      isBestSeller: false,
      specialOfferText: "Novità assoluta!"
    }
  ];

  try {
    for (const product of newProducts) {
      const [insertedProduct] = await db
        .insert(products)
        .values(product)
        .returning();
      
      console.log(`✅ Inserito: ${insertedProduct.name} (ID: ${insertedProduct.id})`);
    }

    console.log("🎉 Migrazione completata con successo!");
    console.log("📊 8 nuovi prodotti barrette inseriti nel database");
    
  } catch (error) {
    console.error("❌ Errore durante la migrazione:", error);
  }

  process.exit(0);
}

migrateNewBars();