import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { useAuthQuery } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  image?: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuthQuery();

  // Carica carrello con trasferimento automatico guest → utente
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        // Utente appena loggato - trasferisce carrello guest se presente
        const guestCart = localStorage.getItem('biggimmy-cart');
        
        try {
          console.log('🛒 [INIT] Caricando carrello utente dal server:', user.id);
          const response = await apiRequest('GET', `/api/cart/${user.id}`);
          const serverItems = response.items || [];
          
          // Se c'è un carrello guest, trasferiscilo al server
          if (guestCart && guestCart !== '[]') {
            const guestItems = JSON.parse(guestCart);
            console.log('🛒 [TRANSFER] Trasferendo carrello guest al server:', guestItems);
            
            // Trasferisci ogni item del carrello guest
            for (const item of guestItems) {
              await apiRequest('POST', '/api/cart', {
                productId: parseInt(item.id),
                variant: item.variant,
                quantity: item.quantity,
                price: item.price
              });
            }
            
            // Pulisci localStorage dopo il trasferimento
            localStorage.removeItem('biggimmy-cart');
            console.log('🛒 [TRANSFER] Carrello guest trasferito e pulito');
            
            // Ricarica carrello aggiornato dal server
            const updatedResponse = await apiRequest('GET', `/api/cart/${user.id}`);
            setItems(updatedResponse.items || []);
          } else {
            setItems(serverItems);
          }
          
          console.log('🛒 [INIT] Carrello utente caricato/unito');
        } catch (error) {
          console.error('🛒 [ERROR] Errore caricamento carrello server:', error);
          setItems([]);
        }
      } else {
        // Carica carrello dal localStorage per ospiti
        const savedCart = localStorage.getItem('biggimmy-cart');
        console.log('🛒 [INIT] Caricando carrello guest dal localStorage:', savedCart);
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            console.log('🛒 [INIT] Carrello guest caricato:', parsedCart);
            setItems(parsedCart);
          } catch (error) {
            console.error('🛒 [ERROR] Errore caricamento localStorage:', error);
            setItems([]);
          }
        }
      }
      setIsInitialized(true);
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Salva carrello - localStorage per guest, API per utenti registrati
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      console.log('🛒 [SAVE] Salvando carrello guest nel localStorage:', items);
      localStorage.setItem('biggimmy-cart', JSON.stringify(items));
    }
  }, [items, isInitialized, isAuthenticated]);

  // Aggiungi al carrello
  const addToCart = async (product: Omit<CartItem, 'id'> & { id: string | number }) => {
    console.log('🛒 [ADD] addToCart chiamato con:', product);
    
    const newItem: CartItem = {
      id: product.id.toString(),
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
      variant: product.variant,
      quantity: product.quantity,
      image: product.image,
    };

    console.log('🛒 [ADD] Nuovo item creato:', newItem);

    if (isAuthenticated && user) {
      // Utente registrato - usa API
      try {
        await apiRequest('POST', '/api/cart', {
          productId: parseInt(product.id.toString()),
          variant: product.variant,
          quantity: product.quantity,
          price: newItem.price
        });
        
        // Ricarica carrello dal server
        const response = await apiRequest('GET', `/api/cart/${user.id}`);
        setItems(response.items || []);
        console.log('🛒 [ADD] Carrello utente aggiornato:', response.items);
      } catch (error) {
        console.error('🛒 [ERROR] Errore aggiunta carrello server:', error);
        toast({
          title: 'Errore',
          description: 'Impossibile aggiungere al carrello. Riprova.',
          variant: 'destructive',
          duration: 3000,
        });
        return;
      }
    } else {
      // Utente guest - usa localStorage
      setItems(current => {
        console.log('🛒 [ADD] Stato carrello guest attuale:', current);
        const existingIndex = current.findIndex(item => 
          item.id === newItem.id && item.variant === newItem.variant
        );

        if (existingIndex >= 0) {
          // Aggiorna quantità se già presente
          const updated = [...current];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + newItem.quantity
          };
          console.log('🛒 [ADD] Quantità aggiornata:', updated[existingIndex]);
          return updated;
        } else {
          // Aggiungi nuovo item
          const newCart = [...current, newItem];
          console.log('🛒 [ADD] Nuovo item aggiunto al carrello guest');
          return newCart;
        }
      });
    }

    // Mostra sempre toast di conferma
    toast({
      title: 'Prodotto aggiunto al carrello',
      description: `${product.name} × ${product.quantity} aggiunto al carrello`,
      duration: 3000,
    });

    return newItem;
  };

  // Rimuovi dal carrello
  const removeFromCart = async (id: string, variant: string) => {
    if (isAuthenticated && user) {
      // Utente registrato - usa API
      try {
        await apiRequest('DELETE', '/api/cart', {
          productId: parseInt(id),
          variant: variant
        });
        
        // Ricarica carrello dal server
        const response = await apiRequest('GET', `/api/cart/${user.id}`);
        setItems(response.items || []);
      } catch (error) {
        console.error('🛒 [ERROR] Errore rimozione carrello server:', error);
      }
    } else {
      // Utente guest - usa localStorage
      setItems(current => current.filter(item => !(item.id === id && item.variant === variant)));
    }
  };

  // Aggiorna quantità
  const updateQuantity = async (id: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id, variant);
      return;
    }

    if (isAuthenticated && user) {
      // Utente registrato - usa API
      try {
        await apiRequest('PUT', '/api/cart', {
          productId: parseInt(id),
          variant: variant,
          quantity: quantity
        });
        
        // Ricarica carrello dal server
        const response = await apiRequest('GET', `/api/cart/${user.id}`);
        setItems(response.items || []);
      } catch (error) {
        console.error('🛒 [ERROR] Errore aggiornamento carrello server:', error);
      }
    } else {
      // Utente guest - usa localStorage
      setItems(current => current.map(item => 
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Svuota carrello
  const clearCart = async () => {
    if (isAuthenticated && user) {
      // Utente registrato - usa API
      try {
        await apiRequest('DELETE', `/api/cart/${user.id}`);
        setItems([]);
      } catch (error) {
        console.error('🛒 [ERROR] Errore svuotamento carrello server:', error);
      }
    } else {
      // Utente guest - usa localStorage
      setItems([]);
    }
  };

  // Calcola totale
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Conta totale articoli
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    totalItems,
  };
}