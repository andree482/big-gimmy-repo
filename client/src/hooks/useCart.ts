import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthQuery } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

export interface CartItem {
  product_option_id: number;
  product_id: number;
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
  const { user, isAuthenticated } = useAuthQuery();

  // ----------------------------------------
  // 🚀 1. CARICAMENTO INIZIALE
  // ----------------------------------------
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        console.log("🛒 Utente loggato → caricamento carrello server…");

        // Carrello guest → trasferiscilo al backend
        const guest = localStorage.getItem("biggimmy-cart");

        try {
          if (guest && guest !== "[]") {
            const guestItems = JSON.parse(guest);
            for (const item of guestItems) {
            await apiRequest("POST", "/api/cart", {
              product_option_id: Number(item.product_option_id),
              quantity: Number(item.quantity),
            });
            }
            localStorage.removeItem("biggimmy-cart");
          }

          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const dbItems = Array.isArray(response.items) ? response.items : [];
          const mapped = dbItems.map((it: any) => {
            const id = Number(it.product_option_id ?? it.id ?? it.product_option?.id);
            const productId = Number(it.product_id ?? it.product_option?.product_id);
            const priceCents = typeof it.price_cents === "number" ? it.price_cents : (typeof it.price === "number" ? it.price : 0);
            const price = priceCents > 100 ? priceCents / 100 : priceCents;
            const flavor = it.flavor ?? it.product_option?.flavor ?? "";
            const size = it.size ?? it.product_option?.size ?? "";
            const variant = it.variant ?? `${flavor} ${size}`.trim();
            const image = it.image ?? it.product_option?.image;
            const quantity = Number(it.quantity ?? 1);
            const name = it.name ?? it.product_option?.name ?? "";
            return { product_option_id: id, product_id: productId || 0, name, price, variant, quantity, image } as CartItem;
          });
          setItems(mapped);
        } catch (e) {
          console.warn("/api/cart-db non disponibile, fallback su sessione", e);
          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const sessItems = Array.isArray(response.items) ? response.items : [];
          const mapped = sessItems.map((it: any) => {
            const pid = Number(it.id ?? it.product_id ?? 0);
            const poid = Number(it.product_option_id ?? it.id ?? pid);
            const price = typeof it.price === "number" ? it.price : parseFloat(String(it.price ?? 0));
            return {
              product_option_id: poid,
              product_id: pid,
              name: String(it.name ?? ""),
              price: isNaN(price) ? 0 : price,
              variant: String(it.variant ?? ""),
              quantity: Number(it.quantity ?? 1),
              image: it.image,
            } as CartItem;
          });
          setItems(mapped);
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
      try {
        if (Number.isFinite(newItem.product_option_id) && newItem.product_option_id > 0) {
          await apiRequest("POST", "/api/cart", {
            product_option_id: newItem.product_option_id,
            quantity: newItem.quantity,
          });
          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const dbItems = Array.isArray(response.items) ? response.items : [];
          const mapped = dbItems.map((it: any) => {
            const id = Number(it.product_option_id ?? it.id ?? it.product_option?.id);
            const productId = Number(it.product_id ?? it.product_option?.product_id);
            const priceCents = typeof it.price_cents === "number" ? it.price_cents : (typeof it.price === "number" ? it.price : 0);
            const price = priceCents > 100 ? priceCents / 100 : priceCents;
            const flavor = it.flavor ?? it.product_option?.flavor ?? "";
            const size = it.size ?? it.product_option?.size ?? "";
            const variant = it.variant ?? `${flavor} ${size}`.trim();
            const image = it.image ?? it.product_option?.image;
            const quantity = Number(it.quantity ?? 1);
            const name = it.name ?? it.product_option?.name ?? "";
            return { product_option_id: id, product_id: productId || newItem.product_id, name, price, variant, quantity, image } as CartItem;
          });
          setItems(mapped);
        } else {
          throw new Error("Missing product_option_id");
        }
      } catch (_) {
        await apiRequest("POST", "/api/cart", {
          productId: newItem.product_id,
          variant: newItem.variant,
          quantity: newItem.quantity,
          price: newItem.price,
        });
        const response = await apiRequest("GET", `/api/cart/${user.id}`);
        const sessItems = Array.isArray(response.items) ? response.items : [];
        const mapped = sessItems.map((it: any) => {
          const pid = Number(it.id ?? it.product_id ?? 0);
          const poid = Number(it.product_option_id ?? it.id ?? pid);
          const price = typeof it.price === "number" ? it.price : parseFloat(String(it.price ?? 0));
          return {
            product_option_id: poid,
            product_id: pid,
            name: String(it.name ?? ""),
            price: isNaN(price) ? 0 : price,
            variant: String(it.variant ?? ""),
            quantity: Number(it.quantity ?? 1),
            image: it.image,
          } as CartItem;
        });
        setItems(mapped);
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
    if (isAuthenticated && user) {
      try {
        if (Number.isFinite(product_option_id) && product_option_id > 0) {
          await apiRequest("DELETE", "/api/cart", { product_option_id });
          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const dbItems = Array.isArray(response.items) ? response.items : [];
          const mapped = dbItems.map((it: any) => {
            const id = Number(it.product_option_id ?? it.id ?? it.product_option?.id);
            const productId = Number(it.product_id ?? it.product_option?.product_id);
            const priceCents = typeof it.price_cents === "number" ? it.price_cents : (typeof it.price === "number" ? it.price : 0);
            const price = priceCents > 100 ? priceCents / 100 : priceCents;
            const flavor = it.flavor ?? it.product_option?.flavor ?? "";
            const size = it.size ?? it.product_option?.size ?? "";
            const variant = it.variant ?? `${flavor} ${size}`.trim();
            const image = it.image ?? it.product_option?.image;
            const quantity = Number(it.quantity ?? 1);
            const name = it.name ?? it.product_option?.name ?? "";
            return { product_option_id: id, product_id: productId || 0, name, price, variant, quantity, image } as CartItem;
          });
          setItems(mapped);
        } else {
          throw new Error("Missing product_option_id");
        }
      } catch (_) {
        const item = items.find(i => i.product_option_id === product_option_id) ||
          (product_id ? items.find(i => i.product_id === product_id && (!variant || i.variant === variant)) : undefined);
        const pid = item?.product_id ?? product_id;
        const v = item?.variant ?? variant ?? "";
        if (typeof pid === "number") {
          await apiRequest("DELETE", "/api/cart", { productId: pid, variant: v });
          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const sessItems = Array.isArray(response.items) ? response.items : [];
          const mapped = sessItems.map((it: any) => {
            const pid = Number(it.id ?? it.product_id ?? 0);
            const poid = Number(it.product_option_id ?? it.id ?? pid);
            const price = typeof it.price === "number" ? it.price : parseFloat(String(it.price ?? 0));
            return {
              product_option_id: poid,
              product_id: pid,
              name: String(it.name ?? ""),
              price: isNaN(price) ? 0 : price,
              variant: String(it.variant ?? ""),
              quantity: Number(it.quantity ?? 1),
              image: it.image,
            } as CartItem;
          });
          setItems(mapped);
        }
      }
    } else {
      setItems((curr) =>
        curr.filter((i) => i.product_option_id !== product_option_id)
      );
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
    if (quantity <= 0) return removeFromCart(product_option_id);

    if (isAuthenticated && user) {
      try {
        if (Number.isFinite(product_option_id) && product_option_id > 0) {
          await apiRequest("PUT", "/api/cart", { product_option_id, quantity });
          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const dbItems = Array.isArray(response.items) ? response.items : [];
          const mapped = dbItems.map((it: any) => {
            const id = Number(it.product_option_id ?? it.id ?? it.product_option?.id);
            const productId = Number(it.product_id ?? it.product_option?.product_id);
            const priceCents = typeof it.price_cents === "number" ? it.price_cents : (typeof it.price === "number" ? it.price : 0);
            const price = priceCents > 100 ? priceCents / 100 : priceCents;
            const flavor = it.flavor ?? it.product_option?.flavor ?? "";
            const size = it.size ?? it.product_option?.size ?? "";
            const variant = it.variant ?? `${flavor} ${size}`.trim();
            const image = it.image ?? it.product_option?.image;
            const qty = Number(it.quantity ?? 1);
            const name = it.name ?? it.product_option?.name ?? "";
            return { product_option_id: id, product_id: productId || 0, name, price, variant, quantity: qty, image } as CartItem;
          });
          setItems(mapped);
        } else {
          throw new Error("Missing product_option_id");
        }
      } catch (_) {
        const item =
          items.find(i => i.product_option_id === product_option_id) ||
          (product_id ? items.find(i => i.product_id === product_id && (!variant || i.variant === variant)) : undefined);
        const pid = item?.product_id ?? product_id;
        const v = item?.variant ?? variant ?? "";
        if (typeof pid === "number") {
          await apiRequest("PUT", "/api/cart", { productId: pid, variant: v, quantity });
          const response = await apiRequest("GET", `/api/cart/${user.id}`);
          const sessItems = Array.isArray(response.items) ? response.items : [];
          const mapped = sessItems.map((it: any) => {
            const pid2 = Number(it.id ?? it.product_id ?? 0);
            const poid2 = Number(it.product_option_id ?? it.id ?? pid2);
            const price = typeof it.price === "number" ? it.price : parseFloat(String(it.price ?? 0));
            return {
              product_option_id: poid2,
              product_id: pid2,
              name: String(it.name ?? ""),
              price: isNaN(price) ? 0 : price,
              variant: String(it.variant ?? ""),
              quantity: Number(it.quantity ?? 1),
              image: it.image,
            } as CartItem;
          });
          setItems(mapped);
        }
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
        await apiRequest("DELETE", `/api/cart/${user.id}`);
      } catch (_) {
        await apiRequest("DELETE", `/api/cart/${user.id}`);
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
