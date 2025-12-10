import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET carrello utente
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase.rpc("get_cart", {
    p_user_id: userId,
  });

  if (error) return res.status(400).json({ success: false, error });

  res.json({ success: true, items: data });
});

// Aggiungi al carrello
router.post("/", async (req, res) => {
  const { product_option_id, quantity } = req.body;

  const { error } = await supabase.rpc("add_to_cart", {
    p_product_option_id: product_option_id,
    p_quantity: quantity,
  });

  if (error) return res.status(400).json({ success: false, error });

  res.json({ success: true });
});

// Aggiorna quantità
router.put("/", async (req, res) => {
  const { product_option_id, quantity } = req.body;

  const { error } = await supabase.rpc("update_cart_quantity", {
    p_product_option_id: product_option_id,
    p_quantity: quantity,
  });

  if (error) return res.status(400).json({ success: false, error });

  res.json({ success: true });
});

// Rimuovi item
router.delete("/", async (req, res) => {
  const { product_option_id } = req.body;

  const { error } = await supabase.rpc("remove_from_cart", {
    p_product_option_id: product_option_id,
  });

  if (error) return res.status(400).json({ success: false, error });

  res.json({ success: true });
});

// Svuota carrello
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  const { error } = await supabase.rpc("clear_cart", {
    p_user_id: userId,
  });

  if (error) return res.status(400).json({ success: false, error });

  res.json({ success: true });
});

export default router;
