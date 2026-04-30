import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = { title: "Yêu cầu báo giá — Stromann Việt Nam" };

interface ProcessStep {
  title: string;
  desc: string;
}

const PROCESS: ProcessStep[] = [
  {
    title: "Tiếp nhận yêu cầu",
    desc: "Hệ thống ghi nhận và gửi email xác nhận tự động.",
  },
  {
    title: "Sales liên hệ",
    desc: "Nhân viên Sales gọi xác nhận trong vòng 4h và confirm thông tin.",
  },
  {
    title: "Gửi báo giá chính thức",
    desc: "Báo giá kèm điều khoản thanh toán, thời gian giao hàng.",
  },
  {
    title: "Đặt hàng & giao",
    desc: "Sau khi chốt giá → giao hàng trong 3–5 ngày.",
  },
];

export default function QuotePage({
  searchParams,
}: {
  searchParams?: { product?: string };
}) {
  const initialProduct = searchParams?.product?.trim() || undefined;

  return (
    <>
      <Breadcrumb items={[{ label: "Báo giá" }]} />
      <div className="page-head">
        <h1>Yêu cầu báo giá</h1>
        <p>Liệt kê sản phẩm bạn cần — đội Sales Stromann sẽ phản hồi báo giá trong vòng 4 giờ làm việc.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 px-20 py-16 max-lg:px-6">
        <QuoteForm initialProduct={initialProduct} />

        <aside className="flex flex-col gap-6">
          <div className="bg-n-900 text-white rounded-r-16 p-7">
            <h3 className="m-0 text-[18px] font-bold mb-5">Quy trình xử lý báo giá</h3>
            <ol className="flex flex-col gap-4 m-0 p-0 list-none">
              {PROCESS.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-[12px] font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[14px] font-bold leading-snug">{s.title}</div>
                    <p className="m-0 mt-1 text-[13px] leading-relaxed text-white/70">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
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
                <a href="mailto:sales@stromann.vn" className="text-accent hover:underline">
                  sales@stromann.vn
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
