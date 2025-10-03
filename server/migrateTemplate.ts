/**
 * TEMPLATE SCRIPT PER MIGRAZIONE SISTEMATICA PRODOTTI
 * 
 * Usa questo template per aggiungere prodotti di qualsiasi categoria.
 * Segui queste fasi per ogni categoria:
 * 
 * FASE 1: Configura la categoria target
 * FASE 2: Definisci i prodotti con dati autentici
 * FASE 3: Esegui la migrazione
 * 
 * IMPORTANTE: Sostituisci sempre [CATEGORIA] e [BRAND] con valori reali
 */

import { db } from './db';
import { products } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { 
  formatQuantity, 
  generateSlug, 
  getBrandId, 
  getCategoryId,
  getProteinNutritionalTemplate,
  getBarNutritionalTemplate,
  getProteinInstructions,
  getBarInstructions,
  getStandardWarnings,
  type ProductMigrationData 
} from './utils/productHelpers';

// FASE 1: CONFIGURAZIONE CATEGORIA
// ================================
const TARGET_CATEGORY = 'barrette-energetiche'; // Cambia qui la categoria target
const DEFAULT_BRAND = '+WATT'; // Cambia qui il brand predefinito

// FASE 2: DEFINIZIONE PRODOTTI
// ============================
const TEMPLATE_PRODUCTS: ProductMigrationData[] = [
  {
    name: "Nome Prodotto Esempio",
    slug: generateSlug("Nome Prodotto Esempio"),
    description: "Descrizione dettagliata del prodotto basata su dati reali",
    price: 29.90,
    categoryId: getCategoryId(TARGET_CATEGORY),
    brandId: getBrandId(DEFAULT_BRAND),
    quantity: formatQuantity(750, 1), // 750g (1 confezione)
    nutritionalValues: getBarNutritionalTemplate(25, 30, 8, 280),
    ingredients: "Ingredienti reali dal prodotto",
    instructions: getBarInstructions(),
    warnings: getStandardWarnings(),
    // Per prodotti con varianti:
    variants: [
      {
        name: "Gusto Cioccolato",
        slug: "cioccolato",
        image: "nome-prodotto-cioccolato.jpg"
      },
      {
        name: "Gusto Vaniglia", 
        slug: "vaniglia",
        image: "nome-prodotto-vaniglia.jpg"
      }
    ]
  },
  // Aggiungi altri prodotti qui...
];

// FASE 3: FUNZIONE DI MIGRAZIONE
// ==============================
async function migrateTemplateProducts() {
  console.log(`🚀 Migrazione prodotti categoria: ${TARGET_CATEGORY}`);
  
  try {
    for (const productData of TEMPLATE_PRODUCTS) {
      // Verifica se il prodotto esiste già
      const existingProduct = await db
        .select()
        .from(products)
        .where(eq(products.slug, productData.slug))
        .limit(1);

      if (existingProduct.length > 0) {
        console.log(`⚠️  Prodotto ${productData.name} già esistente, skip`);
        continue;
      }

      // Inserisci il prodotto con schema corretto
      const [newProduct] = await db
        .insert(products)
        .values({
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          categoryId: productData.categoryId,
          brandId: productData.brandId,
          longDescription: productData.ingredients,
          howToUse: productData.instructions,
          warnings: productData.warnings
        })
        .returning();

      console.log(`✅ Aggiunto: ${newProduct.name}`);
    }

    console.log(`🎉 Migrazione ${TARGET_CATEGORY} completata!`);
    
  } catch (error) {
    console.error('❌ Errore durante la migrazione:', error);
    throw error;
  }
}

// ISTRUZIONI PER L'USO:
// ====================
/*
1. Cambia TARGET_CATEGORY con la categoria desiderata
2. Aggiorna TEMPLATE_PRODUCTS con i dati reali dei prodotti
3. Verifica che le immagini siano presenti in public/images/
4. Esegui: npm run tsx server/migrateTemplate.ts
5. Aggiorna il mapping immagini in ProductCategory.tsx se necessario

CATEGORIE DISPONIBILI:
- proteine
- aminoacidi  
- carboidrati
- vitamine
- pre-workout
- accessori
- vitamine-e-minerali
- barrette-energetiche
- creatina
- brucia-grassi
- mass-gainer

BRAND DISPONIBILI:
- +WATT (brandId: 1)
- Vegetal +WATT (brandId: 2)
*/

// Esporta la funzione per uso esterno
export { migrateTemplateProducts };

// Se eseguito direttamente
if (require.main === module) {
  migrateTemplateProducts()
    .then(() => {
      console.log('Migrazione completata con successo');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Errore durante la migrazione:', error);
      process.exit(1);
    });
}