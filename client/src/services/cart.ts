import { supabase } from '../lib/supabase';

export async function addToCart(productOptionId: number, qty: number = 1) {
  console.log('[CART] Tentativo addToCart via Supabase RPC:', { productOptionId, qty });

  try {
    // Prima prova con Supabase RPC diretto
    const result = await supabase.rpc('add_to_cart', {
      p_product_option_id: productOptionId,
      p_quantity: qty
    });

    if (result.error) {
      console.error('[CART] Errore Supabase RPC:', result.error);

      // Fallback: usa l'endpoint server se RPC fallisce
      console.log('[CART] Tentativo fallback via server API...');
      const serverResponse = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          product_option_id: productOptionId,
          quantity: qty
        })
      });

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json().catch(() => ({}));
        console.error('[CART] Errore server fallback:', serverResponse.status, errorData);
        return { error: errorData };
      }

      console.log('[CART] Successo via server fallback');
      return { data: await serverResponse.json(), error: null };
    }

    console.log('[CART] Successo via Supabase RPC');
    return result;
  } catch (e) {
    console.error('[CART] Eccezione addToCart:', e);

    // Ultimo tentativo via server
    try {
      const serverResponse = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  console.log('[CART] Tentativo updateCartQuantity:', { itemId, qty });

  try {
    const result = await supabase.rpc('update_cart_quantity', {
      p_product_option_id: itemId,
      p_quantity: qty
    });

    if (result.error) {
      console.error('[CART] Errore updateCartQuantity RPC:', result.error);

      // Fallback via server
      const serverResponse = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    console.error('[CART] Eccezione updateCartQuantity:', e);
    return { error: e };
  }
}

export async function removeFromCart(itemId: number) {
  console.log('[CART] Tentativo removeFromCart:', { itemId });

  try {
    const result = await supabase.rpc('remove_from_cart', {
      p_product_option_id: itemId
    });

    if (result.error) {
      console.error('[CART] Errore removeFromCart RPC:', result.error);

      // Fallback via server
      const serverResponse = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_option_id: itemId })
      });

      if (serverResponse.ok) {
        return { data: await serverResponse.json(), error: null };
      }
    }

    return result;
  } catch (e) {
    console.error('[CART] Eccezione removeFromCart:', e);
    return { error: e };
  }
}

export async function clearCart() {
  console.log('[CART] Tentativo clearCart');

  try {
    const result = await supabase.rpc('clear_cart');

    if (result.error) {
      console.error('[CART] Errore clearCart RPC:', result.error);
    }

    return result;
  } catch (e) {
    console.error('[CART] Eccezione clearCart:', e);
    return { error: e };
  }
}

export async function getCart() {
  const user = (await supabase.auth.getUser()).data.user;

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
        image
      )
    `)
    .eq('user_id', user.id);
}
