import { buttonClass } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories } from '@/data/services';
import { ServiceCard } from '@/components/service/service-card';
import { getFeaturedServices } from '@/lib/services';
import { isMarket, markets } from '@/lib/markets';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ market: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  if (!isMarket(market)) return {};
  return pageMetadata(
    market,
    '',
    'Branding services for ambitious businesses',
    markets[market].heroNote,
  );
}
export default async function HomePage({ params }: Props) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">THE BRANDING ECOSYSTEM</span>
            <h1>
              Everything your brand needs to <em>stand out.</em>
            </h1>
            <p>
              {markets[market].hero} {markets[market].heroNote}
            </p>
            <div className="hero-actions">
              <Link
                className={buttonClass('primary')}
                href={`/${market}/services`}
              >
                Explore services <ArrowUpRight size={18} />
              </Link>
              <Link
                className="text-link"
                href={`/${market}/services?category=create`}
              >
                Start with your identity <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-trust">
              <strong>05</strong>
              <span>
                connected creative
                <br />
                service categories
              </span>
              <strong>01</strong>
              <span>
                place to bring your
                <br />
                vision to life
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image">
              <Image
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=90"
                alt="Creative branding materials arranged on a desk"
                fill
                priority
                sizes="(max-width:760px) 100vw, 50vw"
              />
            </div>
            <div className="hero-label">
              <span>
                <Sparkles size={20} />
              </span>{' '}
              Ideas made tangible.
            </div>
          </div>
        </div>
      </section>
      <div className="category-strip">
        <div className="container category-row">
          {categories.map((category) => (
            <Link
              className="category-link"
              key={category.id}
              href={`/${market}/services?category=${category.id}`}
            >
              <span className="number">{category.number} / EXPLORE</span>
              <strong>
                {category.name}
                <ArrowUpRight size={19} />
              </strong>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MADE FOR YOUR NEXT MOVE</span>
              <h2>Popular right now.</h2>
            </div>
            <p>
              Start with what matters most. Discover services designed to work
              brilliantly on their own and even better together.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] min-[521px]:grid-cols-2 min-[761px]:gap-[22px] min-[1051px]:grid-cols-3">
            {getFeaturedServices().map((service) => (
              <ServiceCard key={service.id} service={service} market={market} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link
              className={buttonClass('outline')}
              href={`/${market}/services`}
            >
              See all services <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section feature-band">
        <div className="container feature-grid">
          <div>
            <span className="eyebrow">MORE THAN A SERVICE</span>
            <h2>
              One brand.
              <br />
              Every touchpoint.
            </h2>
            <p>
              A memorable brand is built in the details. From the mark on your
              business card to the experience on your website, Branda connects
              the creative work that makes it all feel like you.
            </p>
            <Link className="text-link" href={`/${market}/services`}>
              Discover the ecosystem <ArrowRight size={17} />
            </Link>
          </div>
          <div className="feature-visual">
            <Image
              src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1000&q=85"
              width={800}
              height={550}
              alt="Printed brand stationery and design materials"
              sizes="(max-width:760px) 70vw, 35vw"
            />
            <div className="feature-stamp">
              ONE
              <br />
              POWERHOUSE
              <br />✳
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <span className="eyebrow">SIMPLE BY DESIGN</span>
          <div className="section-heading">
            <h2>From idea to impact.</h2>
          </div>
          <div className="steps">
            {[
              [
                '01',
                'Explore',
                'Find the right service for the moment your brand is in.',
              ],
              [
                '02',
                'Make it yours',
                'Choose your options, quantity, and the details that matter.',
              ],
              [
                '03',
                'Bring it to life',
                'Review your order and let the creative work begin.',
              ],
            ].map(([number, title, description]) => (
              <div className="step" key={number}>
                <span className="step-number">STEP {number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Ready to make your brand impossible to ignore?</h2>
          <Link className={buttonClass('dark')} href={`/${market}/services`}>
            Find your next service <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
