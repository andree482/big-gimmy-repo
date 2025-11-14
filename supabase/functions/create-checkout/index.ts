// supabase/functions/create-checkout/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Inizializza Stripe
const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
if (!stripeSecret) throw new Error("STRIPE_SECRET_KEY mancante");
const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

// Inizializza Supabase
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
if (!supabaseUrl || !supabaseKey) throw new Error("Variabili Supabase mancanti");
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req: Request) => {
  try {
    const { optionId, quantity = 1, userId } = await req.json();

    if (!optionId) {
      return new Response(JSON.stringify({ error: "optionId mancante" }), { status: 400 });
    }

    // Recupera i dati dell'opzione dal DB
    const { data: option, error } = await supabase
      .from("product_options")
      .select("id, product_id, flavor, size, price_cents, original_price_cents, image, in_stock")
      .eq("id", optionId)
      .single();

    if (error || !option) {
      return new Response(JSON.stringify({ error: "Opzione prodotto non trovata" }), { status: 404 });
    }

    if (!option.in_stock) {
      return new Response(JSON.stringify({ error: "Prodotto esaurito" }), { status: 400 });
    }

    // Nome leggibile per Stripe
    const productName = `${option.flavor ?? ""} ${option.size ?? ""}`.trim();

    // Crea sessione Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: option.price_cents,
            product_data: {
              name: productName,
              images: option.image ? [option.image] : undefined
            },
          },
          quantity,
        },
      ],
      success_url: `${Deno.env.get("PUBLIC_FRONTEND_URL")}/success`,
      cancel_url: `${Deno.env.get("PUBLIC_FRONTEND_URL")}/cancel`,

      metadata: {
        optionId: option.id.toString(),
        productId: option.product_id.toString(),
        flavor: option.flavor ?? "",
        size: option.size ?? "",
        quantity: quantity.toString(),
        userId: userId ?? "guest"
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
