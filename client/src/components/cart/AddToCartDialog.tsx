import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatEuropeanPrice, getProductVariants } from "@/lib/productVariants";
import { resolveOptionId, normalizeDisplay } from "@/utils/variantResolver";

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
  const initialVariants = product.variants ?? [];
  const [variantsState, setVariantsState] = useState<any[]>(initialVariants);
  const [quantity, setQuantity] = useState(product.initialQuantity ?? 1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(product.price);

  const hasVariants = variantsState.length > 0;

const availableVariants = variantsState.map((v: any) => {
  const rawId = (v.id ?? v.product_option_id);
  const numericId = typeof rawId === 'string' ? Number(rawId) : Number(rawId);
  const id = Number.isFinite(numericId)
    ? String(numericId)
    : String(`${(v.flavor ?? '').toString()} ${(v.size ?? '').toString()}`.replace(/Unico/gi, '').trim());
  const product_id = v.product_id ?? v.productId ?? null;
  const price = typeof v.price_cents === 'number'
    ? v.price_cents / 100
    : typeof v.price === 'number'
      ? v.price
      : 0;
  const inStock = (v.in_stock ?? v.inStock) !== false;
  const image = v.image;
  const display = `${(v.flavor ?? '').toString()} ${(v.size ?? '').toString()}`.replace(/Unico/gi, '').trim();
  return { id, numericId, product_id, display, price, inStock, image };
});



  useEffect(() => {
    if (!isOpen) return;

    setQuantity(product.initialQuantity ?? 1);

    const initialHasIds = variantsState.some((v: any) => {
      const raw = v.id ?? v.product_option_id;
      const n = typeof raw === 'string' ? Number(raw) : Number(raw);
      return Number.isFinite(n) && n > 0;
    });
    const shouldFetchOptions = !!product.slug && (!hasVariants || !initialHasIds);

    (async () => {
      if (shouldFetchOptions) {
        try {
          const res = await fetch(`/api/product/${product.slug}/options`);
          const data = res.ok ? await res.json() : null;
          if (Array.isArray(data) && data.length > 0) {
            setVariantsState(data);
            const first = data[0];
            const firstId = String((first.id ?? first.product_option_id) ?? `${first.flavor}-${first.size}`);
            const firstPrice = typeof first.price_cents === 'number' ? first.price_cents / 100 : first.price;
            setSelectedVariant(firstId);
            setSelectedPrice(firstPrice);
            return;
          }
        } catch (_) {}
      }

      if (availableVariants.length > 0) {
        const firstVariant = availableVariants[0];
        setSelectedVariant(firstVariant.id);
        setSelectedPrice(firstVariant.price);
      } else {
        setSelectedVariant(product.variant || '');
        setSelectedPrice(product.price);
      }
    })();
  }, [isOpen, product.id, hasVariants]);

  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId);
    const matchingVariant = availableVariants.find(v => v.id === variantId);
    if (matchingVariant) {
      setSelectedPrice(matchingVariant.price);
    }
  };

  const handleAddToCart = async () => {
    const selectedVariantData = availableVariants.find(v => v.id === selectedVariant);
    if (!selectedVariantData) {
      return onClose();
    }

    const tryParse = (val: any) => {
      const n = Number(val);
      return Number.isFinite(n) ? n : NaN;
    };

    let optionId = Number.isFinite(selectedVariantData.numericId)
      ? selectedVariantData.numericId
      : tryParse(selectedVariantData.id);
    if (!Number.isFinite(optionId) || optionId <= 0) {
      if (product.slug) {
        try {
          const resp = await fetch(`/api/product/${product.slug}/options`);
          if (resp.ok) {
            const opts = await resp.json();
            const resolved = resolveOptionId(opts, selectedVariantData.display);
            if (typeof resolved === 'number' && resolved > 0) optionId = resolved;
          }
        } catch (_) {}
      }
    }

    const fallbackProductId = Number(selectedVariantData.product_id ?? product.id);

    onAddToCart({
      product_option_id: Number.isFinite(optionId) && optionId > 0 ? optionId : 0,
      product_id: Number.isFinite(fallbackProductId) ? fallbackProductId : 0,
      slug: product.slug,
      name: product.name,
      price: selectedVariantData.price,
      variant: normalizeDisplay(selectedVariantData.display?.split(' ')[0], selectedVariantData.display?.split(' ').slice(1).join(' ')),
      quantity,
      image: selectedVariantData.image
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
          <DialogDescription className="sr-only">Seleziona variante e aggiungi al carrello</DialogDescription>
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
