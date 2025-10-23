export type AvailabilityEntry = { isAvailable?: boolean; stockQuantity?: number };
export type Variant = { inStock?: boolean };

export type ProductLike = {
  availability?: AvailabilityEntry[];
};

export function isProductAvailable(product?: ProductLike): boolean {
  if (!product?.availability || product.availability.length === 0) return true; // assume available if unknown
  return product.availability.some(a => a?.isAvailable);
}

export function getTotalAvailable(product?: ProductLike): number | undefined {
  if (!product?.availability) return undefined;
  const quantities = product.availability
    .map(a => (typeof a?.stockQuantity === 'number' ? a.stockQuantity! : 0));
  const total = quantities.reduce((sum, q) => sum + q, 0);
  // if all unknown/zero and no explicit availability entries, treat as undefined
  const anyKnown = product.availability.some(a => typeof a?.stockQuantity === 'number');
  return anyKnown ? total : undefined;
}

export function anyVariantSelectable(variantsList?: Variant[]): boolean {
  if (!variantsList || variantsList.length === 0) return true; // some products have no variants
  return variantsList.some(v => !!v?.inStock);
}

export function canBuy(
  product?: ProductLike,
  variantsList?: Variant[],
  requestedQuantity: number = 1
): boolean {
  const available = isProductAvailable(product);
  const selectable = anyVariantSelectable(variantsList);
  const total = getTotalAvailable(product);
  const enough = typeof total !== 'number' ? true : requestedQuantity <= total;
  return available && selectable && enough;
}