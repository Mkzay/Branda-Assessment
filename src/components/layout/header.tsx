'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { marketCodes, markets, type MarketCode } from '@/lib/markets';
import { useCartStore } from '@/store/cart-store';

export function Header({ market }: { market: MarketCode }) {
  const pathname = usePathname(); const router = useRouter(); const [open,setOpen] = useState(false);
  const count = useCartStore(state => state.hydrated ? state.items.filter(item => item.market === market).reduce((sum,item) => sum+item.quantity,0) : 0);
  const onMarketChange = (next: MarketCode) => {
    const suffix = pathname.replace(/^\/(ng|us|uk|ca)/,'');
    router.push(`/${next}${suffix}${window.location.search}`);
  };
  return <>
    <div className="announcement">One creative partner. Every brand possibility.</div>
    <header className="site-header"><div className="container header-inner">
      <Link href={`/${market}`} className="logo" aria-label="Branda home">branda<span>.</span></Link>
      <nav className="nav-links" aria-label="Main navigation"><Link href={`/${market}/services`}>All services</Link><Link href={`/${market}/services?category=create`}>Create</Link><Link href={`/${market}/services?category=prints`}>Prints</Link><Link href={`/${market}/services?category=digital`}>Digital</Link><Link href={`/${market}/services?category=gifts`}>Gifts</Link></nav>
      <div className="header-actions">
        <label className="sr-only" htmlFor="market-selector">Select market</label>
        <div className="market-control"><span className="market-label" aria-hidden="true"><span className="market-full">{markets[market].short}</span><span className="market-code">{market.toUpperCase()}</span><ChevronDown size={13}/></span><select id="market-selector" className="market-select" value={market} onChange={event => onMarketChange(event.target.value as MarketCode)}>{marketCodes.map(code => <option key={code} value={code}>{markets[code].flag} {markets[code].short}</option>)}</select></div>
        <Link className="icon-button" href={`/${market}/cart`} aria-label={`Cart, ${count} items`}><ShoppingBag size={19}/>{count > 0 && <span className="cart-badge">{count}</span>}</Link>
        <button className="icon-button mobile-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </div>{open && <nav className="mobile-panel" aria-label="Mobile navigation" onClick={() => setOpen(false)}><Link href={`/${market}/services`}>Explore all services <ArrowUpRight size={16}/></Link><Link href={`/${market}/services?category=create`}>Create</Link><Link href={`/${market}/services?category=prints`}>Prints</Link><Link href={`/${market}/services?category=digital`}>Digital</Link><Link href={`/${market}/services?category=gifts`}>Gifts</Link><Link href={`/${market}/services?category=studio`}>Studio</Link></nav>}</header>
  </>;
}
