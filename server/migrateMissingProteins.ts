
import { db } from "./db";
import { products, productImages, productSizes, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";
import { proteinProducts } from "../client/src/lib/products";

async function migrateMissingProteins() {
  console.log("🚀 Migrazione prodotti proteici mancanti...");
  
  try {
    // Trova la categoria proteine
    const [proteineCategory] = await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.slug, "proteine"));
    
    if (!proteineCategory) {
      throw new Error("Categoria proteine non trovata");
    }

    // Trova il brand +Watt
    const [plusWattBrand] = await db
      .select()
      .from(brands)
      .where(eq(brands.name, "+Watt"));
    
    if (!plusWattBrand) {
      throw new Error("Brand +Watt non trovato");
    }

    let prodottiInseriti = 0;
    let prodottiEsistenti = 0;

    for (const product of proteinProducts) {
      // Verifica se il prodotto esiste già
      const [existingProduct] = await db
        .select()
        .from(products)
        .where(eq(products.slug, product.id));

      if (existingProduct) {
        console.log(`⚠️  Prodotto ${product.name} già esistente, skip`);
        prodottiEsistenti++;
        continue;
      }

      // Inserisci il prodotto
      const [newProduct] = await db
        .insert(products)
        .values({
          slug: product.id,
          name: product.name,
          brandId: plusWattBrand.id,
          categoryId: proteineCategory.id,
          description: product.description,
          longDescription: product.longDescription || product.description,
          features: product.features || [],
          howToUse: product.howToUse || "Seguire le istruzioni sulla confezione",
          warnings: product.warnings?.join("; ") || "Non superare la dose consigliata",
          isNew: product.isNew || false,
          isBestSeller: product.isBestSeller || false,
          hasSpecialOffer: product.hasSpecialOffer || false,
          specialOfferText: product.specialOfferText || null
        })
        .returning();

      // Inserisci le immagini del prodotto
      if (product.images && product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
          const image = product.images[i];
          await db.insert(productImages).values({
            productId: newProduct.id,
            src: image.src,
            alt: image.alt,
            isPrimary: i === 0 || image.primary === true
          });
        }
      }

      // Inserisci le taglie/formati disponibili
      if (product.sizes && product.sizes.length > 0) {
        for (const size of product.sizes) {
          // Estrai il prezzo dal priceRange se disponibile
          let priceCents = 0;
          if (size.priceRange) {
            const priceMatch = size.priceRange.match(/(\d+(?:,\d+)?)/);
            if (priceMatch) {
              const priceString = priceMatch[1].replace(',', '.');
              priceCents = Math.round(parseFloat(priceString) * 100);
            }
          }

          await db.insert(productSizes).values({
            productId: newProduct.id,
            value: parseInt(size.value) || 0,
            unit: size.unit,
            price: priceCents
          });
        }
      }

      console.log(`✅ Inserito: ${product.name}`);
      prodottiInseriti++;
    }

    console.log(`\n🎉 Migrazione completata!`);
    console.log(`✅ Prodotti inseriti: ${prodottiInseriti}`);
    console.log(`⚠️  Prodotti già esistenti: ${prodottiEsistenti}`);
    console.log(`📊 Totale processati: ${proteinProducts.length}`);

  } catch (error) {
    console.error("❌ Errore durante la migrazione:", error);
    throw error;
  }
}

// Esegui la migrazione direttamente
migrateMissingProteins()
  .then(() => {
    console.log("Migrazione completata con successo!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Errore durante la migrazione:", error);
    process.exit(1);
  });

export { migrateMissingProteins };
