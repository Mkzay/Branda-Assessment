import type { MarketCode } from '@/lib/markets';

export type Category = 'digital' | 'gifts' | 'create' | 'studio' | 'prints';
export type ServiceOption = { name: string; values: string[] };
export type Service = {
  id: string; slug: string; name: string; category: Category; shortDescription: string; description: string;
  image: string; images: string[]; pricing: Record<MarketCode, number>; discount?: number;
  popularity: number; industries: string[]; useCases: string[]; urgency: 'standard' | 'express';
  turnaround: string; included: string[]; options: ServiceOption[]; relatedServices: string[];
};
export type CartItem = { key: string; slug: string; market: MarketCode; quantity: number; selections: Record<string, string> };
