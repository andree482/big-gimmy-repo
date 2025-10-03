/**
 * MIGRAZIONE PRODOTTI MASS GAINER
 * Basata su analisi visiva delle immagini fornite
 */

import { db } from './db';
import { products } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Prodotti Mass Gainer identificati dalle immagini
const massGainerProducts = [
  {
    name: "Avena +WATT",
    slug: "avena-plus-watt",
    description: "Integratore alimentare di farina di avena con taurina, acido lipoico, beta carotene, vitamine e cromo. Ideale per colazione sana e gustosa.",
    price: 32.90,
    categoryId: 11, // mass-gainer
    brandId: 1, // +WATT
    longDescription: "Farina di avena aromatizzata con edulcorante. Fonte di proteine, ad alto contenuto di fibre, senza zuccheri aggiunti, contiene in natura zuccheri.",
    howToUse: "Ideale per preparare deliziosi porridge per una colazione sana e gustosa. Mescolare con acqua o latte e cuocere.",
    warnings: "Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Conservare in luogo fresco e asciutto.",
    variants: [
      {
        name: "Nocciola",
        slug: "nocciola",
        image: "avena-nocciola.jpg"
      },
      {
        name: "Cacao", 
        slug: "cacao",
        image: "avena-cacao.jpg"
      },
      {
        name: "Cappuccino",
        slug: "cappuccino", 
        image: "avena-cappuccino.jpg"
      }
    ]
  },
  {
    name: "Mass Formula MCT Gainer",
    slug: "mass-formula-mct-gainer",
    description: "Integratore alimentare di carboidrati, proteine del siero del latte, MCT, creatina monoidrato, L-glutammina, taurina e HMB per l'aumento della massa muscolare.",
    price: 45.90,
    categoryId: 11, // mass-gainer
    brandId: 1, // +WATT
    longDescription: "Formula avanzata per il supporto dell'aumento di massa muscolare con carboidrati, proteine whey, MCT, creatina e aminoacidi. Contenuto nutrizionale bilanciato con 3g di creatina per dose.",
    howToUse: "Mescolare 105g di prodotto con 300ml di acqua o latte. Consumare prima, durante o dopo l'allenamento secondo necessità.",
    warnings: "Non raccomandato per bambini e donne durante la gravidanza e l'allattamento. Non superare la dose giornaliera consigliata.",
    variants: [
      {
        name: "Cacao",
        slug: "cacao",
        image: "mass-formula-cacao.jpg"
      },
      {
        name: "Nocciola",
        slug: "nocciola", 
        image: "mass-formula-nocciola.jpg"
      }
    ]
  },
  {
    name: "Oatmeal Pro", 
    slug: "oatmeal-pro",
    description: "Fiocchi d'avena aromatizzati con edulcorante della linea Vegetal +WATT. Fonte di proteine, ad alto contenuto di fibre, senza zuccheri aggiunti.",
    price: 18.90,
    categoryId: 11, // mass-gainer
    brandId: 2, // Vegetal +WATT
    longDescription: "Fiocchi d'avena aromatizzati vegani, fonte di proteine, ad alto contenuto di fibre, senza zuccheri aggiunti, contiene in natura zuccheri naturali della frutta.",
    howToUse: "Ideale per preparare deliziosi porridge per una colazione sana e gustosa. Perfetto con latte vegetale o acqua.",
    warnings: "Prodotto vegano. Non superare la dose giornaliera consigliata. Conservare in luogo fresco e asciutto.",
    variants: [
      {
        name: "Biscotto",
        slug: "biscotto",
        image: "oatmeal-pro-biscotto.jpg"
      },
      {
        name: "Cioccolato",
        slug: "cioccolato",
        image: "oatmeal-pro-cioccolato.jpg"
      }
    ]
  },
  {
    name: "Grissini Proteici",
    slug: "grissini-proteici", 
    description: "Grissini proteici con arachidi e mandorle. A basso contenuto di zuccheri, fonte di proteine e fibre.",
    price: 3.50,
    categoryId: 8, // barrette-energetiche (più appropriato dei mass gainer)
    brandId: 1, // +WATT
    longDescription: "Grissini proteici con arachidi e mandorle, a basso contenuto di zuccheri, fonte di proteine, fonte di fibre. Snack proteico ideale.",
    howToUse: "Consumare come spuntino proteico durante la giornata. Ideale pre o post allenamento.",
    warnings: "Contiene arachidi e mandorle. Può contenere tracce di altri semi oleosi. Non superare 2 confezioni al giorno."
  }
];

async function migrateMassGainer() {
  console.log('🚀 Migrazione prodotti Mass Gainer');
  
  try {
    for (const productData of massGainerProducts) {
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

      // Inserisci il prodotto
      const [newProduct] = await db
        .insert(products)
        .values({
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          categoryId: productData.categoryId,
          brandId: productData.brandId,
          longDescription: productData.longDescription,
          howToUse: productData.howToUse,
          warnings: productData.warnings
        })
        .returning();

      console.log(`✅ Aggiunto: ${newProduct.name}`);
    }

    console.log('🎉 Migrazione Mass Gainer completata!');
    
  } catch (error) {
    console.error('❌ Errore durante la migrazione:', error);
    throw error;
  }
}

// Esporta per uso esterno
export { migrateMassGainer };

// Esegui migrazione
migrateMassGainer()
  .then(() => {
    console.log('Migrazione completata con successo');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Errore durante la migrazione:', error);
    process.exit(1);
  });