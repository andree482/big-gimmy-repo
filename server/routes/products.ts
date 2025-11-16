// server/routes/products.ts
import { Router } from "express";
import { supabase } from "../index";
import { cache } from "../utils/cache.ts";

const router = Router();

router.get("/products/:id/variants", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("product_options")
      .select("id, flavor, size, price_cents, image")
      .eq("product_id", id); // ✅ colonna corretta

    if (error) throw error;

    res.json({
      success: true,
      variants: data.map(opt => ({
        id: opt.id,
        flavor: opt.flavor,
        size: opt.size,
        price: opt.price_cents / 100,
        image: opt.image,
      })),
    });
  } catch (error: any) {
    console.error("Supabase error fetching variants:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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

});

export default router;
