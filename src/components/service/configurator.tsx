'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import type { Service } from '@/types';
import type { MarketCode } from '@/lib/markets';
import { useCartStore } from '@/store/cart-store';
import { serviceUnits } from '@/lib/cart';
import { formatPrice } from '@/lib/markets';

export function Configurator({service,market}:{service:Service;market:MarketCode}) {
  const router=useRouter(), add=useCartStore(state=>state.add);
  const [quantity,setQuantity]=useState(1);
  const [selections,setSelections]=useState<Record<string,string>>(Object.fromEntries(service.options.map(option=>[option.name,option.values[0]])));
  const [feedback,setFeedback]=useState(false);
  const units = serviceUnits(service,selections);
  const addItem=(checkout=false)=>{add(service.slug,market,quantity,selections);setFeedback(true);if(checkout)router.push(`/${market}/checkout`);};
  return <div className="configurator">{service.options.map(option=><fieldset key={option.name}><legend>{option.name}</legend><div className="option-pills">{option.values.map(value=><button key={value} type="button" className={selections[option.name]===value?'selected':''} aria-pressed={selections[option.name]===value} onClick={()=>setSelections(current=>({...current,[option.name]:value}))}>{value}</button>)}</div></fieldset>)}<div className="quantity-row"><div><label>{service.category === 'gifts' ? 'Number of runs' : 'Quantity'}</label><div className="quantity-control"><button type="button" aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(q=>Math.max(1,q-1))}><Minus size={16}/></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={()=>setQuantity(q=>q+1)}><Plus size={16}/></button></div></div></div><div className="configuration-total"><div>Selection estimate<small>{service.category === 'gifts' ? `${units * quantity} items · ${formatPrice(service.pricing[market],market)} each` : `${quantity} ${quantity === 1 ? 'order' : 'orders'}`} · before tax</small></div><strong>{formatPrice(service.pricing[market]*units*quantity,market)}</strong></div><div className="purchase-actions"><button className="button button-primary" type="button" onClick={()=>addItem(true)}>Order now</button><button className="button button-outline" type="button" onClick={()=>addItem()}><ShoppingBag size={17}/> Add to cart</button></div>{feedback&&<p className="feedback" role="status">Added to your cart. <a href={`/${market}/cart`} style={{textDecoration:'underline'}}>View cart</a></p>}</div>;
}
