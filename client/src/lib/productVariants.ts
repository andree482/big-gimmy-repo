// Definizioni complete delle varianti per tutti i prodotti BigGimmy
export interface ProductVariant {
  flavor: string;
  size: string;
  image: string;
  inStock: boolean;
}

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


        image: "/images/products/01-burn-out-lampone.jpg",
        inStock: true,
      },
      {
        flavor: "Limone",
        size: "500ml",


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
        image: "/images/products/03-barrettone-burro-arachidi.jpg",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "70g",
        image: "/images/products/04-barrettone-cacao.jpg",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "70g",
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
        image: "/images/products/06-big-bar-cocco.jpg",
        inStock: true,
      },
      {
        flavor: "Cocco",
        size: "20 barrette",
        image: "/attached_assets/nuove_foto_1308/big-bar-2-77d5.webp",
        inStock: true,
      },
      {
        flavor: "Cookie Nocciola",
        size: "80g",
        image: "/images/products/07-big-bar-cookie-nocciola.jpg",
        inStock: true,
      },
      {
        flavor: "Cookie Nocciola",
        size: "20 barrette",
        image: "/attached_assets/nuove_foto_1308/big-bar-cookies-nocciola.webp",
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
        image: "/images/products/08-carbo-energy-albicocca.jpg",
        inStock: true,
      },
      {
        flavor: "Albicocca",
        size: "20 barrette",
        image:
          "/attached_assets/nuove_foto_1308/carbo-energy-albicocca-box-20-barrette-7f5a.webp",
        inStock: true,
      },
      {
        flavor: "Frutti di Bosco",
        size: "40g",
        image: "/images/products/09-carbo-energy-frutti-bosco.jpg",
        inStock: true,
      },
      {
        flavor: "Frutti di Bosco",
        size: "20 barrette",
        image: "/attached_assets/nuove_foto_1308/carbo-energy-b672.webp",
        inStock: true,
      },
      {
        flavor: "Agrumi",
        size: "40g",
        image: "/images/products/10-carbo-energy-agrumi.jpg",
        inStock: true,
      },
      {
        flavor: "Agrumi",
        size: "20 barrette",
        image: "/attached_assets/nuove_foto_1308/carbo-energy-b672.webp",
        inStock: true,
      },
      {
        flavor: "Mela Verde",
        size: "40g",
        image: "/images/products/11-carbo-energy-mela-verde.jpg",
        inStock: true,
      },
      {
        flavor: "Mela Verde",
        size: "20 barrette",
        image:
          "/attached_assets/nuove_foto_1308/carbo-energy-mela-verde-singola-barretta-06ba.webp",
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
        image: "/images/products/12-fruitforce-fragola.jpg",
        inStock: true,
      },
      {
        flavor: "Ananas",
        size: "30g",
        image: "/attached_assets/FRUITFORCE ANANAS_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Ananas",
        size: "24 barrette",
        image:
          "/attached_assets/nuove_foto_1308/fruit-force-singola-barretta-fragola-5a9e.webp",
        inStock: true,
      },
    ],
  },

  // 7. ISO SOYA PREMIER - RIMOSSO: ora usa prezzi dinamici dal database

  // 8. LIGHT PROTEIN BAR
  "light-protein-plus-bar": {
    productId: "light-protein-plus-bar",
    name: "Light Protein Bar",
    baseDescription: "Barretta proteica light a basso contenuto di zuccheri",
    variants: [
      {
        flavor: "Cheesecake",
        size: "45g",
        image: "/images/products/16-light-protein-bar-cheesecake.jpg",
        inStock: true,
      },
      {
        flavor: "Cheesecake",
        size: "24 barrette",
        image:
          "/attached_assets/nuove_foto_1308/light-protein-bar-box-24-barrette-cheescake-da0e.webp",
        inStock: true,
      },
      {
        flavor: "Caramello",
        size: "45g",
        image: "/images/products/17-light-protein-bar-caramello.jpg",
        inStock: true,
      },
      {
        flavor: "Caramello",
        size: "24 barrette",
        image:
          "/attached_assets/nuove_foto_1308/light-protein-bar-box-24-barrette-caramello-salato-7aa4.webp",
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
        image: "/attached_assets/immagine_1748632405654.png",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "750g",
        image: "/attached_assets/immagine_1748632469331.png",
        inStock: true,
      },
      {
        flavor: "Fragola",
        size: "750g",
        image: "/attached_assets/immagine_1748632483243.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "750g",
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

        image:
          "/images/products/TOP EGGXELLENT PROTEIN_CACAO_Fronte_1749996078038.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Pasticciera",
        size: "750g",
        image:
          "/images/products/Top_EggXellent_Protein_Crema_Pasticcera_Fronte_1749996078050.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Zabaione",
        size: "750g",
        image:
          "/images/products/Top_EggXellent_Protein_Crema_Zabaione_Fronte_1749996078051.jpg",
        inStock: true,
      },
    ],
  },

  // 11. HYDROLYZED 104 DH4
  "hydrolyzed-104-dh4": {
    productId: "hydrolyzed-104-dh4",
    name: "Hydrolyzed 104 DH4",
    baseDescription: "Proteine idrolizzate del siero con enzimi digestivi",
    variants: [
      {
        flavor: "Cioccolato",
        size: "900g",
        image: "/images/products/hydrolyzed-104-dh4-cioccolato.png",
        inStock: true,
      },
      {
        flavor: "Black Chocolate",
        size: "900g",
        image: "/images/products/hydrolyzed-104-dh4-black-chocolate.png",
        inStock: true,
      },
      {
        flavor: "Fragola-Banana",
        size: "900g",
        image: "/images/products/hydrolyzed-104-dh4-fragola-banana.png",
        inStock: true,
      },
      {
        flavor: "Wafer Nocciola",
        size: "900g",
        image: "/images/products/hydrolyzed-104-dh4-wafer-nocciola.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "900g",
        image: "/images/products/hydrolyzed-104-dh4-vaniglia.png",
        inStock: true,
      },
      {
        flavor: "Cookie Cream",
        size: "900g",
        image: "/images/products/hydrolyzed-104-dh4-cookie-cream.png",
        inStock: true,
      },
    ],
  },

  // 12. XXX Hydrolysed Protein 90
  "xxx-hydrolysed-protein-90": {
    productId: "xxx-hydrolysed-protein-90",
    name: "XXX Hydrolysed Protein 90",
    baseDescription:
      "Proteine idrolizzate ad alto assorbimento e biodisponibilità",
    variants: [
      {
        flavor: "Cacao",
        size: "250g",
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
        image:
          "/attached_assets/nuove_foto/wheyghty-protein-80-250-g-cacao-bea8-500x500.webp",
        inStock: true,
      },
      {
        flavor: "Cacao",
        size: "750g",
        image: "/attached_assets/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Nocciola",
        size: "250g",
        image:
          "/attached_assets/nuove_foto/wheyghty-protein-80-250-g-nocciola-c041.webp",
        inStock: true,
      },
      {
        flavor: "Nocciola",
        size: "750g",
        image: "/attached_assets/WHEYGHTY PROTEIN 80 NOCCIOLA 750g_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Banana",
        size: "750g",
        image: "/attached_assets/WHEYGHTY PROTEIN 80 GUSTO BANANA_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Cappuccino",
        size: "750g",
        image: "/attached_assets/WHEYGHTY PROTEIN 80 CAPPUCCINO Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Cocco",
        size: "750g",
        image: "/attached_assets/WHEYGHTY PROTEIN 80 COCCO Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Cacao & Menta",
        size: "400g",
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
        image: "/images/products/WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Banana",
        size: "750g",
        image: "/images/products/WHEY PROTEIN 90 Banana_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Fior di Latte",
        size: "750g",
        image: "/images/products/WHEY PROTEIN 90 FIOR DI LATTE Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Nocciola",
        size: "750g",
        image: "/images/products/WHEY PROTEIN 90_crema nocciola_Fronte.jpg",
        inStock: true,
      },
      {
        flavor: "Natural",
        size: "750g",
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
        image: "/images/products/wpc-100-cookies-cream.png",
        inStock: true,
      },
      {
        flavor: "Yogurt Fragola",
        size: "2kg",
        image: "/images/products/wpc-100-yogurt-fragola.png",
        inStock: true,
      },
      {
        flavor: "Choco Milk",
        size: "1kg",
        image: "/images/products/wpc-100-choco-milk.png",
        inStock: true,
      },
      {
        flavor: "Yogurt Fragola",
        size: "1kg",
        image: "/images/products/wpc-100-yogurt-fragola-busta.png",
        inStock: true,
      },
      {
        flavor: "Banana",
        size: "1kg",
        image: "/images/products/wpc-100-banana.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Fondente",
        size: "1kg",
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
        image: "/images/products/perfect-whey-neutro.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "750g",
        image: "/images/products/perfect-whey-cioccolato.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "750g",
        image: "/images/products/perfect-whey-vaniglia.png",
        inStock: true,
      },
      {
        flavor: "Pistacchio",
        size: "750g",
        image: "/images/products/perfect-whey-pistacchio.png",
        inStock: true,
      },
      {
        flavor: "Neutro",
        size: "Barattolo",
        image: "/images/products/perfect-whey-neutro-barattolo.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "Barattolo",
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
        size: "30ml",
        image: "/images/products/BCAA LIQUID CARBO_FRONTE_1750781953159.jpg",
        inStock: true,
      },
      {
        flavor: "Arancia",
        size: "30ml",
        image: "/attached_assets/nuove_foto_1308/bcaa-liquid-carbo-limone-singola-bustina-13be.webp",
        inStock: true,
      },
      {
        flavor: "Limone",
        size: "30 bustine",
        image:
          "/attached_assets/nuove_foto_1308/bcaa-liquid-carbo-arancia-box-30-bustine-3270.webp",
        inStock: true,
      },
      {
        flavor: "Arancia",
        size: "30 bustine",
        image:
          "/attached_assets/nuove_foto_1308/bcaa-liquid-carbo-arancia-box-30-bustine-31ed.webp",
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
        size: "40ml",
        image:
          "/images/products/BCAA RIDE GEL GUSTO TUTTI I FRUTTI_Fronte_1750781953160.jpg",
        inStock: true,
      },
      {
        flavor: "Tutti i Frutti",
        size: "30 bustine",
        image:
          "/attached_assets/nuove_foto_1308/bcaa-ride-gel-box-30-bustine-9649.webp",
        inStock: true,
      },
    ],
  },



  // ============ NUOVI PRODOTTI PRONUTRITION ============
  "aminoacidi-essenziali": {
    productId: "aminoacidi-essenziali",
    name: "Aminoacidi Essenziali",
    baseDescription:
      "Formula completa di aminoacidi essenziali per il supporto proteico e il recupero muscolare",
    variants: [
      {
        flavor: "Cola Lemon",
        size: "300g",
        image: "/images/products/aminoacidi-essenziali-300g-cola-lemon.png",
        inStock: true,
      },
    ],
  },

  "eaa-pro": {
    productId: "eaa-pro",
    name: "EAA Pro",
    baseDescription:
      "Formula avanzata di aminoacidi essenziali con glutammina e taurina per performance e recupero",
    variants: [
      {
        flavor: "Anguria",
        size: "420g",
        image: "/images/products/aminoacidi-essenziali-420-g-anguria.png",
        inStock: true,
      },
      {
        flavor: "Melon",
        size: "420g",
        image: "/images/products/aminoacidi-essenziali-420-g-melone.png",
        inStock: true,
      },
    ],
  },

  "prime-oat": {
    productId: "prime-oat",
    name: "Prime Oat",
    baseDescription:
      "PRIME OAT - Farina di fiocchi di avena aromatizzata con edulcoranti, dall'ottimo gusto, senza zuccheri aggiunti.",
    variants: [
      {
        flavor: "Cioccolato",
        size: "1kg",
        image: "/images/products/prime-oat-cioccolato.jpg",
        inStock: true,
      },
      {
        flavor: "Biscotto",
        size: "1kg",
        image: "/images/products/prime-oat-biscotto.jpg",
        inStock: true,
      },
      {
        flavor: "Cioccolato-Cocco",
        size: "1kg",
        image: "/images/products/prime-oat-cioccolato-cocco.jpg",
        inStock: true,
      },
      {
        flavor: "Wafer-Nocciola",
        size: "1kg",
        image: "/images/products/prime-oat-cioccolato.jpg",
        inStock: true,
      },
    ],
  },

  // Prime Whey Hydro Plus - 3 varianti
  "prime-whey-hydro-plus": {
    productId: "prime-whey-hydro-plus",
    name: "Prime Whey Hydro Plus",
    baseDescription:
      "PRIME WHEY HYDRO PLUS è un integratore alimentare di proteine del siero di latte concentrate, isolate e idrolizzate.",
    variants: [
      {
        flavor: "Cioccolato",
        size: "1kg",
        image: "/images/products/prime-whey-hydro-plus-cioccolato.jpg",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "1kg",
        image: "/images/products/prime-whey-hydro-plus-vaniglia.jpg",
        inStock: true,
      },
      {
        flavor: "Cioccolato-Cocco",
        size: "1kg",
        image: "/images/products/prime-whey-hydro-plus-cioccolato-cocco.jpg",
        inStock: true,
      },
    ],
  },

  // Whey Iso - 8 varianti
  "whey-iso": {
    productId: "whey-iso",
    name: "Whey Iso",
    baseDescription:
      "WHEY ISO è un integratore alimentare di proteine con aminoacidi ed edulcorante, a solubilità istantanea e di ottimo gusto.",
    variants: [
      {
        flavor: "Vaniglia",
        size: "1kg",
        image: "/images/products/whey-iso-vaniglia.jpg",
        inStock: true,
      },
      {
        flavor: "Brownies",
        size: "1kg",
        image: "/images/products/whey-iso-brownies.jpg",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "1kg",
        image: "/images/products/whey-iso-cioccolato.jpg",
        inStock: true,
      },
      {
        flavor: "Cioccolato Bianco",
        size: "1kg",
        image: "/images/products/whey-iso-cioccolato-bianco.jpg",
        inStock: true,
      },
      {
        flavor: "Cookies & Cream",
        size: "1kg",
        image: "/images/products/whey-iso-cookies-cream.jpg",
        inStock: true,
      },
      {
        flavor: "Crema Vaniglia",
        size: "2kg",
        image: "/images/products/whey-iso-crema-vaniglia.jpg",
        inStock: true,
      },
      {
        flavor: "Frutti Rossi",
        size: "1kg",
        image: "/images/products/whey-iso-frutti-rossi.jpg",
        inStock: true,
      },
      {
        flavor: "Torrone al cioccolato",
        size: "1kg",
        image: "/images/products/whey-iso-torrone-al-cioccolato.jpg",
        inStock: true,
      },
    ],
  },

  // RAM 1000 BCAA - 4 varianti
  "ram-1000-bcaa": {
    productId: "ram-1000-bcaa",
    name: "RAM 1000 BCAA",
    baseDescription:
      "RAM 1000 BCAA è un integratore alimentare di aminoacidi a catena ramificata in compresse da 1000 mg.",
    variants: [
      {
        flavor: "Unico",
        size: "100 compresse",
        image: "/images/products/ram-1000-bcaa-100-compresse.jpg",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "180 compresse",
        image: "/images/products/ram-1000-bcaa-180-compresse.jpg",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "300 compresse",
        image: "/images/products/ram-1000-bcaa-300-compresse.jpg",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "500 compresse",
        image: "/images/products/ram-1000-bcaa-500-compresse.jpg",
        inStock: true,
      },
    ],
  },

  // Total Protein Blend - 3 varianti
  "total-protein-blend": {
    productId: "total-protein-blend",
    name: "Total Protein Blend",
    baseDescription:
      "TOTAL PROTEIN è un integratore alimentare di proteine formulato con una combinazione di proteine a diverso tempo di assimilazione.",
    variants: [
      {
        flavor: "Cioccolato",
        size: "1kg",
        image: "/images/products/total-protein-blend-cioccolato.jpg",
        inStock: true,
      },
      {
        flavor: "Cookies & Cream",
        size: "1kg",
        image: "/images/products/total-protein-blend-cookies-cream.jpg",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "1kg",
        image: "/images/products/total-protein-blend-vaniglia.jpg",
        inStock: true,
      },
    ],
  },

  // 8. ZM-B6
  "zm-b6": {
    productId: "zm-b6",
    name: "ZM-B6",
    baseDescription:
      "ZM-B6 g� un integratore di zinco e magnesio con vitamina B6 che contribuisce alla riduzione della stanchezza.",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/zm-b6-90-compresse.jpg",
        inStock: true,
      },
    ],
  },

  // 9. DAA Acido D-aspartico
  "daa-acido-d-aspartico": {
    productId: "daa-acido-d-aspartico",
    name: "DAA Acido D-aspartico",
    baseDescription:
      "DAA è un integratore alimentare in compressa formulato in particolare per integrare la dieta dell'uomo adulto. Fornisce 1000 mg di Acido D-aspartico (DAA) e zinco per il mantenimento di funzionali livelli di testosterone nel sangue e normale fertilità",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/daa-90cpr-200ml.jpg",
        inStock: true,
      },
    ],
  },

  // 11. Dextro Plus
  "dextro-plus": {
    productId: "dextro-plus",
    name: "Dextro Plus",
    baseDescription:
      "DEXTRO PLUS è un preparato per bevanda a base di destrosio, ideale per fornire energia immediata agli atleti di tutte le discipline sportive.",
    variants: [
      {
        flavor: "Naturale",
        size: "1kg",
        image: "/images/products/dextro-plus.jpg",
        inStock: true,
      },
    ],
  },

  // 12. EAA Tabs
  "eaa-tabs": {
    productId: "eaa-tabs",
    name: "EAA Tabs",
    baseDescription:
      "EAA TABS è un integratore alimentare di aminoacidi essenziali.",
    variants: [
      {
        flavor: "Unico",
        size: "200 compresse",
        image: "/images/products/eaa-tabs.jpg",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "500 compresse",
        image: "/attached_assets/nuove_foto_1308/eaatabs-500cpr-1000ml_1450175203 (1).jpg",
        inStock: true,
      },
    ],
  },

  // 13. EGG Protein
  "egg-protein-busta": {
    productId: "egg-protein-busta",
    name: "EGG Protein",
    baseDescription:
      "EGG PROTEIN è un integratore alimentare di proteine del bianco d'uovo con edulcoranti, particolarmente adatto agli sportivi, a solubilità istantanea.",
    variants: [
      {
        flavor: "Crema Vaniglia",
        size: "750g",
        image: "/images/products/egg-protein-crema-vaniglia.jpg",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "750g",
        image: "/images/products/egg-protein-cioccolato.jpg",
        inStock: true,
      },
    ],
  },

  // 14. Fish Oil
  "fish-oil": {
    productId: "fish-oil",
    name: "Fish Oil",
    baseDescription:
      "FISH OIL OMEGA 3 EPA&DHA è un integratore alimentare di acidi grassi essenziali omega 3 EPA e DHA in forma di trigliceridi.",
    variants: [
      {
        flavor: "Unico",
        size: "90 softgel",
        image: "/images/products/fish-oil-90-softgel.jpg",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "200 softgel",
        image: "/images/products/fish-oil-200-softgel.jpg",
        inStock: true,
      },
    ],
  },

  // 15. GABA
  gaba: {
    productId: "gaba",
    name: "GABA",
    baseDescription:
      "GABA è un integratore alimentare di acido gamma-aminobutirrico in compresse da 750 mg di acido gamma-aminobutirrico ciascuna.",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/gaba-90-compresse.jpg",
        inStock: true,
      },
    ],
  },

  // 16. Vitargo
  vitargo: {
    productId: "vitargo",
    name: "Vitargo",
    baseDescription:
      "VITARGO è un integratore alimentare a base di carboidrati complessi brevettati con edulcoranti.",
    variants: [
      {
        flavor: "Arancia",
        size: "1kg",
        image: "/images/products/vitargo-arancia.jpg",
        inStock: true,
      },
      {
        flavor: "Tropical",
        size: "1kg",
        image: "/images/products/vitargo-tropical.jpg",
        inStock: true,
      },
      {
        flavor: "Naturale",
        size: "1kg",
        image: "/images/products/vitargo-naturale.jpg",
        inStock: true,
      },
    ],
  },

  // 17. Vitargo Electrolyte
  "vitargo-electrolyte": {
    productId: "vitargo-electrolyte",
    name: "Vitargo Electrolyte",
    baseDescription:
      "VITARGO ELECTROLYTE è un integratore alimentare di carboidrati a base di amido di mais ceroso con edulcoranti ed elettroliti.",
    variants: [
      {
        flavor: "Arancia",
        size: "1kg",
        image: "/images/products/vitargo-electrolyte-arancia.jpg",
        inStock: true,
      },
      {
        flavor: "Limone",
        size: "1kg",
        image: "/images/products/vitargo-electrolyte-limone.jpg",
        inStock: true,
      },
    ],
  },

  // 18. Waxy Maize
  "waxy-maize": {
    productId: "waxy-maize",
    name: "Waxy Maize",
    baseDescription:
      "WAXY MAIZE è un preparato per bevanda energetica in polvere a base di amido di mais ceroso.",
    variants: [
      {
        flavor: "Naturale",
        size: "1kg",
        image: "/images/products/waxy-maize.jpg",
        inStock: true,
      },
    ],
  },

  // 19. Arginina Alfaketoglutarato 2000
  "arginina-alfaketoglutarato-2000": {
    productId: "arginina-alfaketoglutarato-2000",
    name: "Arginina Alfaketoglutarato 2000",
    baseDescription:
      "ARGININA ALFAKETOGLUTARATO 2000 è un integratore alimentare di L-Arginina alfaketoglutarato in compresse.",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/arginina-alfaketoglutarato-2000.jpg",
        inStock: true,
      },
    ],
  },

  // 20. Arginina Argipower 100%
  "arginina-argipower-100": {
    productId: "arginina-argipower-100",
    name: "Arginina Argipower 100%",
    baseDescription:
      "ARGININA ARGIPOWER 100% è un integratore di L-Arginina pura in polvere.",
    variants: [
      {
        flavor: "Naturale",
        size: "200g",
        image: "/images/products/arginina-argipower-100.jpg",
        inStock: true,
      },
    ],
  },

  // 21. Iso Soya - Premier
  "iso-soya": {
    productId: "iso-soya",
    name: "Iso Soya",
    baseDescription:
      "Proteine isolate della soia ad alto valore biologico, ideali per diete vegane e vegetariane",
    variants: [
      {
        flavor: "Vaniglia",
        size: "750g",
        image: "/attached_assets/ISO-SOYA-SITO_1755522191253.png",
        inStock: true,
      },
    ],
  },

  // 22. Isowhey Pro-Zyme - Premier
  "isowhey-pro-zyme-premier": {
    productId: "isowhey-pro-zyme-premier",
    name: "Isowhey Pro-Zyme",
    baseDescription: "ISOWHEY PRO-ZYME è un integratore alimentare in polvere di proteine del siero di latte isolate Volactive® Ultrawhey Isolate, ottenute mediante processo di doppia micro-ultrafiltrazione (CFM), arricchito con la miscela di enzimi DigeZyme® e vitamine B1, B2, B6 e B12",
    variants: [
      {
        flavor: "Vaniglia",
        size: "450g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "900g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Vaniglia",
        size: "2kg",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "450g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "900g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato",
        size: "2kg",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Bianco",
        size: "450g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Bianco",
        size: "900g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Bianco",
        size: "2kg",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Crema Caffè",
        size: "450g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Crema Caffè",
        size: "900g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Crema Caffè",
        size: "2kg",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Frutti di Bosco",
        size: "450g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Frutti di Bosco",
        size: "900g",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
      {
        flavor: "Frutti di Bosco",
        size: "2kg",
        image: "/images/products/ISOWHEY-WEB-PREMIER.png",
        inStock: true,
      },
    ],
  },

  // 23. T-One Xtreme Boost - Premier
  "t-one-xtreme-boost": {
    productId: "t-one-xtreme-boost",
    name: "T-One Xtreme Boost",
    baseDescription: "T-ONE XTREME BOOST integratore di estratti secchi di erbe a titolo noto, quali Tribulus terrestris 90%, Fieno greco, Cordiceps, Rodiola, Maca, Bioperine, Ashwanganda, arricchito con acido D-Aspartico, vitamine, minerali e ZMA® U.S. PATENT.",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/t-one-compresse-website.png",
        inStock: true,
      },
    ],
  },

  // 24. Peanut Butter - Premier
  "peanut-butter": {
    productId: "peanut-butter",
    name: "Peanut Butter",
    baseDescription: "PEANUT BUTTER è una gustosa crema spalmabile ottenuta al 100% da arachidi tostate, 100% naturale.",
    variants: [
      {
        flavor: "Arachide",
        size: "570g",
        image: "/images/products/burro-di-arachidi-sito.png",
        inStock: true,
      },
    ],
  },

  // 25. Massive Gain XXL - Premier
  "massive-gain-xxl": {
    productId: "massive-gain-xxl",
    name: "Massive Gain XXL",
    baseDescription: "MASSIVE GAIN XXL è un integratore in polvere di carboidrati (Maltodestrine DE19, Vitargo® e Palatinose®), proteine del siero di latte concentrate e isolate (Volactive® Ultrawhey) indicato per l'integrazione nello sport ad alte prestazioni, fornendo al contempo energia, favorendo lo sviluppo e il recupero.",
    variants: [
      {
        flavor: "Cioccolato",
        size: "1500g",
        image: "/images/products/MASSIVE-GAIN-SITO.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Bianco",
        size: "1500g",
        image: "/images/products/MASSIVE-GAIN-SITO.png",
        inStock: true,
      },
    ],
  },

  // 26. Creatina Pure 100% - Premier
  "creatina-pure-100": {
    productId: "creatina-pure-100",
    name: "Creatina Pure 100%",
    baseDescription: "CREATINE PURE 100% è un integratore alimentare in polvere di Creatina monoidrato (Creapure®) indicata per integrare l'alimentazione dello sportivo.",
    variants: [
      {
        flavor: "Unico",
        size: "250g",
        image: "/images/products/CREATINE-PURE-SITO.png",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "500g",
        image: "/images/products/CREATINE-PURE-SITO.png",
        inStock: true,
      },
    ],
  },

  // 27. Creatina Plus 1000 - Premier
  "creatina-plus-1000": {
    productId: "creatina-plus-1000",
    name: "Creatina Plus 1000",
    baseDescription: "CREATINE PLUS 1000 è un integratore alimentare base di Creatina monoidrato (Creapure®). L'assunzione di creatina porta ad un notevole aumento dell'efficienza nell'area della forza massima e della resistenza.",
    variants: [
      {
        flavor: "Unico",
        size: "100 compresse",
        image: "/images/products/creatine-plus-100.png",
        inStock: true,
      },
      {
        flavor: "Unico",
        size: "250 compresse",
        image: "/images/products/creatine-plus-100.png",
        inStock: true,
      },
    ],
  },

  // 28. Omega 3XC 40/20 Gold - Premier
  "omega-3xc-40-20-gold": {
    productId: "omega-3xc-40-20-gold",
    name: "Omega 3XC 40/20 Gold",
    baseDescription: "OMEGA 3-XC 40/20 GOLD è un integratore alimentare di acidi grassi polinsaturi da olio di pesce EPA/DHA nel rapporto 40% EPA 20% DHA.",
    variants: [
      {
        flavor: "Unico",
        size: "90 perle",
        image: "/images/products/OMEGA-3-SITO-1.png",
        inStock: true,
      },
    ],
  },

  // 29. Hard C-Life Plus 1000 - Premier
  "hard-c-life-plus-1000": {
    productId: "hard-c-life-plus-1000",
    name: "Hard C-Life Plus 1000",
    baseDescription: "HARD C-LIFE PLUS 1000 è un integratore alimentare in compresse di Vitamina C. HARD C-LIFE PLUS 1000 non contiene glutine.",
    variants: [
      {
        flavor: "Unico",
        size: "60 compresse",
        image: "/images/products/Hard-C-life-plus-1000.png",
        inStock: true,
      },
    ],
  },

  // 30. Premier Pancake - Premier
  "premier-pancake": {
    productId: "premier-pancake",
    name: "Premier Pancake",
    baseDescription: "PREMIER PANCAKE è un preparato alimentare in polvere per pancake a base di proteine dell'albume d'uovo e farina di avena senza glutine.",
    variants: [
      {
        flavor: "Natural",
        size: "750g",
        image: "/images/products/Pancake.png",
        inStock: true,
      },
    ],
  },

  // 31. Algae Epa-Dha Vegan Active - Premier
  "algae-epa-dha-vegan-active": {
    productId: "algae-epa-dha-vegan-active",
    name: "Algae Epa-Dha Vegan Active",
    baseDescription: "ALGAE EPA-DHA VEGAN ACTIVE è un integratore alimentare di omega 3 epa-dha ottenuto da microalghe.",
    variants: [
      {
        flavor: "Unico",
        size: "60 perle",
        image: "/images/products/Algae-epa-vegan.png",
        inStock: true,
      },
    ],
  },

  // 32. Intra Pro Essential+ - Premier
  "intra-pro-essential-plus": {
    productId: "intra-pro-essential-plus",
    name: "Intra Pro Essential+",
    baseDescription: "INTRA PRO ESSENTIAL + è un integratore di aminoacidi essenziali in polvere arricchito con L-istidina, quattro aminoacidi utili a supportare gli allenamenti intensi tra i quali L-glutammina, L-arginina e citrullina (Kyowa® Quality) e vitamine B6 e B2.",
    variants: [
      {
        flavor: "Agrumi",
        size: "200gr",
        image: "/images/products/INTRA-PRO-ESSENTIAL-SITO-PREMIERINTEGRATORI.png",
        inStock: true,
      },
    ],
  },

  // 33. BCAA Powder 8:1:1 - Premier
  "bcaa-powder-8-1-1-premier": {
    productId: "bcaa-powder-8-1-1-premier",
    name: "BCAA Powder 8:1:1",
    baseDescription: "BCAA POWDER 8:1:1 è un prodotto in polvere al gusto di agrumi, a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, che per il loro diverso contenuto di Leucina, stimolano la sintesi proteica favorendo un recupero più rapido e l'aumento massa, quindi indicati per il post workout. BCAA POWDER 8:1:1 è arricchito con vitamina B1, B2, B6.",
    variants: [
      {
        flavor: "Agrumi",
        size: "250g",
        image: "/images/products/BCAAPOWDER811-SITO-PREMIERINTEGRATORI.png",
        inStock: true,
      },
    ],
  },

  // 34. D3/K2 Complex - Premier
  "d3-k2-complex": {
    productId: "d3-k2-complex",
    name: "D3/K2 Complex",
    baseDescription: "D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali.",
    variants: [
      {
        flavor: "Unico",
        size: "90 perle",
        image: "/images/products/SITO-D3K2.png",
        inStock: true,
      },
    ],
  },

  // 35. Hard Amx Carbo - Premier
  "hard-amx-carbo": {
    productId: "hard-amx-carbo",
    name: "Hard Amx Carbo",
    baseDescription: "HARD AMX CARBO è un integratore alimentare in polvere di carboidrati, aminoacidi ramificati, L-glutamina, creatina, taurina, vitamine e minerali.",
    variants: [
      {
        flavor: "Arancia",
        size: "500g",
        image: "/images/products/HARD-AMX-CARBO-SITO.png",
        inStock: true,
      },
    ],
  },

  // 36. Hard WPH BV104 - Premier
  "hard-wph-bv104": {
    productId: "hard-wph-bv104",
    name: "Hard WPH BV104",
    baseDescription: "HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104.",
    variants: [
      {
        flavor: "Crema Caffé",
        size: "750g",
        image: "/images/products/SITO-wph-104-premier-integratori-crema-caffe.png",
        inStock: true,
      },
      {
        flavor: "Cioccolato Nocciola",
        size: "750g",
        image: "/images/products/SITO-wph-104-premier-integratori-crema-caffe.png",
        inStock: true,
      },
    ],
  },

  // 37. Hard ZMA XP - Premier
  "hard-zma-xp": {
    productId: "hard-zma-xp",
    name: "Hard ZMA XP",
    baseDescription: "HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/ZMA-SITO-PREMIERINTEGRATORI.png",
        inStock: true,
      },
    ],
  },

  // 38. Arginine NO - Premier
  "arginine-no": {
    productId: "arginine-no",
    name: "Arginine NO",
    baseDescription: "ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6.",
    variants: [
      {
        flavor: "Unico",
        size: "90 compresse",
        image: "/images/products/ARGININE-NO-SITO.png",
        inStock: true,
      },
    ],
  },

  // 39. Total EGG - Premier
  "total-egg": {
    productId: "total-egg",
    name: "Total EGG",
    baseDescription: "TOTAL EGG è un integratore alimentare in polvere di proteine dell'albume d'uovo arricchito con vitamine C, E, B1, B2, B6, B12.",
    variants: [
      {
        flavor: "Cacao",
        size: "1kg",
        image: "/images/products/TOTAL-EGG-SITO.png",
        inStock: true,
      },
    ],
  },

  // 40. BCAA Powder 2:1:1 - Premier
  "bcaa-powder-2-1-1-premier": {
    productId: "bcaa-powder-2-1-1-premier",
    name: "BCAA Powder 2:1:1",
    baseDescription: "BCAA POWDER 2:1:1 è un integratore in polvere al gusto arancia di aminoacidi ramificati: L-Leucina, L-Valina, L-Isoleucina indicato per integrare l'alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate.",
    variants: [
      {
        flavor: "Arancia",
        size: "200g",
        image: "/images/products/BCAA-POWDER-SITO.png",
        inStock: true,
      },
      {
        flavor: "Arancia",
        size: "400g",
        image: "/images/products/BCAA-POWDER-SITO.png",
        inStock: true,
      },
    ],
  },

  // 41. Hard EAA 8:1 - Premier
  "hard-eaa-8-1-premier": {
    productId: "hard-eaa-8-1-premier",
    name: "Hard EAA 8:1",
    baseDescription: "HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.",
    variants: [
      {
        flavor: "Unico",
        size: "150 compresse",
        image: "/images/products/EAA-SITO.png",
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
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "calcio-citrato-d3-jamieson": [
    {
      flavor: "Naturale",
      size: "120 cpr",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "licopene-jamieson": [
    {
      flavor: "Naturale",
      size: "60 cpr",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "vita-vim-multivitaminico-jamieson": [
    {
      flavor: "Naturale",
      size: "90 cpr",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "lutein-z-jamieson": [
    {
      flavor: "Naturale",
      size: "30 compresse",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "spirulina-jamieson": [
    {
      flavor: "Naturale",
      size: "90 cps",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "omega-3-select-mini-jamieson": [
    {
      flavor: "Naturale",
      size: "200 mini softgel",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "omega-3-extra-jamieson": [
    {
      flavor: "Naturale",
      size: "100 softgel",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "vitamina-c-masticabile-jamieson": [
    {
      flavor: "Arancia",
      size: "330 capsule",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],
  "vitamina-k2-d3-jamieson": [
    {
      flavor: "Naturale",
      size: "30 softgel",
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
      image: "/images/products/SALI PERFORMANCE_Arancia_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "600g",
      image: "/images/products/SALI PERFORMANCE_Limone_Fronte.jpg",
      inStock: true,
    },
  ],
  triboost: [
    {
      flavor: "Naturale",
      size: "100 capsule",
      image: "/attached_assets/nuove_foto/TRIBOOST_Fronte.jpg",
      inStock: true,
    },
  ],
  "vitamine-minerals-watt": [
    {
      flavor: "Naturale",
      size: "30 compresse",
      image:
        "/attached_assets/nuove_foto/VITAMINS_MINERALS_30_Compresse_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Naturale",
      size: "120 compresse",
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
      image: "/images/products/VITAL-ENERGY-300x411.png",
      inStock: true,
    },
  ],
  "vitamin-d3-2000-premier": [
    {
      flavor: "Naturale",
      size: "120 compresse",
      image: "/images/products/Vitamin-D3-2000-300x411 (1).png",
      inStock: true,
    },
  ],

  // Prodotti WHY Sport
  "adrenaline-agrumi-pre-workout": [
    {
      flavor: "Cola",
      size: "10 bustine",
      image: "/attached_assets/nuove_foto/W063_singolo.png",
      inStock: true,
    },
  ],
  "magnesio-potassio-sport": [
    {
      flavor: "Agrumi",
      size: "300g",
      image: "/attached_assets/nuove_foto/W412_singolo.png",
      inStock: true,
    },
  ],
  "drenante-why-sport": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image: "/attached_assets/nuove_foto/WN122_singolo.png",
      inStock: true,
    },
  ],
  "vitamina-b12-1000": [
    {
      flavor: "Naturale",
      size: "80 compresse",
      image: "/attached_assets/nuove_foto/WN234_singolo.png",
      inStock: true,
    },
  ],
  "refuel-recovery": [
    {
      flavor: "Agrumi",
      size: "25g",
      image: "/attached_assets/nuove_foto/W172_box.png",
      inStock: true,
    },
  ],
  "testo-xplode": [
    {
      flavor: "Naturale",
      size: "90 capsule",
      image: "/attached_assets/nuove_foto/W297_singolo.png",
      inStock: true,
    },
  ],
  "ps200-fosfatidilserina": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      image: "/attached_assets/nuove_foto/W386_singolo.png",
      inStock: true,
    },
  ],

  // Prodotti Volchem
  "vitamina-d3-800-iu-volchem": [
    {
      flavor: "Naturale",
      size: "100 compresse",
      image: "/attached_assets/nuove_foto/Vitamin D 800 IU 100 cpr web.jpg",
      inStock: true,
    },
  ],
  "vitamina-d3-2000-iu-volchem": [
    {
      flavor: "Naturale",
      size: "100 compresse",
      image: "/attached_assets/nuove_foto/Vitamin D 2000 IU 60 cpr.jpg",
      inStock: true,
    },
  ],
  "magnesio-tripla-azione-jamieson": [
    {
      flavor: "Neutro",
      size: "90 compresse",
      image: "/images/products/9254_singolo_1750371497333.png",
      inStock: true,
    },
  ],
  "ashwagandha-jamieson": [
    {
      flavor: "Neutro",
      size: "60 compresse",
      image: "/attached_assets/nuove_foto/9848_singolo.png",
      inStock: true,
    },
  ],
  "alaform-800-premier": [
    {
      flavor: "Neutro",
      size: "90 compresse",
      image: "/images/products/ALAFORM-WEBSITE-1-300x411 (1)_1750371497334.png",
      inStock: true,
    },
  ],

  // SEZIONE PROTEINE - 7 prodotti con varianti complete
  "wpc-100": [
    {
      flavor: "Banana",
      size: "1kg",
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Choco Milk",
      size: "1kg",
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Fondente",
      size: "1kg",
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Cookies Cream",
      size: "2kg",
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Yogurt Fragola",
      size: "1kg",
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
    {
      flavor: "Yogurt Fragola",
      size: "2kg",
      image: "/images/products/W390_singolo_1750888569069.png",
      inStock: true,
    },
  ],
  "perfect-100-whey": [
    {
      flavor: "Pesca",
      size: "450g",
      image: "/attached_assets/nuove_foto/pesca_450g .png",
      inStock: true,
    },
    {
      flavor: "Cookies & Cream",
      size: "450g",
      image: "/attached_assets/nuove_foto/cookies 450g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato al Latte",
      size: "450g",
      image: "/attached_assets/nuove_foto/cioccolato_latte_450g.png",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "900g",
      image: "/attached_assets/nuove_foto/vaniglia_900g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato al Latte",
      size: "900g",
      image: "/attached_assets/nuove_foto/cioccolate_latte_900g.png",
      inStock: true,
    },
    {
      flavor: "Pistacchio",
      size: "900g",
      image: "/attached_assets/nuove_foto/pistacchio 900g.png",
      inStock: true,
    },
    {
      flavor: "Caffèciok",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W243_PERFECT-WHEY_caffeciok-900g (1).png",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W395-PERFECT-100-WHEY-CIOCCOLATO-900g-600x600.png",
      inStock: true,
    },
    {
      flavor: "Cioccococco",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W246_PERFECT-WHEY_Ciocococco_900g.png",
      inStock: true,
    },
    {
      flavor: "Fragola-Banana",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W383-PERFECT-100-WHEY-FRAGOLA-BANANA-900g.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Bianco",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W384_PERFECT-100-WHEY-CIOCCOLATO-BIANCO-900g.png",
      inStock: true,
    },
    {
      flavor: "Doppio Cioccolato",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W385_PERFECT-100-WHEY-DOPPIO-CIOCCOLATO-900g.png",
      inStock: true,
    },
    {
      flavor: "Yogurt",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W454_perfect-100-whey-yogurt-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Wafer Nocciola",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W456_perfect-100-whey-wafer-nocciola-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Banana Yogurt",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W457_perfect-100-whey-banana-yogurt-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Yogurt Pesca",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_1308/W455_perfect-100-whey-yogurt-pesca-900-g_singolo.png",
      inStock: true,
    },
  ],
  "essential-100-whey": [
    {
      flavor: "Cacao",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_ancora/W251_essential-100-whey-900-g-cacao_singolo.png",
      inStock: true,
    },
  ],
  "perfect-blend-90": [
    {
      flavor: "Cacao",
      size: "750g",
      image: "/attached_assets/nuove_foto/blend_cacao.png",
      inStock: true,
    },
    {
      flavor: "Banana & Vaniglia",
      size: "750g",
      image: "/attached_assets/nuove_foto/belnd_vnaiglia.png",
      inStock: true,
    },
  ],
  "top-100-xp-cacao": [
    {
      flavor: "Cacao",
      size: "250g",
      image: "/attached_assets/nuove_foto/TOP 100 XP_CACAO_Fronte.jpg",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "750g",
      image: "/attached_assets/nuove_foto_ancora/a50047.jpg",
      inStock: true,
    },
  ],
  "vegetal-100-protein": [
    {
      flavor: "Cacao",
      size: "750g",
      image: "/attached_assets/nuove_foto/W090_singolo.png",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "750g",
      image:
        "/attached_assets/nuove_foto_1308/W091_100-vegetal-protein-750-g-vaniglia_singolo.png",
      inStock: true,
    },
  ],
  "hydrolyzed-100-whey": [
    {
      flavor: "Fragola Banana",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_ancora/W435_hydrolyzed-104-dh4-fragola-banana-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Wafer Nocciola",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_ancora/W433_hydrolyzed-104-dh4-wafer-nocciola-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_ancora/W431_hydrolyzed-104-dh4-vaniglia-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cookies & Cream",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_ancora/W432_hydrolyzed-104-dh4-cookie-cream-900-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "900g",
      image:
        "/attached_assets/nuove_foto_ancora/W430_hydrolyzed-104-dh4-ciocc.-900-g_singolo.png",
      inStock: true,
    },
  ],


  "vegan-isopea-90": [
    {
      flavor: "Cacao",
      size: "700g",
      image: "/images/products/vegan-isopea-90-cioccolato-700g.png",
      inStock: true,
    },
    {
      flavor: "Nocciola",
      size: "700g",
      image: "/images/products/vegan-isopea-90-cioccolato-700g.png",
      inStock: true,
    },
  ],
  "say-protein-221": [
    {
      flavor: "Cacao",
      size: "750g",
      image: "/images/products/say-protein-221-cacao-750g.jpg",
      inStock: true,
    },
    {
      flavor: "Nocciola",
      size: "750g",
      image: "/images/products/say-protein-221-nocciola-750g.jpg",
      inStock: true,
    },
  ],
  "smart-protein-cacao": [
    {
      flavor: "Cacao",
      size: "320ml",
      image: "/images/products/smart-protein-cacao-320ml.jpg",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "12 bottigliette",
      image: "/images/products/smart-protein-cacao-320ml.jpg",
      inStock: true,
    },
  ],
  "perfect-mass": [
    {
      flavor: "Cacao Biscuit",
      size: "1600g",
      image: "/images/products/perfect-mass-cacao-biscuit-1600g.png",
      inStock: true,
    },
  ],

  // SEZIONE AMINOACIDI - 12 prodotti con varianti complete (IMMAGINI CORRETTE)
  "aminoacidi-plus": [
    {
      flavor: "Arancia",
      size: "100 compresse",
      image: "/images/products/AMINOACIDI Arancia_Fronte_1750948719180.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "300 compresse",
      image: "/attached_assets/nuove_foto_1308/aminoacidi-8aef.webp",
      inStock: true,
    },
  ],
  "aminoacidi-essenziali-plus-polvere": [
    {
      flavor: "Cola",
      size: "300g",
      image:
        "/images/products/AMINOACIDI ESSENZIALI POLVERE_cola_Fronte_1750948719181.jpg",
      inStock: true,
    },
    {
      flavor: "Tropical",
      size: "300g",
      image:
        "/images/products/Aminoacidi Essenziali+ Polvere Tropical FRONTE new_1750948719181.jpg",
      inStock: true,
    },
  ],
  // Prodotti Aminotool EAA e Argin rimossi come richiesto
  "arginina-plus-complex-capsule": [
    {
      flavor: "Neutro",
      size: "90 capsule",
      image:
        "/images/products/ARGININA COMPLEX CAPSULE_Fronte_1750948719185.jpg",
      inStock: true,
    },
  ],
  "bcaa-plus-8-1-1-nuovo": [
    {
      flavor: "Arancia",
      size: "100g",
      image:
        "/images/products/BCAA LEUCING LOADING_arancia_Fronte_1750948719186.jpg",
      inStock: true,
    },
    {
      flavor: "Strong Apple",
      size: "100g",
      image:
        "/attached_assets/nuove_foto_1308/bcaa-811-polvere-strong-apple-100-g-f945.webp",
      inStock: true,
    },
    {
      flavor: "Strong Apple",
      size: "300g",
      image:
        "/attached_assets/nuove_foto_1308/bcaa-811-polvere-strong-apple-300-g-1377.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500 compresse",
      image: "/attached_assets/nuove_foto_1308/black-line-2fd6.webp",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "300g",
      image: "/images/products/BCAA POLVERE_arancia_Fronte_1750948719187.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      image: "/images/products/BCAA LEUCING LOADING_Fronte_1750948719186.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "50 compresse",
      image: "/images/products/BCAA_50Compresse_Fronte_1750948719188.jpg",
      inStock: true,
    },
  ],
  "d-glucosio": [
    {
      flavor: "Neutro",
      size: "1.5kg",
      image: "/images/products/D-GLUCOSIO1-5KG_FRONTE_1750948719188.jpg",
      inStock: true,
    },
  ],
  "glutammina-plus-polvere": [
    {
      flavor: "Neutro",
      size: "100g",
      image: "/attached_assets/nuove_foto_ancora/glutammina-100-g-6db1.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "300g",
      image: "/attached_assets/nuove_foto_ancora/glutammina-300-g-3517.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      image: "/attached_assets/nuove_foto_ancora/glutammina-7cd0.webp",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "120 compresse",
      image:
        "/attached_assets/nuove_foto_ancora/glutammina-120-compresse-c7e3.webp",
      inStock: true,
    },
  ],
  "hard-beta-alanine": [
    {
      flavor: "Neutro",
      size: "180 compresse",
      image:
        "/images/products/HARD-BETA-ALANINE-SITO-300x411_1750948719191.png",
      inStock: true,
    },
  ],
  "high-bcaa-2-1-1": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      image: "/images/products/HIGH-BCAA-SITO-300x411_1750948719191.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      image: "/images/products/HIGH-BCAA-SITO-300x411_1750948719191.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "400 compresse",
      image: "/images/products/HIGH-BCAA-SITO-300x411_1750948719191.png",
      inStock: true,
    },
  ],

  // NUOVI 9 PRODOTTI AMINOACIDI - varianti complete
  "pocket-carnitine": [
    {
      flavor: "Frutti di Bosco",
      size: "50ml",
      image:
        "/images/products/POCKET CARNITINE_Diagonale fronte_1750951382268.jpg",
      inStock: true,
    },
  ],
  "rm1-bcaa-8-1-1-recovery-mix": [
    {
      flavor: "Arancia",
      size: "25g",
      image:
        "/images/products/RM1 New Formula (BCAA 8.1.1)  25 g ARANCIA FRONTE_1750951382268.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "500g",
      image:
        "/images/products/RM1 New Formula (BCAA 8.1.1)  500 g arancia FRONTE_1750951382269.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "Box 22 bustine",
      image:
        "/attached_assets/nuove_foto_1308/r-m-1-bcaa-811-recovery-mix-arancia-box-30-bustine-30f4.webp",
      inStock: true,
    },
    {
      flavor: "Sprint Apple",
      size: "500g",
      image:
        "/attached_assets/nuove_foto_ancora/r-m-1-bcaa-811-recovery-mix-sprint-apple-500-g-f1ee.webp",
      inStock: true,
    },
  ],
  "bcaa-1000-b6": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      image: "/images/products/W001_singolo_1750951382273.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      image: "/images/products/W001_singolo_1750951382273.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "300 compresse",
      image: "/images/products/W001_singolo_1750951382273.png",
      inStock: true,
    },
  ],
  "glutammina-pure": [
    {
      flavor: "Neutro",
      size: "250g",
      image: "/images/products/W012_singolo_1750951382275.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      image: "/images/products/W012_singolo_1750951382275.png",
      inStock: true,
    },
  ],
  "bcaa-supreme-4-1-1": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      image: "/images/products/W176_singolo_1750951382276.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "200 compresse",
      image: "/images/products/W176_singolo_1750951382276.png",
      inStock: true,
    },
  ],
  "essenziali-zero-carb": [
    {
      flavor: "Mela Lime",
      size: "240g",
      image: "/images/products/W423_singolo_1750951382277.png",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "240g",
      image:
        "/attached_assets/aggiornamento 2.0/W248_Essenziali_Arancia_240g.png",
      inStock: true,
    },
    {
      flavor: "Tè alla Pesca",
      size: "240g",
      image:
        "/attached_assets/aggiornamento 2.0/W247_Essenziali_te_alla_pesca_240g.png",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "240g",
      image:
        "/attached_assets/aggiornamento 2.0/W426_ESSENZIALI_limone_240-g_2023.png",
      inStock: true,
    },
    {
      flavor: "Energy Bull",
      size: "240g",
      image: "/attached_assets/aggiornamento 2.0/ù.png",
      inStock: true,
    },
    {
      flavor: "Kiwi Lime",
      size: "240g",
      image:
        "/attached_assets/aggiornamento 2.0/W427_ESSENZIALI_kiwi-lime_240-g_2023.png",
      inStock: true,
    },
    {
      flavor: "Lampone",
      size: "240g",
      image:
        "/attached_assets/aggiornamento 2.0/W424_ESSENZIALI_lampone_240-g_2023.png",
      inStock: true,
    },
    {
      flavor: "Melone",
      size: "240g",
      image:
        "/attached_assets/aggiornamento 2.0/W425_ESSENZIALI_melone_240-g_2023.png",
      inStock: true,
    },
  ],
  "essential-amino-9-3": [
    {
      flavor: "Neutro",
      size: "400 compresse",
      image:
        "/images/products/2b3a554e-3dbf-4e64-aaa1-d3ae38efe251_1750951408616.png",
      inStock: true,
    },
    {
      flavor: "Agrumi",
      size: "480g",
      image:
        "/images/products/2b3a554e-3dbf-4e64-aaa1-d3ae38efe251_1750951408616.png",
      inStock: true,
    },
    {
      flavor: "Cola Lemon",
      size: "480g",
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
      image:
        "/images/products/CREANIZED_CRETINA_MONOIDRATO_Fronte_1751037655150.jpg",
      inStock: true,
    },
  ],
  "creatina-extra-gold": [
    {
      flavor: "Neutro",
      size: "100 compresse",
      image:
        "/images/products/CREATINA COMPRESSE EXTRA GOLD_Fronte (2)_1751037655152.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "300 compresse",
      image:
        "/images/products/CREATINA Compresse Extra Gold_Fronte_1751037655153.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "100g",
      image:
        "/images/products/CREATINA_Extra Gold_100g_Fronte_1751037655153.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "350g",
      image:
        "/images/products/Creatina+ polvere extragold 350 FRONTE_1751037655154.jpg",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      image:
"/attached_assets/nuove_foto_1308/creatina-extragold-500-g-4c9b.webp",
      inStock: true,
    },
  ],
  "gluco-creatina": [
    {
      flavor: "Arancia",
      size: "210 compresse",
      image:
        "/images/products/GLUCO CREATINA Compresse_Fronte_1751037744108.jpg",
      inStock: true,
    },
  ],
  "creatina-platinum": [
    {
      flavor: "Neutro",
      size: "300g",
      image: "/images/products/W013_singolo_1751037744109.png",
      inStock: true,
    },
  ],
  "creatina-platinum-1300": [
    {
      flavor: "Neutro",
      size: "120 compresse",
      image: "/images/products/W026_singolo_1751037744110.png",
      inStock: true,
    },
  ],
  "creatina-200-mesh": [
    {
      flavor: "Neutro",
      size: "200g",
      image: "/images/products/W166_singolo_1751037744110.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "500g",
      image: "/images/products/W269_singolo_1751037744111.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "1kg",
      image: "/attached_assets/nuove_foto_1308/W485_creatina-200-Mesh-1-kg_singolo.png",
      inStock: true,
    },
  ],

  // === NUOVI PRODOTTI ACCESSORI ===
  "epilact-sport-protezione-unghie": [
    {
      flavor: "Neutro",
      size: "S",
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "M",
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "L",
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "XL",
      image: "/images/products/EP926741758_singolo_1751038145711.png",
      inStock: true,
    },
  ],
  "physiostrap-ski": [
    {
      flavor: "Neutro",
      size: "S",
      image: "/images/products/EP973147061_singolo_1751038145714.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "M",
      image: "/images/products/EP973147061_singolo_1751038145714.png",
      inStock: true,
    },
    {
      flavor: "Neutro",
      size: "L",
      image: "/images/products/EP973147061_singolo_1751038145714.png",
      inStock: true,
    },
  ],
  "borraccia-why-sport-500ml": [
    {
      flavor: "Nero",
      size: "500ml",
      image: "/images/products/WSX244_singolo_1751038145715.png",
      inStock: true,
    },
  ],
  "borsone-why-sport": [
    {
      flavor: "Nero/Rosso",
      size: "Standard",
      image: "/images/products/WSX248_singolo_1751038145715.png",
      inStock: true,
    },
  ],
  "sport-shaker-why-sport": [
    {
      flavor: "Rosso",
      size: "600ml",
      image: "/images/products/WSX276_singolo_1751038145717.png",
      inStock: true,
    },
  ],
  "borraccia-sport-500ml": [
    {
      flavor: "Rosso",
      size: "500ml",
      image: "/images/products/WSX368_singolo_1751038145719.png",
      inStock: true,
    },
  ],

  // === NUOVI PRODOTTI ABBIGLIAMENTO ===

  "top-donna-why-sport": [
    {
      flavor: "Nero",
      size: "S",
      image: "/images/products/WSX179_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero",
      size: "M",
      image: "/images/products/WSX179_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero",
      size: "L",
      image: "/images/products/WSX179_singolo_1751038922384.png",
      inStock: true,
    },
  ],
  "short-donna-why-sport": [
    {
      flavor: "Nero/Grigio",
      size: "S",
      image: "/images/products/WSX182_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero/Grigio",
      size: "M",
      image: "/images/products/WSX182_singolo_1751038922384.png",
      inStock: true,
    },
    {
      flavor: "Nero/Grigio",
      size: "L",
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
      image:
        "/images/products/Promeal Snacks bianco 150x250 web_1751034029688.jpg",
      inStock: true,
    },
    {
      flavor: "Vaniglia",
      size: "16 pezzi",
      image:
        "/images/products/Promeal Snacks bianco 150x250 web_1751034029688.jpg",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "40g",
      image:
        "/images/products/Promeal Snacks dark chocolate 150x250 web_1751034029689.jpg",
      inStock: true,
    },
    {
      flavor: "Cioccolato",
      size: "16 pezzi",
      image:
        "/images/products/Promeal Snacks dark chocolate 150x250 web_1751034029689.jpg",
      inStock: true,
    },
  ],

  // 2. PROTEIN CREAM
  "protein-cream": [
    {
      flavor: "Pistacchio",
      size: "250g",
      image: "/attached_assets/nuove_foto_1308/protein-cream-Pistacchio.png",
      inStock: true,
    },
  ],

  // 3. VEGGIE CIOK
  "veggie-ciok": [
    {
      flavor: "Albicocca",
      size: "40g",
      image:
        "/images/products/Veggie Ciok  40 g albicocca FRONTE_1751034075963.jpg",
      inStock: true,
    },
    {
      flavor: "Albicocca",
      size: "24 barrette",
      image:
"/attached_assets/nuove_foto_1308/veggie-ciok-albicocca.webp",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "40g",
      image:
        "/images/products/Veggie Ciok  40 g arancia FRONTE_1751034075964.jpg",
      inStock: true,
    },
    {
      flavor: "Arancia",
      size: "24 barrette",
      image:
"/attached_assets/nuove_foto_1308/veggie-ciok-2-bb88.webp",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "40g",
      image:
        "/images/products/b7271d4e-bdcd-4b51-a1a1-92cd66503063_1751034089990.jpg",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "24 barrette",
      image:
"/attached_assets/nuove_foto_1308/veggie-ciok-cacao.webp",
      inStock: true,
    },
  ],

  // 4. PERFECT BAR 50%
  "perfect-bar-50": [
    {
      flavor: "Biancociok Biscotto",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W262_PERFECT-BAR-BIANCOCIOK-BISCOTTO-CRISP - Copia.png",
      inStock: true,
    },
    {
      flavor: "Biancociok",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W260_PERFECT-BAR-BIANCOCIOK-CRISP - Copia.png",
      inStock: true,
    },
    {
      flavor: "Biancociok Frutti di Bosco",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W261_PERFECT-BAR-BIANCOCIOK-FRUTTI-DI-BOSCO-CRISP - Copia.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato e Latte",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W221_PERFECT-BAR_-ciocc-latte - Copia.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Caramello",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W222_PERFECT-BAR_-cioccolato-caramello - Copia.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Cookies",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W223_PERFECT-BAR_-cookies - Copia.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Fondente",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W224_PERFECT-BAR_-cioccolato-fondente - Copia.png",
      inStock: true,
    },
    {
      flavor: "Fondente cocco",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W225_PERFECT-BAR_-cocco-fondente.png",
      inStock: true,
    },
    {
      flavor: "Fondente nocciola",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W226_PERFECT-BAR_-nocciola-fondente.png",
      inStock: true,
    },
    {
      flavor: "Biancociok caramello salato",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W464_perfect-bar-biancociok-caramello-salato-50-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato al latte e Cacao",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W462_perfect-bar-cioccolato-al-latte-latte-e-cacao-50-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cioccolato Fondente Brownie",
      size: "50g",
      image:
        "/attached_assets/nuove_foto_1308/W463_perfect-bar-cioccolato-fondente-brownie-50-g_singolo.png",
      inStock: true,
    },
  ],

  // 5. ENERGY FUEL
  "energy-fuel": [
    {
      flavor: "Caramello Salato",
      size: "40g",
      image: "/images/products/W468_singolo_1751034332990.png",
      inStock: true,
    },
  ],

  // 6. CREMA DI ARACHIDI PEANUT BUTTER
  "crema-di-arachidi-peanut-butter": [
    {
      flavor: "Crunchy",
      size: "350g",
      image: "/images/products/WN054_singolo_1751034533751.png",
      inStock: true,
    },
  ],

  // 7. WAFER ZERO
  "wafer-zero": [
    {
      flavor: "Cacao e Cioccolato Bianco",
      size: "35g",
      image: "/images/products/WN160_singolo_1751034567870.png",
      inStock: true,
    },
    {
      flavor: "Cacao e Cioccolato Bianco",
      size: "24pz",
      image: "/images/products/WN160_box_1751034581713.png",
      inStock: true,
    },
    {
      flavor: "Cacao e Nocciola",
      size: "35g",
      image: "/attached_assets/nuove_foto_1308/WN128_WAFER-ZERO-cacao-nocciola.png",
      inStock: true,
    },
    {
      flavor: "Caramello Salato e Cioccolato Bianco",
      size: "35g",
      image: "/attached_assets/nuove_foto_1308/WN161_wafer-zero-caramello-bianco-35-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Cocco fondente",
      size: "35g",
      image: "/attached_assets/nuove_foto_1308/WN129_wafer-zero-cocco-35-g_singolo.png",
      inStock: true,
    },
    {
      flavor: "Nocciola e Cioccolato Bianco",
      size: "35g",
      image: "/attached_assets/nuove_foto_1308/WN131_WAFER-ZERO-nocciola-cioccolato-bianco.png",
      inStock: true,
    },
    {
      flavor: "Pistacchio e Cioccolato Bianco",
      size: "35g",
      image: "/attached_assets/nuove_foto_1308/WN130_wafer-zero-pistacchio-35-g_singolo.png",
      inStock: true,
    },
  ],

  // === NUOVI 8 PRODOTTI BARRETTE ENERGETICHE ===
  // 1. Pancake Proteico
  "pancake-proteico-why-sport": [
    {
      flavor: "Originale",
      size: "1kg",
      image: "/images/products/W203_singolo_1751035188900.png",
      inStock: true,
    },
  ],

  // 2. 45 Protein Bar
  "45-protein-bar": [
    {
      flavor: "Cookies Crisp",
      size: "45g",
      image:
        "/attached_assets/nuove_foto/W237_45_Protein_Bar_cookies_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cookies Crisp",
      size: "24pz",
      image: "/attached_assets/nuove_foto/W237_box.png",
      inStock: true,
    },
    {
      flavor: "Cacao Crisp",
      size: "45g",
      image:
        "/attached_assets/nuove_foto_1308/W234_45_Protein_Bar_cacao_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cacao Crisp",
      size: "24pz",
      image: "/attached_assets/nuove_foto_1308/45-protein.bar-cacao.jpg",
      inStock: true,
    },
    {
      flavor: "Cocco Crisp",
      size: "45g",
      image:
        "/attached_assets/nuove_foto_1308/W235_45_Protein_Bar_cocco_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cocco Crisp",
      size: "24pz",
      image:
        "/attached_assets/nuove_foto_1308/W235_45_Protein_Bar_cocco_crisp.png",
      inStock: true,
    },
    {
      flavor: "Wafer Nocciola Crisp",
      size: "45g",
      image:
        "/attached_assets/nuove_foto_1308/W236_45_Protein_Bar_wafer_nocciola_crisp.png",
      inStock: true,
    },
    {
      flavor: "Wafer Nocciola Crisp",
      size: "24pz",
      image:
        "/attached_assets/nuove_foto_1308/45-protein-bar-wafer-nocciola-crisp.jpg",
      inStock: true,
    },
  ],

  // 3. 75 Protein Bar
  "75-protein-bar": [
    {
      flavor: "Cacao",
      size: "75g",
      image: "/attached_assets/nuove_foto_1308/W212_75_ProteinBar_cacao.png",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "24pz",
      image: "/attached_assets/nuove_foto_1308/75 protein bar gusto cacao.jpg",
      inStock: true,
    },
    {
      flavor: "Cacao Arancio",
      size: "75g",
      image:
        "/attached_assets/nuove_foto_1308/W238_75_ProteinBar_cacao_arancio_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cacao Arancio",
      size: "24pz",
      image:
        "/attached_assets/nuove_foto_1308/75 protein bar gusto cacao arancio.jpg",
      inStock: true,
    },
    {
      flavor: "Cappuccino",
      size: "75g",
      image:
        "/attached_assets/nuove_foto_1308/W239_75_ProteinBar_cappuccino_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cappuccino",
      size: "24pz",
      image:
        "/attached_assets/nuove_foto_1308/W239_75_ProteinBar_cappuccino_crisp.png",
      inStock: true,
    },
    {
      flavor: "Cocco",
      size: "75g",
      image: "/attached_assets/nuove_foto_1308/W211_75_ProteinBar_cocco.png",
      inStock: true,
    },
    {
      flavor: "Cocco",
      size: "24pz",
      image: "/attached_assets/nuove_foto_1308/W211_75_ProteinBar_cocco.png",
      inStock: true,
    },
    {
      flavor: "Cookies",
      size: "75g",
      image: "/attached_assets/nuove_foto_1308/W213_75_ProteinBar_cookies.png",
      inStock: true,
    },
    {
      flavor: "Cookies",
      size: "24pz",
      image: "/attached_assets/nuove_foto_1308/W213_75_ProteinBar_cookies.png",
      inStock: true,
    },
    {
      flavor: "Frutti di Bosco",
      size: "75g",
      image:
        "/images/products/W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png",
      inStock: true,
    },
    {
      flavor: "Frutti di Bosco",
      size: "24pz",
      image: "/images/products/W240_box_1751035219983.png",
      inStock: true,
    },
  ],

  // 4. Crema di Arachidi Iperproteica
  "crema-di-arachidi-iperproteica": [
    {
      flavor: "Crunchy",
      size: "350g",
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
      image: "/images/products/WN043_singolo_1751035979180.png",
      inStock: true,
    },
    {
      flavor: "Cacao",
      size: "1360g",
      image: "/images/products/WN043_singolo_1751035979180.png",
      inStock: true,
    },
  ],

  // 8. Promeal Energetica
  "promeal-energetica": [
    {
      flavor: "Mandorle",
      size: "40g",
      image: "/images/products/Promeal Energetica 40g_1751036384519.jpg",
      inStock: true,
    },
    {
      flavor: "Mandorle",
      size: "25pz",
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
      image: "/images/products/Promeal Energetica 40g_1751036384519.jpg",
      inStock: true,
    },
    {
      flavor: "Cocco",
      size: "20pz",
      image: "/images/products/Promeal Energetica 40g_1751036384519.jpg",
      inStock: true,
    },
  ],

  // === VITAMINE/MINERALI/ANTIOSSIDANTI - VARIANTI ===
  "ashwagandha-plus": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image: "/images/products/ashwagandha-2-1-300x548 (1)_1750781953158.png",
      inStock: true,
    },
  ],

  "ashwagandha-pura-watt": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image: "/attached_assets/nuove_foto/ASHWAGANDHA PURA_Fronte.jpg",
      inStock: true,
    },
  ],

  "astaxantina-softgel": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      image: "/images/products/astaxantina-softgel-advance-care.jpg",
      inStock: true,
    },
  ],

  "berberina-plus": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      image: "/attached_assets/nuove_foto/BERBERINA 60 CAPSULE_FRONTE.jpg",
      inStock: true,
    },
  ],

  "collagene-silicio-stabilizzato": [
    {
      flavor: "Naturale",
      size: "135g",
      image: "/attached_assets/nuove_foto/Collagene_Fronte.jpg",
      inStock: true,
    },
  ],

  "drenante-watt": [
    {
      flavor: "Naturale",
      size: "500ml",
      image: "/attached_assets/nuove_foto/WN122_singolo.png",
      inStock: true,
    },
  ],
  "fibra-watt": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      image: "/attached_assets/nuove_foto/FIBRA WATT_Fronte.jpg",
      inStock: true,
    },
  ],

  "hard-b-life-complex": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image:
        "/attached_assets/nuove_foto/HARD-B-LIFE-COMPLEX-SITO-300x411 (1).png",
      inStock: true,
    },
  ],

  "hard-dren-1000": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image: "/attached_assets/nuove_foto/HARD-DREN-SITO-300x411.png",
      inStock: true,
    },
  ],

  "hard-vitamin-complex": [
    {
      flavor: "Naturale",
      size: "90 compresse",
      image: "/attached_assets/nuove_foto/HARD-VITAMIN-SITO-300x411 (1).png",
      inStock: true,
    },
  ],

  "hepax-forte": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image: "/attached_assets/nuove_foto/HEPAX-FORTE-300x411 (1).png",
      inStock: true,
    },
  ],

  "joint-flex-d3-plus": [
    {
      flavor: "Naturale",
      size: "60 compresse",
      image: "/attached_assets/nuove_foto/JOINT-FLEX-sito-300x411.png",
      inStock: true,
    },
  ],

  "korean-red-ginseng": [
    {
      flavor: "Naturale",
      size: "100 compresse",
      image: "/images/products/korean-red-ginseng-5th-image.png",
      inStock: true,
    },
  ],

  "melatonine-plus": [
    {
      flavor: "Naturale",
      size: "90 compresse",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  // quantità

  "omega-3-egq": [
    {
      flavor: "Naturale",
      size: "180 capsule",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  "omega-3-xc-40-20-gold": [
    {
      flavor: "Naturale",
      size: "60 capsule",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
  ],

  "sali-activator-1-0-8": [
    {
      flavor: "Arancia Rossa",
      size: "600g",
      image: "/images/products/placeholder-vitamin.jpg",
      inStock: true,
    },
    {
      flavor: "Fragola Banana",
      size: "600g",
      image:
        "/attached_assets/nuove_foto/SALI ACTIVATOR FRAGOLA E BANANA_Fronte.jpg",
      inStock: true,
    },
  ],

  "sali-plus-electrolyte-pocket-minerals": [
    {
      flavor: "Limone",
      size: "40g",
      image: "/images/products/sali-electrolyte-pocket-limone-40g.jpg",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "18 bustine",
      image: "/images/products/sali-electrolyte-pocket-limone-18-bustine.webp",
      inStock: true,
    },
  ],

  // === PRE-WORKOUT - VARIANTI ===
  "adrenaline-agrumi-pre-workout": [
    {
      flavor: "Standard",
      size: "400g",
      image: "/images/products/adrenaline-agrumi-why-sport.png",
      inStock: true,
    },
  ],

  // === ENERGETICI - VARIANTI ===
  "complex-carbs-advanced-ratio": [
    {
      flavor: "Limone",
      size: "42g",
      image: "/images/products/COMPLEX CARBS_Fronte_1750781953162.jpg",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "Box 15 bustine",
      image:
        "/attached_assets/nuove_foto_ancora/complex-carbs-advanced-ratio-108-singola-bustina-aae3.webp",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "600g",
      image:
        "/attached_assets/nuove_foto_ancora/complex-carbs-advanced-ratio-108-d1d8.webp",
      inStock: true,
    },
  ],

  "liquid-carbo-flash-80": [
    {
      flavor: "Frutti di Bosco",
      size: "80ml",
      image:
        "/images/products/Liquid Carbo+ FLASH80 Frutti di bosco FRONTE_1750780343039.jpg",
      inStock: true,
    },
  ],

  "refuel-recovery": [
    {
      flavor: "Naturale",
      size: "750g",
      image: "/images/products/W172_box_1750778570187.png",
      inStock: true,
    },
  ],
};

// === ETHICSPORT PRODUCTS VARIANTI ===
export const ethicSportVariants: { [key: string]: ProductVariant[] } = {
  "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali": [
    {
      flavor: "Cacao",
      size: "500g",
      image:
        "/images/products/vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png",
      inStock: true,
    },
  ],

  "maltoshot-endurance-plus": [
    {
      flavor: "Mojito - Mint",
      size: "15 pz da 50 ml",
      image: "/attached_assets/nuove_foto_1308/img_627892_123848Malto-Shot-Endurance-Plus---Mojito-Mint---b_x.png",
      inStock: true,
    },
    {
      flavor: "Orange - Lemon",
      size: "15 pz da 50 ml",
      image: "/attached_assets/nuove_foto_1308/orange-lemon-maltoshot.png",
      inStock: true,
    },
  ],

  "eaa-amminoacidi-essenziali-solubili": [
    {
      flavor: "Limone",
      size: "300g",
      image: "/images/products/eaa-amminoacidi-essenziali-solubili.png",
      inStock: true,
    },
  ],

  "starter-1000": [
    {
      flavor: "Arancia Rossa",
      size: "400g",
      image: "/images/products/starter-1000.jpg",
      inStock: true,
    },
  ],

  "super-dextrin": [
    {
      flavor: "Sweet",
      size: "45g - 25 pz",
      image: "/images/products/super-dextrin-sweet.jpg",
      inStock: true,
    },
    {
      flavor: "Tasty",
      size: "45g - 25 pz",
      image: "/attached_assets/nuove_foto_1308/super-dextrin-tasty.jpg",
      inStock: true,
    },
  ],

  "super-dextrin-gel-pro": [
    {
      flavor: "Arancia",
      size: "60 ml - 15 pz",
      image: "/images/products/super-dextrin-gel-pro.png",
      inStock: true,
    },
    {
      flavor: "Limone",
      size: "60 ml - 15 pz",
      image: "/images/products/super-dextrin-gel-pro.png",
      inStock: true,
    },
  ],
};

// Funzione helper per ottenere le varianti di un prodotto
export function getProductVariants(
  productId: string,
): ProductWithVariants | null {
  return productVariantsDatabase[productId] || null;
}

// Funzione principale per ottenere array di varianti (per ProductVariantSelector)
export const getProductVariantsList = (
  productSlug: string,
): ProductVariant[] => {
  // Prima controlla le varianti EthicSport
  if (ethicSportVariants[productSlug]) {
    return ethicSportVariants[productSlug];
  }

  // Poi controlla le varianti vitamine e aminoacidi
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
  const product = getProductVariants(productId);
  if (!product) return null;

  return (
    product.variants.find((v) => v.flavor === flavor && v.size === size) || null
  );
}

// Funzione helper per ottenere tutti i gusti di un prodotto
export function getProductFlavors(productId: string): string[] {
  const product = getProductVariants(productId);
  if (!product) return [];

  return Array.from(new Set(product.variants.map((v) => v.flavor)));
}

// Funzione helper per ottenere tutti i formati di un prodotto
export function getProductSizes(productId: string, flavor?: string): string[] {
  const product = getProductVariants(productId);
  if (!product) return [];

  const variants = flavor
    ? product.variants.filter((v) => v.flavor === flavor)
    : product.variants;

  return Array.from(new Set(variants.map((v) => v.size)));
}
