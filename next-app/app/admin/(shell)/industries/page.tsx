import Link from "next/link";
import { ArrowRight, Factory, Pencil, Plus } from "lucide-react";
import {
  ButtonLink,
  Card,
  EmptyState,
  Pagination,
} from "@/components/admin/atoms";
import { listProductIndustriesPaged, countProductsPerIndustry } from "@/lib/catalog";
import { IndustryToggle } from "./IndustryToggle";

const PAGE_SIZE = 20;

function buildHref(base: string, page: number) {
  return page === 1 ? base : `${base}?page=${page}`;
}

export default async function IndustriesAdminPage({
  searchParams = {},
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const [{ rows: items, total }, counts] = await Promise.all([
    listProductIndustriesPaged({ page, pageSize: PAGE_SIZE }),
    countProductsPerIndustry(),
  ]);

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Ngành ứng dụng</span></div>
          <h1>Ngành ứng dụng</h1>
          <p>Tag áp dụng vào sản phẩm. Có thể thêm ngành mới và bật hiển thị bất cứ lúc nào.</p>
        </div>
        <ButtonLink href="/admin/industries/new" icon={Plus}>Thêm ngành mới</ButtonLink>
      </div>

      <Card>
        {items.length === 0 ? (
          <EmptyState
            icon={Factory}
            title="Chưa có ngành ứng dụng"
            description="Tạo ngành đầu tiên (ví dụ: Sơn nước)."
            action={
              <ButtonLink href="/admin/industries/new" icon={ArrowRight} iconPosition="right" size="sm">
                Thêm ngành đầu tiên
              </ButtonLink>
            }
          />
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên ngành</th>
                <th>Sản phẩm</th>
                <th>Hiển thị</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="cursor-pointer">
                  <td>
                    <span
                      className="inline-flex w-7 h-7 rounded-md items-center justify-center font-bold text-xs"
                      style={{
                        background: i.hex_color ? `${i.hex_color}22` : "#FFE4E6",
                        color: i.hex_color ?? "var(--brand-700)",
                      }}
                    >
                      {i.code ?? i.name.slice(0, 1).toUpperCase()}
                    </span>
                  </td>
                  <td className="tbl__name">
                    <Link href={`/admin/industries/${i.id}`}>
                      <div>{i.name}</div>
                      <div className="tbl__sub">{i.slug}</div>
                    </Link>
                  </td>
                  <td>{counts[i.id] ?? 0}</td>
                  <td>
                    <IndustryToggle id={i.id} initialEnabled={i.is_enabled} />
                  </td>
                  <td>
                    <Link
                      href={`/admin/industries/${i.id}`}
                      className="tbl__act"
                      title="Sửa"
                      aria-label="Sửa"
                    >
                      <Pencil size={14} strokeWidth={1.75} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          hrefFor={(p) => buildHref("/admin/industries", p)}
        />
      </Card>
    </>
  );
}
