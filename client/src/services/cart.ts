import { supabase } from '../lib/supabase';

export async function addToCart(productOptionId, qty = 1) {
  return await supabase.rpc('add_to_cart', {
    p_product_option_id: productOptionId,
    p_quantity: qty
  });
}

export async function updateCartQuantity(itemId, qty) {
  return await supabase.rpc('update_cart_quantity', {
    p_product_option_id: itemId,
    p_quantity: qty
  });
}

export async function removeFromCart(itemId) {
  return await supabase.rpc('remove_from_cart', {
    p_product_option_id: itemId
  });
}

export async function clearCart() {
  return await supabase.rpc('clear_cart');
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
