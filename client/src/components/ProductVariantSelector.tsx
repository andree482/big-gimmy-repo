import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Package, Palette } from "lucide-react";


interface ProductVariant {
  flavor: string;
  size: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

interface ProductVariantSelectorProps {
  productId: number;
  productName: string;
  variants: ProductVariant[];
  onVariantChange: (variant: ProductVariant) => void;
  className?: string;
}

export default function ProductVariantSelector({ 
  productId,
  productName, 
  variants, 
  onVariantChange,
  className = "" 
}: ProductVariantSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  // Ottieni gusti unici
  const availableFlavors = Array.from(new Set(variants.map(v => v.flavor)));

  // Ottieni formati disponibili per il gusto selezionato
  const availableSizes = selectedFlavor 
    ? Array.from(new Set(variants.filter(v => v.flavor === selectedFlavor).map(v => v.size)))
    : [];

  // Pre-carica tutte le immagini delle varianti per cambio istantaneo
  useEffect(() => {
    variants.forEach(variant => {
      if (variant.image && !preloadedImages.has(variant.image)) {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(variant.image));
        };
        img.src = variant.image;
      }
    });
  }, [variants, preloadedImages]);

  // Trova la variante corrente con cambio istantaneo
  useEffect(() => {
    if (selectedFlavor && selectedSize) {
      const variant = variants.find(v => 
        v.flavor === selectedFlavor && v.size === selectedSize
      );
      if (variant) {
        setCurrentVariant(variant);
        onVariantChange(variant);
      }
    }
  }, [selectedFlavor, selectedSize, variants, onVariantChange]);

  // Reset del formato quando cambia il gusto
  useEffect(() => {
    setSelectedSize("");
  }, [selectedFlavor]);

  // Seleziona automaticamente il primo gusto e formato disponibili
  useEffect(() => {
    if (availableFlavors.length > 0 && !selectedFlavor) {
      setSelectedFlavor(availableFlavors[0]);
    }
  }, [availableFlavors, selectedFlavor]);

  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes, selectedSize]);

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  const getFlavorColor = (flavor: string) => {
    const colorMap: { [key: string]: string } = {
      'Cacao': '#6B4226',
      'Cioccolato': '#6B4226',
      'Chocolate': '#6B4226',
      'Banana': '#FFE135',
      'Vaniglia': '#F3E5AB',
      'Vanilla': '#F3E5AB',
      'Fragola': '#FFB6C1',
      'Strawberry': '#FFB6C1',
      'Nocciola': '#8B4513',
      'Hazelnut': '#8B4513',
      'Cappuccino': '#D2B48C',
      'Coffee': '#D2B48C',
      'Cocco': '#F5F5DC',
      'Coconut': '#F5F5DC',
      'Natural': '#90EE90',
      'Naturale': '#90EE90',
      'Fior di Latte': '#F5F5DC',
      'Crema Nocciola': '#8B4513',
      'Moka': '#8B4513',
      'Cacao & Menta': '#4B8B3B',
      'Lampone': '#E30B5C',
      'Raspberry': '#E30B5C',
      'Limone': '#FFF700',
      'Lemon': '#FFF700',
      'Burro d\'Arachidi': '#D2B48C',
      'Peanut Butter': '#D2B48C',
      'Cookie Nocciola': '#CD853F',
      'Albicocca': '#FBCEB1',
      'Apricot': '#FBCEB1',
      'Frutti di Bosco': '#8B008B',
      'Berry': '#8B008B',
      'Agrumi': '#FFA500',
      'Citrus': '#FFA500',
      'Mela Verde': '#9ACD32',
      'Green Apple': '#9ACD32',
      'Ananas': '#FFFF99',
      'Pineapple': '#FFFF99',
      'Arachidi-Mandorle': '#DEB887',
      'Cheesecake': '#F5DEB3',
      'Caramello': '#D2691E',
      'Caramel': '#D2691E',
      'Crème Caramel': '#D2691E',
      'Zabaione': '#F4A460'
    };
    return colorMap[flavor] || '#9CA3AF';
  };

  // Mostra sempre la sezione varianti se esistono, anche per una sola variante
  if (variants.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Selezione Gusti - Solo se ci sono più gusti */}
      {availableFlavors.length > 1 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold flex items-center text-gray-800">
            <Palette className="h-4 w-4 mr-2" />
            Gusto
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFlavors.map((flavor) => (
              <Button
                key={flavor}
                variant={selectedFlavor === flavor ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFlavor(flavor)}
                className={`relative transition-all duration-200 ${
                  selectedFlavor === flavor 
                    ? 'bg-[#FFD100] text-black border-[#FFD100] shadow-md scale-105' 
                    : 'hover:border-[#FFD100] hover:text-[#FFD100]'
                }`}
                style={{
                  borderLeftColor: selectedFlavor === flavor ? getFlavorColor(flavor) : undefined,
                  borderLeftWidth: selectedFlavor === flavor ? '4px' : undefined
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2 border border-gray-300"
                  style={{ backgroundColor: getFlavorColor(flavor) }}
                />
                {flavor}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Selezione Formato/Quantità - Sempre visibile se ci sono varianti */}
      {availableSizes.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold flex items-center text-gray-800">
            <Package className="h-4 w-4 mr-2" />
            {availableFlavors.length > 1 ? "Formato" : "Quantità"}
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const variant = variants.find(v => v.flavor === selectedFlavor && v.size === size);
              return (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  disabled={!variant?.inStock}
                  className={`transition-all duration-200 ${
                    selectedSize === size 
                      ? 'bg-[#FFD100] text-black border-[#FFD100] shadow-md scale-105' 
                      : 'hover:border-[#FFD100] hover:text-[#FFD100]'
                  } ${!variant?.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {size}
                  {variant && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {formatPrice(variant.price)}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Prezzo e Disponibilità */}
      {currentVariant && (
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#FFD100]">
                {formatPrice(currentVariant.price)}
              </span>
              {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(currentVariant.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={currentVariant.inStock ? "default" : "destructive"}
                className={currentVariant.inStock ? "bg-green-100 text-green-800" : ""}
              >
                {currentVariant.inStock ? "Disponibile" : "Esaurito"}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-600">4.5</span>
              </div>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}