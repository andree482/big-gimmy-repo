import { useState } from "react";
import { Link } from "wouter";
import { Heart, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useToast } from "@/hooks/use-toast";
import { getProductImagePath } from "@/lib/imageUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Favorites = () => {
  const { toast } = useToast();
  const [isUser] = useState(true); // Mock logged in state - replace with real auth
  const userId = isUser ? 1 : undefined; // Mock user ID
  
  const { 
    favorites, 
    isLoadingFavorites, 
    clearAllFavorites, 
    isClearingFavorites 
  } = useFavorites({ userId });

  const handleClearAll = async () => {
    try {
      await clearAllFavorites();
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };



  const getProductImage = (product: any) => {
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
    return "/images/products/placeholder-product.jpg";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Login required state
  if (!isUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-montserrat font-bold mb-4">
                Accesso Richiesto
              </h1>
              <p className="text-gray-600 mb-6">
                Devi essere loggato per visualizzare i tuoi prodotti preferiti.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">
                    Accedi al tuo Account
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/register">
                    Crea un Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#212121] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-white hover:bg-white/10"
            >
              <Link href="/prodotti">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna ai Prodotti
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold mb-4 sm:mb-6">
              I Tuoi <span className="text-[#FFD100]">Preferiti</span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg px-2">
              Tutti i prodotti che hai salvato per non perderli di vista
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoadingFavorites ? (
            // Loading State
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD100] mx-auto mb-4"></div>
              <p className="text-gray-600">Caricamento preferiti...</p>
            </div>
          ) : favorites.length === 0 ? (
            // Empty State
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-montserrat font-bold mb-4">
                  Nessun Preferito
                </h2>
                <p className="text-gray-600 mb-6">
                  Non hai ancora salvato nessun prodotto nei tuoi preferiti. 
                  Inizia a esplorare il nostro catalogo!
                </p>
                <Button asChild size="lg">
                  <Link href="/prodotti">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Scopri i Prodotti
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            // Favorites Content
            <>
              {/* Header with count and clear all */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-montserrat font-bold mb-2">
                    I Tuoi Preferiti
                  </h2>
                  <p className="text-gray-600">
                    {favorites.length} {favorites.length === 1 ? 'prodotto salvato' : 'prodotti salvati'}
                  </p>
                </div>
                
                {favorites.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={isClearingFavorites}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        {isClearingFavorites ? "Rimozione..." : "Rimuovi Tutti"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Conferma Rimozione</AlertDialogTitle>
                        <AlertDialogDescription>
                          Sei sicuro di voler rimuovere tutti i prodotti dai tuoi preferiti? 
                          Questa azione non può essere annullata.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annulla</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAll} className="bg-red-600 hover:bg-red-700">
                          Rimuovi Tutti
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product: any) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative">
                      <Link href={`/prodotti/${product.categorySlug || product.category_slug || 'proteine'}/${product.slug}`}>
                        <div className="aspect-square overflow-hidden bg-gray-100">
                          <img
                            src={getProductImage(product)}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEyMCIgeT0iMTIwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgcng9IjgiIGZpbGw9IiNFNUU3RUIiLz4KPHN0eWxlPi50ZXh0e2ZvbnQtZmFtaWx5OkFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHh9PC9zdHlsZT4KPHN0eWxlPi5pbWFnZS1ub3QtYXZhaWxhYmxle2ZpbGw6IzZCNzI4MH08L3N0eWxlPgo8dGV4dCB4PSIyMDAiIHk9IjI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgY2xhc3M9ImltYWdlLW5vdC1hdmFpbGFibGUiPkltbWFnaW5lIG5vbiBkaXNwb25pYmlsZTwvdGV4dD4KPC9zdmc+";
                            }}
                          />
                        </div>
                      </Link>
                      
                      {/* Favorite Button Overlay */}
                      <div className="absolute top-3 right-3">
                        <FavoriteButton 
                          productId={product.id} 
                          userId={userId}
                          size="sm"
                          className="bg-white/90 hover:bg-white shadow-md"
                        />
                      </div>

                      {/* New Badge */}
                      {product.isNew && (
                        <Badge className="absolute top-3 left-3 bg-[#FFD100] text-black hover:bg-[#FFD100]/90">
                          Nuovo
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      {/* Brand */}
                      <div className="text-sm text-gray-500 mb-1">
                        {product.brandName || product.brand_name || product.brand || 'BigGimmy'}
                      </div>

                      <Link href={`/prodotti/${product.categorySlug || product.category_slug || 'proteine'}/${product.slug}`}>
                        <h3 className="font-montserrat font-semibold text-lg mb-2 line-clamp-2 hover:text-[#FFD100] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 overflow-hidden">
                        {product.description && product.description.length > 90 
                          ? `${product.description.substring(0, 87)}...` 
                          : product.description || "Descrizione del prodotto non disponibile"}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {(() => {
                            const price = product.basePrice || product.price || product.min_price_cents;
                            if (price && price > 0) {
                              const displayPrice = price > 100 ? (price / 100) : price;
                              return (
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-500 mb-1">A partire da</span>
                                  <span className="text-lg font-bold text-[#FFD100]">
                                    €{displayPrice.toFixed(2)}
                                  </span>
                                </div>
                              );
                            } else {
                              return (
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-500 mb-1">A partire da</span>
                                  <span className="text-lg font-bold text-[#FFD100]">€19.90</span>
                                </div>
                              );
                            }
                          })()}
                        </div>
                        
                        <Button size="sm" asChild>
                          <Link href={`/prodotti/${product.categorySlug || product.category_slug || 'proteine'}/${product.slug}`}>
                            Dettagli
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12 py-8 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-montserrat font-bold mb-4">
                  Continua a Esplorare
                </h3>
                <p className="text-gray-600 mb-6">
                  Scopri altri prodotti fantastici nel nostro catalogo
                </p>
                <Button asChild size="lg">
                  <Link href="/prodotti">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Vai al Catalogo
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;