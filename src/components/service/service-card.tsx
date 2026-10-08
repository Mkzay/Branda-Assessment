import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/types';
import { formatPrice, type MarketCode } from '@/lib/markets';
import { categoryName } from '@/lib/services';

export function ServiceCard({
  service,
  market,
}: {
  service: Service;
  market: MarketCode;
}) {
  return (
    <Link
      href={`/${market}/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_2px_4px_#17211f04] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_#17211f0d] motion-reduce:transition-none"
    >
      <div className="relative aspect-[1.65] overflow-hidden bg-[#e8e9e3] min-[761px]:aspect-[1.43]">
        <Image
          src={service.image}
          alt={`${service.name} service example`}
          fill
          sizes="(max-width:520px) 100vw, (max-width:1050px) 50vw, 33vw"
          className="object-cover transition-transform duration-[450ms] group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-[19px] pb-5 min-[761px]:px-[23px] min-[761px]:pt-[22px] min-[761px]:pb-6">
        <span className="eyebrow">{categoryName(service.category)}</span>
        <h3 className="mt-2 mb-2 text-[25px] leading-[1.15] tracking-[-.035em] min-[761px]:mt-2.5">
          {service.name}
        </h3>
        <p className="mb-[18px] text-sm leading-[1.65] text-muted min-[761px]:mb-[25px]">
          {service.shortDescription}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3.5 min-[761px]:pt-[18px]">
          <div>
            <small className="mb-1 block text-[11px] text-muted">
              {service.category === 'gifts'
                ? 'Starting at / item'
                : 'Starting at'}
            </small>
            <strong className="text-xl tracking-[-.035em]">
              {formatPrice(service.pricing[market], market)}
            </strong>
          </div>
          <span
            aria-hidden="true"
            className="grid size-[38px] place-items-center rounded-full bg-paper transition-colors group-hover:bg-brand group-hover:text-white"
          >
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}
