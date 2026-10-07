'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ListFilter, Search, X } from 'lucide-react';
import { categories, industries } from '@/data/services';

const titleCase = (value:string) => value.replaceAll('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
export function CatalogueControls({total,children}:{total:number;children:React.ReactNode}) {
  const router=useRouter(), pathname=usePathname(), searchParams=useSearchParams();
  const [drawer,setDrawer]=useState(false); const closeRef=useRef<HTMLButtonElement>(null); const searchRef=useRef<HTMLInputElement>(null); const debounceRef=useRef<ReturnType<typeof setTimeout>|null>(null);
  const queryString=searchParams.toString();
  useEffect(() => { if(searchRef.current) searchRef.current.value=searchParams.get('q')||''; },[searchParams]);
  useEffect(() => () => { if(debounceRef.current) clearTimeout(debounceRef.current); },[]);
  useEffect(()=>{if(!drawer)return;closeRef.current?.focus();const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')setDrawer(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[drawer]);
  const update=(key:string,value:string) => { const next=new URLSearchParams(queryString); if(value) next.set(key,value); else next.delete(key); if(key!=='page') next.delete('page'); router.push(`${pathname}${next.size ? `?${next}` : ''}`,{scroll:false}); };
  const onSearch=(value:string)=>{if(debounceRef.current)clearTimeout(debounceRef.current);debounceRef.current=setTimeout(()=>update('q',value),300)};
  const groups=[{key:'category',label:'Category',values:categories.map(item=>item.id)},{key:'industry',label:'Industry',values:industries},{key:'urgency',label:'Turnaround',values:['standard','express']}];
  const filters=<><div className="filter-drawer-head"><h2>Filter services</h2><button ref={closeRef} className="mobile-filter-trigger" type="button" aria-label="Close filters" onClick={()=>setDrawer(false)}><X size={20}/></button></div>{groups.map(group=><fieldset className="filter-group" key={group.key}><legend>{group.label}</legend><div className="filter-options">{group.values.map(value=><label className="filter-option" key={value}><input type="checkbox" checked={searchParams.get(group.key)===value} onChange={()=>update(group.key,searchParams.get(group.key)===value?'':value)}/>{titleCase(value)}</label>)}</div></fieldset>)}<button className="filter-clear" type="button" onClick={()=>router.push(pathname)}>Clear all filters</button></>;
  return <><aside id="service-filters" className={`filters ${drawer?'open':''}`} aria-label="Service filters" role={drawer?'dialog':undefined} aria-modal={drawer?true:undefined}>{filters}</aside><div className="catalogue-main"><div className="catalogue-toolbar"><p>{total} {total===1?'service':'services'} found</p><div className="toolbar-controls"><label className="search-box"><Search size={18} color="#748079"/><span className="sr-only">Search services</span><input ref={searchRef} defaultValue={searchParams.get('q')||''} onChange={event=>onSearch(event.target.value)} placeholder="Search services…" type="search"/></label><select className="sort-select" aria-label="Sort services" value={searchParams.get('sort')||'popular'} onChange={event=>update('sort',event.target.value)}><option value="popular">Most popular</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select><button className="button button-outline mobile-filter-trigger" type="button" onClick={()=>setDrawer(true)} aria-label="Open filters" aria-expanded={drawer} aria-controls="service-filters"><ListFilter size={17}/> Filters</button></div></div>{children}</div></>;
}
