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
    maxAvailable?: number; // Disponibilità totale nota
    isAvailable?: boolean; // Stato disponibilità generale
    initialQuantity?: number; // Quantità iniziale
  };
  onAddToCart: (product: any) => void;
}

export function AddToCartDialog({ isOpen, onClose, product, onAddToCart }: AddToCartDialogProps) {
  const initialVariants = product.variants ?? (product.slug ? getProductVariants(product) : (product.sizes || []));
  const [variantsState, setVariantsState] = useState<any[]>(initialVariants);
  const [quantity, setQuantity] = useState(product.initialQuantity ?? 1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(product.price);

  const hasVariants = variantsState.length > 0;

  const availableVariants = hasVariants
    ? variantsState.map(variant => ({
        id: `${variant.flavor}-${variant.size}`,
        display: `${variant.flavor} ${variant.size}`,
        flavor: variant.flavor,
        size: variant.size,
        price: variant.price,
        inStock: variant.inStock
      }))
    : [];

  useEffect(() => {
    if (!isOpen) return;

    setQuantity(product.initialQuantity ?? 1);

    // Se non ho varianti pronte e ho lo slug, provo a prendere le opzioni dal server (prezzi già in euro)
    if (!hasVariants && product.slug) {
      (async () => {
        try {
          const res = await fetch(`/api/product/${product.slug}/options`);
          const data = res.ok ? await res.json() : null;
          if (Array.isArray(data) && data.length > 0) {
            setVariantsState(data);
            const first = data[0];
            setSelectedVariant(`${first.flavor}-${first.size}`);
            setSelectedPrice(first.price);
            return;
          }
        } catch (_) {}
        // Fallback: nessuna variante disponibile
        setSelectedVariant(product.variant || '');
        setSelectedPrice(product.price);
      })();
    } else if (hasVariants && availableVariants.length > 0) {
      const firstVariant = availableVariants[0];
      setSelectedVariant(firstVariant.id);
      setSelectedPrice(firstVariant.price);
    } else {
      setSelectedVariant(product.variant || '');
      setSelectedPrice(product.price);
    }
  }, [isOpen, product.id]);

  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId);
    const matchingVariant = availableVariants.find(v => v.id === variantId);
    if (matchingVariant) {
      // Prezzo già in euro (sia endpoint server sia database statico)
      setSelectedPrice(matchingVariant.price);
    }
  };

  const handleAddToCart = () => {
    const selectedVariantData = availableVariants.find(v => v.id === selectedVariant);

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


  // Genera opzioni limitate dalla disponibilità
  const maxSelectable = typeof product.maxAvailable === 'number' && product.maxAvailable > 0 
    ? Math.min(product.maxAvailable, 30) 
    : 30;
  const quantityOptions = Array.from({ length: maxSelectable }, (_, i) => i + 1);

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
      {variant.display.replace(/Unico/gi, "").trim()}
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

          {/* Messaggi disponibilità */}
          {product.isAvailable === false && (
            <div className="text-sm text-red-700">Prodotto non disponibile.</div>
          )}
          {typeof product.maxAvailable === 'number' && quantity > (product.maxAvailable || 0) && (
            <div className="text-sm text-red-700">Quantità richiesta superiore alla disponibilità (max {product.maxAvailable}).</div>
          )}

          {/* Bottoni */}
          <div className="flex gap-3">
<Button variant="outline" onClick={onClose}>Annulla</Button>

            <Button
              className={`flex-1 font-semibold ${
                (product.isAvailable !== false && (typeof product.maxAvailable !== 'number' || quantity <= (product.maxAvailable || 0)))
                  ? 'bg-[#FFD100] text-black hover:bg-[#FFD100]/90'
                  : 'bg-[#FFD100] text-black opacity-50 cursor-not-allowed'
              }`}
              disabled={!(product.isAvailable !== false && (typeof product.maxAvailable !== 'number' || quantity <= (product.maxAvailable || 0)))}
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