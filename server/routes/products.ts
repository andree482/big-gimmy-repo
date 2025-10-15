// server/routes/products.ts
import { Router } from "express";
import { supabase } from "../index.js"; // importa il supabase inizializzato

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
    // Esempio usando Supabase (JS client)
    const { data, error } = await supabase
      .from("product_options")
      .select("id, flavor, size, price_cents, original_price_cents, image")
      .eq("product", productId)
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase error fetching variants:", error);
      return res.status(500).json({ success: false, error: error.message || error });
    }

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
