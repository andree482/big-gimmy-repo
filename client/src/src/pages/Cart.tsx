import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCartContext } from "@/components/cart/CartProvider";
import { formatEuropeanPrice } from "@/lib/productVariants";
import CheckoutSummary from "@/components/cart/CheckoutSummary";

export default function Cart() {
  const {
    items: cartItems,
    removeFromCart,
    updateQuantity,
    total,
    totalItems,
  } = useCartContext();
  const { toast } = useToast();

  const handleUpdateQuantity = (
    itemId: string,
    variant: string,
    newQuantity: number,
  ) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId, variant);
      return;
    }
    updateQuantity(itemId, variant, newQuantity);
  };

  const handleRemoveItem = (itemId: string, variant: string) => {
    removeFromCart(itemId, variant);
    toast({
      title: "Prodotto rimosso",
      description: "Il prodotto è stato rimosso dal carrello.",
    });
  };

  const proceedToCheckout = () => {
    toast({
      title: "Checkout",
      description:
        "Funzionalità di checkout in arrivo! Contattaci per completare l'ordine.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/prodotti">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continua lo shopping
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-gray-600">
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {totalItems} {totalItems === 1 ? "prodotto" : "prodotti"}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-montserrat font-bold text-gray-900 text-center">
              Il tuo Carrello
            </h1>
          </div>

          {cartItems.length === 0 ? (
            // Carrello vuoto
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-montserrat font-semibold mb-2">
                  Il tuo carrello è vuoto
                </h2>
                <p className="text-gray-600 mb-6">
                  Aggiungi alcuni prodotti per iniziare lo shopping!
                </p>
                <Link href="/prodotti">
                  <Button className="bg-[#FFD100] hover:bg-[#E6BC00] text-black">
                    Esplora i Prodotti
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            // Carrello con prodotti
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista prodotti */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6 shadow-md">
                    <div className="flex items-start gap-6">
                      {/* Immagine prodotto */}
                      <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ShoppingCart className="w-12 h-12 text-gray-400" />
                        )}
                      </div>

                      {/* Dettagli prodotto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                          {item.name}
                        </h3>
                        {item.variant && item.variant.trim() && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-600">Gusto:</span>
                            <span className="ml-2 text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
                              {item.variant}
                            </span>
                          </div>
                        )}
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-600">Prezzo unitario:</span>
                          <span className="ml-2 text-sm text-gray-800 font-medium">
                            {formatEuropeanPrice(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Controlli quantità e prezzo */}
                      <div className="flex flex-col items-end gap-4 flex-shrink-0">
                        {/* Controlli quantità */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.variant,
                                item.quantity - 1,
                              )
                            }
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.variant,
                                item.quantity + 1,
                              )
                            }
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Prezzo totale per item */}
                        <div className="text-right">
                          <p className="text-xl font-bold text">
                            {formatEuropeanPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        {/* Pulsante rimuovi */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleRemoveItem(item.id, item.variant)
                          }
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 w-8 h-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Checkout Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <CheckoutSummary cartTotal={total} itemCount={totalItems} />
                  
                  <div className="mt-4 text-center">
                    <Link href="/prodotti">
                      <Button variant="link" className="text-[#FFD100] text-base">
                        Continua lo shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
