// Definizioni complete delle varianti per tutti i prodotti BigGimmy
export interface ProductVariant {
  flavor: string;
  size: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

// Funzione per formattare prezzi in formato europeo (virgola + €)
export const formatEuropeanPrice = (price: number | null | undefined): string => {
  if (!price || price <= 0) return "N/D";
  return `€${price.toFixed(2).replace('.', ',')}`;
};

// Funzione per ottenere il prezzo minimo di un prodotto
export const getMinimumPrice = (product: any): number | null => {
  // Controlla se il prodotto ha varianti definite
  const productVariants = getProductVariants(product);
  if (productVariants && productVariants.length > 0) {
    const variantPrices = productVariants
      .filter((variant: any) => variant.price && variant.price > 0)
      .map((variant: any) => variant.price);
    
    if (variantPrices.length > 0) {
      return Math.min(...variantPrices);
    }
  }

  // Prezzo minimo dal database
  if (product.min_price_cents && product.min_price_cents > 0) {
    return product.min_price_cents / 100;
  }

  // Prezzo base
  if (product.basePrice && product.basePrice > 0) {
    return product.basePrice / 100;
  }

  // Prezzo statico
  if (product.price && product.price > 0) {
    return parseFloat(product.price);
  }

  return null;
};

// Funzione per ottenere la variante predefinita di un prodotto
export const getDefaultVariant = (product: any): any => {
  // Controlla se il prodotto ha varianti definite
  const productVariants = getProductVariants(product);
  if (productVariants && productVariants.length > 0) {
    return productVariants[0]; // Ritorna la prima variante disponibile
  }

  // Se non ci sono varianti specifiche, usa i dati del prodotto stesso
  if (product.sizes && product.sizes.length > 0) {
    return product.sizes[0]; // Ritorna la prima size disponibile
  }

  // Fallback: crea una variante predefinita
  return {
    flavor: '',
    size: '',
    price: product.price || product.basePrice || 0,
    inStock: true
  };
};

export interface ProductWithVariants {
  productId: string;
  name: string;
  baseDescription: string;
  variants: ProductVariant[];
}

// Database completo delle varianti per i 10 prodotti identificati
export const productVariantsDatabase: { [key: string]: ProductWithVariants } = {
  // 1. BURN OUT
  "burn-out": {
    productId: "burn-out",
    name: "Burn Out",
    baseDescription:
      "Brucia grassi liquido con L-Carnitina e estratti vegetali",
    variants: [
      {
        flavor: "Lampone",
        size: "500ml",
        price: 24.9,
        originalPrice: 29.9,
        image: "/images/products/01-burn-out-lampone.jpg",
        inStock: true,
      },
      {
        flavor: "Limone",
        size: "500ml",
        price: 24.9,
        originalPrice: 29.9,
        image: "/images/products/02-burn-out-limone.jpg",
        inStock: true,
      },
    ],
  },

  // 2. BARRETTONE 2.0
  "barrettone-2-0": {
    productId: "barrettone-2-0",
    name: "Barrettone 2.0",
    baseDescription: "Barretta proteica ad alto contenuto energetico",
    variants: [
      {
        flavor: "Burro d'Arachidi",
        size: "70g",
        price: 4.30,
        image: "/images/products/03-barrettone-burro-arachidi.jpg",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "70g",
        price: 3.5,
        originalPrice: 4.0,
        image: "/images/products/04-barrettone-cacao.jpg",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "70g",
        price: 3.5,
        originalPrice: 4.0,
        image: "/images/products/05-barrettone-vaniglia.jpg",
        inStock: true,
      },
    ],
  },

  // 3. BIG BAR
  "big-bar": {
    productId: "big-bar",
    name: "Big Bar",
    baseDescription: "Barretta energetica di grande formato",
    variants: [
      {
        flavor: "Cocco",
        size: "80g",
        price: 4.19,
        image: "/images/products/06-big-bar-cocco.jpg",
        inStock: true,
      },
      {
        flavor: "Cookie Nocciola",
        size: "80g",
        price: 4.19,
        image: "/images/products/07-big-bar-cookie-nocciola.jpg",
        inStock: true,
      },
    ],
  },

  // 4. CARBO ENERGY PLUS
  "carbo-energy-plus": {
    productId: "carbo-energy-plus",
    name: "Carbo Energy Plus",
    baseDescription: "Barretta energetica con carboidrati a rilascio graduale",
    variants: [
      {
        flavor: "Albicocca",
        size: "40g",
        price: 2.3,
        image: "/images/products/08-carbo-energy-albicocca.jpg",
        inStock: true,
      },
      {
        flavor: "Frutti di Bosco",
        size: "40g",
        price: 2.2,
        originalPrice: 2.5,
        image: "/images/products/09-carbo-energy-frutti-bosco.jpg",
        inStock: true,
      },
      {
        flavor: "Agrumi",
        size: "40g",
        price: 2.2,
        originalPrice: 2.5,
        image: "/images/products/10-carbo-energy-agrumi.jpg",
        inStock: true,
      },
      {
        flavor: "Mela Verde",
        size: "40g",
        price: 2.2,
        originalPrice: 2.5,
        image: "/images/products/11-carbo-energy-mela-verde.jpg",
        inStock: true,
      },
    ],
  },

  // 5. FRUITFORCE
  fruitforce: {
    productId: "fruitforce",
    name: "FruitForce",
    baseDescription: "Gel energetico con frutta naturale e carboidrati",
    variants: [
      {
        flavor: "Fragola",
        size: "30g",
        price: 1.8,
        image: "/images/products/12-fruitforce-fragola.jpg",
        inStock: true,
      },
      {
        flavor: "Ananas",
        size: "30g",
        price: 2.8,
        originalPrice: 3.2,
        image: "/attached_assets/FRUITFORCE ANANAS_Fronte.jpg",
        inStock: true,
      },
    ],
  },


  // 7. ISO SOYA PREMIER
  "iso-soya": {
    productId: "iso-soya",
    name: "Iso Soya Premier",
    baseDescription: "Proteine isolate di soia premium",
    variants: [
      {
        flavor: "Vaniglia",
        size: "750g",
        price: 39.9,
        image: "/attached_assets/ISO-SOYA-SITO-300x411 (1).png",
        inStock: true,
      },
    ],
  },

  // 8. LIGHT PROTEIN BAR
  "light-protein-plus-bar": {
    productId: "light-protein-plus-bar",
    name: "Light Protein Bar",
    baseDescription: "Barretta proteica light a basso contenuto di zuccheri",
    variants: [
      {
        flavor: "Cheesecake",
        size: "45g",
        price: 3.20,
        image: "/images/products/16-light-protein-bar-cheesecake.jpg",
        inStock: true,
      },
      {
        flavor: "Caramello",
        size: "45g",
        price: 2.9,
        originalPrice: 3.4,
        image: "/images/products/17-light-protein-bar-caramello.jpg",
        inStock: true,
      },
    ],
  },

  // 9. MILK PROTEIN 90 MICELLAR CASEIN
  "milk-protein-90-micellar-casein": {
    productId: "milk-protein-90-micellar-casein",
    name: "Milk Protein 90 Micellar Casein",
    baseDescription: "Caseine micellari del latte ad alto titolo proteico",
    variants: [
      {
        flavor: "Banana",
        size: "750g",
        price: 53.99,
        image: "/attached_assets/immagine_1748632405654.png",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "750g",
        price: 50.99,
        originalPrice: 60.99,
        image: "/attached_assets/immagine_1748632469331.png",
        inStock: true,
      },
      {
        flavor: "Fragola",
        size: "750g",
        price: 50.99,
        originalPrice: 60.99,
        image: "/attached_assets/immagine_1748632483243.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "750g",
        price: 50.99,
        originalPrice: 60.99,
        image: "/attached_assets/immagine_1748632490073.png",
        inStock: true,
      },
    ],
  },

  // 10. TOP EggXellent Protein
  "top-eggxellent-protein": {
    productId: "top-eggxellent-protein",
    name: "TOP EggXellent Protein",
    baseDescription:
      "Proteine dell'uovo di alta qualità con amminoacidi essenziali",
    variants: [
      {
        flavor: "Cacao",
        size: "750g",
        price: 54.99,

        image:
          "/images/products/TOP EGGXELLENT PROTEIN_CACAO_Fronte_1749996078038.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Pasticciera",
        size: "750g",
        price: 54.99,
        image:
          "/images/products/Top_EggXellent_Protein_Crema_Pasticcera_Fronte_1749996078050.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Zabaione",
        size: "750g",
        price: 54.99,
        image:
          "/images/products/Top_EggXellent_Protein_Crema_Zabaione_Fronte_1749996078051.jpg",
        inStock: true,
      },
    ],
  },

  // 11. XXX Hydrolysed Protein 90
  "xxx-hydrolysed-protein-90": {
    productId: "xxx-hydrolysed-protein-90",
    name: "XXX Hydrolysed Protein 90",
    baseDescription:
      "Proteine idrolizzate ad alto assorbimento e biodisponibilità",
    variants: [
      {
        flavor: "Cacao",
        size: "750g",
        price: 57.99,
        originalPrice: 67.99,
        image:
          "/images/products/XXX HYDROLYSED 750 g Cacao Fronte_1749996348004.jpg",
        inStock: true,
      },
      {
        flavor: "Mokka",
        size: "750g",
        price: 57.99,
        originalPrice: 67.99,
        image:
          "/images/products/XXX HYDROLYSED 750 g MOkka Fronte_1749996348009.jpg",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "250g",
        price: 25.99,
        originalPrice: 29.99,
        image:
          "/images/products/XXX HYDROLYSED 250 g Cacao Fronte_1749996348000.jpg",
        inStock: true,
      },
    ],
  },

  // 12. WHEY PROTEIN 80
  "whey-protein-80": {
    productId: "whey-protein-80",
    name: "Whey Protein 80",
    baseDescription: "Proteine del siero del latte ultrafiltrate",
    variants: [
      {
        flavor: "Cacao",
        size: "250g",
        price: 16.99,
        image: "/attached_assets/nuove_foto/wheyghty-protein-80-250-g-cacao-bea8-500x500.webp",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "750g",
        price: 40.99,
        image: "/attached_assets/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Nocciola",
        size: "250g",
        price: 16.99,
        image: "/attached_assets/nuove_foto/wheyghty-protein-80-250-g-nocciola-c041.webp",
        inStock: true,
      },
      {
        flavor: "Nocciola",
        size: "750g",
        price: 40.99,
        image: "/attached_assets/WHEYGHTY PROTEIN 80 NOCCIOLA 750g_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Banana",
        size: "750g",
        price: 40.99,
        image: "/attached_assets/WHEYGHTY PROTEIN 80 GUSTO BANANA_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Cappuccino",
        size: "750g",
        price: 40.99,
        image: "/attached_assets/WHEYGHTY PROTEIN 80 CAPPUCCINO Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Cocco",
        size: "750g",
        price: 40.99,
        image: "/attached_assets/WHEYGHTY PROTEIN 80 COCCO Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Cacao & Menta",
        size: "400g",
        price: 21.69,
        image: "/attached_assets/WHEY PROTEIN 80_Cacao Menta_Fronte.jpg",
        inStock: true,
      },
    ],
  },

  // 13. WHEY PROTEIN 90
  "whey-protein-90": {
    productId: "whey-protein-90",
    name: "Whey Protein 90",
    baseDescription: "Proteine isolate del siero del latte ad alta purezza",
    variants: [
      {
        flavor: "Vaniglia",
        size: "750g",
        price: 53.99,
        image: "/images/products/WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Banana",
        size: "750g",
        price: 53.99,
        image: "/images/products/WHEY PROTEIN 90 Banana_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Fior di Latte",
        size: "750g",
        price: 53.99,
        image: "/images/products/WHEY PROTEIN 90 FIOR DI LATTE Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Nocciola",
        size: "750g",
        price: 53.99,
        image: "/images/products/WHEY PROTEIN 90_crema nocciola_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Natural",
        size: "750g",
        price: 53.99,
        image: "/images/products/WHEY PROTEIN 90_Natural_Fronte.jpg",
        inStock: true,
      },
    ],
  },


  // 15. PISTACCHIO CREMA PROTEICA
  "pistacchio-crema-proteica": {
    productId: "pistacchio-crema-proteica",
    name: "Pistacchio Crema Proteica",
    baseDescription:
      "Crema spalmabile proteica al pistacchio con vitamina E e inulina",
    variants: [
      {
        flavor: "Pistacchio",
        size: "250g",
        price: 12.99,
        originalPrice: 15.99,
        image:
          "/attached_assets/PROVA_INSERIMENTO_PRODOTTI_1750183617250.md_image_2.jpg",
        inStock: true,
      },
    ],
  },

  // 16. WPC 100% - WHY Sport
  "wpc-100": {
    productId: "wpc-100",
    name: "WPC 100%",
    baseDescription:
      "Proteine del siero di latte concentrate al 100% con alto valore biologico per la crescita muscolare",
    variants: [
      {
        flavor: "Cookies Cream",
        size: "2kg",
        price: 89.9,
        image: "/images/products/wpc-100-cookies-cream.png",
        inStock: true,
      },
      {
        flavor: "Yogurt Fragola",
        size: "2kg",
        price: 89.9,
        image: "/images/products/wpc-100-yogurt-fragola.png",
        inStock: true,
      },
      {
        flavor: "Choco Milk",
        size: "1kg",
        price: 49.9,
        image: "/images/products/wpc-100-choco-milk.png",
        inStock: true,
      },
      {
        flavor: "Yogurt Fragola",
        size: "1kg",
        price: 49.9,
        image: "/images/products/wpc-100-yogurt-fragola-busta.png",
        inStock: true,
      },
      {
        flavor: "Banana",
        size: "1kg",
        price: 49.9,
        image: "/images/products/wpc-100-banana.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Fondente",
        size: "1kg",
        price: 49.9,
        image: "/images/products/wpc-100-cioccolato-fondente.png",
        inStock: true,
      },
    ],
  },

  // 17. PERFECT 100% WHEY - WHY Sport
  "perfect-whey": {
    productId: "perfect-whey",
    name: "PERFECT 100% WHEY",
    baseDescription:
      "Proteine isolate del siero di latte premium con oltre il 90% di proteine pure",
    variants: [
      {
        flavor: "Neutro",
        size: "750g",
        price: 39.9,
        image: "/images/products/perfect-whey-neutro.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "750g",
        price: 39.9,
        image: "/images/products/perfect-whey-cioccolato.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "750g",
        price: 39.9,
        image: "/images/products/perfect-whey-vaniglia.png",
        inStock: true,
      },
      {
        flavor: "Pistacchio",
        size: "750g",
        price: 39.9,
        image: "/images/products/perfect-whey-pistacchio.png",
        inStock: true,
      },
      {
        flavor: "Neutro",
        size: "Barattolo",
        price: 39.9,
        image: "/images/products/perfect-whey-neutro-barattolo.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "Barattolo",
        price: 39.9,
        image: "/images/products/perfect-whey-cioccolato-barattolo.png",
        inStock: true,
      },
    ],
  },

  // BCAA Liquid Carbo+ - +WATT
  "bcaa-liquid-carbo-plus": {
    productId: "bcaa-liquid-carbo-plus",
    name: "BCAA Liquid Carbo+",
    baseDescription:
      "Aminoacidi ramificati liquidi con carboidrati per energia immediata",
    variants: [
      {
        flavor: "Limone",
        size: "60ml",
        price: 2.5,
        image: "/images/products/BCAA LIQUID CARBO_FRONTE_1750781953159.jpg",
        inStock: true,
      },
    ],
  },

  // BCAA Ride Gel+ - +WATT
  "bcaa-ride-gel-plus": {
    productId: "bcaa-ride-gel-plus",
    name: "BCAA Ride Gel+",
    baseDescription:
      "Gel energetico con aminoacidi ramificati per sport di resistenza",
    variants: [
      {
        flavor: "Tutti i Frutti",
        size: "50ml",
        price: 2.8,
        image:
          "/images/products/BCAA RIDE GEL GUSTO TUTTI I FRUTTI_Fronte_1750781953160.jpg",
        inStock: true,
      },
    ],
  },

  // BCAA+ 8:1:1 Polvere - +WATT
  "bcaa-plus-8-1-1-polvere": {
    productId: "bcaa-plus-8-1-1-polvere",
    name: "BCAA+ 8:1:1 Polvere",
    baseDescription:
      "Aminoacidi ramificati in rapporto 8:1:1 ricchi di leucina",
    variants: [
      {
        flavor: "Mela",
        size: "300g",
        price: 19.99,
        image: "/images/products/BCAA POLVERE 300g_Fronte_1750781953159.jpg",
        inStock: true,
      },
    ],
  },
};

// Varianti per prodotti vitamine
const vitaminVariants: Record<string, ProductVariant[]> = {
  "selenio-100-jamieson": [
    {
      flavor: "Naturale",
      size: "100 cpr",
      price: 15.9,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "calcio-citrato-d3-jamieson": [
    {
      flavor: "Naturale",
      size: "120 cpr",
      price: 31.90,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "licopene-jamieson": [
    {
      flavor: "Naturale",
      size: "60 cpr",
      price: 27.90,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "vita-vim-multivitaminico-jamieson": [
    {
      flavor: "Naturale",
      size: "90 cpr",
      price: 34.9,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "lutein-z-jamieson": [
    {
      flavor: "Naturale",
      size: "30 compresse",
      price: 25.90,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "spirulina-jamieson": [
    {
      flavor: "Naturale",
      size: "90 cps",
      price: 34.90,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "omega-3-select-mini-jamieson": [
    {
      flavor: "Naturale",
      size: "200 mini softgel",
      price: 39.9,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "omega-3-extra-jamieson": [
    {
      flavor: "Naturale",
      size: "100 softgel",
      price: 52.90,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "vitamina-c-masticabile-jamieson": [
    {
      flavor: "Arancia",
      size: "100 cpr",
      price: 28.9,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "vitamina-k2-d3-jamieson": [
    {
      flavor: "Naturale",
      size: "30 softgel",
      price: 24.9,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  // NUOVI 16 PRODOTTI VITAMINE AGGIUNTI - Sistema completo di varianti

  // Prodotti +WATT
  "sali-performance-electrolyte": [
    {
      flavor: "Arancia",
      size: "600g",
      price: 17,
      image: "/images/products/SALI PERFORMANCE_Arancia_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "600g",
      price: 17,
      image: "/images/products/SALI PERFORMANCE_Limone_Fronte.jpg",
      inStock: true,
    },
  ],
  triboost: [
    {
      flavor: "Naturale",
      size: "100 capsule",
      price: 28,
      image: "/attached_assets/nuove_foto/TRIBOOST_Fronte.jpg",
      inStock: true,
    },
  ],
  "vitamine-minerals-watt": [
    {
      flavor: "Naturale",
      size: "30 compresse",
      price: 12,
      image: "/attached_assets/nuove_foto/VITAMINS_MINERALS_30_Compresse_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Naturale",
      size: "120 compresse",
      price: 28,
      image:
        "/attached_assets/nuove_foto/VITAMINS MINERALS STRONG FORMULA 120 compresse Fronte.jpg",
      inStock: true,
    },
  ],

  // Prodotti Premier
  "vital-energy": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 33,
      image: "/images/products/VITAL-ENERGY-300x411.png",
      inStock: true,
    },
  ],
  "vitamin-d3-2000-premier": [
    {
      flavor: "Naturale",
      size: "120 compresse",
      price: 19,
      image: "/images/products/Vitamin-D3-2000-300x411 (1).png",
      inStock: true,
    },
  ],

  // Prodotti WHY Sport
  "adrenaline-agrumi-pre-workout": [
    {
      flavor: "Cola",
      size: "10 bustine",
      price: 19.9,
      image: "/attached_assets/nuove_foto/W063_singolo.png",
      inStock: true,
    },
  ],
  "magnesio-potassio-sport": [
    {
      flavor: "Agrumi",
      size: "300g",
      price: 9.9,
      image: "/attached_assets/nuove_foto/W412_singolo.png",
      inStock: true,
    },
  ],
  "drenante-why-sport": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 25.90,
      image: "/attached_assets/nuove_foto/WN122_singolo.png",
      inStock: true,
    },
  ],
  "vitamina-b12-1000": [
    {
      flavor: "Naturale",
      size: "80 compresse",
      price: 19.9,
      image: "/attached_assets/nuove_foto/WN234_singolo.png",
      inStock: true,
    },
  ],
  "refuel-recovery": [
    {
      flavor: "Agrumi",
      size: "25g",
      price: 2.5,
      image: "/attached_assets/nuove_foto/W172_box.png",
      inStock: true,
    },
  ],
  "testo-xplode": [
    {
      flavor: "Naturale",
      size: "90 capsule",
      price: 34.9,
      image: "/attached_assets/nuove_foto/W297_singolo.png",
      inStock: true,
    },
  ],
  "ps200-fosfatidilserina": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      price: 39.9,
      image: "/attached_assets/nuove_foto/W386_singolo.png",
      inStock: true,
    },
  ],

  // Prodotti Volchem
  "vitamina-d3-800-iu-volchem": [
    {
      flavor: "Naturale",
      size: "100 compresse",
      price: 9.9,
      image: "/attached_assets/nuove_foto/Vitamin D 800 IU 100 cpr web.jpg",
      inStock: true,
    },
  ],
  "vitamina-d3-2000-iu-volchem": [
    {
      flavor: "Naturale",
      size: "100 compresse",
      price: 11.99,
      image: "/attached_assets/nuove_foto/Vitamin D 2000 IU 60 cpr.jpg",
      inStock: true,
    },
  ],
  "magnesio-tripla-azione-jamieson": [
    {
      flavor: "Neutro",
      size: "90 compresse",
      price: 25.9,
      image: "/images/products/9254_singolo_1750371497333.png",
      inStock: true,
    },
  ],
  "ashwagandha-jamieson": [
    {
      flavor: "Neutro",
      size: "60 compresse",
      price: 35.9,
      image: "/attached_assets/nuove_foto/9848_singolo.png",
      inStock: true,
    },
  ],
  "alaform-800-premier": [
    {
      flavor: "Neutro",
      size: "60 compresse",
      price: 34.90,
      image: "/images/products/ALAFORM-WEBSITE-1-300x411 (1)_1750371497334.png",
      inStock: true,
    },
  ],

  // SEZIONE PROTEINE - 7 prodotti con varianti complete
  "wpc-100": [
    {
      flavor: "Banana",
      size: "1kg",
      price: 49.9,
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Choco Milk",
      size: "1kg",
      price: 49.9,
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Fondente",
      size: "1kg",
      price: 49.9,
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Cookies Cream",
      size: "2kg",
      price: 89.9,
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Yogurt Fragola",
      size: "1kg",
      price: 49.9,
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Yogurt Fragola",
      size: "2kg",
      price: 89.9,
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
  ],
  "perfect-100-whey": [
    {
      flavor: "Pesca",
      size: "450g",
      price: 35.9,
      image:
        "/attached_assets/nuove_foto/pesca_450g .png",
      inStock: true,
    },
    {
      flavor: "Cookies & Cream",
      size: "450g",
      price: 35.9,
      image:
        "/attached_assets/nuove_foto/cookies 450g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato al Latte",
      size: "450g",
      price: 35.9,
      image:
        "/attached_assets/nuove_foto/cioccolato_latte_450g.png",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "900g",
      price: 65.9,
      image:
        "/attached_assets/nuove_foto/vaniglia_900g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato al Latte",
      size: "900g",
      price: 65.9,
      image:
        "/attached_assets/nuove_foto/cioccolate_latte_900g.png",
      inStock: true,
    },
    {
      flavor: "Pistacchio",
      size: "900g",
      price: 65.9,
      image:
        "/attached_assets/nuove_foto/pistacchio 900g.png",
      inStock: true,
    },
  ],
  "essential-100-whey": [
    {
      flavor: "Cacao",
      size: "900g",
      price: 54.9,
      image:
     "/attached_assets/nuove_foto_ancora/W251_essential-100-whey-900-g-cacao_singolo.png",
      inStock: true,
    },
  ],
  "perfect-blend-90": [
    {
      flavor: "Cacao",
      size: "750g",
      price: 59.9,
      image:
        "/attached_assets/nuove_foto/blend_cacao.png",
      inStock: true,
    },
    {
      flavor: "Banana & Vaniglia",
      size: "750g",
      price: 59.9,
      image:
        "/attached_assets/nuove_foto/belnd_vnaiglia.png",
      inStock: true,
    },
  ],
  "top-100-xp-cacao": [
    {
      flavor: "Cacao",
      size: "250g",
      price: 25.99,
      image: 
        "/attached_assets/nuove_foto/TOP 100 XP_CACAO_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "750g",
      price: 56.99,
      image: 
        "/attached_assets/nuove_foto_ancora/a50047.jpg",
      inStock: true,
    },
  ],
  "vegetal-100-protein": [
    {
      flavor: "Cacao",
      size: "750g",
      price: 41.9,
      image:
        "/attached_assets/nuove_foto/W090_singolo.png",
      inStock: true,
    },
  ],
  "hydrolyzed-100-whey": [
    {
      flavor: "Fragola Banana",
      size: "900g",
      price: 79.9,
      image:
        "/attached_assets/nuove_foto/W435_hydrolyzed-104-dh4-fragola-banana-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Wafer Nocciola",
      size: "900g",
      price: 79.9,
      image:
        "/attached_assets/nuove_foto/W433_hydrolyzed-104-dh4-wafer-nocciola-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "900g",
      price: 79.9,
      image:
        "/attached_assets/nuove_foto/W431_hydrolyzed-104-dh4-vaniglia-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cookies & Cream",
      size: "900g",
      price: 79.9,
      image:
        "/attached_assets/nuove_foto/W432_hydrolyzed-104-dh4-cookie-cream-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "900g",
      price: 79.9,
      image:
        "/attached_assets/nuove_foto/W430_hydrolyzed-104-dh4-ciocc.-900-g_singolo.png",
      inStock: true,
    },
  ],

  // NUOVI 5 PRODOTTI PROTEINE - Varianti complete
  "hydro90-bv-104": [
    {
      flavor: "Vaniglia",
      size: "1.8kg",
      price: 109.9,
      image: "/images/products/hydro90-vaniglia-18kg.png",
      inStock: true,
    },
    {
      flavor: "Yogurt Fragola",
      size: "900g",
      price: 84.90,
      image: "/images/products/hydro90-yogurt-fragola-900g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Fondente",
      size: "900g",
      price: 84.90,
      image: "/images/products/hydro90-cioccolato-fondente-900g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "900g",
      price: 84.90,
      image: "/images/products/hydro90-cioccolato-900g.png",
      inStock: true,
    },
    {
      flavor: "Crema Biscotto",
      size: "900g",
      price: 84.90,
      image: "/images/products/hydro90-crema-biscotto-900g.png",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "900g",
      price: 84.90,
      image: "/images/products/hydro90-vaniglia-900g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "1.8kg",
      price: 109.9,
      image: "/images/products/hydro90-cioccolato-18kg.png",
      inStock: true,
    },
    {
      flavor: "Wafer Nocciola",
      size: "900g",
      price: 84.90,
      image: "/images/products/hydro90-wafer-nocciola-900g.png",
      inStock: true,
    },
  ],
  "vegan-isopea-90": [
    {
      flavor: "Cioccolato",
      size: "700g",
      price: 36.9,
      image: "/images/products/vegan-isopea-90-cioccolato-700g.png",
      inStock: true,
    },
  ],
  "say-protein-221": [
    {
      flavor: "Cacao",
      size: "750g",
      price: 41.99,
      image: "/images/products/say-protein-221-cacao-750g.jpg",
      inStock: true,
    },
    {
      flavor: "Nocciola",
      size: "750g",
      price: 41.99,
      image: "/images/products/say-protein-221-nocciola-750g.jpg",
      inStock: true,
    },
  ],
  "smart-protein-cacao": [
    {
      flavor: "Cacao",
      size: "320ml",
      price: 3.9,
      image: "/images/products/smart-protein-cacao-320ml.jpg",
      inStock: true,
    },
  ],
  "perfect-mass": [
    {
      flavor: "Cacao Biscuit",
      size: "1600g",
      price: 59.9,
      image: "/images/products/perfect-mass-cacao-biscuit-1600g.png",
      inStock: true,
    },
  ],

  // SEZIONE AMINOACIDI - 12 prodotti con varianti complete (IMMAGINI CORRETTE)
  "aminoacidi-plus": [
    {
      flavor: "Arancia",
      size: "100 compresse",
      price: 25.99,
      image: "/images/products/AMINOACIDI Arancia_Fronte_1750948719180.jpg",
      inStock: true,
    },
  ],
  "aminoacidi-essenziali-plus-polvere": [
    {
      flavor: "Cola",
      size: "300g",
      price: 58.99,
      image:
        "/images/products/AMINOACIDI ESSENZIALI POLVERE_cola_Fronte_1750948719181.jpg",
      inStock: true,
    },
    {
      flavor: "Tropical",
      size: "300g",
      price: 58.99,
      image:
        "/images/products/Aminoacidi Essenziali+ Polvere Tropical FRONTE new_1750948719181.jpg",
      inStock: true,
    },
  ],
  "aminotool-eaa": [
    {
      flavor: "Limone",
      size: "252g",
      price: 48.99,
      image:
        "/images/products/Aminotool EAA 252g lemon-lime web_1750948719182.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "252g",
      price: 48.99,
      image: "/images/products/Aminotool eaa 252g orange web_1750948719183.jpg",
      inStock: true,
    },
  ],
  argin: [
    {
      flavor: "Neutro",
      size: "300 compresse",
      price: 44.29,
      image: "/images/products/Argin 300 cpr web_1750948719184.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "120 compresse",
      price: 24.99,
      image: "/images/products/Argin arginina 120 cpr web_1750948719184.jpg",
      inStock: true,
    },
  ],
  "arginina-plus-complex-capsule": [
    {
      flavor: "Neutro",
      size: "90 capsule",
      price: 18.99,
      image:
        "/images/products/ARGININA COMPLEX CAPSULE_Fronte_1750948719185.jpg",
      inStock: true,
    },
  ],
  "bcaa-plus-8-1-1-nuovo": [
    {
      flavor: "Arancia",
      size: "100g",
      price: 19.99,
      image:
        "/images/products/BCAA LEUCING LOADING_arancia_Fronte_1750948719186.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "300g",
      price: 47.99,
      image: "/images/products/BCAA POLVERE_arancia_Fronte_1750948719187.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      price: 47.9,
      image: "/images/products/BCAA LEUCING LOADING_Fronte_1750948719186.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "50 compresse",
      price: 15.99,
      image: "/images/products/BCAA_50Compresse_Fronte_1750948719188.jpg",
      inStock: true,
    },
  ],
  "d-glucosio": [
    {
      flavor: "Neutro",
      size: "1.5kg",
      price: 18.99,
      image: "/images/products/D-GLUCOSIO1-5KG_FRONTE_1750948719188.jpg",
      inStock: true,
    },
  ],
  "glutammina-plus-polvere": [
    {
      flavor: "Neutro",
      size: "100g",
      price: 16.99,
      image:
        "/attached_assets/nuove_foto_ancora/glutammina-100-g-6db1.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "300g",
      price: 34.99,
      image:
        "/attached_assets/nuove_foto_ancora/glutammina-300-g-3517.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      price: 27.99,
      image:
        "/attached_assets/nuove_foto_ancora/glutammina-7cd0.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "120 compresse",
      price: 20.99,
      image:
        "/attached_assets/nuove_foto_ancora/glutammina-120-compresse-c7e3.webp",
      inStock: true,
    },
  ],
  "hard-beta-alanine": [
    {
      flavor: "Neutro",
      size: "150 compresse",
      price: 31.99,
      image:
        "/images/products/HARD-BETA-ALANINE-SITO-300x411_1750948719191.png",
      inStock: true,
    },
  ],
  "high-bcaa-2-1-1": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      price: 21.99,
      image: "/images/products/HIGH-BCAA-SITO-300x411_1750948719191.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      price: 37.99,
      image: "/images/products/HIGH-BCAA-SITO-300x411_1750948719191.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "400 compresse",
      price: 65.99,
      image: "/images/products/HIGH-BCAA-SITO-300x411_1750948719191.png",
      inStock: true,
    },
  ],

  // NUOVI 9 PRODOTTI AMINOACIDI - varianti complete
  "pocket-carnitine": [
    {
      flavor: "Frutti di Bosco",
      size: "50ml",
      price: 4.99,
      image:
        "/images/products/POCKET CARNITINE_Diagonale fronte_1750951382268.jpg",
      inStock: true,
    },
  ],
  "rm1-bcaa-8-1-1-recovery-mix": [
    {
      flavor: "Arancia",
      size: "25g",
      price: 2.19,
      image:
        "/images/products/RM1 New Formula (BCAA 8.1.1)  25 g ARANCIA FRONTE_1750951382268.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "500g",
      price: 29.99,
      image:
        "/images/products/RM1 New Formula (BCAA 8.1.1)  500 g arancia FRONTE_1750951382269.jpg",
      inStock: true,
    },
    {
      flavor: "Sprint Apple",
      size: "500g",
      price: 29.99,
      image:
        "/attached_assets/nuove_foto_ancora/r-m-1-bcaa-811-recovery-mix-sprint-apple-500-g-f1ee.webp",
      inStock: true,
    },
  ],
  "bcaa-1000-b6": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      price: 18.9,
      image: "/images/products/W001_singolo_1750951382273.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      price: 29.9,
      image: "/images/products/W001_singolo_1750951382273.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "300 compresse",
      price: 39.9,
      image: "/images/products/W001_singolo_1750951382273.png",
      inStock: true,
    },
  ],
  "glutammina-pure": [
    {
      flavor: "Neutro",
      size: "250g",
      price: 28.9,
      image: "/images/products/W012_singolo_1750951382275.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      price: 45.9,
      image: "/images/products/W012_singolo_1750951382275.png",
      inStock: true,
    },
  ],
  "bcaa-supreme-4-1-1": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      price: 19.80,
      image: "/images/products/W176_singolo_1750951382276.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      price: 35.90,
      image: "/images/products/W176_singolo_1750951382276.png",
      inStock: true,
    },
  ],
  "essenziali-zero-carb": [
    {
      flavor: "Mela Lime",
      size: "240g",
      price: 35.9,
      image: "/images/products/W423_singolo_1750951382277.png",
      inStock: true,
    },
    {
      flavor: "Tè alla Pesca",
      size: "240g",
      price: 35.9,
      image: "/images/products/W247_singolo_1750951382277.png",
      inStock: true,
    },
  ],
  "essential-amino-9-3": [
    {
      flavor: "Neutro",
      size: "400 compresse",
      price: 64.90,
      image:
        "/images/products/2b3a554e-3dbf-4e64-aaa1-d3ae38efe251_1750951408616.png",
      inStock: true,
    },
    {
      flavor: "Agrumi",
      size: "480g",
      price: 64.90,
      image:
        "/images/products/2b3a554e-3dbf-4e64-aaa1-d3ae38efe251_1750951408616.png",
      inStock: true,
    },
    {
      flavor: "Cola Lemon",
      size: "480g",
      price: 64.90,
      image:
        "/images/products/2b3a554e-3dbf-4e64-aaa1-d3ae38efe251_1750951408616.png",
      inStock: true,
    },
  ],

  // === NUOVI PRODOTTI CREATINA ===
  "creanized-creatina-monoidrato": [
    {
      flavor: "Neutro",
      size: "250g",
      price: 55,
      image:
        "/images/products/CREANIZED_CRETINA_MONOIDRATO_Fronte_1751037655150.jpg",
      inStock: true,
    },
  ],
  "creatina-extra-gold": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      price: 25,
      image:
        "/images/products/CREATINA COMPRESSE EXTRA GOLD_Fronte (2)_1751037655152.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "300 compresse",
      price: 64,
      image:
        "/images/products/CREATINA Compresse Extra Gold_Fronte_1751037655153.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "100g",
      price: 18,
      image:
        "/images/products/CREATINA_Extra Gold_100g_Fronte_1751037655153.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "350g",
      price: 55,
      image:
        "/images/products/Creatina+ polvere extragold 350 FRONTE_1751037655154.jpg",
      inStock: true,
    },
  ],
  "gluco-creatina": [
    {
      flavor: "Arancia",
      size: "210 compresse",
      price: 24,
      image:
        "/images/products/GLUCO CREATINA Compresse_Fronte_1751037744108.jpg",
      inStock: true,
    },
  ],
  "creatina-platinum": [
    {
      flavor: "Neutro",
      size: "300g",
      price: 37.9,
      image: "/images/products/W013_singolo_1751037744109.png",
      inStock: true,
    },
  ],
  "creatina-platinum-1300": [
    {
      flavor: "Neutro",
      size: "120 compresse",
      price: 25.9,
      image: "/images/products/W026_singolo_1751037744110.png",
      inStock: true,
    },
  ],
  "creatina-200-mesh": [
    {
      flavor: "Neutro",
      size: "200g",
      price: 19.9,
      image: "/images/products/W166_singolo_1751037744110.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      price: 39.9,
      image: "/images/products/W269_singolo_1751037744111.png",
      inStock: true,
    },
  ],

  // === NUOVI PRODOTTI ACCESSORI ===
  "epilact-sport-protezione-unghie": [
    {
      flavor: "Neutro",
      size: "S",
      price: 13.98,
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "M",
      price: 13.98,
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "L",
      price: 13.98,
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "XL",
      price: 13.98,
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
  ],
  "physiostrap-ski": [
    {
      flavor: "Neutro",
      size: "S",
      price: 68.50,
      image: "/images/products/EP973147061_singolo_1751038145714.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "M",
      price: 68.50,
      image: "/images/products/EP973147061_singolo_1751038145714.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "L",
      price: 68.50,
      image: "/images/products/EP973147061_singolo_1751038145714.png",
      inStock: true,
    },
  ],
  "borraccia-why-sport-500ml": [
    {
      flavor: "Nero",
      size: "500ml",
      price: 4.9,
      image: "/images/products/WSX244_singolo_1751038145715.png",
      inStock: true,
    },
  ],
  "borsone-why-sport": [
    {
      flavor: "Nero/Rosso",
      size: "Standard",
      price: 34.9,
      image: "/images/products/WSX248_singolo_1751038145715.png",
      inStock: true,
    },
  ],
  "sport-shaker-why-sport": [
    {
      flavor: "Rosso",
      size: "600ml",
      price: 4.50,
      image: "/images/products/WSX276_singolo_1751038145717.png",
      inStock: true,
    },
  ],
  "borraccia-sport-500ml": [
    {
      flavor: "Rosso",
      size: "500ml",
      price: 2.59,
      image: "/images/products/WSX368_singolo_1751038145719.png",
      inStock: true,
    },
  ],

  // === NUOVI PRODOTTI ABBIGLIAMENTO ===

  "top-donna-why-sport": [
    {
      flavor: "Nero",
      size: "S",
      price: 18.90,
      image: "/images/products/WSX179_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero",
      size: "M",
      price: 18.90,
      image: "/images/products/WSX179_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero",
      size: "L",
      price: 18.90,
      image: "/images/products/WSX179_singolo_1751038922384.png",
      inStock: true,
    },
  ],
  "short-donna-why-sport": [
    {
      flavor: "Nero/Grigio",
      size: "S",
      price: 18.90,
      image: "/images/products/WSX182_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero/Grigio",
      size: "M",
      price: 18.90,
      image: "/images/products/WSX182_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero/Grigio",
      size: "L",
      price: 18.90,
      image: "/images/products/WSX182_singolo_1751038922384.png",
      inStock: true,
    },
  ],
};

// === BARRETTE ENERGETICHE - VARIANTI ===
export const energyBarVariants: { [key: string]: ProductVariant[] } = {
  // 1. PROMEAL PROTEIN SNACK 38%
  "promeal-protein-snack-38": [
    {
      flavor: "Vaniglia",
      size: "40g",
      price: 2.6,
      image:
        "/images/products/Promeal Snacks bianco 150x250 web_1751034029688.jpg",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "40g",
      price: 2.6,
      image:
        "/images/products/Promeal Snacks dark chocolate 150x250 web_1751034029689.jpg",
      inStock: true,
    },
  ],

  // 2. PROTEIN CREAM
  "protein-cream": [
    {
      flavor: "Cacao",
      size: "250g",
      price: 10.9,
      originalPrice: 12.9,
      image:
        "/images/products/95079ee6-5454-441a-8659-f2945312edc5_1751034033069.png",
      inStock: true,
    },
    {
      flavor: "Gianduia",
      size: "250g",
      price: 10.9,
      originalPrice: 12.9,
      image:
        "/images/products/a996669e-bdb0-4f55-9cb5-36617c7cff92_1751034034165.png",
      inStock: true,
    },
  ],

  // 3. VEGGIE CIOK
  "veggie-ciok": [
    {
      flavor: "Albicocca",
      size: "40g",
      price: 2.4,
      originalPrice: 2.8,
      image:
        "/images/products/Veggie Ciok  40 g albicocca FRONTE_1751034075963.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "40g",
      price: 2.4,
      originalPrice: 2.8,
      image:
        "/images/products/Veggie Ciok  40 g arancia FRONTE_1751034075964.jpg",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "40g",
      price: 2.4,
      originalPrice: 2.8,
      image:
        "/images/products/b7271d4e-bdcd-4b51-a1a1-92cd66503063_1751034089990.jpg",
      inStock: true,
    },
  ],

  // 4. PERFECT BAR 50%
  "perfect-bar-50": [
    {
      flavor: "Cioccolato e Latte",
      size: "50g",
      price: 3.2,
      originalPrice: 3.7,
      image: "/images/products/W462_singolo_1751034154888.png",
      inStock: true,
    },
  ],

  // 5. ENERGY FUEL
  "energy-fuel": [
    {
      flavor: "Caramello Salato",
      size: "40g",
      price: 2.3,
      originalPrice: 2.7,
      image: "/images/products/W468_singolo_1751034332990.png",
      inStock: true,
    },
  ],

  // 6. CREMA DI ARACHIDI PEANUT BUTTER
  "crema-di-arachidi-peanut-butter": [
    {
      flavor: "Crunchy",
      size: "350g",
      price: 7.90,
      image: "/images/products/WN054_singolo_1751034533751.png",
      inStock: true,
    },
  ],

  // 7. WAFER ZERO
  "wafer-zero": [
    {
      flavor: "Cacao e Cioccolato Bianco",
      size: "35g",
      price: 2.9,
      originalPrice: 3.4,
      image: "/images/products/WN160_singolo_1751034567870.png",
      inStock: true,
    },
    {
      flavor: "Cacao e Cioccolato Bianco",
      size: "24pz",
      price: 54.9,
      originalPrice: 64.9,
      image: "/images/products/WN160_box_1751034581713.png",
      inStock: true,
    },
  ],

  // === NUOVI 8 PRODOTTI BARRETTE ENERGETICHE ===
  // 1. Pancake Proteico
  "pancake-proteico-why-sport": [
    {
      flavor: "Originale",
      size: "1kg",
      price: 34.9,
      image: "/images/products/W203_singolo_1751035188900.png",
      inStock: true,
    },
  ],

  // 2. 45 Protein Bar
  "45-protein-bar": [
    {
      flavor: "Cookies Crisp",
      size: "45g",
      price: 2.6,
      image:
        "/attached_assets/nuove_foto/W237_45_Protein_Bar_cookies_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cookies Crisp",
      size: "24pz",
      price: 33.99,
      originalPrice: 39.99,
      image: "/attached_assets/nuove_foto/W237_box.png",
      inStock: true,
    },
  ],

  // 3. 75 Protein Bar
  "75-protein-bar": [
    {
      flavor: "Frutti di Bosco",
      size: "75g",
      price: 3.9,
      originalPrice: 4.5,
      image:
        "/images/products/W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png",
      inStock: true,
    },
    {
      flavor: "Frutti di Bosco",
      size: "24pz",
      price: 54.9,
      originalPrice: 64.9,
      image: "/images/products/W240_box_1751035219983.png",
      inStock: true,
    },
  ],

  // 4. Crema di Arachidi Iperproteica
  "crema-di-arachidi-iperproteica": [
    {
      flavor: "Crunchy",
      size: "350g",
      price: 9.9,
      originalPrice: 11.9,
      image: "/images/products/W330_singolo_1751035294681.png",
      inStock: true,
    },
  ],


  // === NUOVI 9 PRODOTTI ===

  // 2. Powergel


  // 5. Avena Farina Istantanea
  "avena-farina-istantanea": [
    {
      flavor: "Cappuccino",
      size: "1360g",
      price: 15.90,
      image: "/images/products/WN043_singolo_1751035979180.png",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "1360g",
      price: 15.90,
      image: "/images/products/WN043_singolo_1751035979180.png",
      inStock: true,
    },
  ],



  // 8. Promeal Energetica
  "promeal-energetica": [
    {
      flavor: "Mandorle",
      size: "40g",
      price: 2.1,
      image: "/images/products/Promeal Energetica 40g_1751036384519.jpg",
      inStock: true,
    },
    {
      flavor: "Mandorle",
      size: "25pz",
      price: 52.5,
      image:
        "/images/products/Promeal Energetica barrette 25x40g web_1751036384521.jpg",
      inStock: true,
    },
  ],

  // 9. Promeal 50% Protein Bar
  "promeal-50-protein-bar": [
    {
      flavor: "Yogurt",
      size: "20pz",
      price: 70.99,
      image: "/images/products/Promeal Energetica 40g_1751036384519.jpg",
      inStock: true,
    },
    {
      flavor: "Cocco",
      size: "20pz",
      price: 70.99,
      image: "/images/products/Promeal Energetica 40g_1751036384519.jpg",
      inStock: true,
    },
  ],

  // === VITAMINE/MINERALI/ANTIOSSIDANTI - VARIANTI ===
  "ashwagandha-plus": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 19.99,
      image: "/images/products/ashwagandha-2-1-300x548 (1)_1750781953158.png",
      inStock: true,
    },
  ],

  "ashwagandha-pura-watt": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 24,
      image: "/attached_assets/nuove_foto/ASHWAGANDHA PURA_Fronte.jpg",
      inStock: true,
    },
  ],

  "astaxantina-softgel": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      price: 34,
      image: "/images/products/astaxantina-softgel-advance-care.jpg",
      inStock: true,
    },
  ],

  "berberina-plus": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      price: 32,
      image: "/attached_assets/nuove_foto/BERBERINA 60 CAPSULE_FRONTE.jpg",
      inStock: true,
    },
  ],

  "collagene-silicio-stabilizzato": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 34,
      image: "/attached_assets/nuove_foto/Collagene_Fronte.jpg",
      inStock: true,
    },
  ],

  "drenante-watt": [
    {
      flavor: "Naturale",
      size: "500ml",
      price: 15.99,
      image: "/attached_assets/nuove_foto/WN122_singolo.png",
      inStock: true,
    },
  ],
  "fibra-watt": [
    {
      flavor: "Naturale",
      size: "300g",
      price: 13,
      image: "/attached_assets/nuove_foto/FIBRA WATT_Fronte.jpg",
      inStock: true,
    },
  ],

  "hard-b-life-complex": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 15.90,
      image: "/attached_assets/nuove_foto/HARD-B-LIFE-COMPLEX-SITO-300x411 (1).png",
      inStock: true,
    },
  ],

  "hard-dren-1000": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 34.90,
      image: "/attached_assets/nuove_foto/HARD-DREN-SITO-300x411.png",
      inStock: true,
    },
  ],

  "hard-vitamin-complex": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 22.99,
      image: "/attached_assets/nuove_foto/HARD-VITAMIN-SITO-300x411 (1).png",
      inStock: true,
    },
  ],

  "hepax-forte": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 33,
      image: "/attached_assets/nuove_foto/HEPAX-FORTE-300x411 (1).png",
      inStock: true,
    },
  ],

  "joint-flex-d3-plus": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      price: 39,
      image: "/attached_assets/nuove_foto/JOINT-FLEX-sito-300x411.png",
      inStock: true,
    },
  ],

  "korean-red-ginseng": [
    {
      flavor: "Naturale",
      size: "100 compresse",
      price: 39.99,
      image: "/images/products/korean-red-ginseng-5th-image.png",
      inStock: true,
    },
  ],

  "melatonine-plus": [
    {
      flavor: "Naturale",
      size: "90 compresse",
      price: 18,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  // quantità

  "omega-3-egq": [
    {
      flavor: "Naturale",
      size: "180 capsule",
      price: 34,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  "omega-3-xc-40-20-gold": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      price: 33,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  "sali-activator-1-0-8": [
    {
      flavor: "Arancia Rossa",
      size: "600g",
      price: 19.90,
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
    {
      flavor: "Fragola Banana",
      size: "600g",
      price: 18.99,
      image: "/attached_assets/nuove_foto/SALI ACTIVATOR FRAGOLA E BANANA_Fronte.jpg",
      inStock: true,
    },
  ],

  "sali-plus-electrolyte-pocket-minerals": [
    {
      flavor: "Arancia",
      size: "40g",
      price: 1.30,
      image: "/attached_assets/nuove_foto/ELECTROLYTE_Arancia_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "40g",
      price: 1.30,
      image: "/attached_assets/nuove_foto/ELECTROLYTE_Limone_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "18 bustine",
      price: 23.40,
      image: "/attached_assets/nuove_foto_ancora/sali-electrolyte-pocket-minerals-arancia-box-30-bustine-b8a0.webp",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "18 bustine",
      price: 23.40,
      image: "/attached_assets/nuove_foto_ancora/sali-electrolyte-pocket-minerals-limone-box-30-bustine-882f.webp",
      inStock: true,
    },
  ],

  // === PRE-WORKOUT - VARIANTI ===
  "adrenaline-agrumi-pre-workout": [
    {
      flavor: "Agrumi",
      size: "250g",
      price: 29.99,
      image: "/images/products/W063_singolo_1750778570187.png",
      inStock: true,
    },
  ],

  "ready-pre-workout": [
    {
      flavor: "Naturale",
      size: "420g",
      price: 24,
      image: "/images/products/Ready 420g preworkout web_1750780343043.jpg",
      inStock: true,
    },
  ],

  // === ENERGETICI - VARIANTI ===
  "complex-carbs-advanced-ratio": [
    {
      flavor: "Limone",
      size: "1 bustina",
      price: 1.80,
      image: "/images/products/COMPLEX CARBS_Fronte_1750781953162.jpg",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "15 bustine",
      price: 27,
      image: "/attached_assets/nuove_foto_ancora/complex-carbs-advanced-ratio-108-singola-bustina-aae3.webp",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "600g",
      price: 18,
      image: "/attached_assets/nuove_foto_ancora/complex-carbs-advanced-ratio-108-d1d8.webp",
      inStock: true,
    },
  ],

  "liquid-carbo-flash-80": [
    {
      flavor: "Frutti di Bosco",
      size: "80ml",
      price: 3.20,
      image:
        "/images/products/Liquid Carbo+ FLASH80 Frutti di bosco FRONTE_1750780343039.jpg",
      inStock: true,
    },
  ],

  "refuel-recovery": [
    {
      flavor: "Naturale",
      size: "750g",
      price: 32.99,
      image: "/images/products/W172_box_1750778570187.png",
      inStock: true,
    },
  ],
};

// Funzione helper per ottenere le varianti di un prodotto dal database
export function getProductFromDatabase(
  productId: string,
): ProductWithVariants | null {
  return productVariantsDatabase[productId] || null;
}

// Funzione principale per ottenere array di varianti (per ProductVariantSelector)
export const getProductVariantsList = (
  productSlug: string,
): ProductVariant[] => {
  // Prima controlla le varianti vitamine e aminoacidi
  if (vitaminVariants[productSlug]) {
    return vitaminVariants[productSlug];
  }

  // Poi controlla le varianti barrette energetiche
  if (energyBarVariants[productSlug]) {
    return energyBarVariants[productSlug];
  }

  // Infine controlla se il prodotto ha varianti nel sistema database
  if (productVariantsDatabase[productSlug]) {
    return productVariantsDatabase[productSlug].variants;
  }

  return [];
};

// Funzione helper per ottenere una variante specifica
export function getSpecificVariant(
  productId: string,
  flavor: string,
  size: string,
): ProductVariant | null {
  const product = getProductFromDatabase(productId);
  if (!product) return null;

  return (
    product.variants.find((v) => v.flavor === flavor && v.size === size) || null
  );
}

// Funzione helper per ottenere tutti i gusti di un prodotto
export function getProductFlavors(productId: string): string[] {
  const product = getProductFromDatabase(productId);
  if (!product) return [];

  return Array.from(new Set(product.variants.map((v) => v.flavor)));
}

// Funzione helper per ottenere tutti i formati di un prodotto
export function getProductSizes(productId: string, flavor?: string): string[] {
  const product = getProductFromDatabase(productId);
  if (!product) return [];

  const variants = flavor
    ? product.variants.filter((v) => v.flavor === flavor)
    : product.variants;

  return Array.from(new Set(variants.map((v) => v.size)));
}



// Funzione principale per ottenere le varianti di un prodotto
export const getProductVariants = (product: any): ProductVariant[] => {
  // Prima controlla le varianti definite nel sistema
  const variants = getProductVariantsList(product.slug || product.id);
  if (variants && variants.length > 0) {
    return variants;
  }

  // Poi controlla le varianti dal database
  if (product.sizes && Array.isArray(product.sizes)) {
    return product.sizes.map((size: any) => ({
      flavor: size.flavor || size.name || "Standard",
      size: size.size || size.format || "Standard",
      price: size.price ? size.price / 100 : 0,
      image: size.image || "/images/placeholder-product.jpg",
      inStock: size.inStock !== false
    }));
  }

  return [];
};
