import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import {
  Alert,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  Input,
  Pill,
  Select,
  SubmitButton,
  Textarea,
} from "@/components/admin/atoms";
import { FormSection } from "@/components/admin/forms/FormSection";
import { getBanner, bannerStatus, bannerImageUrl } from "@/lib/admin/banners";
import { listProducts } from "@/lib/catalog";
import { saveBannerAction, deleteBannerAction } from "../actions";
import { BannerImagePicker } from "./BannerImagePicker";
import { BannerCtaPicker } from "./BannerCtaPicker";

const POSITIONS = [
  { value: "hero_home", label: "Hero homepage" },
  { value: "product_hero", label: "Hero trang sản phẩm" },
  { value: "home_mid", label: "Banner giữa trang chủ" },
];

function toLocalInputValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function BannerDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  const isNew = params.id === "new";
  const banner = isNew ? null : await getBanner(params.id);
  if (!isNew && !banner) notFound();

  const imgUrl = banner ? bannerImageUrl(banner.image_path) : null;
  const status = banner ? bannerStatus(banner) : null;
  const title = isNew ? "Tạo banner mới" : banner!.title;

  const { rows: allProducts } = await listProducts({
    publishedOnly: true,
    pageSize: 500,
    sort: "az",
  });
  const productOptions = allProducts.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <form action={saveBannerAction} encType="multipart/form-data">
      <input type="hidden" name="id" value={params.id} />

      <div className="page-h mb-6">
        <div>
          <div className="crumb">
            <a href="/admin/banners" className="cursor-pointer text-brand-500 inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Banner trang chủ
            </a>{" "}
            / <span>{title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="m-0">{title}</h1>
            {status && <Pill status={status} />}
          </div>
          {isNew && <p>Banner sẽ tự động bật/tắt theo thời gian hiệu lực.</p>}
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button
              type="submit"
              formAction={deleteBannerAction}
              variant="danger"
              icon={Trash2}
            >
              Xóa
            </Button>
          )}
          <ButtonLink href="/admin/banners" variant="secondary">Hủy</ButtonLink>
          <SubmitButton>
            {isNew ? "Tạo banner" : "Lưu thay đổi"}
          </SubmitButton>
        </div>
      </div>

      {searchParams.saved && (
        <div className="mb-4">
          <Alert variant="success">Đã lưu banner.</Alert>
        </div>
      )}
      {searchParams.error === "missing_title" && (
        <div className="mb-4">
          <Alert variant="error">Vui lòng nhập tiêu đề.</Alert>
        </div>
      )}

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Hình ảnh & nội dung">
            <BannerImagePicker name="image" currentUrl={imgUrl} />

            <Input
              name="title"
              label="Tiêu đề chính"
              required
              defaultValue={banner?.title ?? ""}
            />
            <Textarea
              name="description"
              label="Mô tả"
              rows={2}
              defaultValue={banner?.description ?? ""}
            />
            <div className="field-row">
              <Input
                name="cta_label"
                label="Text nút CTA"
                defaultValue={banner?.cta_label ?? ""}
              />
              <BannerCtaPicker
                name="cta_href"
                initialValue={banner?.cta_href ?? ""}
                products={productOptions}
              />
            </div>
          </FormSection>

          <FormSection
            title="Thời gian hiệu lực"
            desc="Banner sẽ tự động hiển thị/ẩn theo thời gian này."
          >
            <div className="field-row">
              <Input
                name="starts_at"
                label="Bắt đầu"
                type="datetime-local"
                defaultValue={toLocalInputValue(banner?.starts_at ?? null)}
              />
              <Input
                name="ends_at"
                label="Kết thúc"
                type="datetime-local"
                defaultValue={toLocalInputValue(banner?.ends_at ?? null)}
              />
            </div>
            <Checkbox
              name="no_window"
              label="Không có thời hạn (luôn hiển thị)"
              defaultChecked={!banner?.starts_at && !banner?.ends_at && !isNew}
              className="mt-2"
            />
          </FormSection>
        </div>

        <div>
          <Card className="mb-4">
            <Card.Head title="Vị trí & thứ tự" />
            <Card.Body>
              <Select
                name="position"
                label="Vị trí trang"
                defaultValue={banner?.position ?? "hero_home"}
                options={POSITIONS}
              />
              <Input
                name="sort_order"
                label="Thứ tự hiển thị"
                type="number"
                defaultValue={banner?.sort_order ?? 1}
              />
              <div className="field">
                <Checkbox
                  name="is_enabled"
                  label="Bật banner"
                  defaultChecked={banner?.is_enabled ?? true}
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Head title="Ngôn ngữ" />
            <Card.Body>
              <Checkbox name="lang_vn" label="Tiếng Việt"
                defaultChecked={banner?.lang_vn ?? true} className="mb-2" />
              <Checkbox name="lang_en" label="English"
                defaultChecked={banner?.lang_en ?? false} className="mb-2" />
              <Checkbox name="lang_cn" label="中文"
                defaultChecked={banner?.lang_cn ?? false} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
