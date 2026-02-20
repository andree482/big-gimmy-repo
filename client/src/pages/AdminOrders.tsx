import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingBag, Package, Truck, CheckCircle, Clock, Euro, Filter, X, CreditCard, ExternalLink, MapPin, FileText, Eye, Download, Loader2, Store, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { apiRequest } from "@/lib/queryClient";

interface OrderItem {
  id?: string;
  name: string;
  variant?: string;
  quantity: number;
  price?: number;
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
  user_id: string;
  total: number;
  status: string;
  items: OrderItem[] | null;
  shipping_address: ShippingAddress | null;
  billing_address: Record<string, unknown> | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  user_email?: string | null;
  user_first_name?: string | null;
  user_last_name?: string | null;
  tracking_number?: string | null;
  carrier?: string | null;
  fulfillment_type?: string;
  pickup_store?: string | null;
  pickup_ready_at?: string | null;
  pickup_collected_at?: string | null;
}

// Negozi per ritiro
const PICKUP_STORES: Record<string, { name: string; address: string }> = {
  torino: { name: "Sede di Torino", address: "Corso Torino 85, Buttigliera Alta" },
  aosta: { name: "Sede di Aosta", address: "Corso Saint-Martin-de-Corléans 55, Aosta" },
};

// Status enum values e labels (italiano snake_case)
const ORDER_STATUSES = [
  { value: "ritirato", label: "Ritirato" },
  { value: "pronto_per_ritiro", label: "Pronto per ritiro" },
  { value: "spedito", label: "Spedito" },
  { value: "consegnato", label: "Consegnato" },
  { value: "richiesta_di_rimborso", label: "Richiesta di rimborso" },
  { value: "rimborsato", label: "Rimborsato" },
  { value: "cancellato", label: "Cancellato" },
  { value: "fallito", label: "fallito" },
] as const;

const statusLabels: Record<string, string> = {
  pagato: "Pagato",
  in_attesa_di_pagamento: "In attesa di pagamento",
  spedito: "Spedito",
  consegnato: "Consegnato",
  pronto_per_ritiro: "Pronto per ritiro",
  ritirato: "Ritirato",
  cancellato: "Cancellato",
  fallito: "Fallito",
  richiesta_di_rimborso: "Richiesta di rimborso",
  rimborsato: "Rimborsato",
};

const statusColors: Record<string, string> = {
  pagato: "bg-green-100 text-green-800",
  in_attesa_di_pagamento: "bg-yellow-100 text-yellow-800",
  spedito: "bg-purple-100 text-purple-800",
  in_attesa_di_consegna: "bg-blue-100 text-blue-800",
  consegnato: "bg-green-100 text-green-800",
  pronto_per_ritiro: "bg-orange-100 text-orange-800",
  ritirato: "bg-teal-100 text-teal-800",
  cancellato: "bg-red-100 text-red-800",
  fallito: "bg-red-100 text-red-800",
  richiesta_di_rimborso: "bg-orange-100 text-orange-800",
  rimborsato: "bg-gray-100 text-gray-800",
};

const statusIcons: Record<string, typeof Clock> = {
  pagato: CreditCard,
  in_attesa_di_pagamento: Clock,
  spedito: Truck,
  in_attesa_di_consegna: Truck,
  consegnato: CheckCircle,
  pronto_per_ritiro: Package,
  ritirato: CheckCircle,
  cancellato: Clock,
  fallito: Clock,
  richiesta_di_rimborso: Clock,
  rimborsato: CreditCard,
};

// Corrieri supportati con i loro URL di tracciamento
const carrierOptions = [
  { value: "bartolini", label: "BRT (Bartolini)", trackingUrl: "https://www.mybrt.it/it/mybrt/my-parcels/search?lang=it&parcelNumber=" },
  { value: "gls", label: "GLS", trackingUrl: "https://gls-group.com/IT/it/servizi-online/ricerca-spedizioni/?match=", trackingSuffix: "&type=NAT" },
  { value: "dhl", label: "DHL", trackingUrl: "https://www.dhl.com/it-it/home/tracking.html?tracking-id=" },
  { value: "ups", label: "UPS", trackingUrl: "https://www.ups.com/track?tracknum=", trackingSuffix: "&loc=it_IT&requester=ST/trackdetails" },
  { value: "sda", label: "SDA", trackingUrl: "https://www.poste.it/cerca/index.html?#/risultati-spedizioni/" },
  { value: "poste_italiane", label: "Poste Italiane", trackingUrl: "https://www.poste.it/cerca/index.html?#/risultati-spedizioni/" },
  { value: "fedex", label: "FedEx", trackingUrl: "https://www.fedex.com/fedextrack/no-results-found?trknbr=" },
  { value: "tnt", label: "TNT", trackingUrl: "https://www.tnt.com/express/it_it/site/shipping-tools/tracking.html?searchType=con&cons=" },
];

function getTrackingUrl(carrier: string | null, trackingNumber: string | null): string | null {
  if (!carrier || !trackingNumber) return null;
  const carrierInfo = carrierOptions.find(c => c.value === carrier);
  if (carrierInfo) {
    const suffix = (carrierInfo as any).trackingSuffix || '';
    return carrierInfo.trackingUrl + trackingNumber + suffix;
  }
  return null;
}

// Componente timer per ordini in attesa di pagamento
function PendingPaymentTimer({ createdAt }: { createdAt: string }) {
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const orderCreatedAt = new Date(createdAt).getTime();
    const tenMinutesInMs = 10 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - orderCreatedAt;
      const remaining = tenMinutesInMs - elapsed;

      if (remaining <= 0) {
        setRemainingTime(null);
        setIsExpired(true);
        return false;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      setIsExpired(false);
      return true;
    };

    const shouldContinue = updateTimer();
    if (!shouldContinue) return;

    const interval = setInterval(() => {
      const shouldContinue = updateTimer();
      if (!shouldContinue) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  if (isExpired) {
    return (
      <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Scaduto
      </div>
    );
  }

  return (
    <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {remainingTime}
    </div>
  );
}

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productsDialogOrder, setProductsDialogOrder] = useState<Order | null>(null);
  const [loadingInvoiceOrderId, setLoadingInvoiceOrderId] = useState<string | null>(null);
  const [loadingPickupAction, setLoadingPickupAction] = useState<string | null>(null);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [refundDialogOrder, setRefundDialogOrder] = useState<Order | null>(null);
  const [refundAmountInput, setRefundAmountInput] = useState<string>("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery<Order[]>({
    queryKey: ['/api/admin/orders'],
  });

  const updateTrackingMutation = useMutation({
    mutationFn: async ({ orderId, tracking_number, carrier }: { orderId: string; tracking_number: string; carrier: string }) => {
      return apiRequest("PUT", `/api/admin/orders/${orderId}/tracking`, { tracking_number, carrier });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      await queryClient.refetchQueries({ queryKey: ['/api/admin/orders'] });
      setIsDialogOpen(false);
      setSelectedOrder(null);
      setTrackingNumber("");
      setCarrier("");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, refundAmountCents }: { orderId: string; status: string; refundAmountCents?: number }) => {
      return apiRequest("PUT", `/api/admin/orders/${orderId}/status`, { status, refundAmountCents });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      await queryClient.refetchQueries({ queryKey: ['/api/admin/orders'] });
      setRefundDialogOrder(null);
      setRefundAmountInput("");
    },
  });

  const handleStatusChange = (order: Order, newStatus: string) => {
    if (newStatus === "rimborsato") {
      setRefundDialogOrder(order);
      setRefundAmountInput((order.total / 100).toFixed(2));
      return;
    }
    updateStatusMutation.mutate({ orderId: order.id, status: newStatus });
  };

  const handleConfirmRefund = () => {
    if (!refundDialogOrder) return;
    const amountCents = Math.round(parseFloat(refundAmountInput.replace(",", ".")) * 100);
    if (isNaN(amountCents) || amountCents <= 0) return;
    updateStatusMutation.mutate({ orderId: refundDialogOrder.id, status: "rimborsato", refundAmountCents: amountCents });
  };

  const openTrackingDialog = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.tracking_number || "");
    setCarrier(order.carrier || "");
    setIsDialogOpen(true);
  };

  const handleSaveTracking = () => {
    if (!selectedOrder || !trackingNumber || !carrier) return;
    updateTrackingMutation.mutate({
      orderId: selectedOrder.id,
      tracking_number: trackingNumber,
      carrier: carrier,
    });
  };

  const handleDownloadInvoice = async (orderId: string) => {
    setLoadingInvoiceOrderId(orderId);
    try {
      const response = await apiRequest("GET", `/api/admin/orders/${orderId}/invoice`);
      if (response.success && response.invoicePdfUrl) {
        window.open(response.invoicePdfUrl, '_blank');
      } else {
        alert(response.message || "Fattura non disponibile per questo ordine");
      }
    } catch (error: any) {
      alert(error.message || "Errore durante il recupero della fattura");
    } finally {
      setLoadingInvoiceOrderId(null);
    }
  };

  const handleReadyForPickup = async (orderId: string) => {
    setLoadingPickupAction(orderId);
    try {
      await apiRequest("PUT", `/api/admin/orders/${orderId}/ready-for-pickup`);
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      await queryClient.refetchQueries({ queryKey: ['/api/admin/orders'] });
    } catch (error: any) {
      alert(error.message || "Errore durante l'aggiornamento");
    } finally {
      setLoadingPickupAction(null);
    }
  };

  const handleConfirmPickup = async (orderId: string) => {
    setLoadingPickupAction(orderId);
    try {
      await apiRequest("PUT", `/api/admin/orders/${orderId}/confirm-pickup`);
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      await queryClient.refetchQueries({ queryKey: ['/api/admin/orders'] });
    } catch (error: any) {
      alert(error.message || "Errore durante la conferma del ritiro");
    } finally {
      setLoadingPickupAction(null);
    }
  };

  // Export ordini in CSV
  const exportToCSV = () => {
    if (filteredOrders.length === 0) {
      toast({
        title: "Nessun dato da esportare",
        description: "Non ci sono ordini da esportare",
        variant: "destructive",
      });
      return;
    }

    const csvHeader = "ID Ordine,Cliente,Data,Modalità,Stato,Totale,Negozio Ritiro,Indirizzo,Città,CAP,Tracking,Corriere\n";
    const csvContent = filteredOrders
      .map(order => {
        const addr = order.shipping_address;
        return `"${String(order.id).substring(0, 8)}","${order.user_email || ''}","${order.created_at ? new Date(order.created_at).toLocaleDateString('it-IT') : ''}","${order.fulfillment_type || 'spedizione'}","${statusLabels[order.status] || order.status}","€${((order.total || 0) / 100).toFixed(2)}","${order.fulfillment_type === 'ritiro' && order.pickup_store ? PICKUP_STORES[order.pickup_store]?.name || '' : ''}","${addr?.address || ''}","${addr?.city || ''}","${addr?.postalCode || ''}","${order.tracking_number || ''}","${order.carrier || ''}"`;
      })
      .join("\n");

    const csvData = csvHeader + csvContent;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `ordini_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export completato",
        description: `${filteredOrders.length} ordini esportati con successo`,
      });
    }
  };

  // Calcolo prodotto più venduto
  const topProduct = (() => {
    const productMap: Record<string, { name: string; variant: string; image: string | null; count: number }> = {};
    for (const order of orders) {
      const items = Array.isArray(order.items) ? order.items : [];
      for (const item of items) {
        const key = `${item.name}||${item.variant || ''}`;
        if (!productMap[key]) {
          productMap[key] = { name: item.name, variant: item.variant || '', image: item.image || null, count: 0 };
        }
        productMap[key].count += item.quantity;
      }
    }
    let top: { name: string; variant: string; image: string | null; count: number } | null = null;
    for (const p of Object.values(productMap)) {
      if (!top || p.count > top.count) top = p;
    }
    return top;
  })();

  const filteredOrders = orders.filter((order: Order) => {
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    const matchesFulfillment = fulfillmentFilter === "" ||
      (fulfillmentFilter === "ritiro" && order.fulfillment_type === "ritiro") ||
      (fulfillmentFilter === "spedizione" && (order.fulfillment_type === "spedizione" || !order.fulfillment_type));
    return matchesStatus && matchesFulfillment;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-full">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-full">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Errore nel caricamento degli ordini</p>
              <p className="text-sm text-gray-500 mt-2">
                {error instanceof Error ? error.message : "Errore sconosciuto"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calcolo statistiche (sempre sui dati totali)
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const paidOrders = orders.filter(order => order.status === 'pagato').length;
  const pickupOrders = orders.filter(order => order.fulfillment_type === 'ritiro').length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestione Ordini
          </h1>
          <p className="text-gray-600">
            Visualizza e gestisci tutti gli ordini del negozio
          </p>
        </div>
        <Button
          variant="outline"
          onClick={exportToCSV}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Esporta CSV
        </Button>
      </div>

      {/* Filtri */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stato ordine
                </label>
                <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tutti gli stati" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti gli stati</SelectItem>
                    {ORDER_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalità
                </label>
                <Select value={fulfillmentFilter || "all"} onValueChange={(value) => setFulfillmentFilter(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tutte le modalita" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le modalita</SelectItem>
                    <SelectItem value="spedizione">Solo spedizioni</SelectItem>
                    <SelectItem value="ritiro">Solo ritiri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(statusFilter || fulfillmentFilter) && (
                <Button
                  variant="outline"
                  onClick={() => { setStatusFilter(""); setFulfillmentFilter(""); }}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Rimuovi filtri
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ordini Totali
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
            <p className="text-xs text-gray-500">
              {totalOrders === 1 ? 'ordine totale' : 'ordini totali'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Fatturato Totale
            </CardTitle>
            <Euro className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              €{(totalRevenue / 100).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">
              ricavi complessivi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pagati
            </CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{paidOrders}</div>
            <p className="text-xs text-gray-500">
              {paidOrders === 1 ? 'ordine pagato' : 'ordini pagati'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ritiri in Negozio
            </CardTitle>
            <Store className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{pickupOrders}</div>
            <p className="text-xs text-gray-500">
              {pickupOrders === 1 ? 'ritiro' : 'ritiri'} in negozio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Prodotto più venduto */}
      {topProduct && (
        <div className="mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Prodotto più venduto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  {topProduct.image ? (
                    <img
                      src={topProduct.image}
                      alt={topProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{topProduct.name}</p>
                  {topProduct.variant && (
                    <p className="text-sm text-gray-500 truncate">{topProduct.variant}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-gray-900">{topProduct.count}</p>
                  <p className="text-xs text-gray-500">
                    {topProduct.count === 1 ? 'unità venduta' : 'unità vendute'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabella Ordini */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Elenco Ordini
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nessun ordine trovato
              </h3>
              <p className="text-gray-500">
                {statusFilter ? `Nessun ordine con stato "${statusLabels[statusFilter as keyof typeof statusLabels] || statusFilter}".` : "Non ci sono ancora ordini nel sistema."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ordine</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Modalita</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Prodotti</TableHead>
                    <TableHead>Indirizzo/Negozio</TableHead>
                    <TableHead className="text-right">Totale</TableHead>
                    <TableHead className="text-center">Fattura</TableHead>
                    <TableHead className="text-center">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.status] || Clock;
                    const items = Array.isArray(order.items) ? order.items : [];
                    const orderId = String(order.id).substring(0, 8);
                    const trackingUrl = getTrackingUrl(order.carrier, order.tracking_number);
                    const isPickup = order.fulfillment_type === 'ritiro';
                    const pickupStoreInfo = isPickup && order.pickup_store ? PICKUP_STORES[order.pickup_store] : null;

                    return (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="font-semibold text-gray-900">
                            #{orderId}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-sm text-gray-900">
                            {order.user_email || '-'}
                          </div>
                        </TableCell>

                        <TableCell>
                          {order.created_at && !isNaN(new Date(order.created_at).getTime()) ? (
                            <>
                              <div className="text-sm">
                                {format(new Date(order.created_at), 'dd/MM/yyyy', { locale: it })}
                              </div>
                              <div className="text-xs text-gray-500">
                                {format(new Date(order.created_at), 'HH:mm', { locale: it })}
                              </div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-400">-</div>
                          )}
                        </TableCell>

                        {/* Colonna Modalita */}
                        <TableCell>
                          {isPickup ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              <Store className="h-3 w-3 mr-1" />
                              Ritiro {order.pickup_store ? `(${order.pickup_store.charAt(0).toUpperCase() + order.pickup_store.slice(1)})` : ''}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                              <Truck className="h-3 w-3 mr-1" />
                              Spedizione
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          <div>
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleStatusChange(order, value)}
                              disabled={updateStatusMutation.isPending}
                            >
                              <SelectTrigger className={`w-[180px] h-8 text-xs ${statusColors[order.status] || 'bg-gray-100 text-gray-800'} border-0`}>
                                <div className="flex items-center gap-1">
                                  <StatusIcon className="h-3 w-3" />
                                  <SelectValue>{statusLabels[order.status] || order.status}</SelectValue>
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {ORDER_STATUSES.filter((status) => {
                                  if (isPickup) {
                                    // Per ritiro: nascondi stati spedizione
                                    return !['spedito', 'in_attesa_di_consegna', 'consegnato'].includes(status.value);
                                  } else {
                                    // Per spedizione: nascondi stati ritiro
                                    return !['pronto_per_ritiro'].includes(status.value);
                                  }
                                }).map((status) => (
                                  <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {order.status === 'in_attesa_di_pagamento' && (
                              <PendingPaymentTimer createdAt={order.created_at} />
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          {items.length > 0 ? (
                            <Button
                              variant="link"
                              size="sm"
                              className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto"
                              onClick={() => setProductsDialogOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              ({items.length})
                            </Button>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>

                        {/* Colonna Indirizzo/Negozio */}
                        <TableCell>
                          {isPickup && pickupStoreInfo ? (
                            <div className="text-xs space-y-0.5 max-w-[180px]">
                              <div className="flex items-center gap-1 text-blue-700 font-medium">
                                <Store className="h-3 w-3" />
                                <span>{pickupStoreInfo.name}</span>
                              </div>
                              <p className="text-gray-500 truncate">{pickupStoreInfo.address}</p>
                              {order.status === 'pronto_per_ritiro' && order.pickup_ready_at && (() => {
                                const readyDate = new Date(order.pickup_ready_at);
                                const deadlineDate = new Date(readyDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                                const now = new Date();
                                const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                                const isExpired = daysLeft <= 0;
                                return (
                                  <div className={`flex items-center gap-1 mt-1 font-medium ${isExpired ? 'text-red-600' : daysLeft <= 2 ? 'text-orange-600' : 'text-gray-500'}`}>
                                    <Clock className="h-3 w-3" />
                                    <span>{isExpired ? 'Scaduto!' : `${daysLeft}g per ritiro`}</span>
                                  </div>
                                );
                              })()}
                              {order.notes && (
                                <div className="mt-1">
                                  <button
                                    onClick={() => setExpandedNoteId(expandedNoteId === order.id ? null : order.id)}
                                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                                  >
                                    <FileText className="h-3 w-3" />
                                    <span className="text-xs underline">Note</span>
                                  </button>
                                  {expandedNoteId === order.id && (
                                    <p className="mt-1 text-xs text-gray-700 bg-yellow-50 border border-yellow-200 rounded p-1 max-w-[180px] whitespace-pre-wrap break-words">{order.notes}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : order.shipping_address ? (
                            <div className="text-xs space-y-0.5 max-w-[180px]">
                              {order.shipping_address.firstName && order.shipping_address.lastName && (
                                <p className="font-medium text-gray-900 truncate">
                                  {order.shipping_address.firstName} {order.shipping_address.lastName}
                                </p>
                              )}
                              <p className="text-gray-600 truncate">{order.shipping_address.address}</p>
                              <p className="text-gray-500">
                                {order.shipping_address.postalCode} {order.shipping_address.city}
                              </p>
                              {order.notes && (
                                <div className="mt-1">
                                  <button
                                    onClick={() => setExpandedNoteId(expandedNoteId === order.id ? null : order.id)}
                                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                                  >
                                    <FileText className="h-3 w-3" />
                                    <span className="text-xs underline">Note</span>
                                  </button>
                                  {expandedNoteId === order.id && (
                                    <p className="mt-1 text-xs text-gray-700 bg-yellow-50 border border-yellow-200 rounded p-1 max-w-[180px] whitespace-pre-wrap break-words">{order.notes}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="font-semibold text-gray-900">
                            €{((order.total || 0) / 100).toFixed(2)}
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          {['pagato', 'spedito', 'in_attesa_di_consegna', 'consegnato', 'pronto_per_ritiro'].includes(order.status) ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-green-600 hover:text-green-800 hover:bg-green-50"
                              onClick={() => handleDownloadInvoice(order.id)}
                              disabled={loadingInvoiceOrderId === order.id}
                            >
                              {loadingInvoiceOrderId === order.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Download className="h-3 w-3 mr-1" />
                                  PDF
                                </>
                              )}
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>

                        {/* Colonna Azioni (Tracking per spedizione, Azioni ritiro per ritiro) */}
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            {isPickup ? (
                              // Azioni per ordini ritiro
                              <span className="text-xs text-gray-400">-</span>
                            ) : (
                              // Azioni per ordini spedizione (tracking)
                              <>
                                {trackingUrl ? (
                                  <>
                                    <a
                                      href={trackingUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      Traccia
                                    </a>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs h-6 px-2"
                                      onClick={() => openTrackingDialog(order)}
                                    >
                                      Modifica
                                    </Button>
                                  </>
                                ) : ['in_attesa_di_pagamento', 'fallito', 'cancellato'].includes(order.status) ? (
                                  <span className="text-xs text-gray-400">-</span>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => openTrackingDialog(order)}
                                  >
                                    <Truck className="h-3 w-3 mr-1" />
                                    Aggiungi
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog per inserire/modificare tracking */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tracciamento Ordine</DialogTitle>
            <DialogDescription>
              Inserisci il corriere e il numero di tracciamento per l'ordine #{selectedOrder?.id?.substring(0, 8)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="carrier">Corriere</Label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona corriere" />
                </SelectTrigger>
                <SelectContent>
                  {carrierOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Numero di Tracciamento</Label>
              <Input
                id="trackingNumber"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Es. 12345678901234"
              />
            </div>
            {carrier && trackingNumber && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Anteprima link:</p>
                <a
                  href={getTrackingUrl(carrier, trackingNumber) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 break-all"
                >
                  {getTrackingUrl(carrier, trackingNumber)}
                </a>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annulla
            </Button>
            <Button
              onClick={handleSaveTracking}
              disabled={!trackingNumber || !carrier || updateTrackingMutation.isPending}
              className="bg-[#FFD100] text-black hover:bg-[#e6bc00]"
            >
              {updateTrackingMutation.isPending ? "Salvataggio..." : "Salva"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog conferma rimborso con importo */}
      <Dialog open={!!refundDialogOrder} onOpenChange={(open) => { if (!open) { setRefundDialogOrder(null); setRefundAmountInput(""); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conferma rimborso</DialogTitle>
            <DialogDescription>
              Inserisci l'importo che hai rimborsato su Stripe per l'ordine #{refundDialogOrder?.id?.substring(0, 8)}.
              Il cliente e l'admin riceveranno un'email con questo importo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <span className="text-gray-500">Totale ordine: </span>
              <span className="font-semibold">€{refundDialogOrder ? (refundDialogOrder.total / 100).toFixed(2).replace(".", ",") : "—"}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refundAmount">Importo rimborsato su Stripe (€)</Label>
              <Input
                id="refundAmount"
                type="number"
                min="0.01"
                step="0.01"
                value={refundAmountInput}
                onChange={(e) => setRefundAmountInput(e.target.value)}
                placeholder="Es. 88.00"
              />
              {refundDialogOrder && refundAmountInput && !isNaN(parseFloat(refundAmountInput.replace(",", "."))) &&
                parseFloat(refundAmountInput.replace(",", ".")) < refundDialogOrder.total / 100 && (
                <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded">
                  Rimborso parziale: €{(refundDialogOrder.total / 100 - parseFloat(refundAmountInput.replace(",", "."))).toFixed(2).replace(".", ",")} non rimborsati (es. spese di spedizione).
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRefundDialogOrder(null); setRefundAmountInput(""); }}>
              Annulla
            </Button>
            <Button
              onClick={handleConfirmRefund}
              disabled={!refundAmountInput || isNaN(parseFloat(refundAmountInput.replace(",", "."))) || parseFloat(refundAmountInput.replace(",", ".")) <= 0 || updateStatusMutation.isPending}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {updateStatusMutation.isPending ? "Elaborazione..." : "Conferma rimborso"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per visualizzare tutti i prodotti */}
      <Dialog open={!!productsDialogOrder} onOpenChange={(open) => !open && setProductsDialogOrder(null)}>
        <DialogContent className="sm:max-w-2xl max-w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Prodotti Ordine #{productsDialogOrder?.id?.substring(0, 8)}
            </DialogTitle>
            <DialogDescription>
              Elenco completo dei {productsDialogOrder?.items?.length || 0} prodotti ordinati
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-3">
              {productsDialogOrder?.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  {/* Immagine prodotto */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Package className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* Info prodotto */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantità: {item.quantity}</p>
                  </div>
                  {item.price && (
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900">
                        €{((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        €{(item.price / 100).toFixed(2)} cad.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductsDialogOrder(null)}>
              Chiudi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
