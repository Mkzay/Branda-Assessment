'use client';
import { buttonClass } from '@/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import type { CartCatalogue } from '@/types';
import { formatPrice, type MarketCode } from '@/lib/markets';
import { itemSubtotal } from '@/lib/cart';
import { OrderSummary } from './order-summary';

export function CartView({
  market,
  catalogue,
}: {
  market: MarketCode;
  catalogue: CartCatalogue;
}) {
  const { items, hydrated, updateQuantity, remove } = useCartStore();
  const relevant = items.filter((item) => item.market === market);
  if (!hydrated)
    return (
      <div className="skeleton" style={{ height: 320, marginBottom: 90 }} />
    );
  if (!relevant.length)
    return (
      <div className="empty-state" style={{ marginBottom: 90 }}>
        <ShoppingBag size={42} />
        <h2>Your cart is waiting for ideas.</h2>
        <p>
          Explore the services that will make your next brand moment happen.
        </p>
        <Link className={buttonClass('primary')} href={`/${market}/services`}>
          Explore services
        </Link>
      </div>
    );
  return (
    <div className="grid grid-cols-1 items-start gap-6 pb-[50px] min-[761px]:grid-cols-[minmax(0,1fr)_320px] min-[761px]:gap-[26px] min-[761px]:pb-[95px] min-[1051px]:grid-cols-[minmax(0,1fr)_370px] min-[1051px]:gap-[55px]">
      <div className="cart-list">
        {relevant.map((item) => {
          const service = catalogue[item.slug];
          if (!service) return null;
          return (
            <article className="cart-item" key={item.key}>
              <div className="cart-item-image">
                <Image src={service.image} alt="" fill sizes="125px" />
              </div>
              <div>
                <Link href={`/${market}/services/${item.slug}`}>
                  <h2>{service.name}</h2>
                </Link>
                <span className="eyebrow">{service.category}</span>
                {Object.entries(item.selections).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}
                <div className="quantity-control">
                  <button
                    type="button"
                    aria-label={`Decrease ${service.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                  >
                    <Minus size={15} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${service.name} quantity`}
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                {formatPrice(itemSubtotal(item, catalogue), market)}
                <br />
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => remove(item.key)}
                >
                  Remove
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <OrderSummary items={relevant} market={market} catalogue={catalogue} />
    </div>
  );
}
