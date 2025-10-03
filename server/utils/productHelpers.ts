/**
 * Helper functions per gestione sistematica prodotti
 */

import { generateCompleteProductContent, ProductInfo } from '../services/openaiDescriptions';

export interface ProductMigrationData {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: number;
  brandId: number;
  quantity: string;
  nutritionalValues?: Record<string, string>;
  ingredients?: string;
  instructions?: string;
  warnings?: string;
  variants?: Array<{
    name: string;
    slug: string;
    image: string;
  }>;
}

/**
 * Genera descrizioni automatiche con ChatGPT
 */
export async function generateProductDescriptions(productInfo: ProductInfo) {
  try {
    console.log(`🤖 Generando descrizioni AI per: ${productInfo.name}`);
    const content = await generateCompleteProductContent(productInfo);
    console.log(`✅ Descrizioni generate per: ${productInfo.name}`);
    return content;
  } catch (error) {
    console.error(`❌ Errore generazione descrizioni per ${productInfo.name}:`, error);
    return {
      shortDescription: `${productInfo.name} di ${productInfo.brand} - Integratore ${productInfo.category} di alta qualità`,
      detailedDescription: `${productInfo.name} è un integratore ${productInfo.category} formulato da ${productInfo.brand} per supportare le performance sportive.`,
      usageInstructions: "Seguire le indicazioni riportate sulla confezione.",
      warnings: "Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini."
    };
  }
}

/**
 * Standardizza il formato quantità: "[grammatura] ([numero] confezione)"
 */
export function formatQuantity(grams: number, pieces: number = 1): string {
  return `${grams}g (${pieces} confezione${pieces > 1 ? 'i' : ''})`;
}

/**
 * Genera slug corretto da nome prodotto
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Mappa brand da nome a ID
 */
export function getBrandId(brandName: string): number {
  const brandMap: Record<string, number> = {
    '+WATT': 1,
    'Vegetal +WATT': 2,
  };
  return brandMap[brandName] || 1;
}

/**
 * Mappa categoria da nome a ID
 */
export function getCategoryId(categoryName: string): number {
  const categoryMap: Record<string, number> = {
    'proteine': 1,
    'aminoacidi-e-creatina': 2,
    'pre-workout-energetici': 3,
    'carboidrati': 3, // legacy alias
    'vitamine': 7, // legacy alias
    'dimagranti': 5,
    'merchandising-e-cosmetici': 6,
    'supplementi': 7,
    'alimenti-fit': 8,
    // Legacy mappings for backward compatibility
    'aminoacidi': 2,
    'energetici': 3,
    'pre-workout': 5,
    'vitamine-minerali-antiossidanti': 7,
    'accessori-e-merchandising': 6,
    'vitamine-e-minerali': 7,
    'barrette-energetiche': 8,
    'creatina': 2,
    'brucia-grassi': 5,
    'mass-gainer': 1,
  };
  return categoryMap[categoryName] || 1;
}

/**
 * Template per valori nutrizionali standard proteine
 */
export function getProteinNutritionalTemplate(
  proteins: number = 80,
  carbs: number = 5,
  fats: number = 2,
  kcal: number = 350
): Record<string, string> {
  return {
    'Proteine': `${proteins}g per 100g`,
    'Carboidrati': `${carbs}g per 100g`,
    'Grassi': `${fats}g per 100g`,
    'Energia': `${kcal} kcal per 100g`,
    'Sale': '< 0,5g per 100g'
  };
}

/**
 * Template per valori nutrizionali barrette
 */
export function getBarNutritionalTemplate(
  proteins: number = 20,
  carbs: number = 25,
  fats: number = 8,
  kcal: number = 240
): Record<string, string> {
  return {
    'Proteine': `${proteins}g per barretta`,
    'Carboidrati': `${carbs}g per barretta`,
    'Grassi': `${fats}g per barretta`,
    'Energia': `${kcal} kcal per barretta`,
    'Fibre': '3-5g per barretta'
  };
}

/**
 * Template per istruzioni uso proteine
 */
export function getProteinInstructions(): string {
  return "Mescolare 30g di prodotto (1 misurino) con 250ml di acqua o latte. Consumare preferibilmente dopo l'allenamento o come spuntino proteico.";
}

/**
 * Template per istruzioni uso barrette
 */
export function getBarInstructions(): string {
  return "Consumare 1 barretta come spuntino energetico prima, durante o dopo l'attività fisica. Non superare 2 barrette al giorno.";
}

/**
 * Template per avvertenze standard
 */
export function getStandardWarnings(): string {
  return "Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Conservare in luogo fresco e asciutto.";
}