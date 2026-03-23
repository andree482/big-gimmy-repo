import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { addToCart as addToCartRPC, updateCartQuantity as updateCartQuantityRPC, removeFromCart as removeFromCartRPC, clearCart as clearCartRPC, getCart as getCartRPC } from "@/services/cart";

export interface CartItem {
  product_option_id: number;
  product_id: number;
  name: string;
  price: number;
  originalPrice?: number;
  variant: string;
  quantity: number;
  image?: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // ----------------------------------------
  // 🚀 1. CARICAMENTO INIZIALE
  // ----------------------------------------
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        console.log("🛒 Utente loggato → caricamento carrello Supabase…");

        // Trasferisci carrello guest su Supabase
        const guest = localStorage.getItem("biggimmy-cart");
        if (guest && guest !== "[]") {
          try {
            const guestItems = JSON.parse(guest);
            for (const item of guestItems) {
              await addToCartRPC(Number(item.product_option_id), Number(item.quantity));
            }
            localStorage.removeItem("biggimmy-cart");
          } catch (_) {}
        }

        // Carica carrello da Supabase
        try {
          const { data: cartData, error } = await getCartRPC();
          if (error) throw error;
          const rows = Array.isArray(cartData) ? cartData : [];
          const mapped = rows.map((row: any) => {
            const po = row.product_option || {};
            const id = Number(po.id ?? row.id);
            const priceCents = Number(po.price_cents ?? 0);
            const price = priceCents / 100;
            const originalPriceCents = Number(po.original_price_cents ?? 0);
            const originalPrice = originalPriceCents > 0 && originalPriceCents !== priceCents ? originalPriceCents / 100 : undefined;
            const flavor = String(po.flavor ?? "");
            const size = String(po.size ?? "");
            const variant = `${flavor} ${size}`.trim();
            const image = po.image;
            const quantity = Number(row.quantity ?? 1);
            const name = String(po.products?.name ?? row.name ?? "");
            const productId = Number(row.product_id ?? 0);
            return { product_option_id: id, product_id: productId, name, price, originalPrice, variant, quantity, image } as CartItem;
          });
          setItems(mapped);
        } catch (e) {
          console.warn("Supabase cart non disponibile", e);
        }
      } else {
        console.log("🛒 Guest → caricamento da localStorage");
        const saved = localStorage.getItem("biggimmy-cart");
        if (saved) setItems(JSON.parse(saved));
      }

      setIsInitialized(true);
    };

    loadCart();
  }, [isAuthenticated, user]);

  // ----------------------------------------
  // 💾 Salva carrello guest in localStorage
  // ----------------------------------------
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      localStorage.setItem("biggimmy-cart", JSON.stringify(items));
    }
  }, [items, isInitialized, isAuthenticated]);

  // ----------------------------------------
  // ➕ Add to cart
  // ----------------------------------------
  const addToCart = async (product: any) => {
    console.log("🛒 [DEBUG] Prodotto ricevuto addToCart:", product);

    const newItem: CartItem = {
      product_option_id: Number(product.product_option_id),
      product_id: Number(product.product_id),
      name: product.name,
      variant: product.variant ?? "",
      price:
        typeof product.price === "string"
          ? parseFloat(product.price.replace(",", "."))
          : product.price,
      originalPrice: typeof product.originalPrice === "number" ? product.originalPrice : undefined,
      quantity: Number(product.quantity),
      image: product.image,
    };

    if (!Number.isFinite(newItem.product_option_id) || newItem.product_option_id <= 0) {
      if (typeof product.slug === "string" && product.slug.length > 0) {
        try {
          const resp = await fetch(`/api/product/${product.slug}/options`);
          if (resp.ok) {
            const opts = await resp.json();
            const match = Array.isArray(opts) ? opts.find((v: any) => {
              const disp = `${(v.flavor ?? '').toString()} ${(v.size ?? '').toString()}`.replace(/Unico/gi, '').trim();
              return disp === String(product.variant ?? "").replace(/Unico/gi, '').trim();
            }) : null;
            const raw = match ? (match.id ?? match.product_option_id) : undefined;
            const parsed = typeof raw === 'string' ? Number(raw) : Number(raw);
            if (Number.isFinite(parsed) && parsed > 0) {
              newItem.product_option_id = parsed;
            }
          }
        } catch (_) {}
      }
    }

    if (isAuthenticated && user) {
      // Aggiornamento ottimistico: mostra subito il nome corretto senza aspettare il server
      setItems((current) => {
        const existing = current.find((i) => i.product_option_id === newItem.product_option_id);
        if (existing) {
          return current.map((i) =>
            i.product_option_id === newItem.product_option_id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
        }
        return [...current, newItem];
      });

      try {
        if (!Number.isFinite(newItem.product_option_id) || newItem.product_option_id <= 0) {
          throw new Error("Missing product_option_id");
        }
        await addToCartRPC(newItem.product_option_id, newItem.quantity);
        const { data: cartData } = await getCartRPC();
        const rows = Array.isArray(cartData) ? cartData : [];
        const mapped = rows.map((row: any) => {
          const po = row.product_option || {};
          const id = Number(po.id ?? row.id);
          const priceCents = Number(po.price_cents ?? 0);
          const price = priceCents / 100;
          const originalPriceCents = Number(po.original_price_cents ?? 0);
          const originalPrice = originalPriceCents > 0 && originalPriceCents !== priceCents ? originalPriceCents / 100 : undefined;
          const flavor = String(po.flavor ?? "");
          const size = String(po.size ?? "");
          const variant = `${flavor} ${size}`.trim();
          const image = po.image;
          const quantity = Number(row.quantity ?? 1);
          const products = (po as any).products || {};
          const name = String(products.name ?? row.name ?? "");
          const productId = Number(row.product_id ?? products.id ?? newItem.product_id ?? 0);
          return { product_option_id: id, product_id: productId, name, price, originalPrice, variant, quantity, image } as CartItem;
        });
        setItems(mapped);
      } catch (_) {
        // Se fallisce, il carrello rimane con l'aggiornamento ottimistico
      }
    } else {
      // Guest cart
      setItems((current) => {
        const existing = current.find(
          (i) => i.product_option_id === newItem.product_option_id
        );

        if (existing) {
          return current.map((i) =>
            i.product_option_id === newItem.product_option_id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
        }

        return [...current, newItem];
      });
    }

    toast({
      title: "Aggiunto al carrello",
      description: `${newItem.name} × ${newItem.quantity}`,
    });
  };

  // ----------------------------------------
  // ❌ Remove
  // ----------------------------------------
  const removeFromCart = async (product_option_id: number, product_id?: number, variant?: string) => {
    // Optimistic update
    const prev = [...items];
    setItems((curr) => curr.filter((i) => i.product_option_id !== product_option_id));
    if (isAuthenticated && user) {
      try {
        if (!Number.isFinite(product_option_id) || product_option_id <= 0) {
          throw new Error("Prodotto non trovato");
        }
        const { error } = await removeFromCartRPC(product_option_id);
        if (error) throw error;
        const { data: cartData } = await getCartRPC();
        const rows = Array.isArray(cartData) ? cartData : [];
        const mapped = rows.map((row: any) => {
          const po = row.product_option || {};
          const id = Number(po.id ?? row.id);
          const priceCents = Number(po.price_cents ?? 0);
          const price = priceCents / 100;
          const originalPriceCents = Number(po.original_price_cents ?? 0);
          const originalPrice = originalPriceCents > 0 && originalPriceCents !== priceCents ? originalPriceCents / 100 : undefined;
          const flavor = String(po.flavor ?? "");
          const size = String(po.size ?? "");
          const variantStr = `${flavor} ${size}`.trim();
          const image = po.image;
          const quantity = Number(row.quantity ?? 1);
          const products = (po as any).products || {};
          const name = String(products.name ?? row.name ?? "");
          const productId = Number(row.product_id ?? products.id ?? 0);
          return { product_option_id: id, product_id: productId, name, price, originalPrice, variant: variantStr, quantity, image } as CartItem;
        });
        setItems(mapped);
      } catch (e: any) {
        setItems(prev); // revert
        toast({
          title: "Errore rimozione",
          description: e?.message || "Impossibile rimuovere il prodotto",
          variant: "destructive",
        });
      }
    }
  };

  // ----------------------------------------
  // 🔄 Update quantity
  // ----------------------------------------
  const updateQuantity = async (
    product_option_id: number,
    quantity: number,
    product_id?: number,
    variant?: string
  ) => {
    if (quantity <= 0) return removeFromCart(product_option_id, product_id, variant);

    if (isAuthenticated && user) {
      const prev = [...items];
      setItems((curr) =>
        curr.map((i) =>
          i.product_option_id === product_option_id ? { ...i, quantity } : i
        )
      );
      try {
        if (!Number.isFinite(product_option_id) || product_option_id <= 0) {
          throw new Error("Prodotto non trovato");
        }
        const { error } = await updateCartQuantityRPC(product_option_id, quantity);
        if (error) throw error;
        const { data: cartData } = await getCartRPC();
        const rows = Array.isArray(cartData) ? cartData : [];
        const mapped = rows.map((row: any) => {
          const po = row.product_option || {};
          const id = Number(po.id ?? row.id);
          const priceCents = Number(po.price_cents ?? 0);
          const price = priceCents / 100;
          const originalPriceCents = Number(po.original_price_cents ?? 0);
          const originalPrice = originalPriceCents > 0 && originalPriceCents !== priceCents ? originalPriceCents / 100 : undefined;
          const flavor = String(po.flavor ?? "");
          const size = String(po.size ?? "");
          const variantStr = `${flavor} ${size}`.trim();
          const image = po.image;
          const qty = Number(row.quantity ?? 1);
          const products = (po as any).products || {};
          const name = String(products.name ?? row.name ?? "");
          const productId = Number(row.product_id ?? products.id ?? 0);
          return { product_option_id: id, product_id: productId, name, price, originalPrice, variant: variantStr, quantity: qty, image } as CartItem;
        });
        setItems(mapped);
      } catch (e: any) {
        setItems(prev); // revert
        toast({
          title: "Errore quantità",
          description: e?.message || "Impossibile aggiornare la quantità",
          variant: "destructive",
        });
      }
    } else {
      setItems((curr) =>
        curr.map((i) =>
          i.product_option_id === product_option_id ? { ...i, quantity } : i
        )
      );
    }
  };

  // ----------------------------------------
  // 🗑 Clear cart
  // ----------------------------------------
  const clearCart = async () => {
    if (isAuthenticated && user) {
      try {
        await clearCartRPC();
      } catch (_) {
        // ignore
      }
    }
    setItems([]);
  };

  // ----------------------------------------
  // 🧮 Totali
  // ----------------------------------------
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
