export const markets = {
  ng: {
    name: 'Nigeria',
    short: 'Nigeria',
    currency: 'NGN',
    locale: 'en-NG',
    flag: '🇳🇬',
    taxRate: 0.075,
    hero: 'Branding built for bold Nigerian businesses.',
    heroNote:
      'From Lagos launches to nationwide campaigns, make your next move unmistakable.',
  },
  us: {
    name: 'United States',
    short: 'United States',
    currency: 'USD',
    locale: 'en-US',
    flag: '🇺🇸',
    taxRate: 0.08,
    hero: 'A stronger brand starts right here.',
    heroNote:
      'One connected place for the creative work, physical touchpoints, and digital presence that move you forward.',
  },
  uk: {
    name: 'United Kingdom',
    short: 'United Kingdom',
    currency: 'GBP',
    locale: 'en-GB',
    flag: '🇬🇧',
    taxRate: 0.2,
    hero: 'Make your brand impossible to overlook.',
    heroNote:
      'Thoughtful branding services for businesses ready to show up with confidence.',
  },
  ca: {
    name: 'Canada',
    short: 'Canada',
    currency: 'CAD',
    locale: 'en-CA',
    flag: '🇨🇦',
    taxRate: 0.13,
    hero: 'Your next big brand moment starts here.',
    heroNote:
      'Bring every part of your brand together, from first impression to final delivery.',
  },
} as const;

export type MarketCode = keyof typeof markets;
export const marketCodes = Object.keys(markets) as MarketCode[];
export function isMarket(value: string): value is MarketCode {
  return Object.hasOwn(markets, value);
}
export function formatPrice(amount: number, market: MarketCode) {
  const { locale, currency } = markets[market];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'NGN' ? 0 : 2,
  }).format(amount);
}
export function marketPath(path: string, market: MarketCode) {
  return `/${market}${path}`;
}
export function alternateLanguages(path: string) {
  return {
    ...Object.fromEntries(
      marketCodes.map((code) => [markets[code].locale, `/${code}${path}`]),
    ),
    'x-default': `/ng${path}`,
  };
}
