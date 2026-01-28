import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Lock, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

interface CheckoutAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  itemCount: number;
}



export function CheckoutAuthModal({ isOpen, onClose, cartTotal, itemCount }: CheckoutAuthModalProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const handleLogin = () => {
    setAuthTab('login');
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthTab('register');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showAuthModal} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-[#FFD100]" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Accesso Richiesto
            </DialogTitle>
            <DialogDescription className="sr-only">Accedi o registrati per completare l'acquisto</DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="text-center text-gray-600">
              <p className="mb-3">
                Devi accedere o registrarti per procedere al checkout.
              </p>
              
              {/* Riepilogo carrello */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {itemCount} {itemCount === 1 ? 'prodotto' : 'prodotti'}
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Totale: €{cartTotal.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Pulsanti azione */}
            <div className="space-y-3">
              <Button
                onClick={handleLogin}
                className="w-full bg-[#FFD100] hover:bg-yellow-500 text-black font-semibold py-3"
                size="lg"
              >
                <User className="mr-2 h-5 w-5" />
                Accedi
              </Button>
              
              <Button
                onClick={handleRegister}
                variant="outline"
                className="w-full border-[#FFD100] text-[#FFD100] hover:bg-yellow-50 font-semibold py-3"
                size="lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Registrati
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              Il tuo carrello sarà conservato durante la registrazione
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AuthModal per login/registrazione */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={authTab}
        />
      )}
    </>
  );
}