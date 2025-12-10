## 2025-12-09

- Aggiorna `PUT /api/cart` per usare `product_option_id` + `quantity` e aggiornare Supabase con fallback a sessione (`server/routes.ts`).
- Aggiunge log `console.log` per debugging nei punti critici (cart PUT, checkout).
- Introduce endpoint `POST /api/checkout` con controllo env e redirect Stripe (`server/routes.ts`).
- Aggiunge API `cart-db` per operazioni su Supabase (`server/routes.ts`).
- Sistema errori di lint:
  - Rimuove uso di `variants_from_db` in `AddToCartDialog` (`client/src/components/cart/AddToCartDialog.tsx`).
  - Installa `@types/compression` per typing di `compression` (`dev dependency`).
  - Stub `server/priceWatcher.ts` per evitare errori “not a module”.
- Aggiorna `CheckoutSummary` per invocare `/api/checkout` e gestire errori.

