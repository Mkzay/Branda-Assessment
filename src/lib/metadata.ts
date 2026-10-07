import type { Metadata } from 'next';
import { alternateLanguages, markets, type MarketCode } from '@/lib/markets';

const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
export function pageMetadata(market: MarketCode, path: string, title: string, description: string, image?: string): Metadata {
  const route = `/${market}${path}`;
  return {
    title: `${title} | Branda ${markets[market].name}`,
    description,
    alternates: { canonical: route, languages: alternateLanguages(path) },
    openGraph: { title: `${title} | Branda`, description, url: `${base}${route}`, siteName: 'Branda', type: 'website', locale: markets[market].locale.replace('-', '_'), ...(image ? { images: [{ url: image, alt: title }] } : {}) },
  };
}
