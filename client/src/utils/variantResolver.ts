export function normalizeDisplay(flavor: any, size: any): string {
  const f = (flavor ?? '').toString();
  const s = (size ?? '').toString();
  return `${f} ${s}`.replace(/Unico/gi, '').trim();
}

export function resolveOptionId(options: any[], variantDisplay: string): number | null {
  if (!Array.isArray(options) || options.length === 0) return null;
  const target = String(variantDisplay).replace(/Unico/gi, '').trim();
  const match = options.find((v: any) => normalizeDisplay(v.flavor, v.size) === target);
  const raw = match ? (match.id ?? match.product_option_id) : undefined;
  const parsed = typeof raw === 'string' ? Number(raw) : Number(raw);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return null;
}
