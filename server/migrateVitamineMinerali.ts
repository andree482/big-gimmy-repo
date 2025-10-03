import { db } from "./db";
import { products, productVariants } from "@shared/schema";

const vitamineMineraliProducts = [
  // FOTO 7-8: Sali+ Activator con varianti gusto
  {
    id: 104,
    slug: "sali-activator-plus-watt",
    name: "Sali+ Activator",
    brand: "+WATT",
    description: "Maltodestrine e fruttosio in rapporto 1:0,8 con vitamine, minerali e carboidrati ad assorbimento sequenziale",
    shortDescription: "Integratore energetico con sali minerali, vitamine e carboidrati sequenziali",
    category: "vitamine-e-minerali",
    price: 24.90,
    originalPrice: null,
    rating: 0,
    reviewCount: 0,
    tags: ["sali", "vitamine", "energia", "carboidrati", "vitargo"],
    ingredients: "Maltodestrine, fruttosio, Vitargo®, ribosio, glutammina, arginina, sali minerali, vitamina C, vitamina B6, edulcoranti",
    instructions: "Sciogliere 40g (1 misurino) in 500ml di acqua. Assumere prima, durante o dopo l'attività fisica",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini.",
    nutritionalInfo: {
      per100g: {
        energia: "380 kcal",
        proteine: "0.5g",
        carboidrati: "92g",
        grassi: "0.1g",
        sodio: "850mg",
        vitaminaC: "200mg",
        vitaminaB6: "5mg"
      },
      perPorzione: {
        porzione: "40g",
        energia: "152 kcal",
        carboidrati: "37g",
        sodio: "340mg"
      }
    },
    variants: [
      {
        id: 1041,
        name: "Arancia Rossa",
        price: 24.90,
        image: "sali-activator-arancia.jpg",
        quantity: "600g (15 porzioni)",
        inStock: true
      },
      {
        id: 1042,
        name: "Fragola e Banana",
        price: 24.90,
        image: "sali-activator-fragola-banana.jpg",
        quantity: "600g (15 porzioni)",
        inStock: true
      }
    ]
  },

  // FOTO 9-12: Sali+ Electrolyte con varianti formato e gusto
  {
    id: 105,
    slug: "sali-electrolyte-plus-watt",
    name: "Sali+ Electrolyte",
    brand: "+WATT",
    description: "Integratore a base di maltodestrine, fruttosio, Vitargo® e sali minerali con vitamine C e B6",
    shortDescription: "Elettroliti e carboidrati per idratazione e reintegro salino ottimale",
    category: "vitamine-e-minerali",
    price: 19.90,
    originalPrice: null,
    rating: 0,
    reviewCount: 0,
    tags: ["elettroliti", "sali", "idratazione", "vitargo", "endurance"],
    ingredients: "Maltodestrine, fruttosio, Vitargo®, sali minerali, vitamina C, vitamina B6, edulcoranti naturali",
    instructions: "Sciogliere 50g in 500ml di acqua. Assumere durante l'attività fisica prolungata",
    warnings: "Non superare la dose consigliata. Consultare il medico in caso di patologie renali.",
    nutritionalInfo: {
      per100g: {
        energia: "370 kcal",
        proteine: "0.2g",
        carboidrati: "90g",
        grassi: "0.1g",
        sodio: "900mg",
        potassio: "400mg",
        magnesio: "150mg",
        vitaminaC: "180mg"
      },
      perPorzione: {
        porzione: "50g",
        energia: "185 kcal",
        carboidrati: "45g",
        sodio: "450mg"
      }
    },
    variants: [
      {
        id: 1051,
        name: "Arancia - Barattolo 500g",
        price: 21.90,
        image: "sali-electrolyte-arancia-500g.jpg",
        quantity: "500g (10 porzioni)",
        inStock: true
      },
      {
        id: 1052,
        name: "Limone - Barattolo 500g",
        price: 21.90,
        image: "sali-electrolyte-limone-500g.jpg",
        quantity: "500g (10 porzioni)",
        inStock: true
      },
      {
        id: 1053,
        name: "Arancia - Busta 600g",
        price: 19.90,
        image: "sali-electrolyte-arancia-600g.jpg",
        quantity: "600g (15 porzioni)",
        inStock: true
      },
      {
        id: 1054,
        name: "Limone - Busta 600g",
        price: 19.90,
        image: "sali-electrolyte-limone-600g.jpg",
        quantity: "600g (15 porzioni)",
        inStock: true
      }
    ]
  }
];

export async function migrateVitamineMineraliProducts() {
  console.log("Migrating Vitamine e Minerali products...");
  
  for (const product of vitamineMineraliProducts) {
    const { variants, ...productData } = product;
    
    // Insert product
    const [insertedProduct] = await db
      .insert(products)
      .values(productData)
      .returning();
    
    console.log(`Inserted product: ${insertedProduct.name}`);
    
    // Insert variants
    if (variants && variants.length > 0) {
      const variantData = variants.map(variant => ({
        ...variant,
        productId: insertedProduct.id
      }));
      
      await db.insert(productVariants).values(variantData);
      console.log(`Inserted ${variants.length} variants for ${insertedProduct.name}`);
    }
  }
  
  console.log("Vitamine e Minerali products migration completed!");
}

if (require.main === module) {
  migrateVitamineMineraliProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}