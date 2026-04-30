import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { Pill } from "@/components/admin/atoms/Pill";
import {
  getSubmission,
  TYPE_LABELS,
  shortId,
  formatDateTime,
} from "@/lib/admin/submissions";
import StatusForm from "./StatusForm";

export const dynamic = "force-dynamic";

export default async function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const s = await getSubmission(params.id);
  if (!s) return notFound();

  const typeLabel = TYPE_LABELS[s.type] ?? s.type;
  const customerFields: Array<{ lbl: string; val: string; link?: string }> = [
    { lbl: "Họ tên",        val: s.full_name },
    { lbl: "Công ty",       val: s.company },
    { lbl: "Email",         val: s.email, link: `mailto:${s.email}` },
    { lbl: "Số điện thoại", val: s.phone, link: `tel:${s.phone.replace(/\s+/g, "")}` },
    ...(s.address ? [{ lbl: "Địa chỉ", val: s.address }] : []),
  ];

  return (
    <>
      <DetailHeader
        breadcrumb="Form gửi đến"
        backHref="/admin/submissions"
        title={`${typeLabel} #${shortId(s.id)}`}
        sub={`${s.company} · ${s.full_name} · ${formatDateTime(s.created_at)}`}
        badge={<Pill status={s.status} />}
        actions={
          <a href={`tel:${s.phone.replace(/\s+/g, "")}`} className="btn btn--secondary inline-flex items-center gap-1.5">
            <Phone size={14} /> Gọi ngay
          </a>
        }
      />

      <div className="grid grid-cols-[1fr_340px] gap-5">
        <div>
          <FormSection title="Thông tin khách">
            <div className="grid grid-cols-2 gap-4">
              {customerFields.map((f) => (
                <div key={f.lbl}>
                  <div className="text-[11px] text-n-500 uppercase font-bold tracking-[0.06em]">
                    {f.lbl}
                  </div>
                  <div className="mt-1 text-[13px] font-medium">
                    {f.link ? (
                      <a href={f.link} className="text-brand-500">{f.val}</a>
                    ) : (
                      f.val
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          {s.type === "quote" && s.products && s.products.length > 0 && (
            <FormSection title="Sản phẩm yêu cầu báo giá">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Mã / tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn vị</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {s.products.map((p, i) => (
                    <tr key={i}>
                      <td><div className="tbl__name">{p.name}</div></td>
                      <td><b>{p.qty}</b></td>
                      <td>{p.unit}</td>
                      <td className="text-xs text-n-600">{p.note || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FormSection>
          )}

          {s.type === "quote" && s.general_note && (
            <FormSection title="Ghi chú chung từ khách">
              <div className="p-4 bg-n-50 rounded-lg text-[13px] leading-[1.6] text-n-700 whitespace-pre-wrap">
                {s.general_note}
              </div>
            </FormSection>
          )}

          {s.type === "technical" && (
            <FormSection title="Vấn đề kỹ thuật">
              <div className="text-[13px]">
                <span className="text-n-500">Loại vấn đề: </span>
                <b>{s.technical_issue_name ?? "—"}</b>
              </div>
              {s.message && (
                <div className="mt-3 p-4 bg-n-50 rounded-lg text-[13px] leading-[1.6] text-n-700 whitespace-pre-wrap">
                  {s.message}
                </div>
              )}
            </FormSection>
          )}

          {s.type === "contact" && s.message && (
            <FormSection title="Lời nhắn từ khách">
              <div className="p-4 bg-n-50 rounded-lg text-[13px] leading-[1.6] text-n-700 whitespace-pre-wrap">
                {s.message}
              </div>
            </FormSection>
          )}
        </div>

        <div>
          <StatusForm id={s.id} status={s.status} />

          <div className="card">
            <div className="card__head"><h3>Thông tin form</h3></div>
            <div className="card__body text-[13px] text-n-700">
              <div className="flex justify-between py-1">
                <span className="text-n-500">Loại</span>
                <b>{typeLabel}</b>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-n-500">Tạo lúc</span>
                <span>{formatDateTime(s.created_at)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-n-500">Cập nhật</span>
                <span>{formatDateTime(s.updated_at)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-n-500">Mã đầy đủ</span>
                <code className="text-[11px]">{s.id}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
