import { markets, type MarketCode } from '@/lib/markets';
import type { CartItem, Service, CartCatalogue } from '@/types';

export function serviceUnits(
  service: Pick<Service, 'category'>,
  selections: Record<string, string>,
) {
  if (service.category !== 'gifts') return 1;
  return Number(selections['Quantity tier']?.match(/^\d+/)?.[0] ?? 1);
}
export function itemSubtotal(item: CartItem, catalogue: CartCatalogue) {
  const service = catalogue[item.slug];
  return service
    ? service.price * serviceUnits(service, item.selections) * item.quantity
    : 0;
}

export function cartKey(
  slug: string,
  market: MarketCode,
  selections: Record<string, string>,
) {
  return `${market}:${slug}:${Object.entries(selections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('|')}`;
}
export function cartTotals(
  items: CartItem[],
  market: MarketCode,
  catalogue: CartCatalogue,
) {
  const relevant = items.filter((item) => item.market === market);
  const subtotal = relevant.reduce(
    (sum, item) => sum + itemSubtotal(item, catalogue),
    0,
  );
  // Illustrative estimate only; no jurisdiction-specific tax calculation or payment is performed.
  const tax = Math.round(subtotal * markets[market].taxRate * 100) / 100;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
    itemCount: relevant.reduce((sum, item) => sum + item.quantity, 0),
  };
}
