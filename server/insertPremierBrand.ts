
import { db } from "./db";
import { brands } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function insertPremierBrand() {
  console.log("Verificando e inserendo brand Premier...");
  
  try {
    // Verifica se il brand Premier esiste già
    const [existingBrand] = await db.select().from(brands).where(eq(brands.name, "Premier"));
    
    if (existingBrand) {
      console.log("✓ Brand Premier già esistente (ID:", existingBrand.id, ")");
      return existingBrand;
    }
    
    // Crea il brand Premier
    const [premierBrand] = await db.insert(brands).values({
      name: "Premier",
      slug: "premier",
      description: "Premier è un brand specializzato in integratori alimentari e prodotti per la nutrizione sportiva di alta qualità",
      website: "https://premierintegratori.com",
      logo: null
    }).returning();
    
    console.log("✓ Brand Premier creato con successo (ID:", premierBrand.id, ")");
    return premierBrand;
    
  } catch (error) {
    console.error("✗ Errore durante l'inserimento del brand Premier:", error);
    throw error;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  insertPremierBrand()
    .then(() => {
      console.log("✅ Operazione completata!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Operazione fallita:", error);
      process.exit(1);
    });
}
