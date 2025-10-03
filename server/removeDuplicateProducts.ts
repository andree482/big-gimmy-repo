
import { db } from "./db";
import { products } from "@shared/schema";
import { eq, like } from "drizzle-orm";

async function removeDuplicateProducts() {
  console.log("🔍 Identificazione prodotti duplicati senza immagini...");
  
  try {
    // Lista dei prodotti duplicati da rimuovere (quelli senza immagini)
    const duplicatesToRemove = [
      // Prodotti con placeholder che hanno versioni con immagini
      "milk-protein-90-micellar-casein",
      "protein-evo-cocco", 
      "protein-evo-creme-caramel",
      "top-eggxellent-protein",
      "whey-protein-80",
      "whey-protein-90", 
      "wheyghty-protein-80",
      "wheyghty-protein-80-limited-edition",
      "xxx-hydrolysed-protein-90"
    ];

    let removedCount = 0;

    for (const slug of duplicatesToRemove) {
      // Cerca prodotti con questo slug che potrebbero essere duplicati
      const duplicateProducts = await db
        .select()
        .from(products)
        .where(eq(products.slug, slug));

      for (const product of duplicateProducts) {
        // Verifica se il prodotto ha una descrizione che indica che è un duplicato
        // o se non ha immagini associate
        if (product.description?.includes('[CONSOLIDATO IN VARIANTE]') || 
            product.description?.includes('placeholder') ||
            !product.description?.trim()) {
          
          await db.delete(products).where(eq(products.id, product.id));
          console.log(`🗑️  Rimosso duplicato: ${product.name} (ID: ${product.id})`);
          removedCount++;
        }
      }
    }

    // Rimuovi anche prodotti che hanno slug molto simili ma uno ha immagine e l'altro no
    const allProducts = await db.select().from(products);
    
    // Raggruppa per nome simile
    const productGroups: { [key: string]: any[] } = {};
    
    allProducts.forEach(product => {
      const normalizedName = product.name
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .trim();
      
      if (!productGroups[normalizedName]) {
        productGroups[normalizedName] = [];
      }
      productGroups[normalizedName].push(product);
    });

    // Per ogni gruppo, tieni solo quello con immagine (se disponibile)
    for (const [normalizedName, group] of Object.entries(productGroups)) {
      if (group.length > 1) {
        console.log(`\n🔍 Gruppo duplicato trovato: "${normalizedName}" (${group.length} prodotti)`);
        
        // Ordina: prima quelli con immagini, poi per data di creazione
        group.sort((a, b) => {
          // Priorità a prodotti che non hanno placeholder nella descrizione
          const aHasImage = !a.description?.includes('placeholder') && a.description?.trim();
          const bHasImage = !b.description?.includes('placeholder') && b.description?.trim();
          
          if (aHasImage && !bHasImage) return -1;
          if (!aHasImage && bHasImage) return 1;
          
          // Se entrambi hanno o non hanno immagini, ordina per data
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        // Rimuovi tutti tranne il primo (quello con immagine o più recente)
        for (let i = 1; i < group.length; i++) {
          const productToRemove = group[i];
          await db.delete(products).where(eq(products.id, productToRemove.id));
          console.log(`🗑️  Rimosso duplicato: ${productToRemove.name} (ID: ${productToRemove.id})`);
          removedCount++;
        }
        
        console.log(`✅ Mantenuto: ${group[0].name} (ID: ${group[0].id})`);
      }
    }

    console.log(`\n🎉 Pulizia completata!`);
    console.log(`✅ Prodotti rimossi: ${removedCount}`);
    console.log(`📊 Ora il catalogo dovrebbe essere pulito senza duplicati`);

  } catch (error) {
    console.error("❌ Errore durante la rimozione duplicati:", error);
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  removeDuplicateProducts().then(() => process.exit(0));
}

export { removeDuplicateProducts };
