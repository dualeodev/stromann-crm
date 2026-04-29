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
import {
  getProductWithRelations,
  listCategories,
  listProductIndustries,
  listTechnicalIssues,
  publicAssetUrl,
  PRODUCT_BUCKET,
} from "@/lib/catalog";
import { TagPicker } from "@/components/admin/forms/TagPicker";
import { saveProductAction, deleteProductAction } from "../actions";
import { ProductMainImagePicker } from "./ProductMainImagePicker";
import { ProductGalleryPicker } from "./ProductGalleryPicker";

const STATUS_OPTIONS = [
  { value: "published", label: "Đã xuất bản" },
  { value: "draft",     label: "Nháp" },
  { value: "scheduled", label: "Lên lịch" },
];

const REGION_OPTIONS = [
  { value: "",                                  label: "—" },
  { value: "EMEA · Americas · Asia/Oceania",   label: "EMEA · Americas · Asia/Oceania" },
  { value: "EMEA",                              label: "EMEA" },
  { value: "Americas",                          label: "Americas" },
  { value: "Asia/Oceania",                      label: "Asia/Oceania" },
];

export default async function ProductDetailAdminPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  const isNew = params.id === "new";
  const product = isNew ? null : await getProductWithRelations(params.id);
  if (!isNew && !product) notFound();

  const [allCategories, allIndustries, allTechs] = await Promise.all([
    listCategories(),
    listProductIndustries(),
    listTechnicalIssues(),
  ]);

  const categoryOptions = allCategories.map((c) => ({ value: c.id, label: c.name }));

  const industryOptions = allIndustries.map((i) => ({ value: i.id, label: i.name }));
  const techOptions = allTechs.map((t) => ({ value: t.id, label: t.name }));

  const title = isNew ? "Tạo sản phẩm mới" : product!.name;

  return (
    <form action={saveProductAction} encType="multipart/form-data">
      <input type="hidden" name="id" value={params.id} />

      <div className="page-h mb-6">
        <div>
          <div className="crumb">
            <a
              href="/admin/products"
              className="cursor-pointer text-brand-500 inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Sản phẩm
            </a>{" "}
            / <span>{title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="m-0">{title}</h1>
            {product && <Pill status={product.status} />}
          </div>
          {isNew && <p>Tạo sản phẩm mới và gắn vào danh mục, ngành ứng dụng, vấn đề kỹ thuật.</p>}
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button
              type="submit"
              formAction={deleteProductAction}
              variant="danger"
              icon={Trash2}
            >
              Xóa
            </Button>
          )}
          <ButtonLink href="/admin/products" variant="secondary">Hủy</ButtonLink>
          <SubmitButton>{isNew ? "Tạo sản phẩm" : "Lưu thay đổi"}</SubmitButton>
        </div>
      </div>

      {searchParams.saved && (
        <div className="mb-4">
          <Alert variant="success">Đã lưu sản phẩm.</Alert>
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
                label="Tên sản phẩm"
                required
                defaultValue={product?.name ?? ""}
              />
              <Input
                name="slug"
                label="Slug URL"
                required
                defaultValue={product?.slug ?? ""}
                hint="stromann.vn/products/<slug>"
              />
            </div>
            <Textarea
              name="short_description"
              label="Mô tả ngắn (hiển thị trên card listing)"
              rows={2}
              defaultValue={product?.short_description ?? ""}
            />
            <Textarea
              name="detailed_description"
              label="Mô tả chi tiết"
              rows={6}
              defaultValue={product?.detailed_description ?? ""}
            />
          </FormSection>

          <FormSection title="Phân loại & gắn tag">
            <div className="field-row">
              <Input
                name="brand"
                label="Thương hiệu"
                defaultValue={product?.brand ?? ""}
              />
              <Select
                name="region"
                label="Khu vực có hiệu lực"
                defaultValue={product?.region ?? ""}
                options={REGION_OPTIONS}
              />
            </div>

            <TagPicker
              name="categories"
              label="Danh mục"
              accent="brand"
              options={categoryOptions}
              defaultSelected={(product?.categories ?? []).map((c) => c.id)}
              manageHref="/admin/categories"
              manageLabel="Quản lý danh mục"
            />

            <TagPicker
              name="industries"
              label="Ngành ứng dụng"
              accent="blue"
              options={industryOptions}
              defaultSelected={(product?.industries ?? []).map((i) => i.id)}
              manageHref="/admin/industries"
              manageLabel="Quản lý ngành"
            />

            <TagPicker
              name="techs"
              label="Vấn đề kỹ thuật giải quyết"
              accent="amber"
              options={techOptions}
              defaultSelected={(product?.technical_issues ?? []).map((t) => t.id)}
              manageHref="/admin/tech"
              manageLabel="Quản lý vấn đề"
            />
          </FormSection>

          <FormSection
            title="Hình ảnh"
            desc="Ảnh chính hiển thị ở card listing và đầu trang chi tiết. Gallery hiển thị ở slider thumbnail."
          >
            <div className="grid grid-cols-[200px_1fr] gap-5">
              <ProductMainImagePicker
                name="image"
                currentUrl={publicAssetUrl(PRODUCT_BUCKET, product?.main_image_path ?? null)}
              />
              <ProductGalleryPicker
                newName="gallery_new"
                removeName="gallery_remove"
                existing={(product?.gallery_paths ?? []).map((p) => ({
                  path: p,
                  url: publicAssetUrl(PRODUCT_BUCKET, p) ?? "",
                }))}
              />
            </div>
          </FormSection>

          <FormSection title="SEO">
            <Input
              name="meta_title"
              label="Meta title"
              defaultValue={product?.meta_title ?? ""}
            />
            <Textarea
              name="meta_description"
              label="Meta description"
              rows={2}
              defaultValue={product?.meta_description ?? ""}
            />
          </FormSection>
        </div>

        <div>
          <Card className="mb-4">
            <Card.Head title="Trạng thái" />
            <Card.Body>
              <Select
                name="status"
                label="Hiển thị"
                defaultValue={product?.status ?? "draft"}
                options={STATUS_OPTIONS}
              />
              <Input
                name="sort_order"
                label="Thứ tự hiển thị"
                type="number"
                defaultValue={product?.sort_order ?? 0}
              />
              <div className="field">
                <Checkbox
                  name="is_enabled"
                  label="Bật sản phẩm"
                  defaultChecked={product?.is_enabled ?? true}
                />
              </div>
              <div className="field">
                <Checkbox
                  name="is_featured"
                  label="Sản phẩm nổi bật"
                  defaultChecked={product?.is_featured ?? false}
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Head title="Ngôn ngữ" />
            <Card.Body>
              <Checkbox name="lang_vn" label="Tiếng Việt"
                defaultChecked={product?.lang_vn ?? true} className="mb-2" />
              <Checkbox name="lang_en" label="English"
                defaultChecked={product?.lang_en ?? false} className="mb-2" />
              <Checkbox name="lang_cn" label="中文"
                defaultChecked={product?.lang_cn ?? false} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
