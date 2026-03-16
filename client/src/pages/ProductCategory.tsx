import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { productCategories } from "@/lib/constants";
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
} from "lucide-react";
import { getProductImagePath } from "@/lib/imageUtils";
import { FavoriteButton } from "@/components/FavoriteButton";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import SearchBar from "@/components/SearchBar";
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

// Funzione per calcolare il prezzo minimo del prodotto - DATABASE COME UNICA FONTE


// Componente per la scheda prodotto
const ProductCard = ({
  product,
  categorySlug,
}: {
  product: any;
  categorySlug?: string;
  onSelectProduct: (product: any) => void;
}) => {
  const [showAddToCartDialog, setShowAddToCartDialog] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCartContext();
  const handleAddToCartFromDialog = (productData: any) => {
    addToCart(productData);
    setShowAddToCartDialog(false);
  };

  const priceForCart =
    product?.min_price_cents != null
      ? product.min_price_cents / 100
      : product?.basePrice != null
      ? product.basePrice / 100
      : typeof product?.price === 'number'
      ? (product.price > 100 ? product.price / 100 : product.price)
      : 0;

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
        {getMinimumPrice(product) > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
            -20% SCONTO
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Marca */}
        <div className="text-sm text-gray-500 mb-1">{getBrandName()}</div>

        {/* Nome prodotto */}
        <h3 className="font-bold text-lg mb-2 h-14 overflow-hidden">
          {product.product_group_name || product.name}
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
              const originalMinPrice = Math.round(minPrice / 0.8 * 100) / 100;
              return (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">
                    A partire da
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold text-[#FFD100]">
                      €{minPrice.toFixed(2)}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      €{originalMinPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">
                    Prezzo su richiesta
                  </span>
                  <span className="text-lg font-bold text-gray-600">
                    Contattaci
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
    price: priceForCart,
    image: getProductImage(),
    variants: getProductVariants(product),
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
  "aminoacidi-e-creatina": "aminoacidi-e-creatina",
  "dimagranti": "dimagranti",
  "pre-workout-energetici": "pre-workout-energetici",
  "merchandising-e-cosmetici": "merchandising-e-cosmetici",
  "supplementi": "supplementi",
  "alimenti-fit": "alimenti-fit",
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
    "aminoacidi-e-creatina": {
      title: "Aminoacidi e Creatina",
      description:
        "BCAA, EAA, aminoacidi essenziali e creatina per ottimizzare il recupero muscolare e migliorare le performance sportive.",
    },
    "dimagranti": {
      title: "Dimagranti",
      description:
        "Integratori brucia grassi e dimagranti.",
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
    "supplementi": {
      title: "Supplementi",
      description:
        "Integratori vitaminici e minerali essenziali per supportare il benessere generale, l'energia e le funzioni vitali dell'organismo.",
    },
    "pre-workout-energetici": {
      title: "Pre-workout/Energetici",
      description:
        "Carboidrati e fonti di energia per gli allenamenti intensi.",
    },
    "merchandising-e-cosmetici": {
      title: "Merchandising e Cosmetici",
      description:
        "Abbigliamento tecnico, guanti, cinture e accessori per allenarsi al meglio.",
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
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: '',
    brandSlug: 'all',
    priceRange: 'all',
    sortBy: 'name',
  });

  // Carica i prodotti dal database per la categoria usando il nuovo sistema di ricerca
  const {
    data: dbProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", params.category, searchFilters],
    queryFn: async () => {
      if (!params.category) return [];
      
      const params_query = new URLSearchParams();
      
      if (searchFilters.searchQuery) {
        params_query.append('search', searchFilters.searchQuery);
      }
      if (searchFilters.brandSlug !== 'all') {
        params_query.append('brand', searchFilters.brandSlug);
      }
      if (searchFilters.priceRange !== 'all') {
        params_query.append('priceRange', searchFilters.priceRange);
      }
      if (searchFilters.sortBy !== 'name') {
        params_query.append('sortBy', searchFilters.sortBy);
      }
      
      const url = params_query.toString() 
        ? `/api/products/${params.category}?${params_query}` 
        : `/api/products/${params.category}`;
      
      const response = await fetch(url);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!params.category,
    // Usa la configurazione globale di cache per aggiornamenti prezzi immediati
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

  // Handler per aggiornare i filtri di ricerca
  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
  };

  // I prodotti sono già filtrati e ordinati dal backend tramite la SearchBar
  const products = dbProducts;

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

      {/* Barra di ricerca per la categoria */}
      <div className="container mx-auto px-4 py-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder={`Cerca in ${currentCategory.name}...`}
          currentCategory={params.category}
          initialValues={searchFilters}
        />

        {/* Conteggio e risultati */}
        {!isLoading && !error && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">{products.length}</span> prodotti
                {searchFilters.searchQuery && (
                  <span> per "<span className="font-semibold">{searchFilters.searchQuery}</span>"</span>
                )}
              </p>
            </div>

            {/* Griglia prodotti */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{products.map((product: any) => (
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
          </>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">
              Si è verificato un errore nel caricamento dei prodotti.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#FFD100] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              Riprova
            </button>
          </div>
        )}
      </div>
    </div>
  );
}