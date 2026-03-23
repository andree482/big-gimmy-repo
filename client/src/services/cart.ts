import { supabase } from '../lib/supabase';

// Helper per ottenere headers con autenticazione
async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  } catch (e) {
  }
  return headers;
}

export async function addToCart(productOptionId: number, qty: number = 1) {

  try {
    // Ottieni l'utente corrente per passare l'ID
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Salta RPC e vai direttamente al fallback server
      const headers = await getAuthHeaders();
      const serverResponse = await fetch('/api/cart', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          product_option_id: productOptionId,
          quantity: qty
        })
      });

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json().catch(() => ({}));
        return { error: errorData };
      }

      return { data: await serverResponse.json(), error: null };
    }

    // Prova con Supabase RPC diretto (con user ID)
    const result = await supabase.rpc('add_to_cart', {
      p_product_option_id: productOptionId,
      p_quantity: qty,
      p_user_id: user.id
    });

    if (result.error) {

      // Fallback: usa l'endpoint server se RPC fallisce
      const headers = await getAuthHeaders();
      const serverResponse = await fetch('/api/cart', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          product_option_id: productOptionId,
          quantity: qty
        })
      });

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json().catch(() => ({}));
        return { error: errorData };
      }

      return { data: await serverResponse.json(), error: null };
    }

    return result;
  } catch (e) {

    // Ultimo tentativo via server
    try {
      const headers = await getAuthHeaders();
      const serverResponse = await fetch('/api/cart', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          product_option_id: productOptionId,
          quantity: qty
        })
      });

      if (serverResponse.ok) {
        return { data: await serverResponse.json(), error: null };
      }
    } catch (_) {}

    return { error: e };
  }
}

export async function updateCartQuantity(itemId: number, qty: number) {

  try {
    const result = await supabase.rpc('update_cart_quantity', {
      p_product_option_id: itemId,
      p_quantity: qty
    });

    if (result.error) {

      // Fallback via server
      const headers = await getAuthHeaders();
      const serverResponse = await fetch('/api/cart', {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          product_option_id: itemId,
          quantity: qty
        })
      });

      if (serverResponse.ok) {
        return { data: await serverResponse.json(), error: null };
      }
    }

    return result;
  } catch (e) {
    return { error: e };
  }
}

export async function removeFromCart(itemId: number) {

  try {
    const result = await supabase.rpc('remove_from_cart', {
      p_product_option_id: itemId
    });

    if (result.error) {

      // Fallback via server
      const headers = await getAuthHeaders();
      const serverResponse = await fetch('/api/cart', {
        method: 'DELETE',
        headers,
        credentials: 'include',
        body: JSON.stringify({ product_option_id: itemId })
      });

      if (serverResponse.ok) {
        return { data: await serverResponse.json(), error: null };
      }
    }

    return result;
  } catch (e) {
    return { error: e };
  }
}

export async function clearCart() {

  try {
    const result = await supabase.rpc('clear_cart');

    if (result.error) {
    }

    return result;
  } catch (e) {
    return { error: e };
  }
}

export async function getCart() {
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return { data: [], error: null };
  }

  return await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_option:product_option_id(
        id,
        flavor,
        size,
        price_cents,
        original_price_cents,
        image,
        products(
          id,
          name
        )
      )
    `)
    .eq('user_id', user.id);
}
