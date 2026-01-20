import { Link } from "wouter";
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pagamento Annullato
          </h1>

          <p className="text-gray-600 mb-6">
            Il pagamento e stato annullato. Non ti e stato addebitato nulla e il
            tuo carrello e ancora salvato.
          </p>

          <div className="bg-amber-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-700">
              Se hai riscontrato problemi durante il pagamento, contattaci per
              assistenza.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/cart">
              <Button className="w-full" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Torna al carrello
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Torna alla home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
