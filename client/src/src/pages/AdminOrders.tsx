import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Package, Truck, CheckCircle, Clock, Euro, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  province: string;
}

interface Order {
  id: number;
  userId: number;
  snipcartOrderId: string;
  total: number;
  status: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

const statusLabels = {
  ordered: "Ordinato",
  processing: "In elaborazione", 
  shipped: "Spedito",
  completed: "Completato",
  cancelled: "Annullato"
};

const statusColors = {
  ordered: "bg-orange-100 text-orange-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800", 
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusIcons = {
  ordered: Clock,
  processing: Package,
  shipped: Truck,
  completed: CheckCircle,
  cancelled: Clock
};

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  const { data: orders = [], isLoading, error } = useQuery<Order[]>({
    queryKey: ['/api/admin/orders'],
  });

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
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const orderedOrders = orders.filter(order => order.status === 'ordered').length;
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
                    <SelectItem value="ordered">Ordinato</SelectItem>
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
              Ordinati
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{orderedOrders}</div>
            <p className="text-xs text-gray-500">
              {orderedOrders === 1 ? 'ordine appena ordinato' : 'ordini appena ordinati'}
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
                    <TableHead>Totale</TableHead>
                    <TableHead>Indirizzo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                    
                    return (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold text-gray-900">
                              #{order.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.snipcartOrderId}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">
                              {order.userFirstName} {order.userLastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.userEmail}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            {format(new Date(order.createdAt), 'dd/MM/yyyy', { locale: it })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(new Date(order.createdAt), 'HH:mm', { locale: it })}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`${statusColors[order.status as keyof typeof statusColors]} border-0`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusLabels[order.status as keyof typeof statusLabels] || order.status}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            {order.items?.slice(0, 2).map((item, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{item.quantity}x</span> {item.name}
                              </div>
                            ))}
                            {order.items?.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{order.items.length - 2} altri prodotti
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="font-semibold text-gray-900">
                            €{(order.total / 100).toFixed(2)}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            <div>{order.shippingAddress?.street}</div>
                            <div className="text-gray-500">
                              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                            </div>
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
    </div>
  );
}