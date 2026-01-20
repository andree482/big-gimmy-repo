import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderDetails {
  id: string;
  total_cents: number;
  currency: string;
  created_at: string;
}

export default function CheckoutSuccess() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const sessionId = params.get("session_id");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera dettagli ordine tramite session_id
    if (sessionId) {
      fetch(`/api/orders/by-session/${sessionId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.order) {
            setOrderDetails(data.order);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(cents / 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pagamento Completato!
          </h1>

          <p className="text-gray-600 mb-6">
            Grazie per il tuo ordine. Riceverai una email di conferma a breve.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : orderDetails ? (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
              <div>
                <p className="text-sm text-gray-500">Numero ordine</p>
                <p className="font-mono font-medium text-sm">
                  {orderDetails.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Totale pagato</p>
                <p className="font-semibold text-lg text-green-600">
                  {formatPrice(orderDetails.total_cents)}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-700">
                Il tuo ordine é stato registrato con successo.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Link href="/profilo">
              <Button className="w-full" size="lg">
                <Package className="w-5 h-5 mr-2" />
                Vedi i tuoi ordini
              </Button>
            </Link>

            <Link href="/prodotti">
              <Button variant="outline" className="w-full" size="lg">
                Continua lo shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
