'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Tag } from './ui';

interface NavItem {
  id: string;
  label: string;
  path: string;
  mega?: boolean;
}

const NAV: NavItem[] = [
  { id: 'home', label: 'Trang chủ', path: '/' },
  { id: 'products', label: 'Sản phẩm', path: '/products', mega: true },
  { id: 'industries', label: 'Ngành ứng dụng', path: '/industries' },
  { id: 'about', label: 'Giới thiệu', path: '/about' },
  { id: 'news', label: 'Tin tức', path: '/news' },
  // { id: "recruitment", label: "Tuyển dụng",     path: "/recruitment" },
  { id: 'contact', label: 'Liên hệ', path: '/contact' },
];

export interface MegaMenuLink {
  slug: string;
  name: string;
  count?: number;
}

export interface MegaFeatured {
  slug: string;
  name: string;
  short_description: string | null;
}

export interface MegaMenuData {
  categories: MegaMenuLink[];
  industries: MegaMenuLink[];
  issues: MegaMenuLink[];
  featured: MegaFeatured | null;
}

function isActive(pathname: string, path: string) {
  if (path === '/') return pathname === '/';
  return pathname.startsWith(path);
}

const utilityLinkCls =
  'text-n-300 transition-colors duration-150 hover:text-white';

const megaColLinkCls =
  'block py-1.5 text-sm font-medium text-n-800 transition-[color,padding] duration-150 hover:text-accent hover:pl-1 truncate';

function MegaCol({
  label,
  links,
  paramKey,
}: {
  label: string;
  links: MegaMenuLink[];
  paramKey: 'g' | 'i' | 'p';
}) {
  return (
    <div>
      <h5 className='text-[11px] font-bold tracking-[0.08em] uppercase text-n-500 m-0 mb-3.5'>
        {label}
      </h5>
      <ul className='list-none p-0 m-0 flex flex-col gap-2'>
        {links.length === 0 ? (
          <li className='text-n-400 text-xs italic'>Chưa có dữ liệu</li>
        ) : (
          links.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/products?${paramKey}=${l.slug}`}
                className={megaColLinkCls}
                title={l.name}
              >
                {l.name}
                {l.count != null && (
                  <span className='text-n-400 text-xs'> · {l.count}</span>
                )}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function ProductMega({
  data,
  onClose,
}: {
  data: MegaMenuData;
  onClose: () => void;
}) {
  return (
    <div
      onMouseLeave={onClose}
      className='absolute top-[calc(100%+1px)] left-0 right-0 bg-white border-t border-n-200 shadow-card-xl z-40 animate-megamenu'
    >
      <div className='grid grid-cols-[1fr_1fr_1fr_1.2fr] gap-12 px-20 py-10'>
        <MegaCol label='Theo danh mục' links={data.categories} paramKey='g' />
        <MegaCol label='Theo ngành' links={data.industries} paramKey='i' />
        <MegaCol label='Theo vấn đề' links={data.issues} paramKey='p' />

        {data.featured ? (
          <div className='relative overflow-hidden bg-n-900 text-white rounded-r-12 p-6 flex flex-col gap-3'>
            <div className='absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full bg-accent opacity-[0.18] blur-[10px] pointer-events-none' />
            <div className='relative z-[2] flex flex-col gap-3'>
              <Tag variant='brand' className='self-start'>
                SẢN PHẨM NỔI BẬT
              </Tag>
              <div className='text-lg font-bold leading-tight'>
                {data.featured.name}
              </div>
              {data.featured.short_description && (
                <div className='text-[13px] text-n-400'>
                  {data.featured.short_description}
                </div>
              )}
              <Link
                href={`/products/${data.featured.slug}`}
                className='inline-flex items-center gap-1.5 text-white font-bold text-sm transition-[gap] duration-150 hover:gap-2.5'
              >
                Khám phá ngay →
              </Link>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default function Header({ mega }: { mega: MegaMenuData }) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [lang, setLang] = useState<'VN' | 'EN' | 'CN'>('VN');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnterMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const onLeaveMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <div className='sticky top-0 z-50' onMouseLeave={onLeaveMega}>
      {/* Utility bar */}
      <div className='bg-n-900 text-white h-10 px-8 flex items-center justify-between text-xs'>
        <nav className='flex gap-5'>
          <Link href='/news' className={utilityLinkCls}>
            Tin tức
          </Link>
          {/* <Link href='/recruitment' className={utilityLinkCls}>
            Tuyển dụng
          </Link> */}
          <Link href='/contact' className={utilityLinkCls}>
            Liên hệ
          </Link>
          <Link href='/quote' className={utilityLinkCls}>
            Báo giá
          </Link>
        </nav>
        <div className='flex gap-5 items-center'>
          <span className='text-white font-bold'>Hotline: +84 28 36200703</span>
          <span className='text-n-400'>info@stromann.vn</span>
          <span className='inline-flex gap-1.5 px-2 py-1 bg-accent text-white rounded-r-4 text-[11px] font-bold'>
            {(['VN', 'EN', 'CN'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={
                  'font-bold text-[11px] ' +
                  (lang === l ? 'text-white' : 'text-white/60')
                }
              >
                {l}
              </button>
            ))}
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className='relative bg-white border-b border-n-200 h-20 px-20 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2.5'>
          <span className='w-9 h-9 rounded-md bg-accent text-white font-bold text-xl flex items-center justify-center shadow-[0_2px_8px_rgba(225,29,44,0.25)]'>
            S
          </span>
          <div>
            <div className='font-bold text-xl tracking-[-0.01em]'>STROMANN</div>
            <div className='text-[10px] text-n-500 tracking-[0.1em] uppercase mt-0.5'>
              Việt Nam
            </div>
          </div>
        </Link>

        <nav className='flex gap-1'>
          {NAV.map((item) => {
            const active = isActive(pathname ?? '', item.path);
            return (
              <Link
                key={item.id}
                href={item.path}
                onMouseEnter={() =>
                  item.mega ? onEnterMega() : setMegaOpen(false)
                }
                className={
                  'relative px-4 py-2.5 text-sm font-semibold rounded-md transition-colors duration-150 ' +
                  (active
                    ? 'text-accent hdr-link-active'
                    : 'text-n-700 hover:text-accent hover:bg-brand-50')
                }
              >
                {item.label}
                {item.mega ? ' ▾' : ''}
              </Link>
            );
          })}
        </nav>

        <div className='flex gap-3 items-center'>
          {/* <button
            type='button'
            aria-label='search'
            className='inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-r-8 text-[13px] font-bold leading-none transition-all duration-[180ms] cursor-pointer whitespace-nowrap bg-white text-n-800 border border-n-300 hover:border-n-900'
          >
            🔍 Tìm kiếm
          </button> */}
          <Link
            href='/technical'
            className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-r-8 text-sm font-bold leading-none transition-all duration-[180ms] cursor-pointer whitespace-nowrap bg-accent text-white hover:bg-brand-600 hover:-translate-y-px hover:shadow-card-md'
          >
            Tư vấn kỹ thuật
          </Link>
        </div>

        {megaOpen && (
          <ProductMega data={mega} onClose={() => setMegaOpen(false)} />
        )}
      </div>
    </div>
  );
}
