import { buttonClass } from '@/components/ui/button';
import Link from 'next/link';
import { formatPrice, markets, type MarketCode } from '@/lib/markets';
import { cartTotals, itemSubtotal } from '@/lib/cart';
import type { CartItem, CartCatalogue } from '@/types';

export function OrderSummary({
  items,
  market,
  catalogue,
  checkout = false,
}: {
  items: CartItem[];
  market: MarketCode;
  catalogue: CartCatalogue;
  checkout?: boolean;
}) {
  const totals = cartTotals(items, market, catalogue);
  return (
    <aside className="summary">
      <h2>Order summary</h2>
      {checkout && (
        <div className="checkout-items">
          {items
            .filter((item) => item.market === market)
            .map((item) => (
              <div className="checkout-item" key={item.key}>
                <div>
                  <strong>{catalogue[item.slug]?.name}</strong>
                  <br />
                  <span>
                    Qty {item.quantity}
                    {Object.values(item.selections).length > 0 &&
                      ` · ${Object.values(item.selections).join(', ')}`}
                  </span>
                </div>
                <strong>
                  {formatPrice(itemSubtotal(item, catalogue), market)}
                </strong>
              </div>
            ))}
        </div>
      )}
      <div className="summary-line">
        <span>Subtotal</span>
        <strong>{formatPrice(totals.subtotal, market)}</strong>
      </div>
      <div className="summary-line">
        <span>
          Estimated tax ({Math.round(markets[market].taxRate * 1000) / 10}%)
        </span>
        <strong>{formatPrice(totals.tax, market)}</strong>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <span>{formatPrice(totals.total, market)}</span>
      </div>
      {!checkout && (
        <Link className={buttonClass('primary')} href={`/${market}/checkout`}>
          Continue to checkout
        </Link>
      )}
      <p className="summary-note">Estimated tax. No payment is collected.</p>
    </aside>
  );
}
