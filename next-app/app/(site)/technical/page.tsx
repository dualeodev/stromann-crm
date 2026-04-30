import type { Metadata } from "next";
import { Tag } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { listTechnicalIssues } from "@/lib/catalog";
import TechnicalForm from "./TechnicalForm";

export const metadata: Metadata = { title: "Yêu cầu kỹ thuật — Stromann Việt Nam" };

export const dynamic = "force-dynamic";

export default async function TechnicalPage() {
  const issues = await listTechnicalIssues({ enabledOnly: true });
  const options = issues.map((i) => ({ id: i.id, name: i.name }));

  return (
    <>
      <Breadcrumb items={[{ label: "Yêu cầu kỹ thuật" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" className="self-start">TƯ VẤN KỸ THUẬT</Tag>
        <h1>Yêu cầu kỹ thuật</h1>
        <p>
          Đội kỹ sư Stromann sẵn sàng tư vấn về công thức, phân tán pigment, hệ thống bọt, độ nhớt và xử lý lỗi sản xuất. Phản hồi trong 4h làm việc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 px-20 py-16 max-lg:px-6">
        <TechnicalForm issues={options} />

        <aside className="flex flex-col gap-6">
          <div className="bg-n-900 text-white rounded-r-16 p-7">
            <h3 className="m-0 text-[18px] font-bold mb-5">Phạm vi tư vấn</h3>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none text-[14px] text-white/85">
              {options.map((o) => (
                <li key={o.id}>• {o.name}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-n-200 rounded-r-16 p-6">
            <h3 className="m-0 text-[16px] font-bold mb-3">Cần hỗ trợ ngay?</h3>
            <div className="text-[14px] text-n-700 leading-relaxed">
              <div>
                <span className="font-semibold text-n-900">Hotline:</span>{" "}
                <a href="tel:+842836200703" className="text-accent hover:underline">
                  +84 28 36200703
                </a>
              </div>
              <div className="mt-1">
                <span className="font-semibold text-n-900">Email:</span>{" "}
                <a href="mailto:tech@stromann.vn" className="text-accent hover:underline">
                  tech@stromann.vn
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
