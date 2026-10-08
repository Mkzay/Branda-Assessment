'use client';
import { buttonClass } from '@/components/ui/button';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import type { MarketCode } from '@/lib/markets';

type Order = { reference: string; name: string; count: number };
const subscribe = () => () => {};
const serverSnapshot = () => null;
export function SuccessView({ market }: { market: MarketCode }) {
  const raw = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(`branda-last-order-${market}`),
    serverSnapshot,
  );
  let order: Order | null = null;
  try {
    order = raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    order = null;
  }
  if (!order)
    return (
      <div className="success-card">
        <h1>No recent order found.</h1>
        <p>
          Explore services and complete checkout to see your confirmation here.
        </p>
        <Link className={buttonClass('primary')} href={`/${market}/services`}>
          Explore services
        </Link>
      </div>
    );
  return (
    <div className="success-card">
      <div className="success-icon">
        <Check size={34} />
      </div>
      <span className="eyebrow">REQUEST RECEIVED</span>
      <h1>It&apos;s a great start, {order.name.split(' ')[0]}.</h1>
      <p>
        Your order request for {order.count}{' '}
        {order.count === 1 ? 'service' : 'services'} has been saved in this
        browser. No order has been sent to the Branda team.
      </p>
      <div className="reference">Order reference: {order.reference}</div>
      <Link className={buttonClass('primary')} href={`/${market}/services`}>
        Keep exploring
      </Link>
    </div>
  );
}
