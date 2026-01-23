import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
import { ShoppingBag, Package, Truck, CheckCircle, Clock, Euro, Filter, X, CreditCard, ExternalLink, MapPin, FileText } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { apiRequest } from "@/lib/queryClient";

interface OrderItem {
  id?: string;
  name: string;
  quantity: number;
  price?: number;
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
  snipcart_order_id: string;
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
}

// Status enum values e labels
const ORDER_STATUSES = [
  { value: "shipped", label: "Spedito" },
  { value: "pending_payment", label: "In attesa di pagamento" },
  { value: "paid", label: "Pagato" },
  { value: "cancelled", label: "Cancellato" },
  { value: "failed", label: "Fallito" },
  { value: "refunded", label: "Rimborsato" },
  { value: "awaiting_delivery", label: "In attesa di consegna" },
  { value: "delivered", label: "Consegnato" },
  { value: "refund_requested", label: "Richiesta di rimborso" },
] as const;

const statusLabels: Record<string, string> = {
  pending: "In attesa",
  pending_payment: "In attesa di pagamento",
  paid: "Pagato",
  ordered: "Ordinato",
  processing: "In elaborazione",
  shipped: "Spedito",
  completed: "Completato",
  delivered: "Consegnato",
  cancelled: "Cancellato",
  failed: "Fallito",
  refunded: "Rimborsato",
  awaiting_delivery: "In attesa di consegna",
  refund_requested: "Richiesta di rimborso",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  pending_payment: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  ordered: "bg-orange-100 text-orange-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
  awaiting_delivery: "bg-blue-100 text-blue-800",
  refund_requested: "bg-orange-100 text-orange-800",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  pending_payment: Clock,
  paid: CreditCard,
  ordered: Clock,
  processing: Package,
  shipped: Truck,
  completed: CheckCircle,
  delivered: CheckCircle,
  cancelled: Clock,
  failed: Clock,
  refunded: CreditCard,
  awaiting_delivery: Truck,
  refund_requested: Clock,
};

// Corrieri supportati con i loro URL di tracciamento
const carrierOptions = [
  { value: "bartolini", label: "BRT (Bartolini)", trackingUrl: "https://www.brt.it/it/tracking?spession=" },
  { value: "gls", label: "GLS", trackingUrl: "https://www.gls-italy.com/it/trova-spedizione?match=" },
  { value: "dhl", label: "DHL", trackingUrl: "https://www.dhl.com/it-it/home/tracking.html?tracking-id=" },
  { value: "ups", label: "UPS", trackingUrl: "https://www.ups.com/track?tracknum=" },
  { value: "sda", label: "SDA", trackingUrl: "https://www.sda.it/wps/portal/Servizi_online/dettaglio-spedizione?locale=it&tression=" },
  { value: "poste_italiane", label: "Poste Italiane", trackingUrl: "https://www.poste.it/cerca/index.html#/risultati-spedizioni/" },
  { value: "fedex", label: "FedEx", trackingUrl: "https://www.fedex.com/fedextrack/?trknbr=" },
  { value: "tnt", label: "TNT", trackingUrl: "https://www.tnt.it/tracking/tracking.do?cons=" },
];

function getTrackingUrl(carrier: string | null, trackingNumber: string | null): string | null {
  if (!carrier || !trackingNumber) return null;
  const carrierInfo = carrierOptions.find(c => c.value === carrier);
  if (carrierInfo) {
    return carrierInfo.trackingUrl + trackingNumber;
  }
  return null;
}

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return apiRequest("PUT", `/api/admin/orders/${orderId}/status`, { status });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      await queryClient.refetchQueries({ queryKey: ['/api/admin/orders'] });
    },
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
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

  const filteredOrders = orders.filter((order: Order) =>
    statusFilter === "" || order.status === statusFilter
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
  const paidOrders = orders.filter(order => order.status === 'paid').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestione Ordini
        </h1>
        <p className="text-gray-600">
          Visualizza e gestisci tutti gli ordini del negozio
        </p>
      </div>

      {/* Filtro */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
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
                    <SelectItem value="pending">In attesa</SelectItem>
                    <SelectItem value="paid">Pagato</SelectItem>
                    <SelectItem value="processing">In elaborazione</SelectItem>
                    <SelectItem value="shipped">Spedito</SelectItem>
                    <SelectItem value="completed">Completato</SelectItem>
                    <SelectItem value="cancelled">Annullato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {statusFilter && (
                <Button
                  variant="outline"
                  onClick={() => setStatusFilter("")}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Rimuovi filtro
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
              Completati
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{completedOrders}</div>
            <p className="text-xs text-gray-500">
              {completedOrders === 1 ? 'ordine completato' : 'ordini completati'}
            </p>
          </CardContent>
        </Card>
      </div>

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
                    <TableHead>Stato</TableHead>
                    <TableHead>Prodotti</TableHead>
                    <TableHead>Indirizzo</TableHead>
                    <TableHead className="text-right">Totale</TableHead>
                    <TableHead className="text-center">Tracciamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.status] || Clock;
                    const items = Array.isArray(order.items) ? order.items : [];
                    const orderId = String(order.id).substring(0, 8);
                    const trackingUrl = getTrackingUrl(order.carrier, order.tracking_number);

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

                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <SelectTrigger className={`w-[180px] h-8 text-xs ${statusColors[order.status] || 'bg-gray-100 text-gray-800'} border-0`}>
                              <div className="flex items-center gap-1">
                                <StatusIcon className="h-3 w-3" />
                                <SelectValue>{statusLabels[order.status] || order.status}</SelectValue>
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {ORDER_STATUSES.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            {items.length > 0 ? (
                              <>
                                {items.slice(0, 3).map((item, index) => (
                                  <div key={index} className="text-sm">
                                    {item.quantity} x {item.name}
                                  </div>
                                ))}
                                {items.length > 3 && (
                                  <div className="text-xs text-gray-500">
                                    +{items.length - 3} altri prodotti
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          {order.shipping_address ? (
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
                                <div className="flex items-center gap-1 text-yellow-600 mt-1" title={order.notes}>
                                  <FileText className="h-3 w-3" />
                                  <span className="truncate">Note</span>
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
                          <div className="flex flex-col items-center gap-1">
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
    </div>
  );
}
