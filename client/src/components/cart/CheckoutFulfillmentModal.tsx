import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Store, MapPin, Clock, Edit } from "lucide-react";

export type FulfillmentType = "spedizione" | "ritiro";
export type PickupStore = "torino" | "aosta";

export const STORE_INFO: Record<PickupStore, { name: string; address: string; hours: string }> = {
  torino: {
    name: "Sede di Torino",
    address: "Corso Torino 85, Buttigliera Alta",
    hours: "Lun-Ven 09:30-12:30, 15:30-19:30",
  },
  aosta: {
    name: "Sede di Aosta",
    address: "Corso Saint-Martin-de-Corléans 55, Aosta",
    hours: "Lun-Ven 09-12:30, 15-19:30",
  },
};

interface CheckoutFulfillmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  shippingCost: number;
  onSelectShipping: () => void;
  onSelectPickup: (store: PickupStore, notes: string) => void;
}

export function CheckoutFulfillmentModal({
  isOpen,
  onClose,
  cartTotal,
  shippingCost,
  onSelectShipping,
  onSelectPickup,
}: CheckoutFulfillmentModalProps) {
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>("spedizione");
  const [pickupStore, setPickupStore] = useState<PickupStore>("torino");
  const [notes, setNotes] = useState("");
  const [acceptRecesso, setAcceptRecesso] = useState(false);

  const handleConfirm = () => {
    if (fulfillmentType === "spedizione") {
      onSelectShipping();
    } else {
      if (!acceptRecesso) return;
      onSelectPickup(pickupStore, notes);
    }
  };

  const displayTotal = fulfillmentType === "ritiro" ? cartTotal - shippingCost : cartTotal;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[#FFD100]" />
            Come vuoi ricevere il tuo ordine?
          </DialogTitle>
          <DialogDescription>
            Scegli tra spedizione a domicilio o ritiro gratuito in negozio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Scelta modalita */}
          <RadioGroup
            value={fulfillmentType}
            onValueChange={(value) => setFulfillmentType(value as FulfillmentType)}
          >
            {/* Opzione Spedizione */}
            <div
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                fulfillmentType === "spedizione"
                  ? "border-[#FFD100] bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setFulfillmentType("spedizione")}
            >
              <RadioGroupItem value="spedizione" id="fulfillment-spedizione" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-700" />
                  <Label htmlFor="fulfillment-spedizione" className="font-semibold text-base cursor-pointer">
                    Spedizione a domicilio
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {shippingCost > 0
                    ? `Costo spedizione: €${shippingCost.toFixed(2)}`
                    : "Spedizione gratuita"}
                </p>
              </div>
            </div>

            {/* Opzione Ritiro */}
            <div
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                fulfillmentType === "ritiro"
                  ? "border-[#FFD100] bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setFulfillmentType("ritiro")}
            >
              <RadioGroupItem value="ritiro" id="fulfillment-ritiro" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-gray-700" />
                  <Label htmlFor="fulfillment-ritiro" className="font-semibold text-base cursor-pointer">
                    Ritiro in negozio
                  </Label>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    GRATIS
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Ritira il tuo ordine presso una delle nostre sedi
                </p>
              </div>
            </div>
          </RadioGroup>

          {/* Selezione negozio (solo se ritiro) */}
          {fulfillmentType === "ritiro" && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Scegli il negozio</Label>
              <RadioGroup
                value={pickupStore}
                onValueChange={(value) => setPickupStore(value as PickupStore)}
              >
                {(Object.entries(STORE_INFO) as [PickupStore, typeof STORE_INFO.torino][]).map(
                  ([key, store]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        pickupStore === key
                          ? "border-[#FFD100] bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPickupStore(key)}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={key} id={`store-${key}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`store-${key}`} className="font-semibold cursor-pointer">
                            {store.name}
                          </Label>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{store.address}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{store.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
          )}

          {/* Campo note (solo se ritiro) */}
          {fulfillmentType === "ritiro" && (
            <div className="space-y-2 pt-2 border-t">
              <Label htmlFor="pickup-notes" className="text-sm font-medium flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Note per l'ordine (opzionale)
              </Label>
              <Textarea
                id="pickup-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Es: Verro a ritirare lunedi mattina..."
                rows={2}
                className="resize-none"
              />
            </div>
          )}

          {/* Checkbox diritto di recesso (solo se ritiro) */}
          {fulfillmentType === "ritiro" && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptRecessoPickup"
                  checked={acceptRecesso}
                  onCheckedChange={(checked) => setAcceptRecesso(checked === true)}
                  className="mt-1"
                />
                <Label htmlFor="acceptRecessoPickup" className="text-sm leading-relaxed cursor-pointer">
                  Ho letto e accetto le condizioni sul{" "}
                  <a
                    href="/diritto-recesso"
                    className="text-[#FFD100] hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Diritto di Recesso
                  </a>{" "}
                  *
                </Label>
              </div>
            </div>
          )}

          {/* Riepilogo prezzo */}
          {fulfillmentType === "ritiro" && shippingCost > 0 && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <p className="text-green-800 font-medium text-sm">
                Risparmi €{shippingCost.toFixed(2)} con il ritiro in negozio!
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Annulla
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={fulfillmentType === "ritiro" && !acceptRecesso}
            className="w-full sm:w-auto bg-[#FFD100] hover:bg-[#e6bc00] text-black font-semibold"
          >
            {fulfillmentType === "spedizione"
              ? `Scegli indirizzo - €${cartTotal.toFixed(2)}`
              : `Conferma ritiro - €${displayTotal.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
