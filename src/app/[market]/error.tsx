'use client';
import Link from 'next/link';
export default function Error({reset}:{error:Error;reset:()=>void}){return <div className="container empty-state" style={{marginBlock:80}}><h1>Something went wrong.</h1><p>We couldn’t load this page. Please try again.</p><button className="button button-primary" onClick={()=>reset()}>Try again</button><p><Link href="/ng/services">Explore services</Link></p></div>}
