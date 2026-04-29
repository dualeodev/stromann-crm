import Link from "next/link";
import { ArrowRight, FolderTree, Pencil, Plus } from "lucide-react";
import {
  ButtonLink,
  Card,
  EmptyState,
  Pagination,
} from "@/components/admin/atoms";
import { listCategoriesPaged } from "@/lib/catalog";
import { CategoryToggle } from "./CategoryToggle";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const PAGE_SIZE = 20;

function buildHref(base: string, page: number) {
  return page === 1 ? base : `${base}?page=${page}`;
}

export default async function CategoriesAdminPage({
  searchParams = {},
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const { rows, total } = await listCategoriesPaged({ page, pageSize: PAGE_SIZE });

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Danh mục</span></div>
          <h1>Danh mục sản phẩm</h1>
          <p>Cấu trúc danh mục hiển thị ở sidebar &ldquo;DANH MỤC SẢN PHẨM&rdquo; và mega-menu.</p>
        </div>
        <ButtonLink href="/admin/categories/new" icon={Plus}>Thêm danh mục</ButtonLink>
      </div>

      <Card>
        {rows.length === 0 ? (
          <EmptyState
            icon={FolderTree}
            title="Chưa có danh mục"
            description="Tạo danh mục đầu tiên (ví dụ: Hoá chất ngành sơn)."
            action={
              <ButtonLink href="/admin/categories/new" icon={ArrowRight} iconPosition="right" size="sm">
                Thêm danh mục đầu tiên
              </ButtonLink>
            }
          />
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Danh mục</th>
                <th>Thứ tự</th>
                <th>Hiện trên menu</th>
                <th>Bật/Tắt</th>
                <th>Cập nhật</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="cursor-pointer">
                  <td>
                    <Link href={`/admin/categories/${c.id}`}>
                      <div className="tbl__name">{c.name}</div>
                      <div className="tbl__sub">{c.slug}</div>
                    </Link>
                  </td>
                  <td>{c.sort_order}</td>
                  <td>
                    <span className="text-xs">{c.show_in_mega_menu ? "Có" : "Không"}</span>
                  </td>
                  <td>
                    <CategoryToggle id={c.id} initialEnabled={c.is_enabled} />
                  </td>
                  <td><span className="text-xs text-n-600">{formatDate(c.updated_at)}</span></td>
                  <td>
                    <Link href={`/admin/categories/${c.id}`} className="tbl__act" title="Sửa" aria-label="Sửa">
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
          hrefFor={(p) => buildHref("/admin/categories", p)}
        />
      </Card>
    </>
  );
}
