import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import {
  Alert,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  Input,
  SubmitButton,
  Textarea,
} from "@/components/admin/atoms";
import { FormSection } from "@/components/admin/forms/FormSection";
import { getCategory } from "@/lib/catalog";
import { saveCategoryAction, deleteCategoryAction } from "../actions";

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  const isNew = params.id === "new";
  const category = isNew ? null : await getCategory(params.id);
  if (!isNew && !category) notFound();

  const title = isNew ? "Tạo danh mục mới" : category!.name;

  return (
    <form action={saveCategoryAction}>
      <input type="hidden" name="id" value={params.id} />

      <div className="page-h mb-6">
        <div>
          <div className="crumb">
            <a
              href="/admin/categories"
              className="cursor-pointer text-brand-500 inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Danh mục
            </a>{" "}
            / <span>{title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="m-0">{title}</h1>
          </div>
          {isNew && <p>Tạo danh mục mới hiển thị trên sidebar và mega-menu.</p>}
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button
              type="submit"
              formAction={deleteCategoryAction}
              variant="danger"
              icon={Trash2}
            >
              Xóa
            </Button>
          )}
          <ButtonLink href="/admin/categories" variant="secondary">Hủy</ButtonLink>
          <SubmitButton>{isNew ? "Tạo danh mục" : "Lưu thay đổi"}</SubmitButton>
        </div>
      </div>

      {searchParams.saved && (
        <div className="mb-4">
          <Alert variant="success">Đã lưu danh mục.</Alert>
        </div>
      )}
      {searchParams.error === "missing_required" && (
        <div className="mb-4">
          <Alert variant="error">Vui lòng nhập tên và slug.</Alert>
        </div>
      )}

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Thông tin cơ bản">
            <div className="field-row">
              <Input
                name="name"
                label="Tên danh mục"
                required
                defaultValue={category?.name ?? ""}
              />
              <Input
                name="slug"
                label="Slug URL"
                required
                defaultValue={category?.slug ?? ""}
                hint="Ví dụ: hoa-chat-nganh-son"
              />
            </div>
            <Textarea
              name="description"
              label="Mô tả"
              rows={3}
              defaultValue={category?.description ?? ""}
            />
          </FormSection>

          <FormSection title="SEO">
            <Input
              name="meta_title"
              label="Meta title"
              defaultValue={category?.meta_title ?? ""}
            />
            <Textarea
              name="meta_description"
              label="Meta description"
              rows={2}
              defaultValue={category?.meta_description ?? ""}
            />
          </FormSection>
        </div>

        <div>
          <Card className="mb-4">
            <Card.Head title="Hiển thị" />
            <Card.Body>
              <Input
                name="sort_order"
                label="Thứ tự hiển thị"
                type="number"
                defaultValue={category?.sort_order ?? 0}
              />
              <div className="field">
                <Checkbox
                  name="is_enabled"
                  label="Bật danh mục"
                  defaultChecked={category?.is_enabled ?? true}
                />
              </div>
              <div className="field">
                <Checkbox
                  name="show_in_mega_menu"
                  label="Hiện trong mega-menu"
                  defaultChecked={category?.show_in_mega_menu ?? true}
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Head title="Ngôn ngữ" />
            <Card.Body>
              <Checkbox name="lang_vn" label="Tiếng Việt"
                defaultChecked={category?.lang_vn ?? true} className="mb-2" />
              <Checkbox name="lang_en" label="English"
                defaultChecked={category?.lang_en ?? false} className="mb-2" />
              <Checkbox name="lang_cn" label="中文"
                defaultChecked={category?.lang_cn ?? false} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
