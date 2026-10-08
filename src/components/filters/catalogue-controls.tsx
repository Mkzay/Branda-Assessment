'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ListFilter, Search, X } from 'lucide-react';
import { categories, industries } from '@/data/catalogue-options';
import { buttonClass } from '@/components/ui/button';

const titleCase = (value: string) =>
  value.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
const groups = [
  {
    key: 'category',
    label: 'Category',
    all: 'All categories',
    values: categories.map((item) => item.id),
  },
  {
    key: 'industry',
    label: 'Industry',
    all: 'All industries',
    values: industries,
  },
  {
    key: 'urgency',
    label: 'Turnaround',
    all: 'Any turnaround',
    values: ['standard', 'express'],
  },
];

export function CatalogueControls({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) {
  const router = useRouter(),
    pathname = usePathname(),
    searchParams = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null),
    searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryString = searchParams.toString();
  useEffect(() => {
    if (searchRef.current)
      searchRef.current.value = searchParams.get('q') || '';
  }, [searchParams]);
  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!drawer) {
      if (dialog.open) dialog.close();
      return;
    }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onResize = () => {
      if (window.innerWidth > 760) setDrawer(false);
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', onResize);
      if (dialog.open) dialog.close();
    };
  }, [drawer]);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(queryString);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    router.push(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false });
  };
  const onSearch = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => update('q', value), 300);
  };
  const filters = (location: 'desktop' | 'mobile') => (
    <>
      <div className="mb-[22px] flex items-center justify-between">
        <h2 className="text-[17px]">Filter services</h2>
        {location === 'mobile' && (
          <button
            className="grid size-11 place-items-center rounded-full hover:bg-paper"
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawer(false)}
          >
            <X size={20} />
          </button>
        )}
      </div>
      {groups.map((group) => (
        <fieldset className="border-t border-line py-[23px]" key={group.key}>
          <legend className="mb-4 text-[13px] font-bold tracking-[.1em] uppercase">
            {group.label}
          </legend>
          <div className="flex flex-col gap-1 min-[761px]:gap-[7px]">
            {['', ...group.values].map((value) => (
              <label
                className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-[#49544f] min-[761px]:min-h-8"
                key={value}
              >
                <input
                  className="size-4 accent-brand"
                  type="radio"
                  name={`${location}-${group.key}`}
                  value={value}
                  checked={(searchParams.get(group.key) || '') === value}
                  onChange={() => update(group.key, value)}
                />
                {value ? titleCase(value) : group.all}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button
        className="min-h-11 text-[13px] font-bold text-brand"
        type="button"
        onClick={() => router.push(pathname)}
      >
        Clear all filters
      </button>
    </>
  );
  return (
    <>
      <aside
        className="hidden rounded-[17px] border border-line bg-white p-6 min-[761px]:block"
        aria-label="Service filters"
      >
        {filters('desktop')}
      </aside>
      <dialog
        ref={dialogRef}
        id="mobile-service-filters"
        aria-label="Service filters"
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-[390px] overflow-y-auto border-0 bg-white p-6 text-ink backdrop:bg-black/50"
        onCancel={() => setDrawer(false)}
        onClose={() => setDrawer(false)}
      >
        {filters('mobile')}
      </dialog>
      <div className="min-w-0">
        <div className="mb-5 flex flex-col gap-3.5 min-[761px]:mb-[23px] min-[761px]:flex-row min-[761px]:items-center min-[761px]:justify-between min-[761px]:gap-[18px]">
          <p className="text-xs text-muted min-[761px]:text-sm">
            {total} {total === 1 ? 'service' : 'services'} found
          </p>
          <div className="flex w-full flex-wrap items-center gap-2.5 min-[761px]:w-auto min-[1051px]:flex-nowrap">
            <label className="flex min-w-0 basis-full items-center gap-2.5 rounded-[10px] border border-line bg-white px-3.5 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/15 min-[521px]:flex-1 min-[521px]:basis-auto min-[761px]:min-w-[200px] min-[1051px]:min-w-[260px]">
              <Search size={18} className="shrink-0 text-muted" />
              <span className="sr-only">Search services</span>
              <input
                className="h-[45px] w-full border-0 bg-transparent text-sm outline-none"
                ref={searchRef}
                defaultValue={searchParams.get('q') || ''}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search services…"
                type="search"
              />
            </label>
            <select
              className="min-h-[45px] min-w-0 flex-1 rounded-[10px] border border-line bg-white px-3.5 py-3 text-[13px] text-ink min-[521px]:max-w-[158px] min-[761px]:flex-none"
              aria-label="Sort services"
              value={searchParams.get('sort') || 'popular'}
              onChange={(event) => update('sort', event.target.value)}
            >
              <option value="popular">Most popular</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            <button
              className={`${buttonClass('outline')} min-[761px]:hidden`}
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open filters"
              aria-expanded={drawer}
              aria-controls="mobile-service-filters"
            >
              <ListFilter size={17} /> Filters
            </button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
