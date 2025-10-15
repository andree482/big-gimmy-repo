import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatEuropeanPrice, getProductVariants } from "@/lib/productVariants";

interface AddToCartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string | number;
    name: string;
    price: number;
    image?: string;
    variant?: string;
    slug?: string;
    sizes?: any[];
    variants?: any[]; // Aggiunto per gestire varianti esplicite
  };
  onAddToCart: (product: any) => void;
}

export function AddToCartDialog({ isOpen, onClose, product, onAddToCart }: AddToCartDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(product.price);

  // Ottieni varianti del prodotto - usa variants esplicite se disponibili
  const variants = product.variants || (product.slug ? getProductVariants(product) : (product.sizes || []));
  const hasVariants = variants.length > 0;
  
  // Crea lista completa varianti con formato "Gusto + Grammatura"
  const availableVariants = hasVariants 
    ? variants.map(variant => ({
        id: `${variant.flavor}-${variant.size}`,
        display: `${variant.flavor} ${variant.size}`,
        flavor: variant.flavor,
        size: variant.size,
        price: variant.price,
        inStock: variant.inStock
      }))
    : [];

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      if (hasVariants && availableVariants.length > 0) {
        // Seleziona la prima variante disponibile
        const firstVariant = availableVariants[0];
        setSelectedVariant(firstVariant.id);
        setSelectedPrice(firstVariant.price > 100 ? firstVariant.price / 100 : firstVariant.price);
      } else {
        setSelectedVariant(product.variant || '');
        setSelectedPrice(product.price);
      }
    }
  }, [isOpen, product.id]); // Rimosso availableVariants per evitare loop infinito

  const handleVariantChange = (variantId: string) => {
    console.log('Variante selezionata:', variantId);
    setSelectedVariant(variantId);
    // Aggiorna il prezzo in base alla variante selezionata
    const matchingVariant = availableVariants.find(v => v.id === variantId);
    if (matchingVariant) {
      console.log('Variante trovata:', matchingVariant);
      setSelectedPrice(matchingVariant.price > 100 ? matchingVariant.price / 100 : matchingVariant.price);
    }
  };

  const handleAddToCart = () => {
    // Trova la variante selezionata completa
    const selectedVariantData = availableVariants.find(v => v.id === selectedVariant);
    
    console.log('AddToCartDialog - handleAddToCart chiamato');
    console.log('Variante selezionata:', selectedVariantData);
    console.log('Prezzo selezionato:', selectedPrice);
    console.log('Quantità:', quantity);
    
    onAddToCart({
      id: product.id,
      name: product.name,
      price: selectedPrice,
      variant: selectedVariantData ? selectedVariantData.display : (selectedVariant || 'Standard'),
      quantity: quantity,
      image: product.image
    });
    onClose();
  };

  const handleCancel = () => {
    setQuantity(1);
    setSelectedVariant('');
    onClose();
  };

  // Genera opzioni da 1 a 30
  const quantityOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Selezione Variante (solo se ha varianti) */}
          {availableVariants.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Variante</label>
              <Select value={selectedVariant} onValueChange={handleVariantChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona variante" />
                </SelectTrigger>
                <SelectContent>
                  {availableVariants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Selezione Quantità */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantità</label>
            <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona quantità" />
              </SelectTrigger>
              <SelectContent>
                {quantityOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prezzo Totale */}
          <div className="flex justify-between items-center py-4 border-t">
            <span className="text-lg font-semibold text-gray-900">Totale:</span>
            <span className="text-2xl font-bold text-[#FFD100]">
              {formatEuropeanPrice(selectedPrice * quantity)}
            </span>
          </div>

          {/* Bottoni */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
            >
              Annulla
            </Button>
            <Button
              className="flex-1 bg-[#FFD100] hover:bg-[#E6BC00] text-black font-semibold"
              onClick={handleAddToCart}
            >
              Aggiungi al Carrello
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}