import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { isMarket, marketCodes } from '@/lib/markets';

export function generateStaticParams() { return marketCodes.map(market => ({ market })); }
export default async function MarketLayout({ children, params }: {children:React.ReactNode;params:Promise<{market:string}>}) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return <><Header market={market}/><main id="main-content">{children}</main><Footer market={market}/></>;
}
