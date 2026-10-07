import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { CatalogueControls } from '@/components/filters/catalogue-controls';
import { ServiceCard } from '@/components/service/service-card';
import { getFilteredServices, type CatalogueQuery } from '@/lib/services';
import { isMarket } from '@/lib/markets';
import { pageMetadata } from '@/lib/metadata';

type Props={params:Promise<{market:string}>;searchParams:Promise<CatalogueQuery>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {market}=await params;if(!isMarket(market))return {};return pageMetadata(market,'/services','Explore branding services','Explore creative, digital, print, gifting and studio services for your business.');}
export default async function ServicesPage({params,searchParams}:Props){const {market}=await params;if(!isMarket(market))notFound();const query=await searchParams;const result=getFilteredServices(query,market);const pagination=(page:number)=>{const next=new URLSearchParams();for(const [key,value] of Object.entries(query))if(value && key!=='page')next.set(key,value);next.set('page',String(page));return `/${market}/services?${next}`};return <div className="container"><div className="page-hero"><div className="breadcrumbs"><Link href={`/${market}`}>Home</Link><span>/</span><span>Services</span></div><h1 className="page-title">Find your next<br/>brand move.</h1><p>From your first logo to your next big launch, find the right people and services to bring every idea into focus.</p></div><div className="catalogue-layout"><CatalogueControls total={result.total}>{result.total ? <><div className="service-grid">{result.services.map(service=><ServiceCard key={service.id} service={service} market={market}/>)}</div>{result.totalPages>1&&<nav className="pagination" aria-label="Pagination">{Array.from({length:result.totalPages},(_,index)=>index+1).map(page=><Link key={page} href={pagination(page)} className={page===result.page?'active':''} aria-current={page===result.page?'page':undefined}>{page}</Link>)}</nav>}</> : <div className="empty-state"><SearchX size={42}/><h2>No services found</h2><p>Try another search or clear your filters to explore everything Branda offers.</p><Link className="button button-primary" href={`/${market}/services`}>Clear filters</Link></div>}</CatalogueControls></div></div>}
