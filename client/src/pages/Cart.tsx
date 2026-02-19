import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    product_option_id: number,
    newQuantity: number,
    product_id?: number,
    variant?: string
  ) => {
    if (newQuantity <= 0) {
      handleRemoveItem(product_option_id, product_id, variant);
      return;
    }
    updateQuantity(product_option_id, newQuantity, product_id, variant);
  };

  const handleRemoveItem = (product_option_id: number, product_id?: number, variant?: string) => {
    removeFromCart(product_option_id, product_id, variant);
    toast({
      title: "Prodotto rimosso",
      description: "Il prodotto è stato rimosso dal carrello.",
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
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Il tuo carrello è vuoto
                </h2>
                <Link href="/prodotti">
                  <Button className="bg-[#FFD100] hover:bg-[#E6BC00] text-black">
                    Esplora i Prodotti
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista prodotti */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <Card key={`${item.product_option_id}-${item.variant || ''}`} className="p-4 sm:p-6 shadow-md">
                    <div className="flex items-start gap-3 sm:gap-6">

                      <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ShoppingCart className="w-10 h-10 text-gray-400 mx-auto mt-5 sm:mt-8" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">
                            {item.name}
                          </h3>
                          {/* Prezzo totale visibile subito su mobile */}
                          <p className="text-base sm:text-xl font-bold sm:hidden flex-shrink-0">
                            {formatEuropeanPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        {item.variant && item.variant.trim() && (
                          <p className="text-xs sm:text-sm text-gray-700 mb-1">
                            Gusto:{" "}
                            <span className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">
                              {item.variant}
                            </span>
                          </p>
                        )}

                        <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-700">
                          Unitario:{" "}
                          <strong>{formatEuropeanPrice(item.price)}</strong>
                        </p>

                        {/* Controlli quantità + elimina su mobile */}
                        <div className="flex items-center gap-3 mt-3 sm:hidden">
                          <div className="flex items-center bg-gray-200 rounded-lg p-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product_option_id,
                                  item.quantity - 1,
                                  item.product_id,
                                  item.variant
                                )
                              }
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product_option_id,
                                  item.quantity + 1,
                                  item.product_id,
                                  item.variant
                                )
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleRemoveItem(item.product_option_id, item.product_id, item.variant)
                            }
                            className="text-red-600 hover:bg-red-100 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Controlli desktop */}
                      <div className="hidden sm:flex flex-col items-end gap-4">
                        <div className="flex items-center bg-gray-200 rounded-lg p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product_option_id,
                                item.quantity - 1,
                                item.product_id,
                                item.variant
                              )
                            }
                          >
                          <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product_option_id,
                                item.quantity + 1,
                                item.product_id,
                                item.variant
                              )
                            }
                          >
                          <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-xl font-bold">
                          {formatEuropeanPrice(item.price * item.quantity)}
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleRemoveItem(item.product_option_id, item.product_id, item.variant)
                          }
                          className="text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <CheckoutSummary cartTotal={total} itemCount={totalItems} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
