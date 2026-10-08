'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartKey } from '@/lib/cart';
import type { CartItem } from '@/types';
import type { MarketCode } from '@/lib/markets';

type CartStore = {
  items: CartItem[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  add: (
    slug: string,
    market: MarketCode,
    quantity: number,
    selections: Record<string, string>,
  ) => void;
  updateQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clearMarket: (market: MarketCode) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      add: (slug, market, quantity, selections) =>
        set((state) => {
          const key = cartKey(slug, market, selections);
          const existing = state.items.find((item) => item.key === key);
          return {
            items: existing
              ? state.items.map((item) =>
                  item.key === key
                    ? { ...item, quantity: item.quantity + quantity }
                    : item,
                )
              : [...state.items, { key, slug, market, quantity, selections }],
          };
        }),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
      remove: (key) =>
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        })),
      clearMarket: (market) =>
        set((state) => ({
          items: state.items.filter((item) => item.market !== market),
        })),
    }),
    {
      name: 'branda-cart-v2',
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
