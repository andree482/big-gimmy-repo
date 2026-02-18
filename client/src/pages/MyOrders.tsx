import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, AlertCircle, ChevronDown, ShoppingBag, ArrowLeft, ExternalLink, Truck, MapPin, FileText, CreditCard, Loader2, Download, Store } from "lucide-react";
import { STORE_INFO, type PickupStore } from "@/components/cart/CheckoutFulfillmentModal";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

interface OrderItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image?: string | null;
}

interface ShippingAddress {
  firstName?: string;
  lastName?: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country?: string;
}

interface Order {
  id: string;
  stripeSessionId?: string | null;
  total: number;
  status: string;
  items: OrderItem[];
  shippingAddress?: ShippingAddress | null;
  billingAddress?: any;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  fulfillmentType?: string;
  pickupStore?: string;
}

const formatPrice = (cents: number) => {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Tronca l'ID ordine a 8 caratteri per la visualizzazione
const shortenOrderId = (id: string) => {
  if (!id) return '';
  return id.toString().substring(0, 8).toUpperCase();
};

// Corrieri supportati con i loro URL di tracciamento
const carrierOptions: Record<string, { label: string; trackingUrl: string; trackingSuffix?: string }> = {
  bartolini: { label: "BRT (Bartolini)", trackingUrl: "https://www.mybrt.it/it/mybrt/my-parcels/search?lang=it&parcelNumber=" },
  gls: { label: "GLS", trackingUrl: "https://gls-group.com/IT/it/servizi-online/ricerca-spedizioni/?match=", trackingSuffix: "&type=NAT" },
  dhl: { label: "DHL", trackingUrl: "https://www.dhl.com/it-it/home/tracking.html?tracking-id=" },
  ups: { label: "UPS", trackingUrl: "https://www.ups.com/track?tracknum=", trackingSuffix: "&loc=it_IT&requester=ST/trackdetails" },
  sda: { label: "SDA", trackingUrl: "https://www.poste.it/cerca/index.html?#/risultati-spedizioni/" },
  poste_italiane: { label: "Poste Italiane", trackingUrl: "https://www.poste.it/cerca/index.html?#/risultati-spedizioni/" },
  fedex: { label: "FedEx", trackingUrl: "https://www.fedex.com/fedextrack/no-results-found?trknbr=" },
  tnt: { label: "TNT", trackingUrl: "https://www.tnt.com/express/it_it/site/shipping-tools/tracking.html?searchType=con&cons=" },
};

function getTrackingUrl(carrier: string | null, trackingNumber: string | null): string | null {
  if (!carrier || !trackingNumber) return null;
  const carrierInfo = carrierOptions[carrier];
  if (carrierInfo) {
    const suffix = carrierInfo.trackingSuffix || '';
    return carrierInfo.trackingUrl + trackingNumber + suffix;
  }
  return null;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'pagato':
      return {
        label: 'Pagato',
        icon: CheckCircle,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-300',
        accentColor: 'bg-green-500'
      };
    case 'in_attesa_di_pagamento':
      return {
        label: 'In attesa di pagamento',
        icon: Clock,
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-300',
        accentColor: 'bg-amber-500'
      };
    case 'spedito':
      return {
        label: 'Spedito',
        icon: Truck,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-300',
        accentColor: 'bg-purple-500'
      };
    case 'in_attesa_di_consegna':
      return {
        label: 'In attesa di consegna',
        icon: Truck,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-300',
        accentColor: 'bg-blue-500'
      };
    case 'consegnato':
      return {
        label: 'Consegnato',
        icon: CheckCircle,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-300',
        accentColor: 'bg-green-500'
      };
    case 'pronto_per_ritiro':
      return {
        label: 'Pronto per il ritiro',
        icon: Store,
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-300',
        accentColor: 'bg-orange-500'
      };
    case 'cancellato':
      return {
        label: 'Cancellato',
        icon: AlertCircle,
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-300',
        accentColor: 'bg-red-500'
      };
    case 'fallito':
      return {
        label: 'Fallito',
        icon: AlertCircle,
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-300',
        accentColor: 'bg-red-500'
      };
    case 'richiesta_di_rimborso':
      return {
        label: 'Richiesta di rimborso',
        icon: Clock,
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-300',
        accentColor: 'bg-orange-500'
      };
    case 'rimborsato':
      return {
        label: 'Rimborsato',
        icon: Package,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300',
        accentColor: 'bg-gray-500'
      };
    default:
      return {
        label: status,
        icon: Package,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300',
        accentColor: 'bg-gray-500'
      };
  }
};

function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);
  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const trackingUrl = getTrackingUrl(order.carrier, order.trackingNumber);
  const carrierLabel = order.carrier ? carrierOptions[order.carrier]?.label || order.carrier : null;

  // Verifica se l'ordine ha una fattura scaricabile (ordini pagati)
  const canDownloadInvoice = ['pagato', 'spedito', 'in_attesa_di_consegna', 'consegnato', 'pronto_per_ritiro'].includes(order.status);

  // Verifica se l'ordine è in attesa di pagamento
  const isPendingPayment = order.status === 'in_attesa_di_pagamento';
  const orderCreatedAt = new Date(order.createdAt).getTime();
  const tenMinutesInMs = 10 * 60 * 1000;

  // Timer in tempo reale
  useEffect(() => {
    if (!isPendingPayment) return;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - orderCreatedAt;
      const remaining = tenMinutesInMs - elapsed;

      if (remaining <= 0) {
        setRemainingTime(null);
        setIsTimerExpired(true);
        return false;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      setIsTimerExpired(false);
      return true;
    };

    // Aggiorna subito
    const shouldContinue = updateTimer();
    if (!shouldContinue) return;

    // Poi ogni secondo
    const interval = setInterval(() => {
      const shouldContinue = updateTimer();
      if (!shouldContinue) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPendingPayment, orderCreatedAt]);

  const canCompletePayment = isPendingPayment && !isTimerExpired && order.stripeSessionId;

  const handleCompletePayment = async () => {
    setIsLoadingCheckout(true);
    setCheckoutError(null);

    try {
      const response = await apiRequest("GET", `/api/orders/${order.id}/checkout-url`);
      if (response.success && response.checkoutUrl) {
        // Imposta flag per mostrare pop-up se l'utente torna senza completare
        sessionStorage.setItem('checkout_in_progress', 'true');
        window.location.href = response.checkoutUrl;
      } else {
        setCheckoutError(response.message || "Impossibile recuperare il link di pagamento");
      }
    } catch (error: any) {
      setCheckoutError(error.message || "Errore durante il recupero del link di pagamento");
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setIsLoadingInvoice(true);
    setInvoiceError(null);

    try {
      const response = await apiRequest("GET", `/api/orders/${order.id}/invoice`);
      if (response.success && response.invoicePdfUrl) {
        // Apri il PDF in una nuova tab
        window.open(response.invoicePdfUrl, '_blank');
      } else {
        setInvoiceError(response.message || "Fattura non disponibile");
      }
    } catch (error: any) {
      setInvoiceError(error.message || "Errore durante il recupero della fattura");
    } finally {
      setIsLoadingInvoice(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Accent bar */}
      <div className={`h-1 ${statusInfo.accentColor}`} />

      {/* Header */}
      <div
        className="p-5 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start sm:items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex-1 min-w-0">
            {/* Status and date row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {statusInfo.label}
              </span>
              <span className="text-xs text-gray-400">
                {formatDateTime(order.createdAt)}
              </span>
            </div>

            {/* Order ID and products count */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Ordine</span>
              <span className="font-mono text-sm font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                #{shortenOrderId(order.id)}
              </span>
              {order.items && order.items.length > 0 && (
                <span className="text-sm text-gray-400">
                  ({order.items.length} {order.items.length === 1 ? 'articolo' : 'articoli'})
                </span>
              )}
            </div>
          </div>

          {/* Right side - Total and expand */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(order.total)}
              </p>
            </div>
            <div
              className={`p-2 rounded-full transition-all duration-200 ${isExpanded ? 'bg-gray-100 rotate-180' : 'hover:bg-gray-50'}`}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="border-t border-gray-100">
          {/* Shipping address or Pickup store info */}
          {order.fulfillmentType === 'ritiro' && order.pickupStore ? (
            <div className="p-5 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Store className="w-3.5 h-3.5" />
                Ritiro in negozio
              </h4>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                {(() => {
                  const storeInfo = STORE_INFO[order.pickupStore as PickupStore];
                  if (!storeInfo) return null;
                  return (
                    <>
                      <p className="font-semibold text-gray-900">{storeInfo.name}</p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{storeInfo.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{storeInfo.hours}</span>
                      </div>
                    </>
                  );
                })()}
                {order.status === 'pagato' && (
                  <p className="text-sm text-blue-700 mt-3 font-medium">
                    Ti invieremo un'email quando il tuo ordine sarà pronto per il ritiro.
                  </p>
                )}
                {order.status === 'pronto_per_ritiro' && (
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-orange-700 font-medium">
                      Il tuo ordine è pronto! Passa a ritirarlo negli orari di apertura.
                    </p>
                    <p className="text-xs text-orange-600">
                      Hai 7 giorni di tempo per ritirare il tuo ordine.
                    </p>
                  </div>
                )}
                {order.status === 'consegnato' && order.fulfillmentType === 'ritiro' && (
                  <p className="text-sm text-green-700 mt-3 font-medium">
                    Ordine ritirato con successo.
                  </p>
                )}
              </div>
              {order.notes && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs font-medium text-yellow-800 flex items-center gap-1 mb-1">
                    <FileText className="w-3 h-3" />
                    Note
                  </p>
                  <p className="text-sm text-yellow-700">{order.notes}</p>
                </div>
              )}
            </div>
          ) : order.shippingAddress && (
            <div className="p-5 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Indirizzo di spedizione
              </h4>
              <div className="bg-gray-50 rounded-xl p-4">
                {order.shippingAddress.firstName && order.shippingAddress.lastName && (
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                )}
                <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.postalCode} {order.shippingAddress.city} ({order.shippingAddress.province})
                </p>
                {order.shippingAddress.country && (
                  <p className="text-sm text-gray-500">{order.shippingAddress.country}</p>
                )}
              </div>
              {order.notes && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs font-medium text-yellow-800 flex items-center gap-1 mb-1">
                    <FileText className="w-3 h-3" />
                    Note
                  </p>
                  <p className="text-sm text-yellow-700">{order.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Products list */}
          <div className="p-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Dettagli ordine
            </h4>
            <div className="space-y-3">
              {order.items && order.items.length > 0 ? (
                order.items.map((item: OrderItem, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                  >
                    {/* Product image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${item.image ? 'hidden' : ''}`}>
                        <Package className="w-6 h-6 text-gray-300" />
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                      {item.variant && (
                        <p className="text-sm text-gray-500 truncate">{item.variant}</p>
                      )}
                    </div>

                    {/* Quantity and price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Dettagli prodotti non disponibili</p>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="px-5 pb-5 space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl text-white">
              <span className="font-medium">{isPendingPayment ? 'Totale da pagare' : 'Totale pagato'}</span>
              <span className="text-2xl font-bold">{formatPrice(order.total)}</span>
            </div>

            {/* Pulsante Completa Pagamento - solo se in attesa e non scaduto */}
            {canCompletePayment && (
              <div className="space-y-2">
                <Button
                  onClick={handleCompletePayment}
                  disabled={isLoadingCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#FFD100] text-black hover:bg-[#e6bc00] font-semibold"
                >
                  {isLoadingCheckout ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Caricamento...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Completa il pagamento
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-amber-600">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Tempo rimanente: {remainingTime}
                </p>
                {checkoutError && (
                  <p className="text-center text-xs text-red-600">{checkoutError}</p>
                )}
              </div>
            )}

            {/* Messaggio se l'ordine è scaduto */}
            {isPendingPayment && isTimerExpired && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                <p className="text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Sessione di pagamento scaduta
                </p>
              </div>
            )}

            {/* Tasto Scarica Fattura - solo per ordini pagati */}
            {canDownloadInvoice && (
              <div className="space-y-2">
                <Button
                  onClick={handleDownloadInvoice}
                  disabled={isLoadingInvoice}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-green-500 text-green-700 hover:bg-green-50"
                >
                  {isLoadingInvoice ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Caricamento...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Scarica Fattura
                    </>
                  )}
                </Button>
                {invoiceError && (
                  <p className="text-center text-xs text-red-600">{invoiceError}</p>
                )}
              </div>
            )}

            {/* Tasto Tracciamento - solo per spedizioni, non per ritiri */}
            {order.fulfillmentType !== 'ritiro' && (
              !isPendingPayment && trackingUrl ? (
                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-[#FFD100] text-black hover:bg-[#FFD100]/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Traccia su {carrierLabel}
                  </Button>
                </a>
              ) : !isPendingPayment && (
                <div className="text-center text-sm text-gray-500 py-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Tracciamento non ancora disponibile
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyOrders() {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, isAuthLoading, setLocation]);

  const { data: ordersResponse, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["/api/orders"],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/orders", undefined, { suppressAuthModal: true });
      return res;
    },
  });

  const orders = ordersResponse?.orders || [];

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFD100] border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-5 max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">I miei ordini</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {orders.length > 0
                  ? `${orders.length} ${orders.length === 1 ? 'ordine' : 'ordini'} effettuati`
                  : 'Storico acquisti'
                }
              </p>
            </div>
            <Link href="/profilo">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Profilo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {isOrdersLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FFD100] border-t-transparent mb-4"></div>
            <p className="text-gray-500">Caricamento ordini...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Nessun ordine ancora
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Non hai ancora effettuato acquisti. Scopri i nostri prodotti e inizia a fare shopping!
            </p>
            <Link href="/prodotti">
              <Button className="bg-[#FFD100] text-black hover:bg-[#e6bc00] font-semibold px-8 shadow-lg shadow-yellow-200">
                Scopri i prodotti
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: Order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
