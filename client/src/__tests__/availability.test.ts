import { describe, it, expect } from 'vitest';
import { isProductAvailable, getTotalAvailable, anyVariantSelectable, canBuy } from '../utils/availability';

describe('availability utils', () => {
  it('isProductAvailable returns true when availability missing', () => {
    expect(isProductAvailable({})).toBe(true);
  });

  it('isProductAvailable detects unavailable', () => {
    expect(isProductAvailable({ availability: [{ isAvailable: false }] })).toBe(false);
  });

  it('getTotalAvailable returns undefined when quantities unknown', () => {
    expect(getTotalAvailable({ availability: [{ isAvailable: true }] })).toBeUndefined();
  });

  it('getTotalAvailable sums quantities when present', () => {
    expect(getTotalAvailable({ availability: [{ stockQuantity: 2 }, { stockQuantity: 3 }] })).toBe(5);
  });

  it('anyVariantSelectable true when no variants list', () => {
    expect(anyVariantSelectable(undefined)).toBe(true);
  });

  it('anyVariantSelectable detects at least one in stock', () => {
    expect(anyVariantSelectable([{ inStock: false }, { inStock: true }])).toBe(true);
  });

  it('canBuy false when product unavailable', () => {
    const product = { availability: [{ isAvailable: false }] };
    expect(canBuy(product, [{ inStock: true }], 1)).toBe(false);
  });

  it('canBuy false when requested quantity exceeds stock', () => {
    const product = { availability: [{ isAvailable: true, stockQuantity: 2 }] };
    expect(canBuy(product, [{ inStock: true }], 3)).toBe(false);
  });

  it('canBuy true when available and quantity within stock', () => {
    const product = { availability: [{ isAvailable: true, stockQuantity: 5 }] };
    expect(canBuy(product, [{ inStock: true }], 3)).toBe(true);
  });
});