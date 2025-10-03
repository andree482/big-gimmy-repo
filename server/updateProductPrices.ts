
import { db } from './db';
import { products, productSizes } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface ProductUpdate {
  slug: string;
  basePrice: number;
  variants: Array<{
    flavor: string;
    size: string;
    price: number;
  }>;
}

const productUpdates: ProductUpdate[] = [
  {
    slug: "whey-protein-90",
    basePrice: 53.99,
    variants: [
      { flavor: "Banana", size: "750g", price: 53.99 },
      { flavor: "Cacao", size: "750g", price: 53.99 },
      { flavor: "Crema Nocciola", size: "750g", price: 53.99 },
      { flavor: "Fior di Latte", size: "750g", price: 53.99 },
      { flavor: "Fragola", size: "750g", price: 53.99 },
      { flavor: "Naturale", size: "750g", price: 53.99 },
      { flavor: "Vaniglia", size: "750g", price: 53.99 }
    ]
  },
  {
    slug: "protein-evo-cocco",
    basePrice: 3.20,
    variants: [
      { flavor: "Cocco", size: "70g", price: 3.20 }
    ]
  },
  {
    slug: "protein-evo-creme-caramel",
    basePrice: 3.20,
    variants: [
      { flavor: "Crème Caramel", size: "70g", price: 3.20 }
    ]
  },
  {
    slug: "top-eggxellent-protein",
    basePrice: 54.99,
    variants: [
      { flavor: "Crema Pasticciera", size: "750g", price: 54.99 },
      { flavor: "Crema Zabaione", size: "750g", price: 54.99 },
      { flavor: "Cacao", size: "750g", price: 54.99 }
    ]
  },
  {
    slug: "xxx-hydrolysed-protein-90",
    basePrice: 57.99,
    variants: [
      { flavor: "Mokka", size: "750g", price: 57.99 },
      { flavor: "Cacao", size: "750g", price: 57.99 },
      { flavor: "Nocciola", size: "750g", price: 57.99 }
    ]
  }
];

async function updateProductPrices() {
  console.log("🔄 Aggiornamento prezzi e varianti prodotti...");

  for (const productUpdate of productUpdates) {
    try {
      // Trova il prodotto
      const product = await db.select().from(products).where(eq(products.slug, productUpdate.slug)).limit(1);
      
      if (product.length === 0) {
        console.log(`❌ Prodotto non trovato: ${productUpdate.slug}`);
        continue;
      }

      const productId = product[0].id;
      console.log(`✅ Aggiornamento ${product[0].name}...`);

      // Rimuovi le taglie esistenti
      await db.delete(productSizes).where(eq(productSizes.productId, productId));

      // Aggiungi le nuove taglie con prezzi aggiornati
      for (const variant of productUpdate.variants) {
        await db.insert(productSizes).values({
          productId: productId,
          value: variant.size.replace(/[^0-9]/g, ''), // Estrae solo i numeri
          unit: variant.size.replace(/[0-9]/g, ''), // Estrae solo l'unità
          price: Math.round(variant.price * 100) // Converti in centesimi
        });
        
        console.log(`  → ${variant.flavor} ${variant.size}: €${variant.price}`);
      }

      // Aggiorna il prodotto con il flavor se è una variante singola
      if (productUpdate.variants.length === 1) {
        await db.update(products)
          .set({ 
            flavor: productUpdate.variants[0].flavor,
            size: productUpdate.variants[0].size
          })
          .where(eq(products.id, productId));
      }

    } catch (error) {
      console.error(`❌ Errore durante l'aggiornamento di ${productUpdate.slug}:`, error);
    }
  }

  console.log("✅ Aggiornamento completato!");
}

updateProductPrices().catch(console.error);
