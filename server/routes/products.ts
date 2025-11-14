// server/routes/products.ts
import { Router } from "express";
import { supabase } from "../index.js"; // importa il supabase inizializzato
import { cache } from "../utils/cache.ts";

const router = Router();

/**
 * GET /api/products/:id/variants
 * Response:
 * { success: true, variants: [ { id, flavor, size, price_cents, price, image, in_stock } ] }
 */
router.get("/products/:id/variants", async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ success: false, error: "Missing product id" });
  }

  try {
    // Imposta header per caching lato client (riduce richieste ripetute)
    const timestamp5m = Math.floor(Date.now() / (5 * 60 * 1000));
    res.set({
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=1800',
      'ETag': `variants-${productId}-${timestamp5m}`
    });

    // Cache lato server per ridurre egress da Supabase
    const cacheKey = `variants:${productId}:${timestamp5m}`;
    const data = await cache.wrap(cacheKey, async () => {
      const { data, error } = await supabase
        .from("product_options")
        .select("id, flavor, size, price_cents, original_price_cents, image, in_stock")
        .eq("product", productId)
        .eq("in_stock", true)
        .order("id", { ascending: true });

      if (error) throw error;
      return data || [];
    }, 5 * 60 * 1000);

    const variants = (data || []).map((v: any) => ({
      id: String(v.id),
      flavor: v.flavor,
      size: v.size,
      price_cents: v.price_cents ?? null,
      price: v.price_cents != null ? (v.price_cents / 100) : null,
      original_price_cents: v.original_price_cents ?? null,
      original_price: v.original_price_cents != null ? (v.original_price_cents / 100) : null,
      image: v.image ?? null,
    }));

    return res.json({ success: true, variants });
  } catch (err: any) {
    console.error("Server error fetching product variants:", err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

export default router;
