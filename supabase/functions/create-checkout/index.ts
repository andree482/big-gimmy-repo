// supabase/functions/create-checkout-session/index.ts

import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";
import Stripe from "https://esm.sh/stripe@12?target=deno";

serve(async (req) => {
  try {
    // Recuperiamo Supabase
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_KEY")!;
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY")!;

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_KEY
    );

    // Recuperiamo il JWT dell'utente
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401 }
      );
    }

    const jwt = authHeader.split(" ")[1];
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid user" }), {
        status: 401,
      });
    }

    const userId = user.id;

    // 1. Carichiamo il carrello dell'utente
    const { data: cart, error: cartError } = await supabase.rpc("get_cart");

    if (cartError) {
      console.error(cartError);
      return new Response(
        JSON.stringify({ error: "Errore caricamento carrello" }),
        { status: 400 }
      );
    }

    if (!cart || cart.length === 0) {
      return new Response(
        JSON.stringify({ error: "Il carrello è vuoto" }),
        { status: 400 }
      );
    }

    // 2. Creiamo i line items per Stripe
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `${item.name} — ${item.variant}`,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price, // già in centesimi
      },
      quantity: item.quantity,
    }));

    // 3. Creiamo la sessione Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "https://biggimmyintegratori.it/success",
      cancel_url: "https://biggimmyintegratori.it/cancel",
      metadata: {
        user_id: userId,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Errore Stripe:", err);
    return new Response(JSON.stringify({ error: "Errore interno" }), {
      status: 500,
    });
  }
});

// Import necessario per Supabase Deno
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
