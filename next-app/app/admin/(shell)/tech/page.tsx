import Link from "next/link";
import { ArrowRight, Pencil, Plus, Wrench } from "lucide-react";
import {
  ButtonLink,
  Card,
  EmptyState,
  Pagination,
} from "@/components/admin/atoms";
import { listTechnicalIssuesPaged, countProductsPerTechIssue } from "@/lib/catalog";

const PAGE_SIZE = 20;

function buildHref(base: string, page: number) {
  return page === 1 ? base : `${base}?page=${page}`;
}

export default async function TechAdminPage({
  searchParams = {},
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const [{ rows: items, total }, counts] = await Promise.all([
    listTechnicalIssuesPaged({ page, pageSize: PAGE_SIZE }),
    countProductsPerTechIssue(),
  ]);

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Vấn đề kỹ thuật</span></div>
          <h1>Vấn đề kỹ thuật ↔ Sản phẩm</h1>
          <p>Liên kết vấn đề kỹ thuật với sản phẩm phù hợp.</p>
        </div>
        <ButtonLink href="/admin/tech/new" icon={Plus}>Thêm vấn đề mới</ButtonLink>
      </div>

      <Card>
        {items.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="Chưa có vấn đề kỹ thuật"
            description="Tạo vấn đề đầu tiên (ví dụ: Bọt, Phân tán)."
            action={
              <ButtonLink href="/admin/tech/new" icon={ArrowRight} iconPosition="right" size="sm">
                Thêm vấn đề đầu tiên
              </ButtonLink>
            }
          />
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Vấn đề</th>
                <th>Slug</th>
                <th>Sản phẩm liên kết</th>
                <th>Hiện trên menu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="cursor-pointer">
                  <td className="tbl__name">
                    <Link href={`/admin/tech/${i.id}`}>{i.name}</Link>
                  </td>
                  <td><span className="text-xs text-n-600">{i.slug}</span></td>
                  <td>
                    <b className="text-brand-500">{counts[i.id] ?? 0}</b> sản phẩm
                  </td>
                  <td>
                    <span className="text-xs">{i.show_in_mega_menu ? "Có" : "Không"}</span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/tech/${i.id}`}
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
          hrefFor={(p) => buildHref("/admin/tech", p)}
        />
      </Card>
    </>
  );
}
