import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { productCategories } from "@/lib/constants";
import SearchBar from "@/components/SearchBar";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getProductImagePath } from "@/lib/imageUtils";

// 🔹 Aggiunti import dal ProductCategory.tsx
import { useCartContext } from "@/components/cart/CartProvider";
import { AddToCartDialog } from "@/components/cart/AddToCartDialog";
import {
  getProductVariants,
  getDefaultVariant,
  getMinimumPrice,
} from "@/lib/productVariants";

// Componente per la scheda prodotto (ora con carrello e dialog)
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCartContext();

  const [showAddToCartDialog, setShowAddToCartDialog] = useState(false);

const handleAddToCartFromDialog = (productData: any) => {
  addToCart(productData);
  setShowAddToCartDialog(false);
};


  // Gestisce sia prodotti dal database che prodotti statici
  const getProductImage = () => {
    if (product.images && product.images.length > 0 && product.images[0].src) {
      return product.images[0].src;
    }

    if (product.primaryImage) {
      return product.primaryImage;
    }

    if (product.slug) {
      return getProductImagePath(product.slug);
    }

    if (product.id) {
      return getProductImagePath(product.id.toString());
    }

    return "/images/placeholder-product.jpg";
  };

  const getBrandName = () => {
    return product.brand_name || product.brand || "BigGimmy";
  };

  // Funzione per calcolare il prezzo minimo del prodotto
  const getMinPrice = (product: any) => {
    if (product.min_price_cents && product.min_price_cents > 0) {
      return product.min_price_cents / 100;
    }
    return null;
  };
// Prezzo da passare al dialog, sempre in euro
const priceForCart =
  product?.min_price_cents != null
    ? product.min_price_cents / 100
    : product?.basePrice != null
    ? product.basePrice / 100
    : typeof product?.price === 'number'
    ? (product.price > 100 ? product.price / 100 : product.price)
    : 0;

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
            priority={true}
            fetchpriority="high"
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
          {product.product_group_name || product.name}
        </h3>

        {/* Descrizione */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 overflow-hidden">
          {product.description && product.description.length > 90
            ? `${product.description.substring(0, 87)}...`
            : product.description ||
              "Descrizione del prodotto non disponibile"}
        </p>

        {/* Prezzo */}
        <div className="mb-4">
          {(() => {
            const minPrice = getMinPrice(product);
            if (minPrice && minPrice > 0) {
              return (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">
                    A partire da
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#FFD100]">
                      €{minPrice.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        €{product.originalPrice}
                      </span>
                    )}
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

        {/* 🔹 Pulsanti di azione (Aggiungi al Carrello + Dettagli + Preferiti) */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-[#FFD100] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200 text-center"
            onClick={() => setShowAddToCartDialog(true)}
          >
            Aggiungi al carrello
          </button>

          <Link
            href={`/prodotti/${product.category_slug}/${product.slug || product.id}`}
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

        {/* 🔹 Dialog per Aggiungi al Carrello */}
{/* 🔹 Dialog per Aggiungi al Carrello */}
{/* 🔹 Dialog per Aggiungi al Carrello */}
<AddToCartDialog
  isOpen={showAddToCartDialog}
  onClose={() => setShowAddToCartDialog(false)}
  product={{
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: priceForCart, // prezzo già normalizzato
    image: getProductImage(),
    variants: getProductVariants(product),
  }}
  onAddToCart={handleAddToCartFromDialog}
/>


      </div>
    </div>
  );
};

const Products = () => {
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: "",
    brandSlug: "all",
    priceRange: "all",
    sortBy: "name",
  });

  // Carica tutti i prodotti dal database
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "all", searchFilters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (searchFilters.searchQuery) {
        params.append("search", searchFilters.searchQuery);
      }
      if (searchFilters.brandSlug !== "all") {
        params.append("brand", searchFilters.brandSlug);
      }
      if (searchFilters.priceRange !== "all") {
        params.append("priceRange", searchFilters.priceRange);
      }
      if (searchFilters.sortBy !== "name") {
        params.append("sortBy", searchFilters.sortBy);
      }

      const url = params.toString()
        ? `/api/products?${params}`
        : "/api/products";
      const response = await fetch(url);
      if (!response.ok) return [];
      return response.json();
    },
  });

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Products Hero */}
      <section className="bg-[#212121] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold mb-4 sm:mb-6">
            I Nostri <span className="text-[#FFD100]">Prodotti</span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg px-2">
            Scopri la nostra selezione completa di integratori e accessori per
            il fitness di alta qualità.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            placeholder="Cerca in tutto il catalogo..."
          />

          {/* Quick Category Links */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Cerca per categoria</h2>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {productCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/prodotti/${category.slug}`}
                  className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
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

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">{products.length}</span>{" "}
                  prodotti
                  {searchFilters.searchQuery && (
                    <span>
                      {" "}
                      per "
                      <span className="font-semibold">
                        {searchFilters.searchQuery}
                      </span>
                      "
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {/* No Results */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nessun prodotto trovato
              </h3>
              <p className="text-gray-600">
                Prova a modificare i filtri di ricerca.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
