import Link from 'next/link';
export default function NotFound(){return <main className="container empty-state" style={{marginBlock:80}}><h1>We couldn’t find that page.</h1><p>The link may have moved. Explore our services and find your next brand move.</p><Link className="button button-primary" href="/ng/services">Explore services</Link></main>}
