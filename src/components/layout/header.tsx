import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { MarketCode } from '@/lib/markets';
import { HeaderControls } from './header-controls';

export function Header({ market }: { market: MarketCode }) {
  const links = ['create', 'prints', 'digital', 'gifts', 'studio'];
  const mobileNavigation = (
    <nav
      aria-label="Mobile navigation"
      className="flex flex-col gap-0 border-t border-line bg-paper px-[18px] pt-2 pb-4 font-bold [&_a]:flex [&_a]:min-h-12 [&_a]:items-center [&_a]:justify-between [&_a]:border-b [&_a]:border-line"
    >
      <Link href={`/${market}/services`}>
        Explore all services <ArrowUpRight size={16} />
      </Link>
      {links.map((category) => (
        <Link
          key={category}
          href={`/${market}/services?category=${category}`}
          className="capitalize"
        >
          {category}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      <div className="bg-green px-3 py-[7px] text-center text-[10px] font-semibold tracking-[.02em] text-white min-[761px]:px-4 min-[761px]:py-2 min-[761px]:text-xs min-[761px]:tracking-[.04em]">
        One creative partner. Every brand possibility.
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/97 backdrop-blur-[14px]">
        <div className="container flex h-16 items-center gap-2.5 min-[761px]:h-[76px] min-[761px]:gap-5 min-[1051px]:gap-[38px]">
          <Link href={`/${market}`} className="logo" aria-label="Branda home">
            branda<span>.</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="ml-auto hidden items-center gap-[17px] text-sm font-bold min-[761px]:flex min-[1051px]:gap-7 [&_a:hover]:text-brand"
          >
            <Link href={`/${market}/services`}>All services</Link>
            {links.slice(0, 4).map((category) => (
              <Link
                key={category}
                href={`/${market}/services?category=${category}`}
                className="capitalize"
              >
                {category}
              </Link>
            ))}
          </nav>
          <HeaderControls market={market} mobileNavigation={mobileNavigation} />
        </div>
      </header>
    </>
  );
}
