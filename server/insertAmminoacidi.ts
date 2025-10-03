import { db } from "./db";
import { products, brands, productCategories } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function insertAmminoacidiProducts() {
  console.log("Inserting Amminoacidi products following the prompt exactly...");
  
  // FASE 3: INSERIMENTO DATI BASE per CATEGORIA AMMINOACIDI (FOTO 18-19)
  
  // Verifica brand +WATT esistente
  const [plusWattBrand] = await db.select().from(brands).where(eq(brands.name, "+WATT"));
  if (!plusWattBrand) {
    throw new Error("Brand +WATT not found in database");
  }
  
  // Verifica categoria Amminoacidi esistente o creala
  let [amminoacidiCategory] = await db.select().from(productCategories).where(eq(productCategories.slug, "aminoacidi"));
  if (!amminoacidiCategory) {
    [amminoacidiCategory] = await db.insert(productCategories).values({
      name: "Amminoacidi",
      slug: "aminoacidi", 
      description: "Prodotti per amminoacidi e recupero muscolare"
    }).returning();
  }

  // PRODOTTO 8: R.M.1 BCAA 8:1:1 Recovery Mix (FOTO 18-19)
  // Gestione Formati: 25g bustina e 500g barattolo
  const product8 = await db.insert(products).values({
    slug: "rm1-bcaa-recovery-mix-plus-watt",
    name: "R.M.1 BCAA 8:1:1 Recovery Mix",
    brandId: plusWattBrand.id,
    categoryId: amminoacidiCategory.id,
    description: "Integratore alimentare con creatina, glutammina, BCAA, taurina, magnesio, potassio e vitamina C",
    longDescription: `## Benefici del prodotto
- Recupero muscolare accelerato dopo l'allenamento
- Formula All in One con BCAA in rapporto 8:1:1
- Supporto completo per la sintesi proteica

## Caratteristiche principali
- BCAA 8:1:1 per massimo recupero muscolare
- Creatina monoidrato per forza e potenza
- Glutammina per supporto del sistema immunitario
- Taurina, magnesio e potassio per funzione muscolare

## Valori nutrizionali
### Per 100g:
- Energia: 320 kcal
- Proteine: 75g
- BCAA: 50g (8:1:1)
- Creatina: 10g

### Per porzione (25g):
- BCAA: 12.5g
- Creatina: 2.5g
- Glutammina: 3g

## Ingredienti
Aminoacidi ramificati (L-leucina, L-isoleucina, L-valina) 8:1:1, creatina monoidrato, L-glutammina, taurina, magnesio citrato, potassio citrato, vitamina C, edulcoranti naturali.

## Modalità d'uso
**Dosaggio**: Sciogliere 25g in 300ml di acqua
**Preparazione**: Mescolare bene fino a completa dissoluzione
**Quando**: Assumere dopo l'allenamento per ottimizzare il recupero

## A chi è rivolto
Dedicato ad atleti che praticano allenamenti intensi e necessitano di supporto completo per il recupero muscolare.`,
    features: ["BCAA 8:1:1", "All in One", "Creatina", "Glutammina", "Recovery"],
    howToUse: "Sciogliere 25g in 300ml di acqua e assumere dopo l'allenamento",
    warnings: "Non superare la dose consigliata. Tenere fuori dalla portata dei bambini.",
    isNew: false,
    isBestSeller: true,
    hasSpecialOffer: false
  }).returning();

  console.log("✓ Inserted 1 Amminoacidi product:");
  console.log(`  - ${product8[0].name} (ID: ${product8[0].id})`);
  
  return {
    product8: product8[0]
  };
}

// Run migration
insertAmminoacidiProducts()
  .then(() => {
    console.log("✓ Amminoacidi products insertion completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Amminoacidi products insertion failed:", error);
    process.exit(1);
  });