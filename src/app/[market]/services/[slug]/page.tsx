import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock3, PackageCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/service/gallery';
import { Configurator } from '@/components/service/configurator';
import { ServiceCard } from '@/components/service/service-card';
import { services } from '@/data/services';
import { formatPrice, isMarket } from '@/lib/markets';
import {
  categoryName,
  getRelatedServices,
  getServiceBySlug,
} from '@/lib/services';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ market: string; slug: string }> };
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market, slug } = await params;
  if (!isMarket(market)) return {};
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata(
    market,
    `/services/${slug}`,
    service.name,
    service.shortDescription,
    service.image,
  );
}
export default async function DetailPage({ params }: Props) {
  const { market, slug } = await params;
  if (!isMarket(market)) notFound();
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedServices(service);
  return (
    <div className="container">
      <div className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="breadcrumbs">
          <Link href={`/${market}`}>Home</Link>
          <span>/</span>
          <Link href={`/${market}/services`}>Services</Link>
          <span>/</span>
          <span>{service.name}</span>
        </div>
      </div>
      <section className="detail-top">
        <div className="detail-gallery">
          <Gallery images={service.images} name={service.name} />
        </div>
        <div className="detail-info">
          <div className="detail-intro">
            <span className="eyebrow">
              {categoryName(service.category)} / BY BRANDA
            </span>
            <h1>{service.name}</h1>
            <p className="intro">{service.shortDescription}</p>
            <div className="detail-price">
              {formatPrice(service.pricing[market], market)}
              {service.category === 'gifts' && <small> / item</small>}
            </div>
            <span className="muted" style={{ fontSize: 13 }}>
              Starting price · final scope confirmed after your brief
            </span>
            <div className="detail-meta">
              <span>
                <Clock3 size={17} /> {service.turnaround} turnaround
              </span>
              <span>
                <PackageCheck size={17} /> Carefully crafted
              </span>
            </div>
          </div>
          <Configurator service={service} market={market} />
        </div>
      </section>
      <section className="detail-extra">
        <div>
          <span className="eyebrow">THE DETAILS</span>
          <h2>Made to mean more.</h2>
          <p>{service.description}</p>
        </div>
        <div>
          <span className="eyebrow">WHAT YOU GET</span>
          <h2>Included in your order.</h2>
          <ul className="included-list">
            {service.included.map((item) => (
              <li key={item}>
                <Check size={19} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {related.length > 0 && (
        <section
          className="section"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">KEEP BUILDING</span>
              <h2>Better together.</h2>
            </div>
            <p>
              The strongest brands are consistent at every touchpoint. Complete
              the picture with these services.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] min-[521px]:grid-cols-2 min-[761px]:gap-[22px] min-[1051px]:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.id} service={item} market={market} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
