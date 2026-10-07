import { getServiceBySlug } from '@/lib/services';
import { markets, type MarketCode } from '@/lib/markets';
import type { CartItem } from '@/types';

export function cartKey(slug: string, market: MarketCode, selections: Record<string,string>) {
  return `${market}:${slug}:${Object.entries(selections).sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('|')}`;
}
export function cartTotals(items: CartItem[], market: MarketCode) {
  const relevant = items.filter(item => item.market === market);
  const subtotal = relevant.reduce((sum, item) => sum + (getServiceBySlug(item.slug)?.pricing[market] ?? 0) * item.quantity, 0);
  // Illustrative estimate only; no jurisdiction-specific tax calculation or payment is performed.
  const tax = Math.round(subtotal * markets[market].taxRate * 100) / 100;
  return { subtotal, tax, total: subtotal + tax, itemCount: relevant.reduce((sum,item) => sum+item.quantity,0) };
}
