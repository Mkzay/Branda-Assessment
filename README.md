# Branda V2 — Service Ordering Platform

**Live Demo:** [branda-assessment.vercel.app](https://branda-assessment.vercel.app)

**Repository:** [Mkzay/Branda-Assessment](https://github.com/Mkzay/Branda-Assessment)

A responsive service ordering MVP for Branda’s frontend assessment. Discover, configure, and review branding services across four markets.

## Features

- 20 services across Digital, Gifts, Create, Studio, and Prints.
- Server-rendered catalogue with URL-driven search, single-select filters, sorting, and pagination.
- Service galleries, options, quantities, turnaround, inclusions, and complementary services.
- Persistent cart, Zod contact validation, and browser-only order confirmation.
- Nigeria (`/ng`, NGN), United States (`/us`, USD), United Kingdom (`/uk`, GBP), and Canada (`/ca`, CAD). Switching markets preserves the equivalent route and query.
- Market-specific metadata, canonical URLs, hreflang alternatives, and Open Graph tags.
- Responsive navigation, a native mobile filter dialog, and market-aware recovery links.

## Tech stack

Next.js App Router, React, TypeScript, Tailwind CSS 4, Zustand, Zod, and Lucide React. Bricolage Grotesque and Manrope are self-hosted through Fontsource.

## Architecture and key decisions

- Pages, catalogue results, and static header navigation are Server Components. Client Components handle search, market controls, gallery selection, configuration, cart state, and checkout.
- Tailwind utilities own shared grids, responsive catalogue/cart/checkout layouts, service cards, buttons, header controls, and filters. Brand-specific hero shapes, gallery treatment, and remaining page styles live in the formatted CSS files. Colour tokens are shared through Tailwind’s theme.
- Service records and queries live in `src/data` and `src/lib`. Filter options are separate from service records. Cart and checkout receive a compact server-generated lookup containing names, images, categories, and current-market prices; the complete catalogue is not imported into their client code.
- Zustand stores service identifiers, market, quantity, and selected options in local storage. Confirmation is saved in session storage. Gift quantity tiers multiply the per-item price; other options record the selected scope without changing the starting price.
- Filter groups use radios with explicit “All” options. The mobile filter uses `<dialog>.showModal()` for browser-managed focus containment, background inertness, Escape dismissal, and focus restoration.
- `src/lib/markets.ts` centralises locales, currencies, and illustrative tax rates. `Intl.NumberFormat` formats prices. Recovery links retain valid market prefixes; invalid markets return a 404.

## Local setup

Requirements: Node.js 20.9+ and npm.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The root route redirects to `/ng`.

```bash
npm run lint
npm run format:check
npm test
npm run build
npm start
```

`npm run format` formats source, configuration, and documentation with Prettier. Tests cover catalogue queries, cart calculations, and market-aware recovery.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for absolute metadata URLs. On Vercel, `VERCEL_URL` is the fallback when that value is absent.

## Assumptions and limitations

This assessment uses local service data and browser storage. It has no backend, payment collection, accounts, or order delivery. Checkout saves a request in the browser and does not send it to Branda. Prices and tax rates are illustrative: NG 7.5%, US 8%, UK 20%, CA 13%. Rates are not jurisdiction-specific calculations; pricing does not use live exchange rates. A production checkout would validate prices, options, taxes, and orders on the server. Service photos are illustrative Unsplash images.
