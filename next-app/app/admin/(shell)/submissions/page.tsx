import Link from 'next/link';
import {
  Download,
  DollarSign,
  Mail,
  Settings,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { Pill } from '@/components/admin/atoms/Pill';
import {
  listSubmissions,
  getSubmissionStats,
  TYPE_LABELS,
  shortId,
  formatDateTime,
  type SubmissionListFilter,
} from '@/lib/admin/submissions';
import type { SubmissionStatus, SubmissionType } from '@/lib/admin/types';

export const dynamic = 'force-dynamic';

type FilterKey =
  | 'all'
  | 'new'
  | 'in-progress'
  | 'done'
  | 'type-quote'
  | 'type-technical'
  | 'type-contact';

function parseFilter(key: string | undefined): {
  active: FilterKey;
  q: SubmissionListFilter;
} {
  switch (key) {
    case 'new':
      return { active: 'new', q: { status: 'new' } };
    case 'in-progress':
      return { active: 'in-progress', q: { status: 'in-progress' } };
    case 'done':
      return { active: 'done', q: { status: 'done' } };
    case 'type-quote':
      return { active: 'type-quote', q: { type: 'quote' } };
    case 'type-technical':
      return { active: 'type-technical', q: { type: 'technical' } };
    case 'type-contact':
      return { active: 'type-contact', q: { type: 'contact' } };
    default:
      return { active: 'all', q: {} };
  }
}

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { f?: string };
}) {
  const { active, q } = parseFilter(searchParams.f);
  const [rows, stats] = await Promise.all([
    listSubmissions(q),
    getSubmissionStats(),
  ]);

  const statusChips: Array<[FilterKey, string]> = [
    ['all', 'Tất cả'],
    ['new', 'Mới'],
    ['in-progress', 'Đang xử lý'],
    ['done', 'Đã xử lý'],
  ];
  const typeChips: Array<[FilterKey, React.ReactNode]> = [
    [
      'type-quote',
      <>
        <DollarSign size={12} /> Báo giá
      </>,
    ],
    [
      'type-technical',
      <>
        <Wrench size={12} /> Tư vấn KT
      </>,
    ],
    [
      'type-contact',
      <>
        <Mail size={12} /> Liên hệ
      </>,
    ],
  ];

  return (
    <>
      <div className='page-h'>
        <div>
          <div className='crumb'>
            Tổng quan / <span>Form gửi đến</span>
          </div>
          <h1>Form gửi đến</h1>
          <p>Tất cả yêu cầu báo giá, tư vấn kỹ thuật và liên hệ từ website.</p>
        </div>
        {/* <div className="flex gap-2">
          <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
            <Download size={14} /> Xuất CSV
          </button>
          <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
            <Settings size={14} /> Cấu hình thông báo
          </button>
        </div> */}
      </div>

      <div className='stats'>
        <div className='stat'>
          <div className='stat__lbl'>Mới chưa xử lý</div>
          <div className='stat__num text-brand-500'>{stats.newCount}</div>
          <div className='stat__delta up'>cần phản hồi trong 4h</div>
        </div>
        <div className='stat'>
          <div className='stat__lbl'>Đang xử lý</div>
          <div className='stat__num'>{stats.inProgressCount}</div>
        </div>
        <div className='stat'>
          <div className='stat__lbl'>Đã xử lý (7 ngày)</div>
          <div className='stat__num'>{stats.doneRecentCount}</div>
          <div className='stat__delta up inline-flex items-center gap-1'>
            <TrendingUp size={12} /> 7 ngày gần đây
          </div>
        </div>
        <div className='stat'>
          <div className='stat__lbl'>Tổng số đang trong hệ thống</div>
          <div className='stat__num'>
            {stats.newCount + stats.inProgressCount}
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card__head'>
          <div className='toolbar2 m-0'>
            <div className='filt'>
              {statusChips.map(([k, l]) => (
                <Link
                  key={k}
                  href={
                    k === 'all'
                      ? '/admin/submissions'
                      : `/admin/submissions?f=${k}`
                  }
                  className={`chip ${active === k ? 'active' : ''}`}
                >
                  {l}
                </Link>
              ))}
              <span className='w-px bg-n-200 mx-1'></span>
              {typeChips.map(([k, l]) => (
                <Link
                  key={k}
                  href={`/admin/submissions?f=${k}`}
                  className={`chip inline-flex items-center gap-1 ${active === k ? 'active' : ''}`}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className='p-10 text-center text-n-500 text-sm'>
            Không có form nào khớp với bộ lọc hiện tại.
          </div>
        ) : (
          <table className='tbl'>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Loại</th>
                <th>Khách</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id}>
                  <td className='tbl__id'>
                    <Link href={`/admin/submissions/${s.id}`} className='block'>
                      {shortId(s.id)}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/admin/submissions/${s.id}`} className='block'>
                      {TYPE_LABELS[s.type as SubmissionType] ?? s.type}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/admin/submissions/${s.id}`} className='block'>
                      <div className='tbl__name'>{s.full_name}</div>
                      <div className='tbl__sub'>
                        {s.company} · {s.email}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <span className='text-xs text-n-600'>
                      {formatDateTime(s.created_at)}
                    </span>
                  </td>
                  <td>
                    <Pill status={s.status as SubmissionStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
