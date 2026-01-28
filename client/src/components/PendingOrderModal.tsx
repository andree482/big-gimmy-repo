import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, ShoppingBag, X } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';

interface PendingOrder {
  id: string;
  total: number;
  createdAt: string;
  stripeSessionId?: string | null;
}

export function PendingOrderModal() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Controlla se ci sono ordini in sospeso
  useEffect(() => {
    if (!isAuthenticated || dismissed) return;

    const checkPendingOrders = async () => {
      try {
        const response = await apiRequest("GET", "/api/orders");
        if (response.orders && Array.isArray(response.orders)) {
          // Cerca ordini in attesa di pagamento non scaduti
          const tenMinutesInMs = 10 * 60 * 1000;
          const pending = response.orders.find((order: any) => {
            if (order.status !== 'in_attesa_di_pagamento') return false;
            const orderCreatedAt = new Date(order.createdAt).getTime();
            const elapsed = Date.now() - orderCreatedAt;
            return elapsed < tenMinutesInMs && order.stripeSessionId;
          });

          if (pending) {
            setPendingOrder(pending);
            setIsOpen(true);
          }
        }
      } catch (error) {
        console.error('[PENDING ORDER] Errore controllo ordini:', error);
      }
    };

    // Controlla solo se arriviamo da checkout (url contiene checkout o cancel)
    const urlParams = new URLSearchParams(window.location.search);
    const fromCheckout = window.location.pathname.includes('checkout') ||
                         urlParams.has('canceled') ||
                         document.referrer.includes('stripe.com') ||
                         document.referrer.includes('checkout');

    // Controlla anche sessionStorage per vedere se abbiamo appena lasciato un checkout
    const checkoutAbandoned = sessionStorage.getItem('checkout_in_progress');

    if (fromCheckout || checkoutAbandoned) {
      sessionStorage.removeItem('checkout_in_progress');
      checkPendingOrders();
    }
  }, [isAuthenticated, dismissed]);

  // Timer in tempo reale
  useEffect(() => {
    if (!pendingOrder || !isOpen) return;

    const orderCreatedAt = new Date(pendingOrder.createdAt).getTime();
    const tenMinutesInMs = 10 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - orderCreatedAt;
      const remaining = tenMinutesInMs - elapsed;

      if (remaining <= 0) {
        setRemainingTime(null);
        setIsOpen(false);
        return false;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
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
  }, [pendingOrder, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setDismissed(true);
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
  };

  if (!pendingOrder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Ordine in sospeso</DialogTitle>
          <DialogDescription className="sr-only">Hai un ordine in sospeso da completare</DialogDescription>
        </DialogHeader>

        <div className="text-center py-4">
          {/* Icona */}
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>

          {/* Titolo */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Hai un ordine in sospeso!
          </h2>

          {/* Descrizione */}
          <p className="text-gray-600 mb-4">
            Completa il pagamento entro il tempo rimanente per non perdere il tuo ordine.
          </p>

          {/* Timer */}
          {remainingTime && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-700 mb-1">Tempo rimanente</p>
              <p className="text-3xl font-bold text-amber-600 font-mono">
                {remainingTime}
              </p>
            </div>
          )}

          {/* Totale ordine */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-500">Totale ordine</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(pendingOrder.total)}
            </p>
          </div>

          {/* Pulsanti */}
          <div className="space-y-3">
            <Link href="/ordini" onClick={handleClose}>
              <Button className="w-full bg-[#FFD100] text-black hover:bg-[#e6bc00] font-semibold">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Vai ai miei ordini
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full text-gray-500"
              onClick={handleClose}
            >
              Continua la navigazione
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
