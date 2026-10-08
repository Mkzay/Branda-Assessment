# Branda V2

A responsive, multi-market branding service ordering MVP built with Next.js App Router, React, TypeScript, Tailwind CSS, Zustand, and Zod.

## What it does

- Browse 20 services across Digital, Gifts, Create, Studio, and Prints.
- Search, filter by category/industry/urgency, sort, and paginate using shareable URL parameters.
- View service details, galleries, options, turnaround, inclusions, and complementary services.
- Configure quantities and options, save items in a persistent cart, and complete a browser checkout.
- Switch between Nigeria (`/ng`), United States (`/us`), United Kingdom (`/uk`), and Canada (`/ca`) while keeping the equivalent route.
- Show market prices with `Intl.NumberFormat` and localized SEO metadata with canonical and alternate URLs.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`; the root route redirects to `/ng`.

```bash
npm test
npm run build
npm start
```

## Architecture

Pages and catalogue results are Server Components. Search, filters, gallery, configuration, cart, market selector, and checkout are small Client Components. Service records and queries live in `src/data` and `src/lib`; the cart store contains only the user's selected items. Catalogue state lives in the URL. The cart persists to local storage, while the browser confirmation is saved to session storage.

Market settings, price formatting, and illustrative tax rates live in `src/lib/markets.ts`. Rates are illustrative estimates: NG 7.5%, US 8%, UK 20%, CA 13%. They are not tax advice or actual jurisdiction-specific calculations. Pricing is illustrative and does not use live exchange rates.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for absolute Open Graph URLs. On Vercel, `VERCEL_URL` is used automatically when this value is absent. Relative canonical and alternate routes are resolved against that origin by Next.js metadata.

## Limitations

The assessment scope uses local service data and a browser order confirmation. No backend, payment, accounts, order delivery, or live pricing are included. Gift quantity tiers multiply the per-item price; other service options are captured in the cart without changing the starting price; final scope and price would be confirmed after a real brief. A live deployment URL and repository URL can be added when hosting is configured.

## UI typography
Bricolage Grotesque gives headings a playful character; Manrope keeps body text and forms clear. Both fonts are self-hosted. Responsive refinements cover navigation, catalogue, service details, cart, checkout, confirmation and empty states, with reduced-motion support.
