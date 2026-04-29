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
  getNews,
  newsStatus,
  newsImageUrl,
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABEL,
} from "@/lib/admin/news";
import { saveNewsAction, deleteNewsAction } from "../actions";
import { NewsCoverPicker } from "./NewsCoverPicker";
import { NewsEditor } from "./NewsEditor";

const CATEGORY_OPTIONS = NEWS_CATEGORIES.map((c) => ({
  value: c,
  label: NEWS_CATEGORY_LABEL[c],
}));

function toLocalInputValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  const isNew = params.id === "new";
  const article = isNew ? null : await getNews(params.id);
  if (!isNew && !article) notFound();

  const coverUrl = article ? newsImageUrl(article.cover_path) : null;
  const status = article ? newsStatus(article) : null;
  const title = isNew ? "Viết bài mới" : article!.title;

  return (
    <form action={saveNewsAction} encType="multipart/form-data">
      <input type="hidden" name="id" value={params.id} />

      <div className="page-h mb-6">
        <div>
          <div className="crumb">
            <a href="/admin/news" className="cursor-pointer text-brand-500 inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Tin tức
            </a>{" "}
            / <span>{title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="m-0">{title}</h1>
            {status && <Pill status={status} />}
          </div>
          {isNew && <p>Bài viết sẽ hiển thị công khai sau khi bật xuất bản.</p>}
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button
              type="submit"
              formAction={deleteNewsAction}
              variant="danger"
              icon={Trash2}
            >
              Xóa
            </Button>
          )}
          <ButtonLink href="/admin/news" variant="secondary">Hủy</ButtonLink>
          <SubmitButton>{isNew ? "Tạo bài" : "Lưu thay đổi"}</SubmitButton>
        </div>
      </div>

      {searchParams.saved && (
        <div className="mb-4">
          <Alert variant="success">Đã lưu bài viết.</Alert>
        </div>
      )}
      {searchParams.error === "missing_title" && (
        <div className="mb-4">
          <Alert variant="error">Vui lòng nhập tiêu đề.</Alert>
        </div>
      )}

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Tiêu đề & tóm tắt">
            <Input
              name="title"
              label="Tiêu đề"
              required
              defaultValue={article?.title ?? ""}
            />
            <Input
              name="slug"
              label="Slug (URL)"
              hint="Để trống để tự sinh từ tiêu đề."
              defaultValue={article?.slug ?? ""}
            />
            <Textarea
              name="excerpt"
              label="Tóm tắt"
              rows={2}
              defaultValue={article?.excerpt ?? ""}
            />
          </FormSection>

          <FormSection title="Ảnh bìa">
            <NewsCoverPicker name="cover" currentUrl={coverUrl} />
          </FormSection>

          <FormSection title="Nội dung">
            <NewsEditor name="body_html" initialHtml={article?.body_html ?? ""} />
          </FormSection>

          <FormSection title="SEO" desc="Metadata cho social share & search.">
            <Input
              name="meta_title"
              label="Meta title"
              defaultValue={article?.meta_title ?? ""}
            />
            <Textarea
              name="meta_description"
              label="Meta description"
              rows={2}
              defaultValue={article?.meta_description ?? ""}
            />
          </FormSection>
        </div>

        <div>
          <Card className="mb-4">
            <Card.Head title="Xuất bản" />
            <Card.Body>
              <Checkbox
                name="is_published"
                label="Xuất bản"
                defaultChecked={article?.is_published ?? false}
                className="mb-3"
              />
              <Input
                name="published_at"
                label="Thời điểm đăng"
                type="datetime-local"
                hint="Để trống = đăng ngay khi bật xuất bản."
                defaultValue={toLocalInputValue(article?.published_at ?? null)}
              />
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Head title="Phân loại" />
            <Card.Body>
              <Select
                name="category"
                label="Chuyên mục"
                defaultValue={article?.category ?? "tech_knowledge"}
                options={CATEGORY_OPTIONS}
              />
              <Input
                name="read_minutes"
                label="Thời gian đọc (phút)"
                type="number"
                defaultValue={article?.read_minutes ?? 5}
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Head title="Ngôn ngữ" />
            <Card.Body>
              <Checkbox name="lang_vn" label="Tiếng Việt"
                defaultChecked={article?.lang_vn ?? true} className="mb-2" />
              <Checkbox name="lang_en" label="English"
                defaultChecked={article?.lang_en ?? false} className="mb-2" />
              <Checkbox name="lang_cn" label="中文"
                defaultChecked={article?.lang_cn ?? false} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  );
}
