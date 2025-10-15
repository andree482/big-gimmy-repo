// Definizioni delle interfacce per i prodotti
export interface ProductImage {
  src: string;
  alt: string;
  primary?: boolean;
}

export interface NutritionalValue {
  name: string;
  amount: string;
  unit: string;
  percentDailyValue?: string;
}

export interface ProductFlavor {
  name: string;
  color?: string; // Codice colore per visualizzazione
  available: boolean;
  image?: string; // Immagine specifica per il gusto
}

export interface ProductReview {
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  images: ProductImage[];
  description: string;
  longDescription?: string;
  features: string[];
  nutritionalValues?: NutritionalValue[];
  flavors?: ProductFlavor[];
  sizes: {
    value: string;
    unit: string;
    priceRange: string; // Intervallo di prezzo indicativo
    availableFlavors?: string[]; // Gusti disponibili per questo formato specifico
    price?: number; // Prezzo specifico per questo formato
    originalPrice?: number; // Prezzo originale per questo formato
  }[];
  keyIngredients?: string[];
  idealFor?: string[];
  warnings?: string[];
  howToUse?: string;
  usage?: string; // Modalità d'uso del prodotto
  ingredients?: string; // Ingredienti del prodotto
  reviews?: ProductReview[];
  reviewCount?: number; // Numero totale di recensioni
  rating?: number; // Media delle recensioni (1-5)
  price?: number; // Prezzo base del prodotto
  originalPrice?: number; // Prezzo originale del prodotto
  isNew?: boolean;
  isBestSeller?: boolean;
  hasSpecialOffer?: boolean;
  specialOfferText?: string;
  expertAdvice?: string;
  videoUrl?: string;
  inStoreOnly?: boolean;
  compareUrl?: string; // URL per confronto con altri negozi
}

// Prodotti di esempio per la categoria Proteine
// Prodotti aminoacidi
export const aminoacidProducts: Product[] = [

];

export const proteinProducts: Product[] = [
  // Array vuoto - tutti i prodotti proteine sono ora gestiti dal database
];