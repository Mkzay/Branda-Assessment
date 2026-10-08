import Link from 'next/link';
import type { MarketCode } from '@/lib/markets';

export function Footer({ market }: { market: MarketCode }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href={`/${market}`} className="logo">
              branda<span>.</span>
            </Link>
            <p>
              Every idea deserves to be seen. We bring the pieces of your brand
              together, beautifully.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <Link href={`/${market}/services`}>All services</Link>
              <Link href={`/${market}/services?category=create`}>Create</Link>
              <Link href={`/${market}/services?category=digital`}>Digital</Link>
              <Link href={`/${market}/services?category=prints`}>Prints</Link>
            </div>
            <div>
              <strong>Your order</strong>
              <Link href={`/${market}/cart`}>Cart</Link>
              <Link href={`/${market}/checkout`}>Checkout</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Branda. Made for brands in motion.
          </span>
          <span>One powerhouse. Every branding solution.</span>
        </div>
      </div>
    </footer>
  );
}
