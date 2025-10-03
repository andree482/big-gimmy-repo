
import OpenAI from 'openai';

// Configurazione OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Modalità di simulazione per sviluppo
const SIMULATION_MODE = !process.env.OPENAI_API_KEY;

export interface ProductInfo {
  name: string;
  brand: string;
  category: string;
  flavors?: string[];
  sizes?: string[];
  keyIngredients?: string[];
  nutritionalHighlights?: string[];
  targetAudience?: string[];
  productType?: string; // "barretta", "polvere", "capsule", etc.
}

/**
 * Genera descrizione breve per la copertina del prodotto
 */
export async function generateShortDescription(productInfo: ProductInfo): Promise<string> {
  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE: Generazione descrizione breve ===');
    return `${productInfo.name} di ${productInfo.brand} - Integratore ${productInfo.category} di alta qualità per sportivi e fitness enthusiast.`;
  }

  try {
    const prompt = `
Genera una descrizione breve (MAX 120 caratteri) per un prodotto di integratori sportivi:

PRODOTTO: ${productInfo.name}
BRAND: ${productInfo.brand}
CATEGORIA: ${productInfo.category}
${productInfo.flavors ? `GUSTI: ${productInfo.flavors.join(', ')}` : ''}
${productInfo.sizes ? `FORMATI: ${productInfo.sizes.join(', ')}` : ''}

REQUISITI:
- Massimo 120 caratteri
- Linguaggio accattivante e professionale
- Evidenzia il beneficio principale
- Perfetto per e-commerce
- Non includere prezzo

ESEMPIO: "Proteine del siero di latte di alta qualità per crescita muscolare e recupero post-workout"
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const description = response.choices[0]?.message?.content?.trim() || '';
    
    // Verifica lunghezza e tronca se necessario
    return description.length > 120 ? description.substring(0, 117) + '...' : description;
    
  } catch (error) {
    console.error('Errore generazione descrizione breve:', error);
    // Fallback descrizione generica
    return `${productInfo.name} di ${productInfo.brand} - Integratore ${productInfo.category} premium`;
  }
}

/**
 * Genera descrizione dettagliata per la pagina prodotto
 */
export async function generateDetailedDescription(productInfo: ProductInfo): Promise<string> {
  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE: Generazione descrizione dettagliata ===');
    return `
## Descrizione
${productInfo.name} di ${productInfo.brand} rappresenta l'eccellenza nel settore degli integratori ${productInfo.category}. Formulato con ingredienti di alta qualità, questo prodotto è ideale per sportivi, atleti e chiunque voglia migliorare le proprie performance.

## Benefici Principali
- Supporta le performance sportive
- Formula di alta qualità
- Perfetto per il recupero muscolare
- Ingredienti selezionati

## Caratteristiche Tecniche
Sviluppato con tecnologie innovative per garantire massima efficacia e assorbimento. La formula bilanciata offre un profilo nutrizionale completo per supportare i tuoi obiettivi fitness.

## A chi è rivolto
Ideale per sportivi, atleti professionisti e chiunque pratichi attività fisica regolare. Perfetto per chi cerca un integratore di qualità superiore per ottimizzare le proprie performance.
    `.trim();
  }

  try {
    const prompt = `
Genera una descrizione dettagliata per un prodotto di integratori sportivi in formato MARKDOWN:

INFORMAZIONI PRODOTTO:
- Nome: ${productInfo.name}
- Brand: ${productInfo.brand}
- Categoria: ${productInfo.category}
${productInfo.flavors ? `- Gusti disponibili: ${productInfo.flavors.join(', ')}` : ''}
${productInfo.sizes ? `- Formati: ${productInfo.sizes.join(', ')}` : ''}
${productInfo.keyIngredients ? `- Ingredienti chiave: ${productInfo.keyIngredients.join(', ')}` : ''}
${productInfo.productType ? `- Tipo prodotto: ${productInfo.productType}` : ''}

STRUTTURA RICHIESTA:
## Descrizione
[Paragrafo introduttivo coinvolgente che presenta il prodotto]

## Benefici Principali
- [Lista di 4-6 benefici specifici con bullet points]

## Caratteristiche Tecniche
[Paragrafo che descrive la formulazione e tecnologie utilizzate]

## A chi è rivolto
[Paragrafo che identifica il target di riferimento]

REQUISITI:
- Linguaggio professionale ma accessibile
- Lunghezza: 300-500 parole totali
- Evidenzia vantaggi competitivi
- Usa terminologia tecnica appropriata
- Mantieni focus su qualità e performance
- Non inventare claim medici non verificabili
- Non includere prezzi
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || '';
    
  } catch (error) {
    console.error('Errore generazione descrizione dettagliata:', error);
    // Fallback descrizione generica
    return `
## Descrizione
${productInfo.name} di ${productInfo.brand} rappresenta l'eccellenza nel settore degli integratori ${productInfo.category}.

## Benefici Principali
- Alta qualità degli ingredienti
- Supporto alle performance sportive
- Formulazione scientificamente studiata
- Ideale per atleti e sportivi

## A chi è rivolto
Perfetto per sportivi e atleti che cercano un integratore di qualità superiore.
    `.trim();
  }
}

/**
 * Genera modalità d'uso personalizzata
 */
export async function generateUsageInstructions(productInfo: ProductInfo): Promise<string> {
  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE: Generazione istruzioni d\'uso ===');
    return `Seguire le indicazioni riportate sulla confezione. Consultare un medico prima dell'uso. Non superare le dosi consigliate.`;
  }

  try {
    const prompt = `
Genera istruzioni d'uso per un integratore sportivo:

PRODOTTO: ${productInfo.name}
CATEGORIA: ${productInfo.category}
TIPO: ${productInfo.productType || 'Non specificato'}

Crea istruzioni pratiche e specifiche per questa tipologia di prodotto, includendo:
- Dosaggio suggerito
- Modalità di assunzione
- Timing ottimale
- Precauzioni

Massimo 200 caratteri, linguaggio chiaro e diretto.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.6,
    });

    return response.choices[0]?.message?.content?.trim() || 'Seguire le indicazioni riportate sulla confezione.';
    
  } catch (error) {
    console.error('Errore generazione istruzioni uso:', error);
    return 'Seguire le indicazioni riportate sulla confezione. Consultare un medico prima dell\'uso.';
  }
}

/**
 * Genera contenuto completo per un prodotto
 */
export async function generateCompleteProductContent(productInfo: ProductInfo) {
  const [shortDescription, detailedDescription, usageInstructions] = await Promise.all([
    generateShortDescription(productInfo),
    generateDetailedDescription(productInfo),
    generateUsageInstructions(productInfo)
  ]);

  return {
    shortDescription,
    detailedDescription,
    usageInstructions,
    warnings: "Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Conservare in luogo fresco e asciutto."
  };
}
