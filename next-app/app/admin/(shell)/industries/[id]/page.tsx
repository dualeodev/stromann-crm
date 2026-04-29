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
import { getProductIndustry } from "@/lib/catalog";
import { saveIndustryAction, deleteIndustryAction } from "../actions";

export default async function IndustryDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  const isNew = params.id === "new";
  const item = isNew ? null : await getProductIndustry(params.id);
  if (!isNew && !item) notFound();

  const title = isNew ? "Tạo ngành ứng dụng mới" : item!.name;

  return (
    <form action={saveIndustryAction}>
      <input type="hidden" name="id" value={params.id} />

      <div className="page-h mb-6">
        <div>
          <div className="crumb">
            <a
              href="/admin/industries"
              className="cursor-pointer text-brand-500 inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Ngành ứng dụng
            </a>{" "}
            / <span>{title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="m-0">{title}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button
              type="submit"
              formAction={deleteIndustryAction}
              variant="danger"
              icon={Trash2}
            >
              Xóa
            </Button>
          )}
          <ButtonLink href="/admin/industries" variant="secondary">Hủy</ButtonLink>
          <SubmitButton>{isNew ? "Tạo ngành" : "Lưu thay đổi"}</SubmitButton>
        </div>
      </div>

      {searchParams.saved && (
        <div className="mb-4">
          <Alert variant="success">Đã lưu ngành ứng dụng.</Alert>
        </div>
      )}
      {searchParams.error === "missing_required" && (
        <div className="mb-4">
          <Alert variant="error">Vui lòng nhập tên và slug.</Alert>
        </div>
      )}

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Thông tin chung">
            <div className="field-row">
              <Input
                name="name"
                label="Tên ngành"
                required
                defaultValue={item?.name ?? ""}
              />
              <Input
                name="slug"
                label="Slug URL"
                required
                defaultValue={item?.slug ?? ""}
                hint="Ví dụ: son-nuoc"
              />
            </div>
            <div className="field-row">
              <Input
                name="code"
                label="Mã viết tắt"
                maxLength={4}
                defaultValue={item?.code ?? ""}
                hint="1–4 ký tự (S, M, N…)"
              />
              <Input
                name="hex_color"
                label="Mã màu (hex)"
                defaultValue={item?.hex_color ?? ""}
                hint="Ví dụ: #C8332D"
              />
            </div>
            <Textarea
              name="short_description"
              label="Mô tả ngắn (card homepage)"
              rows={2}
              defaultValue={item?.short_description ?? ""}
            />
            <Textarea
              name="overview_description"
              label="Mô tả tổng quan (trang chi tiết ngành)"
              rows={5}
              defaultValue={item?.overview_description ?? ""}
            />
          </FormSection>

          <FormSection title="SEO">
            <Input
              name="meta_title"
              label="Meta title"
              defaultValue={item?.meta_title ?? ""}
            />
            <Textarea
              name="meta_description"
              label="Meta description"
              rows={2}
              defaultValue={item?.meta_description ?? ""}
            />
          </FormSection>
        </div>

        <div>
          <Card className="mb-4">
            <Card.Head title="Hiển thị" />
            <Card.Body>
              <Input
                name="sort_order"
                label="Thứ tự"
                type="number"
                defaultValue={item?.sort_order ?? 0}
                hint="Số nhỏ hơn = hiển thị trước"
              />
              <div className="field">
                <Checkbox
                  name="is_enabled"
                  label="Đang hiển thị"
                  defaultChecked={item?.is_enabled ?? true}
                />
              </div>
              <div className="field">
                <Checkbox
                  name="show_on_homepage"
                  label="Hiển thị trên homepage"
                  defaultChecked={item?.show_on_homepage ?? false}
                />
              </div>
              <div className="field">
                <Checkbox
                  name="show_in_mega_menu"
                  label="Hiển thị trong mega-menu"
                  defaultChecked={item?.show_in_mega_menu ?? true}
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Head title="Ngôn ngữ" />
            <Card.Body>
              <Checkbox name="lang_vn" label="Tiếng Việt"
                defaultChecked={item?.lang_vn ?? true} className="mb-2" />
              <Checkbox name="lang_en" label="English"
                defaultChecked={item?.lang_en ?? false} className="mb-2" />
              <Checkbox name="lang_cn" label="中文"
                defaultChecked={item?.lang_cn ?? false} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
