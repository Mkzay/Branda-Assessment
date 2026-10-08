'use client';
import { buttonClass } from '@/components/ui/button';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { OrderSummary } from '@/components/cart/order-summary';
import type { CartCatalogue } from '@/types';
import type { MarketCode } from '@/lib/markets';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number.')
    .max(24, 'Phone number is too long.'),
});
type Fields = z.infer<typeof schema>;
export function CheckoutView({
  market,
  catalogue,
}: {
  market: MarketCode;
  catalogue: CartCatalogue;
}) {
  const router = useRouter();
  const { items, hydrated, clearMarket } = useCartStore();
  const relevant = items.filter((item) => item.market === market);
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [busy, setBusy] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = schema.safeParse(fields);
    if (!result.success) {
      const next: Partial<Record<keyof Fields, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    if (!relevant.length) return;
    setBusy(true);
    const reference = `BR-${Date.now().toString(36).toUpperCase().slice(-7)}`;
    sessionStorage.setItem(
      `branda-last-order-${market}`,
      JSON.stringify({
        reference,
        name: result.data.name,
        count: relevant.reduce((sum, item) => sum + item.quantity, 0),
      }),
    );
    clearMarket(market);
    router.push(`/${market}/checkout/success`);
  };
  if (!hydrated)
    return (
      <div className="skeleton" style={{ height: 360, marginBottom: 90 }} />
    );
  if (!relevant.length)
    return (
      <div className="empty-state" style={{ marginBottom: 90 }}>
        <ShoppingBag size={42} />
        <h2>Nothing to check out yet.</h2>
        <p>
          Add a service to your cart, then come back to complete your request.
        </p>
        <Link className={buttonClass('primary')} href={`/${market}/services`}>
          Explore services
        </Link>
      </div>
    );
  return (
    <div className="checkout-layout grid grid-cols-1 items-start gap-6 pb-[50px] min-[761px]:grid-cols-[minmax(0,1fr)_320px] min-[761px]:gap-[26px] min-[761px]:pb-[95px] min-[1051px]:grid-cols-[minmax(0,1fr)_370px] min-[1051px]:gap-[55px]">
      <OrderSummary
        items={relevant}
        market={market}
        catalogue={catalogue}
        checkout
      />
      <form className="checkout-form" onSubmit={submit} noValidate>
        <h2>Your details</h2>
        <p>Tell us how to reach you about your project.</p>
        {(
          [
            ['name', 'Full name', 'Your full name', 'text'],
            ['email', 'Email address', 'you@company.com', 'email'],
            ['phone', 'Phone number', 'Your phone number', 'tel'],
          ] as const
        ).map(([key, label, placeholder, type]) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              name={key}
              type={type}
              placeholder={placeholder}
              autoComplete={
                key === 'name' ? 'name' : key === 'email' ? 'email' : 'tel'
              }
              value={fields[key]}
              onChange={(event) => {
                setFields((current) => ({
                  ...current,
                  [key]: event.target.value,
                }));
                setErrors((current) => ({ ...current, [key]: undefined }));
              }}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
            />
            {errors[key] && (
              <div className="field-error" id={`${key}-error`} role="alert">
                {errors[key]}
              </div>
            )}
          </div>
        ))}
        <button
          className={buttonClass('primary')}
          type="submit"
          disabled={busy}
        >
          {busy ? 'Placing your request…' : 'Confirm order request'}
        </button>
        <p className="summary-note">
          Your request is saved in this browser. No payment is collected or
          order sent.
        </p>
      </form>
    </div>
  );
}
