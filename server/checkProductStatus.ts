
import { db } from "./db.js";
import { products, productCategories, brands } from "@shared/schema";
import { eq } from "drizzle-orm";

async function checkProductStatus() {
  console.log("📊 Verifica stato attuale del database...\n");
  
  try {
    // 1. Conta tutti i prodotti
    const allProducts = await db.select().from(products);
    console.log(`📦 TOTALE PRODOTTI NEL DATABASE: ${allProducts.length}`);
    
    // 2. Trova categoria proteine
    const proteineCategory = await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.slug, "proteine"));
    
    if (proteineCategory.length > 0) {
      const proteineProducts = await db
        .select()
        .from(products)
        .where(eq(products.categoryId, proteineCategory[0].id));
      
      console.log(`\n🥛 PRODOTTI PROTEINE: ${proteineProducts.length}`);
      console.log("Lista prodotti proteici:");
      
      proteineProducts.forEach((p, i) => {
        console.log(`  ${i+1}. ${p.name}`);
        console.log(`     - Slug: ${p.slug}`);
        console.log(`     - Descrizione: ${p.description?.substring(0, 80)}...`);
        console.log("");
      });
      
      // 3. Cerca possibili duplicati per nome simile
      console.log("\n🔍 ANALISI DUPLICATI PER NOME SIMILE:");
      
      const nameGroups: { [key: string]: any[] } = {};
      
      proteineProducts.forEach(product => {
        // Normalizza il nome per raggruppare varianti simili
        const normalizedName = product.name
          .toLowerCase()
          .replace(/\s+(plus\s+watt|volchem|\+watt)/g, '') // Rimuovi brand
          .replace(/\s+(limited\s+edition|evo|extra|gold)/g, '') // Rimuovi varianti
          .replace(/\s+\d+/g, '') // Rimuovi numeri
          .replace(/[^\w\s]/g, '') // Rimuovi punteggiatura
          .replace(/\s+/g, ' ')
          .trim();
        
        if (!nameGroups[normalizedName]) {
          nameGroups[normalizedName] = [];
        }
        nameGroups[normalizedName].push(product);
      });
      
      // Mostra gruppi con più di un prodotto
      Object.entries(nameGroups).forEach(([normalizedName, group]) => {
        if (group.length > 1) {
          console.log(`\n⚠️  Gruppo "${normalizedName}" (${group.length} prodotti):`);
          group.forEach((p, i) => {
            console.log(`   ${i+1}. ID: ${p.id} | Nome: ${p.name}`);
            console.log(`      Slug: ${p.slug}`);
          });
        }
      });
    }
    
    // 4. Cerca prodotti con slug identici
    console.log("\n🔍 CONTROLLO SLUG DUPLICATI:");
    const slugGroups: { [key: string]: any[] } = {};
    
    allProducts.forEach(product => {
      if (!slugGroups[product.slug]) {
        slugGroups[product.slug] = [];
      }
      slugGroups[product.slug].push(product);
    });
    
    const duplicateSlugs = Object.entries(slugGroups).filter(([_, group]) => group.length > 1);
    
    if (duplicateSlugs.length > 0) {
      console.log(`❌ Trovati ${duplicateSlugs.length} slug duplicati:`);
      duplicateSlugs.forEach(([slug, group]) => {
        console.log(`\n   Slug: "${slug}" (${group.length} prodotti)`);
        group.forEach((p, i) => {
          console.log(`     ${i+1}. ID: ${p.id} | Nome: ${p.name}`);
        });
      });
    } else {
      console.log("✅ Nessun slug duplicato trovato");
    }
    
  } catch (error) {
    console.error("❌ Errore durante la verifica:", error);
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  checkProductStatus().then(() => process.exit(0));
}

export { checkProductStatus };
