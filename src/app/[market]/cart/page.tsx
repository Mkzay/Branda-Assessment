import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CartView } from '@/components/cart/cart-view';
import { isMarket } from '@/lib/markets';
export default async function CartPage({params}:{params:Promise<{market:string}>}){const {market}=await params;if(!isMarket(market))notFound();return <div className="container"><div className="page-hero"><div className="breadcrumbs"><Link href={`/${market}`}>Home</Link><span>/</span><span>Cart</span></div><h1 className="page-title">Your cart.</h1><p>Everything you need for the next step, all in one place.</p></div><CartView market={market}/></div>}
