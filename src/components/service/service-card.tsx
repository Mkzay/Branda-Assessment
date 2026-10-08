import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/types';
import { formatPrice, type MarketCode } from '@/lib/markets';
import { categoryName } from '@/lib/services';

export function ServiceCard({service,market}:{service:Service;market:MarketCode}) { return <Link className="service-card" href={`/${market}/services/${service.slug}`}><div className="card-image"><Image src={service.image} alt={`${service.name} service example`} fill sizes="(max-width:520px) 100vw, (max-width:1050px) 50vw, 33vw"/></div><div className="card-body"><span className="eyebrow">{categoryName(service.category)}</span><h3>{service.name}</h3><p>{service.shortDescription}</p><div className="card-bottom"><div><small>{service.category==='gifts'?'Starting at / item':'Starting at'}</small><strong>{formatPrice(service.pricing[market],market)}</strong></div><span className="card-arrow" aria-hidden="true"><ArrowUpRight size={20}/></span></div></div></Link>; }
