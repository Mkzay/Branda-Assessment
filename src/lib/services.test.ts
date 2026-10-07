import { describe, expect, it } from 'vitest';
import { getFilteredServices } from './services';
import { cartKey, cartTotals } from './cart';

describe('catalogue queries', () => {
  it('combines search, category, industry, and urgency', () => {
    const result = getFilteredServices({ q:'logo', category:'create', industry:'startups', urgency:'express' }, 'ng');
    expect(result.services.map(item => item.slug)).toEqual(['logo-design']);
  });
  it('uses market prices for sorting and bounds pagination', () => {
    const result = getFilteredServices({ sort:'price-asc', page:'999' }, 'us');
    expect(result.page).toBe(result.totalPages);
    expect(getFilteredServices({ sort:'price-asc' }, 'us').services[0].pricing.us).toBe(9);
  });
});

describe('cart calculations', () => {
  it('isolates markets and computes mock tax from subtotal', () => {
    const items = [
      { key:'one', slug:'logo-design', market:'ng' as const, quantity:2, selections:{} },
      { key:'two', slug:'logo-design', market:'us' as const, quantity:1, selections:{} },
    ];
    expect(cartTotals(items, 'ng')).toEqual({ subtotal:360000, tax:27000, total:387000, itemCount:2 });
  });
  it('uses stable option order for item identity', () => {
    expect(cartKey('logo-design','ng',{ Package:'Signature', Finish:'Matte' })).toBe(cartKey('logo-design','ng',{ Finish:'Matte', Package:'Signature' }));
  });
});
