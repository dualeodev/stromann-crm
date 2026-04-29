import Link from "next/link";
import { ArrowRight, Newspaper, Pencil, Plus } from "lucide-react";
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
  listNewsPaged,
  newsImageUrl,
  newsStatus,
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABEL,
} from "@/lib/admin/news";
import type { NewsCategory, NewsRow } from "@/lib/admin/types";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const columns: Column<NewsRow>[] = [
  {
    key: "thumb",
    header: "",
    width: "76px",
    cell: (n) => {
      const url = newsImageUrl(n.cover_path);
      return url ? (
        <div
          className="thumb"
          style={{
            background: `url(${url}) center/cover no-repeat`,
            borderColor: "var(--n-200)",
          }}
          aria-label={n.title}
        />
      ) : (
        <div className="thumb thumb--brand" />
      );
    },
  },
  {
    key: "title",
    header: "Bài viết",
    cell: (n) => (
      <Link href={`/admin/news/${n.id}`}>
        <div className="tbl__name">{n.title}</div>
        <div className="tbl__sub">{n.excerpt ?? n.slug}</div>
      </Link>
    ),
  },
  {
    key: "category",
    header: "Chuyên mục",
    cell: (n) => (
      <span className="text-[11px] px-2 py-0.5 bg-n-100 rounded">
        {NEWS_CATEGORY_LABEL[n.category]}
      </span>
    ),
  },
  {
    key: "published_at",
    header: "Ngày đăng",
    cell: (n) => <span className="text-xs">{formatDate(n.published_at)}</span>,
  },
  {
    key: "status",
    header: "Trạng thái",
    cell: (n) => <Pill status={newsStatus(n)} />,
  },
  {
    key: "lang",
    header: "Ngôn ngữ",
    cell: (n) => <LangChip lang={{ vn: n.lang_vn, en: n.lang_en, cn: n.lang_cn }} />,
  },
  {
    key: "actions",
    header: "",
    width: "40px",
    cell: (n) => (
      <Link
        href={`/admin/news/${n.id}`}
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

function buildHref(base: string, page: number, category: NewsCategory | null) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (category) params.set("cat", category);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export default async function NewsAdminPage({
  searchParams = {},
}: {
  searchParams?: { page?: string; cat?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const cat = (NEWS_CATEGORIES as readonly string[]).includes(searchParams.cat ?? "")
    ? (searchParams.cat as NewsCategory)
    : null;

  const { rows, total } = await listNewsPaged({
    page,
    pageSize: PAGE_SIZE,
    category: cat,
  });

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Tin tức</span></div>
          <h1>Quản lý tin tức</h1>
          <p>4 chuyên mục: Kiến thức kỹ thuật · Ứng dụng thực tế · Sản phẩm · Tin công ty.</p>
        </div>
        <ButtonLink href="/admin/news/new" icon={Plus}>Viết bài mới</ButtonLink>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          href="/admin/news"
          className={`chip-btn${cat === null ? " active" : ""}`}
          style={{ color: cat === null ? "#fff" : "var(--n-700)" }}
        >
          Tất cả
        </Link>
        {NEWS_CATEGORIES.map((c) => {
          const isActive = cat === c;
          return (
            <Link
              key={c}
              href={`/admin/news?cat=${c}`}
              className={`chip-btn${isActive ? " active" : ""}`}
              style={{ color: isActive ? "#fff" : "var(--n-700)" }}
            >
              {NEWS_CATEGORY_LABEL[c]}
            </Link>
          );
        })}
      </div>

      <Card>
        <DataTable
          rows={rows}
          columns={columns}
          rowKey={(n) => n.id}
          empty={
            <EmptyState
              icon={Newspaper}
              title="Chưa có bài viết nào"
              description="Tạo bài viết đầu tiên cho mục Tin tức."
              action={
                <ButtonLink
                  href="/admin/news/new"
                  icon={ArrowRight}
                  iconPosition="right"
                  size="sm"
                  className="!text-white"
                >
                  Viết bài đầu tiên
                </ButtonLink>
              }
            />
          }
        />
        <Pagination
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          hrefFor={(p) => buildHref("/admin/news", p, cat)}
        />
      </Card>
    </>
  );
}
