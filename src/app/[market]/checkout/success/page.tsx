import { notFound } from 'next/navigation';
import { SuccessView } from '@/components/checkout/success-view';
import { isMarket } from '@/lib/markets';
export default async function SuccessPage({params}:{params:Promise<{market:string}>}){const {market}=await params;if(!isMarket(market))notFound();return <div className="container"><SuccessView market={market}/></div>}
