import { useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, Percent, Target, Store, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { CheckoutAuthModal } from "./CheckoutAuthModal";
import { CheckoutAddressModal } from "./CheckoutAddressModal";
import { CheckoutFulfillmentModal, STORE_INFO, type FulfillmentType, type PickupStore, type FatturaData } from "./CheckoutFulfillmentModal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CheckoutSummaryProps {
  cartTotal: number;
  itemCount: number;
}

const DISCOUNT_PERCENTAGE = 10;
const MINIMUM_ORDER = 50;
const FREE_SHIPPING_THRESHOLD = 160;

export default function CheckoutSummary({ cartTotal, itemCount }: CheckoutSummaryProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showFulfillmentModal, setShowFulfillmentModal] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>("spedizione");
  const [pickupStore, setPickupStore] = useState<PickupStore | null>(null);
  const [pendingFatturaData, setPendingFatturaData] = useState<FatturaData | undefined>(undefined);
  const { toast } = useToast();

  const calculations = useMemo(() => {
    const discountAmount = cartTotal * (DISCOUNT_PERCENTAGE / 100);
    const totalAfterDiscount = cartTotal - discountAmount;
    const amountNeeded = Math.max(0, MINIMUM_ORDER - totalAfterDiscount);
    const progressPercentage = totalAfterDiscount >= MINIMUM_ORDER ? 100 : Math.max(0, (totalAfterDiscount / MINIMUM_ORDER) * 100);
    const qualifiesForFreeShipping = totalAfterDiscount >= FREE_SHIPPING_THRESHOLD;
    const shippingNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAfterDiscount);
    const isPickup = fulfillmentType === 'ritiro';
    // TEST: spedizione sempre gratuita (commentare per ripristinare)
    const shippingCost = 0; // isPickup ? 0 : (qualifiesForFreeShipping ? 0 : 12);
    const freeShippingProgress = totalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 100 : Math.max(0, (totalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100);
    const finalTotal = totalAfterDiscount + shippingCost;

    return {
      discountAmount,
      totalAfterDiscount,
      amountNeeded,
      progressPercentage,
      qualifiesForFreeShipping,
      shippingNeeded,
      shippingCost,
      freeShippingProgress,
      finalTotal,
      // TEST: minimo d'ordine disabilitato (commentare per ripristinare)
      canCheckout: true, // totalAfterDiscount >= MINIMUM_ORDER
    };
  }, [cartTotal, fulfillmentType]);

  const doCheckout = async (body: Record<string, unknown>, fatturaData?: FatturaData) => {
    try {
      setLoadingCheckout(true);
      const resp = await apiRequest("POST", "/api/checkout", {
        ...body,
        ...(fatturaData ? { fattura_data: fatturaData } : {}),
      });
      const url = resp?.url;
      if (typeof url === "string" && url.length > 0) {
        sessionStorage.setItem('checkout_in_progress', 'true');
        window.location.href = url;
      } else {
        toast({ title: "Checkout non disponibile", description: "Configurare Stripe lato server" });
      }
    } catch (error) {
      console.error("Errore checkout:", error);
      toast({ title: "Errore", description: "Impossibile procedere al checkout", variant: "destructive" });
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (cartTotal === 0) {
    return (
      <div className="bg-gray-50 border rounded-lg p-6 text-center">
        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">Il tuo carrello è vuoto</p>
        <p className="text-sm text-gray-500 mt-1">Aggiungi prodotti per vedere il riepilogo</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-t-lg">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Riepilogo Ordine ({itemCount} {itemCount === 1 ? 'prodotto' : 'prodotti'})
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Totale originale */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotale:</span>
          <span className="font-medium">€{cartTotal.toFixed(2)}</span>
        </div>

        {/* Sconto */}
        <div className="flex justify-between items-center text-green-600 bg-green-50 p-3 rounded-lg">
          <span className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Sconto {DISCOUNT_PERCENTAGE}%:
          </span>
          <span className="font-semibold">-€{calculations.discountAmount.toFixed(2)}</span>
        </div>

        {/* Totale dopo sconto */}
        <div className="flex justify-between items-center border-t pt-3">
          <span className="text-gray-600">Totale (dopo sconto):</span>
          <span className="font-semibold">€{calculations.totalAfterDiscount.toFixed(2)}</span>
        </div>

        {/* Gestione spedizione dinamica */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Spedizione:</span>
            <span className="font-semibold">
              {fulfillmentType === 'ritiro' ? (
                <span className="text-green-600 font-bold">GRATIS (ritiro in negozio)</span>
              ) : calculations.qualifiesForFreeShipping ? (
                <span className="text-green-600 font-bold">Gratuita</span>
              ) : (
                <span>€{calculations.shippingCost.toFixed(2)}</span>
              )}
            </span>
          </div>

          {/* Frase motivazionale e barra progresso per spedizione gratuita (solo per spedizione) */}
          {fulfillmentType === 'spedizione' && !calculations.qualifiesForFreeShipping && calculations.canCheckout && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-blue-800 font-medium mb-2">
                    Ti mancano solo €{calculations.shippingNeeded.toFixed(2)} per ottenere la spedizione gratuita!
                  </p>

                  {/* Barra di progresso spedizione gratuita */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-700">
                      <span>Progresso verso spedizione gratuita</span>
                      <span>{calculations.freeShippingProgress.toFixed(0)}%</span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ease-out progress-bar"
                        style={{ width: `${calculations.freeShippingProgress}%` }}
                        role="progressbar"
                        aria-valuenow={calculations.freeShippingProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Progresso verso spedizione gratuita: ${calculations.freeShippingProgress.toFixed(0)}%`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conferma spedizione gratuita (solo per spedizione) */}
          {fulfillmentType === 'spedizione' && calculations.qualifiesForFreeShipping && calculations.canCheckout && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 text-green-800">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">🎉 Hai raggiunto la spedizione gratuita!</span>
              </div>
            </div>
          )}
        </div>

        {/* Info ritiro in negozio */}
        {fulfillmentType === 'ritiro' && pickupStore && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Store className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-800 font-semibold">{STORE_INFO[pickupStore].name}</p>
                <div className="flex items-center gap-1.5 text-sm text-blue-700 mt-1">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{STORE_INFO[pickupStore].address}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-blue-600 mt-0.5">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{STORE_INFO[pickupStore].hours}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Totale finale */}
        <div className="flex justify-between items-center text-lg font-bold border-t pt-3 bg-gray-50 -mx-6 px-6 py-4">
          <span>Totale finale:</span>
          <span className="text-2xl">€{calculations.finalTotal.toFixed(2)}</span>
        </div>

        {/* Controllo soglia minima */}
        {!calculations.canCheckout && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-800 font-medium mb-2">
                  Aggiungi ancora €{calculations.amountNeeded.toFixed(2)} per raggiungere l'ordine minimo e completare l'acquisto!
                </p>

                {/* Barra di progresso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-yellow-700">
                    <span>Progresso verso ordine minimo €{MINIMUM_ORDER}</span>
                    <span>{calculations.progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ease-out progress-bar"
                      style={{ width: `${calculations.progressPercentage}%` }}
                      role="progressbar"
                      aria-valuenow={calculations.progressPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progresso verso ordine minimo: ${calculations.progressPercentage.toFixed(0)}%`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Pulsante checkout */}
        <button
          disabled={!calculations.canCheckout || loadingCheckout}
          onClick={() => {
            if (!calculations.canCheckout) return;
            if (!isAuthenticated) {
              setShowAuthModal(true);
              return;
            }
            // Mostra il modal per scelta fulfillment (spedizione o ritiro)
            setShowFulfillmentModal(true);
          }}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
            calculations.canCheckout && !loadingCheckout
              ? 'bg-[#FFD100] hover:bg-yellow-500 text-black shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loadingCheckout
            ? "Elaborazione..."
            : calculations.canCheckout
              ? `Procedi al Pagamento - €${calculations.finalTotal.toFixed(2)}`
              : `Ordine minimo €${MINIMUM_ORDER}`
          }
        </button>

        {/* Modal per richiesta login */}
        <CheckoutAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          cartTotal={calculations.finalTotal}
          itemCount={itemCount}
        />

        {/* Modal per scelta fulfillment (spedizione o ritiro) */}
        <CheckoutFulfillmentModal
          isOpen={showFulfillmentModal}
          onClose={() => setShowFulfillmentModal(false)}
          cartTotal={calculations.finalTotal}
          shippingCost={calculations.shippingCost}
          onSelectShipping={(fatturaData?: FatturaData) => {
            setShowFulfillmentModal(false);
            setFulfillmentType('spedizione');
            setPickupStore(null);
            setPendingFatturaData(fatturaData);
            // Apri il modal per selezione indirizzo
            setShowAddressModal(true);
          }}
          onSelectPickup={async (store: PickupStore, notes: string, fatturaData?: FatturaData) => {
            setShowFulfillmentModal(false);
            setFulfillmentType('ritiro');
            setPickupStore(store);
            // Procedi direttamente al checkout (senza indirizzo)
            await doCheckout({
              fulfillment_type: 'ritiro',
              pickup_store: store,
              notes: notes,
            }, fatturaData);
          }}
        />

        {/* Modal per selezione indirizzo (solo spedizione) */}
        <CheckoutAddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          cartTotal={calculations.finalTotal}
          onConfirm={async (addressId: number, notes: string) => {
            setShowAddressModal(false);
            await doCheckout({
              shipping_address_id: addressId,
              fulfillment_type: 'spedizione',
              notes: notes,
            }, pendingFatturaData);
          }}
        />

        {/* Note aggiuntive */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>✓ Sconto {DISCOUNT_PERCENTAGE}% già applicato</p>
          <p>✓ Prezzi IVA inclusa</p>
          <p>✓ Spedizione gratuita da €{FREE_SHIPPING_THRESHOLD}</p>
          <p>✓ Ritiro in negozio sempre gratuito</p>
        </div>
      </div>
    </div>
  );
}
