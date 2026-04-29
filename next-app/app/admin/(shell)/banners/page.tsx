import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Pencil, Plus } from "lucide-react";
import {
  ButtonLink,
  Card,
  DataTable,
  EmptyState,
  LangChip,
  Pagination,
  Pill,
  type Column,
} from "@/components/admin/atoms";
import {
  listBannersPaged,
  bannerStatus,
  bannerLangFlags,
  bannerImageUrl,
} from "@/lib/admin/banners";
import { BannerToggle } from "./BannerToggle";
import type { BannerRow } from "@/lib/admin/types";

const POSITION_LABEL: Record<string, string> = {
  hero_home: "Hero homepage",
  product_hero: "Hero sản phẩm",
  home_mid: "Banner giữa trang chủ",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const columns: Column<BannerRow>[] = [
  {
    key: "thumb",
    header: "",
    width: "76px",
    cell: (b) => {
      const url = bannerImageUrl(b.image_path);
      return url ? (
        <div
          className="thumb"
          style={{
            background: `url(${url}) center/cover no-repeat`,
            borderColor: "var(--n-200)",
          }}
          aria-label={b.title}
        />
      ) : (
        <div className="thumb thumb--brand" />
      );
    },
  },
  {
    key: "title",
    header: "Banner",
    cell: (b) => (
      <Link href={`/admin/banners/${b.id}`}>
        <div className="tbl__name">{b.title}</div>
        <div className="tbl__sub">{b.description ?? `Banner ${b.id.slice(0, 8)}`}</div>
      </Link>
    ),
  },
  {
    key: "position",
    header: "Vị trí",
    cell: (b) => <span className="text-xs">{POSITION_LABEL[b.position] ?? b.position}</span>,
  },
  {
    key: "from",
    header: "Hiệu lực từ",
    cell: (b) => <span className="text-xs">{formatDate(b.starts_at)}</span>,
  },
  {
    key: "to",
    header: "Đến",
    cell: (b) => <span className="text-xs">{formatDate(b.ends_at)}</span>,
  },
  {
    key: "status",
    header: "Trạng thái",
    cell: (b) => <Pill status={bannerStatus(b)} />,
  },
  {
    key: "lang",
    header: "Ngôn ngữ",
    cell: (b) => <LangChip lang={bannerLangFlags(b)} />,
  },
  {
    key: "toggle",
    header: "Bật/Tắt",
    cell: (b) => <BannerToggle id={b.id} initialEnabled={b.is_enabled} />,
  },
  {
    key: "actions",
    header: "",
    width: "40px",
    cell: (b) => (
      <Link
        href={`/admin/banners/${b.id}`}
        className="tbl__act"
        title="Sửa"
        aria-label="Sửa"
      >
        <Pencil size={14} strokeWidth={1.75} />
      </Link>
    ),
  },
];

const PAGE_SIZE = 20;

function buildHref(base: string, page: number) {
  return page === 1 ? base : `${base}?page=${page}`;
}

export default async function BannersPage({
  searchParams = {},
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const { rows: banners, total } = await listBannersPaged({ page, pageSize: PAGE_SIZE });

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Banner trang chủ</span></div>
          <h1>Banner &amp; Slideshow</h1>
          <p>Quản lý banner hero homepage. Hỗ trợ thời gian hiệu lực để tự bật/tắt theo lịch.</p>
        </div>
        <ButtonLink href="/admin/banners/new" icon={Plus}>Thêm banner</ButtonLink>
      </div>

      <Card>
        <DataTable
          rows={banners}
          columns={columns}
          rowKey={(b) => b.id}
          empty={
            <EmptyState
              icon={ImageIcon}
              title="Chưa có banner nào"
              description="Tạo banner đầu tiên cho hero homepage."
              action={
                <ButtonLink href="/admin/banners/new" icon={ArrowRight} iconPosition="right" size="sm">
                  Thêm banner đầu tiên
                </ButtonLink>
              }
            />
          }
        />
        <Pagination
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          hrefFor={(p) => buildHref("/admin/banners", p)}
        />
      </Card>
    </>
  );
}
