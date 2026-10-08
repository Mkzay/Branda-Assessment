'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { recoveryLink } from '@/lib/recovery';
import { buttonClass } from '@/components/ui/button';
export function RecoveryState({ reset }: { reset?: () => void }) {
  const href = recoveryLink(usePathname());
  return (
    <section className="container empty-state my-20">
      <h1>{reset ? 'Something went wrong.' : 'We couldn’t find that page.'}</h1>
      <p>
        {reset
          ? 'We couldn’t load this page. Please try again.'
          : 'The link may have moved. Explore our services and find your next brand move.'}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {reset && (
          <button type="button" className={buttonClass()} onClick={reset}>
            Try again
          </button>
        )}
        <Link
          className={buttonClass(reset ? 'outline' : 'primary')}
          href={href}
        >
          {href === '/' ? 'Back to home' : 'Explore services'}
        </Link>
      </div>
    </section>
  );
}
