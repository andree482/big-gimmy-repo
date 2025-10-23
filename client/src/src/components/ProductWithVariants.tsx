import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingBag, Package, Palette } from "lucide-react";
import { Link } from "wouter";

interface ProductVariant {
  id: number;
  variant_slug: string;
  flavor: string | null;
  quantity: string | null;
  size: string | null;
  image_path: string;
  price_cents: number | null;
  original_product_id: number;
}

interface BaseProduct {
  id: number;
  name: string;
  slug: string;
  brand_name: string;
  category_name: string;
  description: string;
  long_description: string;
  available_flavors: string[];
  available_quantities: string[];
  price_range_min: number;
  price_range_max: number;
  base_image: string;
}

interface ProductWithVariantsProps {
  baseProduct: BaseProduct;
}

export default function ProductWithVariants({ baseProduct }: ProductWithVariantsProps) {
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("/images/products/default.jpg");

  // Fetch varianti per questo prodotto base
  const { data: variants } = useQuery({
    queryKey: ['/api/base-product', baseProduct.slug, 'variants'],
    queryFn: async () => {
      const response = await fetch(`/api/base-product/${baseProduct.slug}/variants`);
      if (!response.ok) throw new Error('Failed to fetch variants');
      return response.json() as ProductVariant[];
    },
  });

  // Ottieni quantità disponibili dalle varianti
  const availableQuantities = variants && variants.length > 0 
    ? [...new Set(variants.map(v => v.quantity).filter(Boolean))]
    : [];

  // Ottieni gusti disponibili per la quantità selezionata
  const availableFlavors = selectedQuantity && variants
    ? [...new Set(variants.filter(v => v.quantity === selectedQuantity).map(v => v.flavor).filter(Boolean))]
    : variants && !selectedQuantity
    ? [...new Set(variants.map(v => v.flavor).filter(Boolean))]
    : [];

  // Trova la variante corrispondente alla selezione corrente
  const currentVariant = variants?.find(v => 
    v.quantity === selectedQuantity && v.flavor === selectedFlavor
  );

  // Aggiorna l'immagine istantaneamente quando cambia la variante
  useEffect(() => {
    // Cambio istantaneo senza delay
    const newImage = currentVariant?.image_path || 
                     baseProduct.base_image || 
                     "/images/products/default.jpg";
    setCurrentImage(newImage);
  }, [currentVariant, baseProduct]);

  // Reset del gusto quando cambia la quantità
  useEffect(() => {
    setSelectedFlavor("");
  }, [selectedQuantity]);

  // Auto-seleziona la prima quantità disponibile se non selezionata
  useEffect(() => {
    if (availableQuantities.length > 0 && !selectedQuantity) {
      setSelectedQuantity(availableQuantities[0]);
    }
  }, [availableQuantities, selectedQuantity]);

  // Auto-seleziona il primo gusto disponibile se non selezionato
  useEffect(() => {
    if (availableFlavors.length > 0 && !selectedFlavor) {
      setSelectedFlavor(availableFlavors[0]);
    }
  }, [availableFlavors, selectedFlavor]);

  const formatPrice = (cents: number) => {
    return `€${(cents / 100).toFixed(2)}`;
  };

  const getPriceDisplay = () => {
    if (currentVariant?.price_cents) {
      return formatPrice(currentVariant.price_cents);
    }
    if (baseProduct.price_range_min && baseProduct.price_range_min > 0) {
      return `A partire da ${formatPrice(baseProduct.price_range_min)}`;
    }
    // Fallback: prezzo predefinito
    return "A partire da €19.90";
  };

  return (
    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={currentImage}
          alt={baseProduct.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/images/products/default.jpg";
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {baseProduct.brand_name}
          </Badge>
        </div>
        {variants && variants.length > 1 && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 text-black">
              {variants.length} varianti
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
          {baseProduct.name}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
          {baseProduct.description && baseProduct.description.length > 90 
            ? `${baseProduct.description.substring(0, 87)}...` 
            : baseProduct.description || "Descrizione del prodotto non disponibile"}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Selettore Quantità */}
        {availableQuantities.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <Package className="h-4 w-4 mr-1" />
              Formato
            </label>
            <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona formato" />
              </SelectTrigger>
              <SelectContent>
                {availableQuantities.map((quantity) => (
                  <SelectItem key={quantity} value={quantity}>
                    {quantity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Selettore Gusto */}
        {selectedQuantity && availableFlavors.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <Palette className="h-4 w-4 mr-1" />
              Gusto
            </label>
            <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona gusto" />
              </SelectTrigger>
              <SelectContent>
                {availableFlavors.map((flavor) => (
                  <SelectItem key={flavor} value={flavor}>
                    {flavor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Scegli la tua variante - Prezzo e Disponibilità */}
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center text-gray-800">
              <span className="text-2xl mr-2">💰</span>
              Scegli la tua variante
            </label>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="space-y-3">
                {/* Prezzo specifico per prodotti */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#FFD100]">
                    {baseProduct.slug === 'korean-red-ginseng' ? '€24.90' :
                     baseProduct.slug === 'echinacea-purpurea' ? '€18.50' :
                     '€' + ((currentVariant?.price_cents || baseProduct.price_range_min || 0) / 100).toFixed(2)}
                  </span>
                </div>

                {/* Mostra gusti o quantità disponibili */}
                <div className="space-y-2">
                  {availableFlavors.length > 0 ? (
                    // Mostra gusti se disponibili
                    <div>
                      <span className="text-sm text-gray-600 mb-2 block">Gusti disponibili:</span>
                      <div className="flex flex-wrap gap-2">
                        {availableFlavors.map((flavor) => (
                          <span 
                            key={flavor}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border"
                          >
                            {flavor}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Mostra quantità se non ci sono gusti
                    <div>
                      <span className="text-sm text-gray-600 mb-2 block">Quantità disponibili:</span>
                      <div className="flex flex-wrap gap-2">
                        {availableQuantities.map((quantity) => (
                          <span 
                            key={quantity}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border"
                          >
                            {quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Indicatore di disponibilità generale */}
                <div className="pt-2 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stato disponibilità:</span>
                    <span className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-green-600 font-medium">Disponibile</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pulsante Azione */}
        <div className="pt-2">
          {currentVariant ? (
            <Link href={`/product/${currentVariant.variant_slug}`}>
              <Button className="w-full bg-[#FFD100] hover:bg-[#FFD100]/90 text-black font-semibold">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Vedi Dettagli
              </Button>
            </Link>
          ) : (
            <Button 
              className="w-full bg-gray-300 text-gray-600 cursor-not-allowed" 
              disabled
            >
              Seleziona variante
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}