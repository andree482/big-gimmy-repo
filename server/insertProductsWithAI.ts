
import { db } from "./db";
import { products, brands, productCategories, productVariants } from "@shared/schema";
import { eq } from "drizzle-orm";
import { generateProductDescriptions, generateSlug, getBrandId, getCategoryId } from "./utils/productHelpers";
import { ProductInfo } from "./services/openaiDescriptions";

interface ProductData {
  name: string;
  brand: string;
  category: string;
  price: number;
  flavors?: string[];
  sizes?: string[];
  keyIngredients?: string[];
  productType?: string;
  images?: Array<{
    flavor?: string;
    size?: string;
    imagePath: string;
  }>;
}

export async function insertProductWithAI(productData: ProductData) {
  console.log(`🚀 Inserendo prodotto con AI: ${productData.name}`);
  
  try {
    // 1. Ottieni brand e categoria
    const [brand] = await db.select().from(brands).where(eq(brands.name, productData.brand));
    const [category] = await db.select().from(productCategories).where(eq(productCategories.slug, productData.category));
    
    if (!brand) throw new Error(`Brand ${productData.brand} non trovato`);
    if (!category) throw new Error(`Categoria ${productData.category} non trovata`);
    
    // 2. Prepara informazioni per ChatGPT
    const productInfo: ProductInfo = {
      name: productData.name,
      brand: productData.brand,
      category: productData.category,
      flavors: productData.flavors,
      sizes: productData.sizes,
      keyIngredients: productData.keyIngredients,
      productType: productData.productType
    };
    
    // 3. Genera descrizioni con ChatGPT
    console.log(`🤖 Generando contenuti AI per: ${productData.name}`);
    const aiContent = await generateProductDescriptions(productInfo);
    
    // 4. Inserisci prodotto principale
    const [insertedProduct] = await db.insert(products).values({
      slug: generateSlug(productData.name),
      name: productData.name,
      brandId: brand.id,
      categoryId: category.id,
      description: aiContent.shortDescription,
      longDescription: aiContent.detailedDescription,
      price: productData.price,
      howToUse: aiContent.usageInstructions,
      warnings: aiContent.warnings,
      features: productData.keyIngredients?.join(', ') || '',
      isNew: true,
      isBestSeller: false,
      hasSpecialOffer: false
    }).returning();
    
    // 5. Inserisci varianti se presenti
    if (productData.flavors && productData.sizes) {
      console.log(`📦 Inserendo ${productData.flavors.length * productData.sizes.length} varianti`);
      
      for (const flavor of productData.flavors) {
        for (const size of productData.sizes) {
          const variantSlug = generateSlug(`${productData.name}-${flavor}-${size}`);
          const variantName = `${flavor} ${size}`;
          
          // Trova immagine corrispondente
          const variantImage = productData.images?.find(img => 
            img.flavor === flavor && img.size === size
          )?.imagePath || '/images/products/placeholder-product.jpg';
          
          await db.insert(productVariants).values({
            productId: insertedProduct.id,
            name: variantName,
            slug: variantSlug,
            price: productData.price,
            image: variantImage,
            isActive: true
          });
        }
      }
    }
    
    console.log(`✅ Prodotto ${productData.name} inserito con successo con ${productData.flavors?.length || 0} x ${productData.sizes?.length || 0} varianti`);
    
    return {
      product: insertedProduct,
      aiContent,
      variantsCount: (productData.flavors?.length || 0) * (productData.sizes?.length || 0)
    };
    
  } catch (error) {
    console.error(`❌ Errore inserimento prodotto ${productData.name}:`, error);
    throw error;
  }
}

/**
 * Inserisci multiple prodotti con AI in batch
 */
export async function insertMultipleProductsWithAI(productsData: ProductData[]) {
  console.log(`🚀 Inserimento batch di ${productsData.length} prodotti con AI`);
  
  const results = [];
  
  for (const productData of productsData) {
    try {
      const result = await insertProductWithAI(productData);
      results.push({ success: true, product: productData.name, result });
      
      // Pausa per evitare rate limiting OpenAI
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Errore con prodotto ${productData.name}:`, error);
      results.push({ success: false, product: productData.name, error: error.message });
    }
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Inserimento completato: ${successful} successi, ${failed} errori`);
  
  return results;
}

// Esempio di utilizzo
if (import.meta.url === `file://${process.argv[1]}`) {
  const exampleProducts: ProductData[] = [
    {
      name: "Whey Protein Premium",
      brand: "+Watt",
      category: "proteine",
      price: 45.99,
      flavors: ["Cioccolato", "Vaniglia", "Fragola"],
      sizes: ["900g", "2kg"],
      keyIngredients: ["Proteine del siero", "BCAA", "Glutammina"],
      productType: "polvere",
      images: [
        { flavor: "Cioccolato", size: "900g", imagePath: "/images/products/whey-cioccolato-900g.jpg" },
        { flavor: "Vaniglia", size: "900g", imagePath: "/images/products/whey-vaniglia-900g.jpg" }
      ]
    }
  ];
  
  insertMultipleProductsWithAI(exampleProducts)
    .then((results) => {
      console.log("✅ Inserimento prodotti AI completato:", results);
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Errore inserimento prodotti AI:", error);
      process.exit(1);
    });
}
