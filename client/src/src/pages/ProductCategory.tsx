import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { productCategories } from "@/lib/constants";
import {
  proteinProducts,
  aminoacidProducts,
  type Product,
} from "@/lib/products";
import {
  ShoppingBag,
  MapPin,
  User,
  Truck,
  Calendar,
  Award,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  Heart,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { getProductImagePath } from "@/lib/imageUtils";
import { FavoriteButton } from "@/components/FavoriteButton";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

import { useToast } from "@/hooks/use-toast";
import { useCartContext } from "@/components/cart/CartProvider";
import { getProductVariants, getProductVariantsList, ProductVariant, getDefaultVariant, getMinimumPrice } from "@/lib/productVariants";
import { AddToCartDialog } from "@/components/cart/AddToCartDialog";




// Componente per il badge "Miglior Prezzo"
const BestPriceBadge = () => (
  <div className="bg-[#FFD100] text-black px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <Award className="h-3 w-3 mr-1" /> Miglior Prezzo
  </div>
);

// Badge per "Disponibilità Immediata"
const ImmediateAvailabilityBadge = () => (
  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <Check className="h-3 w-3 mr-1" /> Disponibile
  </div>
);

// Badge per "Spedizione Gratuita"
const FreeShippingBadge = () => (
  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <Truck className="h-3 w-3 mr-1" /> Spedizione Gratuita
  </div>
);

// Badge per "Nuovo Arrivo"
const NewArrivalBadge = () => (
  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <Calendar className="h-3 w-3 mr-1" /> Nuovo
  </div>
);

// Badge per "Consegna Rapida"
const FastDeliveryBadge = () => (
  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <Clock className="h-3 w-3 mr-1" /> Consegna 24h
  </div>
);

// Badge per "Staff Pick"
const StaffPickBadge = () => (
  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <User className="h-3 w-3 mr-1" /> Consigliato
  </div>
);

// Badge per "Prodotto Locale"
const LocalProductBadge = () => (
  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center">
    <MapPin className="h-3 w-3 mr-1" /> Valle d'Aosta
  </div>
);

// Componente per la scheda informativa dell'efficacia
const EffectivenessInfo = ({ product }: { product: any }) => {
  const [showInfo, setShowInfo] = useState(false);

  if (!product.effectiveness) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Info className="h-4 w-4 mr-1" />
        Efficacia {product.effectiveness}%
      </button>

      {showInfo && (
        <div className="absolute z-10 top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <h4 className="font-semibold text-sm mb-2">Efficacia del Prodotto</h4>
          <p className="text-xs text-gray-600 mb-2">
            Questo prodotto ha un'efficacia del {product.effectiveness}% basata
            su:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Studi clinici</li>
            <li>• Feedback degli utenti</li>
            <li>• Composizione degli ingredienti</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Funzione per calcolare il prezzo minimo del prodotto - importata da productVariants.ts

// Funzione per formattare prezzi in formato europeo (virgola + €)
const formatEuropeanPrice = (price: number | null | undefined): string => {
  if (!price || price <= 0) return "N/D";
  return `€${price.toFixed(2).replace('.', ',')}`;
};

// Funzione per ottenere le varianti disponibili - importata da productVariants.ts

// Funzione per ottenere la variante di default - importata da productVariants.ts

// Modal per selezione varianti - RIMOSSO
// Sostituito con AddToCartDialog unificato

// Modal per selezione prodotto - RIMOSSO
// Sostituito con AddToCartDialog unificato

// Componente per la scheda prodotto
const ProductCard = ({
  product,
  categorySlug,
  onSelectProduct,
}: {
  product: any;
  categorySlug?: string;
  onSelectProduct: (product: any) => void;
}) => {
  const [showAddToCartDialog, setShowAddToCartDialog] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCartContext();

  // Handler per aggiungere al carrello dal dialog - va alla pagina carrello
  const handleAddToCartFromDialog = (productData: any) => {
    addToCart(productData);
    setShowAddToCartDialog(false);
  };
  // Gestisce sia prodotti dal database che prodotti statici
  const getProductImage = () => {
    // Se il prodotto ha immagini nella struttura corretta (prodotti statici)
    if (product.images && product.images.length > 0 && product.images[0].src) {
      return product.images[0].src;
    }

    // Per prodotti dal database, usa primaryImage se disponibile
    if (product.primaryImage) {
      return product.primaryImage;
    }

    // Usa il sistema universale di gestione immagini per prodotti dal database
    if (product.slug) {
      return getProductImagePath(product.slug);
    }

    // Prova anche con l'ID se slug non è presente
    if (product.id) {
      return getProductImagePath(product.id.toString());
    }

    // Fallback finale
    return "/images/placeholder-product.jpg";
  };

  const getBrandName = () => {
    return product.brand_name || product.brand || "BigGimmy";
  };



  // Funzioni helper per varianti prodotto importate da productVariants.ts

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative p-4 bg-white">
        <div className="flex items-center justify-center h-64">
          <OptimizedImage
            src={getProductImage()}
            alt={product.name}
            className="w-full h-full bg-white rounded-md"
            placeholder="/images/placeholder-product.jpg"
            width={300}
            height={256}
            objectFit="contain"
            objectPosition="center center"
          />
        </div>
        {product.isBestSeller && (
          <div className="absolute top-6 left-6 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold uppercase z-10">
            Best Seller
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-6 right-6 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold uppercase z-10">
            Novità
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Marca */}
        <div className="text-sm text-gray-500 mb-1">{getBrandName()}</div>

        {/* Nome prodotto */}
        <h3 className="font-bold text-lg mb-2 h-14 overflow-hidden">
          {product.name}
        </h3>

        {/* Descrizione */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 overflow-hidden">
          {product.description && product.description.length > 90
            ? `${product.description.substring(0, 87)}...`
            : product.description || "Descrizione del prodotto non disponibile"}
        </p>

        {/* Badge di caratteristiche */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.bestPrice && <BestPriceBadge />}
          {product.immediateAvailability && <ImmediateAvailabilityBadge />}
          {product.freeShipping && <FreeShippingBadge />}
          {product.newArrival && <NewArrivalBadge />}
          {product.fastDelivery && <FastDeliveryBadge />}
          {product.staffPick && <StaffPickBadge />}
          {product.localProduct && <LocalProductBadge />}
        </div>

        {/* Prezzo */}
        <div className="mb-4">
          {(() => {
            const minPrice = getMinimumPrice(product);
            if (minPrice && minPrice > 0) {
              return (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">
                    A partire da
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#FFD100]">
                      {formatEuropeanPrice(minPrice)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatEuropeanPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              );
            } else {
              // Prezzi specifici per prodotti proteine
              if (categorySlug === "proteine") {
                const proteinPrices: { [key: string]: number } = {
                  // Prezzi rimossi per utilizzare quelli dal database
                };

                const specificPrice =
                  proteinPrices[product.slug] || proteinPrices[product.id];
                if (specificPrice) {
                  return (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 mb-1">
                        A partire da
                      </span>
                      <span className="text-2xl font-bold text-[#FFD100]">
                        {formatEuropeanPrice(specificPrice)}
                      </span>
                    </div>
                  );
                }
              }

              if (categorySlug === "aminoacidi") {
                // Prezzi specifici per prodotti aminoacidi basati sui loro ID/slug
                const aminoacidPrices: { [key: string]: number } = {
                  "aminoacidi-essenziali-plus-polvere": 24.9,
                  "aminoacidi-plus": 19.9,
                  "aminotool-eaa": 28.9,
                  argin: 22.5,
                  "arginina-plus-complex-capsule": 18.9,
                  "bcaa-1000-b6": 21.9,
                  "bcaa-liquid-carbo-plus": 25.9,
                  "bcaa-ride-gel-plus": 31.9,
                  "bcaa-supreme-4-1-1": 29.9,
                  "bcaa-plus-8-1-1-nuovo": 26.9,
                  "bcaa-plus-8-1-1-polvere": 24.9,
                  "d-glucosio": 15.9,
                  "essential-amino-9-3": 32.9,
                  "essenziali-zero-carb": 28.9,
                  glutamass: 18.9,
                  "glutammina-pure": 16.9,
                  "glutammina-plus-polvere": 19.9,
                  "hard-beta-alanine": 23.9,
                  "high-bcaa-2-1-1": 27.9,
                  norincol: 24.9,
                  "pocket-carnitine": 12.9,
                  "rm1-bcaa-8-1-1-recovery-mix": 35.9,
                  "volamin-bcaa": 22.9,
                  "volamin-powder": 26.9,
                };

                const specificPrice =
                  aminoacidPrices[product.slug] || aminoacidPrices[product.id];
                if (specificPrice) {
                  return (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 mb-1">
                        A partire da
                      </span>
                      <span className="text-2xl font-bold text-[#FFD100]">
                        {formatEuropeanPrice(specificPrice)}
                      </span>
                    </div>
                  );
                }
              }

              // Fallback generico per altri prodotti
              const fallbackPrice =
                product.price || product.basePrice || product.min_price_cents;
              if (fallbackPrice && fallbackPrice > 0) {
                const displayPrice =
                  fallbackPrice > 100 ? fallbackPrice / 100 : fallbackPrice;
                return (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">
                      A partire da
                    </span>
                    <span className="text-2xl font-bold text-[#FFD100]">
                      {formatEuropeanPrice(displayPrice)}
                    </span>
                  </div>
                );
              }
              return (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">
                    A partire da
                  </span>
                  <span className="text-2xl font-bold text-[#FFD100]">
                    €19,90
                  </span>
                </div>
              );
            }
          })()}
        </div>

        {/* Pulsante di azione */}
        <div className="flex gap-2">
          {(() => {
            const defaultVariant = getDefaultVariant(product);
            const variants = getProductVariants(product);
            const minPrice = getMinimumPrice(product);
            
            const productPrice = defaultVariant?.price 
              ? (defaultVariant.price > 100 ? defaultVariant.price / 100 : defaultVariant.price)
              : minPrice || 19.90;
            
            const flavors = variants.filter(v => v.flavor).map(v => v.flavor);
            const sizes = variants.filter(v => v.size).map(v => v.size);
            
            return (
              <>
                <button
                  className="flex-1 bg-[#FFD100] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200 text-center"
                  onClick={() => setShowAddToCartDialog(true)}
                >
                  Aggiungi al carrello
                </button>

              </>
            );
          })()}
          <Link
            href={`/prodotti/${categorySlug}/${product.slug || product.id}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-md transition-colors duration-200 text-center"
          >
            Dettagli
          </Link>
          <FavoriteButton
            productId={product.id}
            variant="icon"
            size="md"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-2 rounded-md transition-colors duration-200"
          />
        </div>



      </div>
      
      {/* Dialog unificato per Aggiungi al Carrello */}
      <AddToCartDialog
        isOpen={showAddToCartDialog}
        onClose={() => setShowAddToCartDialog(false)}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: getProductImage(),
          variants: getProductVariants(product)
        }}
        onAddToCart={handleAddToCartFromDialog}
      />
    </div>
  );
};

const categoryImageMappings: { [key: string]: { [key: string]: string } } = {
  proteine: {
    // Mappatura immagini proteine
    "barrettone-2-0": "/images/products/04-barrettone-cacao.jpg",
    "big-bar": "/images/products/06-big-bar-cocco.jpg",
    "burn-out": "/images/products/01-burn-out-lampone.jpg",
    "carbo-energy-plus": "/images/products/08-carbo-energy-albicocca.jpg",
    fruitforce: "/images/products/12-fruitforce-fragola.jpg",
    "grissini-proteici":
      "/images/products/14-grissini-proteici-arachidi-mandorle.jpg",
    "iso-soya": "/images/products/15-iso-soya-premier.jpg",
    "light-protein-plus-bar":
      "/images/products/16-light-protein-bar-cheesecake.jpg",
    "milk-protein-90-micellar-casein":
      "/images/products/milk-protein-90-banana.png",
    "pistacchio-crema-proteica":
      "/images/products/Pistacchio 250 g FRONTE_1750183611177.jpg",
    "premier-pancake": "/images/products/Pancake-300x411_1750183591622.png",
    "protein-evo-cocco": "/images/products/Protein+ EVO cocco FRONTE.jpg",
    "protein-evo-creme-caramel":
      "/images/products/Protein+ EVO crème caramel FRONTE.jpg",
    "top-eggxellent-protein":
      "/images/products/TOP EGGXELLENT PROTEIN_CACAO_Fronte_1749996078038.jpg",
    "whey-protein-80": "/images/products/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
    "whey-protein-90": "/images/products/WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
    "wheyghty-protein-80-standard":
      "/images/products/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
    "wheyghty-protein-80-limited-edition":
      "/images/products/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
    "wpc-100": "/images/products/wpc-100-cookies-cream.jpg",
    "xxx-hydrolysed-protein-90":
      "/images/products/XXX HYDROLYSED 750 g Cacao Fronte_1749996348004.jpg",
  },
  "vitamine-e-minerali": {
    // Mappatura immagini vitamine e minerali
    "sali-activator-plus-watt":
      "/images/products/ELECTROLYTE_Arancia_Fronte.jpg",
    "sali-electrolyte-plus-watt":
      "/images/products/ELECTROLYTE_Limone_Fronte.jpg",
    "sali-performance-electrolyte-plus-watt":
      "/images/products/ENERGY PUMP_Limone_Fronte.jpg",
    "sali-electrolyte-pocket-minerals-plus-watt":
      "/images/products/FLUID CRAMP_Arancia_Fronte.jpg",
  },
};

const categoryMappings: { [key: string]: string } = {
  proteine: "proteine",
  aminoacidi: "aminoacidi",
  "pre-workout": "pre-workout",
  creatina: "creatina",
  accessori: "accessori",
  "vitamine-e-minerali": "vitamine-e-minerali",
};

const getCategoryInfo = (slug: string) => {
  const categoryInfo: {
    [key: string]: { title: string; description: string };
  } = {
    proteine: {
      title: "Proteine",
      description:
        "Scopri la nostra selezione di proteine del siero del latte, caseine e proteine isolate per supportare la crescita muscolare e il recupero post-allenamento.",
    },
    aminoacidi: {
      title: "Aminoacidi",
      description:
        "BCAA, EAA e aminoacidi essenziali per ottimizzare il recupero muscolare e migliorare le performance sportive.",
    },
    "pre-workout": {
      title: "Pre-Workout",
      description:
        "Integratori energetici e stimolanti per massimizzare l'intensità e la concentrazione durante l'allenamento.",
    },
    creatina: {
      title: "Creatina",
      description:
        "Creatina monoidrato e altre forme avanzate per aumentare forza, potenza e resistenza muscolare.",
    },
    accessori: {
      title: "Accessori",
      description:
        "Shaker, abbigliamento e accessori essenziali per il tuo percorso fitness.",
    },
    "vitamine-e-minerali": {
      title: "Vitamine e Minerali",
      description:
        "Integratori vitaminici e minerali essenziali per supportare il benessere generale, l'energia e le funzioni vitali dell'organismo.",
    },
  };

  return (
    categoryInfo[slug] || {
      title: "Prodotti",
      description: "Scopri i nostri prodotti",
    }
  );
};

export default function ProductCategory() {
  const params = useParams<{ category: string }>();
  const [location] = useLocation();
  const [sortBy, setSortBy] = useState<string>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const { addToCart } = useCartContext();

  // Carica i prodotti dal database per la categoria
  const {
    data: dbProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", params.category],
    queryFn: async () => {
      if (!params.category) return [];
      const response = await fetch(`/api/products/${params.category}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!params.category,
    staleTime: 5 * 60 * 1000, // 5 minuti cache
    gcTime: 10 * 60 * 1000, // 10 minuti in background
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Trova la categoria corrente
  const currentCategory = productCategories.find(
    (cat) => cat.slug === params.category,
  );

  // Se la categoria non esiste, mostra errore 404
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Categoria non trovata
          </h1>
          <p className="text-gray-600 mb-4">
            La categoria richiesta non esiste.
          </p>
          <Link
            href="/prodotti"
            className="inline-block bg-[#FFD100] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
          >
            Torna ai Prodotti
          </Link>
        </div>
      </div>
    );
  }

  // Combina prodotti dal database con prodotti statici se necessario
  const getAllProducts = () => {
    let staticProducts: Product[] = [];

    // Aggiungi prodotti statici in base alla categoria (se esistenti)
    switch (params.category) {
      case "proteine":
        staticProducts = proteinProducts;
        break;
      case "aminoacidi":
        staticProducts = aminoacidProducts;
        break;
      default:
        staticProducts = [];
    }

    // Combina prodotti dal database e statici
    return [...dbProducts, ...staticProducts];
  };

  const allProducts = getAllProducts();

  // Funzioni di filtro
  const filteredProducts = allProducts.filter((product) => {
    // Filtro per brand - controlla sia product.brand che product.brand_name
    if (selectedBrand !== "all") {
      const productBrand = product.brand_name || product.brand || "";
      if (productBrand !== selectedBrand) return false;
    }

    // Filtro per prezzo - usa il prezzo minimo del prodotto
    if (priceRange !== "all") {
      const price = getMinimumPrice(product);
      if (price !== null) {
        switch (priceRange) {
          case "0-25":
            if (price > 25) return false;
            break;
          case "25-50":
            if (price < 25 || price > 50) return false;
            break;
          case "50-100":
            if (price < 50 || price > 100) return false;
            break;
          case "100+":
            if (price < 100) return false;
            break;
        }
      }
    }

    return true;
  });

  // Funzioni di ordinamento
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (getMinimumPrice(a) || 0) - (getMinimumPrice(b) || 0);
      case "price-desc":
        return (getMinimumPrice(b) || 0) - (getMinimumPrice(a) || 0);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Ottieni brand unici per il filtro
  const uniqueBrands = Array.from(
    new Set(
      allProducts
        .map((p) => p.brand_name || p.brand)
        .filter(Boolean)
    )
  ).sort();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="h-10 bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Categoria non trovata
        </h1>
        <p className="text-gray-600">La categoria richiesta non esiste.</p>
        <Link
          href="/products"
          className="inline-block mt-4 bg-[#FFD100] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          Torna ai Prodotti
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header della categoria */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{currentCategory.name}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filtri e ordinamento */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Filtri{" "}
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <span className="text-gray-600">
              {sortedProducts.length} prodotti
            </span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Ordina per:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              <option value="name">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
              <option value="price-asc">Prezzo: Basso → Alto</option>
              <option value="price-desc">Prezzo: Alto → Basso</option>
            </select>
          </div>
        </div>

        {/* Pannello filtri */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Filtro per marca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="all">Tutte le marche</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro per prezzo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fascia di prezzo
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="all">Tutti i prezzi</option>
                  <option value="0-25">€0 - €25</option>
                  <option value="25-50">€25 - €50</option>
                  <option value="50-100">€50 - €100</option>
                  <option value="100+">€100+</option>
                </select>
              </div>

              {/* Reset filtri */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedBrand("all");
                    setPriceRange("all");
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Reset Filtri
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Griglia prodotti */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                categorySlug={params.category}
                onSelectProduct={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nessun prodotto trovato
            </h3>
            <p className="text-gray-600">
              Prova a modificare i filtri di ricerca.
            </p>
          </div>
        )}
      </div>
      
      {/* Modal per selezione prodotto - RIMOSSO */}
      {/* Sostituito con AddToCartDialog unificato */}
    </div>
  );
}