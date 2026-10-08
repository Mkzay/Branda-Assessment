import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckoutView } from '@/components/checkout/checkout-view';
import { isMarket } from '@/lib/markets';
export default async function CheckoutPage({params}:{params:Promise<{market:string}>}){const {market}=await params;if(!isMarket(market))notFound();return <div className="container"><div className="page-hero"><div className="breadcrumbs"><Link href={`/${market}`}>Home</Link><span>/</span><Link href={`/${market}/cart`}>Cart</Link><span>/</span><span>Checkout</span></div><h1 className="page-title">Almost there.</h1><p>Review your services and share your details to save your order request.</p></div><CheckoutView market={market}/></div>}
