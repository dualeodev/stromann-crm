import Link from "next/link";
import { ArrowRight, Package, Pencil, Plus } from "lucide-react";
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
  listProducts,
  listProductIndustries,
  publicAssetUrl,
  PRODUCT_BUCKET,
  type ProductRow,
  type ProductIndustryRow,
} from "@/lib/catalog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface RowWithIndustries extends ProductRow {
  industryNames: string[];
}

const PAGE_SIZE = 20;

function buildHref(base: string, page: number) {
  return page === 1 ? base : `${base}?page=${page}`;
}

export default async function ProductsAdminPage({
  searchParams = {},
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const [{ rows, total }, industries] = await Promise.all([
    listProducts({ page, pageSize: PAGE_SIZE, status: "all" }),
    listProductIndustries(),
  ]);

  const industryById = new Map<string, ProductIndustryRow>();
  industries.forEach((i) => industryById.set(i.id, i));

  // Pull link rows for the visible products in one go.
  const productIds = rows.map((r) => r.id);
  const linkMap = new Map<string, string[]>();
  if (productIds.length) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase
      .from("product_industry_links")
      .select("product_id, product_industry_id")
      .in("product_id", productIds);
    (data ?? []).forEach((r) => {
      const list = linkMap.get(r.product_id) ?? [];
      const ind = industryById.get(r.product_industry_id);
      if (ind) list.push(ind.name);
      linkMap.set(r.product_id, list);
    });
  }

  const tableRows: RowWithIndustries[] = rows.map((r) => ({
    ...r,
    industryNames: linkMap.get(r.id) ?? [],
  }));

  const columns: Column<RowWithIndustries>[] = [
    {
      key: "name",
      header: "Sản phẩm",
      cell: (p) => {
        const imgUrl = publicAssetUrl(PRODUCT_BUCKET, p.main_image_path);
        return (
          <Link href={`/admin/products/${p.id}`} className="flex gap-2.5 items-center">
            {imgUrl ? (
              <div
                className="thumb"
                style={{ background: `url(${imgUrl}) center/cover no-repeat`, borderColor: "var(--n-200)" }}
                aria-label={p.name}
              />
            ) : (
              <div className="thumb thumb--brand" />
            )}
            <div>
              <div className="tbl__name">{p.name}</div>
              <div className="tbl__sub">{p.brand ?? "—"} · {p.slug}</div>
            </div>
          </Link>
        );
      },
    },
    {
      key: "industries",
      header: "Ngành ứng dụng",
      cell: (p) => (
        <div className="flex gap-1 flex-wrap">
          {p.industryNames.length === 0 ? (
            <span className="text-xs text-n-400">—</span>
          ) : (
            p.industryNames.map((n) => (
              <span key={n} className="text-[11px] px-1.5 py-0.5 bg-n-100 rounded">
                {n}
              </span>
            ))
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      cell: (p) => <Pill status={p.status} />,
    },
    {
      key: "lang",
      header: "Ngôn ngữ",
      cell: (p) => <LangChip lang={{ vn: p.lang_vn, en: p.lang_en, cn: p.lang_cn }} />,
    },
    {
      key: "updated",
      header: "Cập nhật",
      cell: (p) => <span className="text-xs text-n-600">{formatDate(p.updated_at)}</span>,
    },
    {
      key: "actions",
      header: "",
      width: "40px",
      cell: (p) => (
        <Link
          href={`/admin/products/${p.id}`}
          className="tbl__act"
          title="Sửa"
          aria-label="Sửa"
        >
          <Pencil size={14} strokeWidth={1.75} />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Sản phẩm</span></div>
          <h1>Quản lý sản phẩm</h1>
          <p>{total} sản phẩm — phân theo nhóm chức năng, ngành ứng dụng, vấn đề kỹ thuật và thương hiệu.</p>
        </div>
        <ButtonLink href="/admin/products/new" icon={Plus}>Thêm sản phẩm</ButtonLink>
      </div>

      <Card>
        <DataTable
          rows={tableRows}
          columns={columns}
          rowKey={(p) => p.id}
          empty={
            <EmptyState
              icon={Package}
              title="Chưa có sản phẩm"
              description="Tạo sản phẩm đầu tiên."
              action={
                <ButtonLink href="/admin/products/new" icon={ArrowRight} iconPosition="right" size="sm">
                  Thêm sản phẩm đầu tiên
                </ButtonLink>
              }
            />
          }
        />
        <Pagination
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          hrefFor={(p) => buildHref("/admin/products", p)}
        />
      </Card>
    </>
  );
}
