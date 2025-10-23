// Definizione di tipi comuni per i prodotti
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
  }[];
  keyIngredients?: string[];
  idealFor?: string[];
  warnings?: string[];
  howToUse?: string;
  reviews?: ProductReview[];
  rating?: number; // Media delle recensioni (1-5)
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
export const proteinProducts: Product[] = [
  {
    id: "gold-standard-100-whey",
    name: "Milk Protein 90 Micellar Casein",
    brand: "+Watt",
    category: "Proteine",
    images: [
      {
        src: "/attached_assets/immagine_1748632405654.png",
        alt: "Milk Protein 90 Micellar Casein - Banana",
        primary: true
      },
      {
        src: "/attached_assets/immagine_1748632469331.png",
        alt: "Milk Protein 90 Micellar Casein - Cacao"
      },
      {
        src: "/attached_assets/immagine_1748632483243.png",
        alt: "Milk Protein 90 Micellar Casein - Fragola"
      },
      {
        src: "/attached_assets/immagine_1748632490073.png",
        alt: "Milk Protein 90 Micellar Casein - Vaniglia"
      }
    ],
    description: "Integratore alimentare a base di caseine micellari del latte ad alto titolo proteico con l'aggiunta di vitamine.",
    longDescription: "Milk Protein 90 Micellar Casein di +Watt è un integratore alimentare a base di caseine micellari del latte ad alto titolo proteico con l'aggiunta di vitamine. Con edulcoranti, assorbimento lento e graduale.",
    features: [
      "Alto tenore proteico",
      "< 0,1 g lattosio / dose",
      "Assorbimento lento e graduale",
      "Gluten Free",
      "Dolcificato con steviolo glicosidi dalla stevia"
    ],
    nutritionalValues: [
      {
        name: "Proteine",
        amount: "21.6",
        unit: "g"
      },
      {
        name: "Carboidrati",
        amount: "1.5",
        unit: "g"
      },
      {
        name: "di cui zuccheri",
        amount: "0.8",
        unit: "g"
      },
      {
        name: "Grassi",
        amount: "0.5",
        unit: "g"
      },
      {
        name: "Sale",
        amount: "0.2",
        unit: "g"
      },
      {
        name: "Lattosio",
        amount: "< 0.1",
        unit: "g"
      }
    ],
    flavors: [
      {
        name: "Banana",
        color: "#FFE135",
        available: true
      },
      {
        name: "Cacao",
        color: "#6B4226",
        available: true
      },
      {
        name: "Fragola",
        color: "#FF9999",
        available: true
      },
      {
        name: "Vaniglia",
        color: "#F3E5AB",
        available: true
      }
    ],
    sizes: [
      {
        value: "800",
        unit: "g",
        priceRange: "50,99€"
      },
      {
        value: "1.5",
        unit: "kg",
        priceRange: "60,89€"
      },
      {
        value: "4",
        unit: "kg",
        priceRange: "89,32€"
      }
    ],
    keyIngredients: [
      "Caseine micellari del latte",
      "Vitamine aggiunte",
      "Edulcoranti (steviolo glicosidi dalla stevia)",
      "Aromi naturali"
    ],
    idealFor: [
      "Assunzione serale prima di dormire",
      "Mantenimento della massa muscolare",
      "Rilascio proteico prolungato"
    ],
    warnings: [
      "Contiene proteine del latte e soia",
      "Non adatto a persone con allergie ai derivati del latte",
      "Conservare in luogo fresco e asciutto"
    ],
    howToUse: "Mescolare 1 misurino (30g) con 180-240ml di acqua fredda. Assumere 1-2 porzioni al giorno, preferibilmente dopo l'allenamento o come spuntino proteico.",
    reviews: [
      {
        author: "Marco B.",
        rating: 5,
        comment: "Utilizzo queste proteine da anni e le trovo eccellenti. La solubilità è ottima e il gusto cioccolato è il mio preferito.",
        date: "2025-01-15"
      },
      {
        author: "Laura M.",
        rating: 4,
        comment: "Ottime proteine, ma il prezzo è un po' alto rispetto ad altre marche. La qualità però si sente!",
        date: "2025-02-20"
      },
      {
        author: "Giovanni L.",
        rating: 5,
        comment: "Perfette per il recupero post-workout, mi aiutano notevolmente nella fase di definizione muscolare.",
        date: "2025-03-10"
      }
    ],
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
    hasSpecialOffer: true,
    specialOfferText: "10% di sconto per l'acquisto di 2 o più confezioni",
    expertAdvice: "Le Gold Standard 100% Whey sono particolarmente indicate nel periodo post-allenamento per favorire il recupero muscolare, ma possono essere utilizzate anche come spuntino proteico durante la giornata.",
    inStoreOnly: false
  },
  {
    id: "impact-whey-isolate",
    name: "Impact Whey Isolate",
    brand: "MyProtein",
    category: "Proteine",
    images: [
      {
        src: "/attached_assets/WhatsApp Image 2025-04-28 at 7.08.38 AM.jpeg",
        alt: "Impact Whey Isolate - MyProtein",
        primary: true
      }
    ],
    description: "Proteine isolate del siero del latte con oltre 90% di contenuto proteico e basso contenuto di grassi e carboidrati.",
    longDescription: "Impact Whey Isolate fornisce proteine del siero del latte della più alta qualità con un contenuto proteico superiore al 90% e un contenuto minimo di grassi e carboidrati, ideale per chi cerca un integratore proteico puro.",
    features: [
      "90% di contenuto proteico",
      "Meno di 1g di grassi per porzione",
      "Meno di 1g di carboidrati per porzione",
      "Adatto a vegetariani",
      "Disponibile in numerosi gusti"
    ],
    sizes: [
      {
        value: "1",
        unit: "kg",
        priceRange: "30€-35€"
      },
      {
        value: "2.5",
        unit: "kg",
        priceRange: "65€-70€"
      }
    ],
    rating: 4.7,
    isNew: false,
    isBestSeller: false,
    hasSpecialOffer: false,
    inStoreOnly: false
  }
];

// Altri prodotti di esempio per altre categorie...
// export const aminoAcidProducts: Product[] = [...];
// export const preWorkoutProducts: Product[] = [...];