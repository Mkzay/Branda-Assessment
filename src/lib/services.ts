import { services } from '@/data/services';
import type { Category, Service, CartCatalogue } from '@/types';
import type { MarketCode } from '@/lib/markets';

export type CatalogueQuery = {
  q?: string;
  category?: string;
  industry?: string;
  urgency?: string;
  sort?: string;
  page?: string;
};
export const PAGE_SIZE = 6;
export function getServices() {
  return services;
}
export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
export function getCartCatalogue(market: MarketCode): CartCatalogue {
  return Object.fromEntries(
    services.map((service) => [
      service.slug,
      {
        name: service.name,
        image: service.image,
        category: service.category,
        price: service.pricing[market],
      },
    ]),
  );
}
export function getFeaturedServices() {
  return [
    'logo-design',
    'website-development',
    'corporate-gift-box',
    'business-cards',
  ]
    .map(getServiceBySlug)
    .filter((item): item is Service => Boolean(item));
}
export function getRelatedServices(service: Service) {
  return service.relatedServices
    .map(getServiceBySlug)
    .filter((item): item is Service => Boolean(item))
    .slice(0, 4);
}
export function getFilteredServices(query: CatalogueQuery, market: MarketCode) {
  const search = query.q?.trim().toLocaleLowerCase() || '';
  const filtered = services.filter((service) => {
    if (query.category && service.category !== query.category) return false;
    if (query.industry && !service.industries.includes(query.industry))
      return false;
    if (query.urgency && service.urgency !== query.urgency) return false;
    if (!search) return true;
    return [
      service.name,
      service.category,
      service.shortDescription,
      ...service.industries,
      ...service.useCases,
    ].some((value) => value.toLocaleLowerCase().includes(search));
  });
  const sorted = filtered.sort((a, b) =>
    query.sort === 'price-asc'
      ? a.pricing[market] - b.pricing[market]
      : query.sort === 'price-desc'
        ? b.pricing[market] - a.pricing[market]
        : b.popularity - a.popularity,
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(query.page || '1', 10);
  const page = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  return {
    services: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: sorted.length,
    page,
    totalPages,
  };
}
export function categoryName(category: Category) {
  return category[0].toUpperCase() + category.slice(1);
}
