'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { marketCodes, markets, type MarketCode } from '@/lib/markets';
import { useCartStore } from '@/store/cart-store';

const iconButton =
  'relative grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white transition-transform duration-150 active:scale-[.97] motion-reduce:transition-none';
export function HeaderControls({
  market,
  mobileNavigation,
}: {
  market: MarketCode;
  mobileNavigation: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const count = useCartStore((state) =>
    state.hydrated
      ? state.items
          .filter((item) => item.market === market)
          .reduce((sum, item) => sum + item.quantity, 0)
      : 0,
  );
  const onMarketChange = (next: MarketCode) => {
    setOpen(false);
    const suffix = pathname.replace(/^\/(ng|us|uk|ca)/, '');
    router.push(`/${next}${suffix}${window.location.search}`);
  };
  return (
    <>
      <div className="ml-auto flex items-center gap-[5px] min-[361px]:gap-[7px] min-[761px]:ml-0 min-[761px]:gap-3">
        <label className="sr-only" htmlFor="market-selector">
          Country and currency
        </label>
        <div className="relative flex min-h-11 shrink-0 items-center rounded-full border border-line bg-white focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-brand">
          <span
            className="pointer-events-none flex items-center gap-1 whitespace-nowrap px-2 text-[10px] font-bold min-[361px]:gap-[7px] min-[361px]:px-2.5 min-[361px]:text-[11px] min-[1051px]:px-3.5 min-[1051px]:text-xs"
            aria-hidden="true"
          >
            <span className="hidden min-[1051px]:inline">
              {markets[market].name}
            </span>
            <span className="min-[1051px]:hidden">{market.toUpperCase()}</span>
            <span>· {markets[market].currency}</span>
            <ChevronDown size={12} />
          </span>
          <select
            id="market-selector"
            className="absolute inset-0 w-full cursor-pointer opacity-0"
            value={market}
            onChange={(event) =>
              onMarketChange(event.target.value as MarketCode)
            }
          >
            {marketCodes.map((code) => (
              <option key={code} value={code}>
                {markets[code].flag} {markets[code].name} ·{' '}
                {markets[code].currency}
              </option>
            ))}
          </select>
        </div>
        <Link
          className={iconButton}
          href={`/${market}/cart`}
          aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
        >
          <ShoppingBag size={19} />
          {count > 0 && (
            <span className="absolute -top-[5px] -right-[5px] grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] text-white">
              {count}
            </span>
          )}
        </Link>
        <button
          className={`${iconButton} min-[761px]:hidden`}
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-navigation"
          className="absolute top-full right-0 left-0 min-[761px]:hidden"
          onClick={() => setOpen(false)}
        >
          {mobileNavigation}
        </div>
      )}
    </>
  );
}
