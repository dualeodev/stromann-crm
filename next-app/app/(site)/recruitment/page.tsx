import type { Metadata } from "next";
import Link from "next/link";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { JOBS, BENEFITS, VALUES } from "@/lib/data";
import { JobFilter } from "./JobFilter";

export const metadata: Metadata = { title: "Tuyển dụng — Stromann Việt Nam" };

const DEPTS = ["Tất cả", "Kinh doanh", "Kỹ thuật", "Vận hành", "Marketing"];
const LOCS  = ["Tất cả", "TP.HCM", "Hà Nội"];

const STEPS: Array<{ n: string; t: string; d: string }> = [
  { n: "01", t: "Gửi CV",                d: "Qua website hoặc email hr@stromann.vn" },
  { n: "02", t: "Phỏng vấn HR",          d: "Trao đổi 30 phút về văn hoá, kỳ vọng" },
  { n: "03", t: "Phỏng vấn chuyên môn",  d: "Với trưởng phòng + bài kiểm tra ngắn" },
  { n: "04", t: "Offer & Onboarding",    d: "Phản hồi trong 5 ngày làm việc" },
];

type RawParams = Record<string, string | string[] | undefined>;

function asString(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default function RecruitmentPage({ searchParams = {} }: { searchParams?: RawParams }) {
  const dept = asString(searchParams.dept) ?? "Tất cả";
  const loc  = asString(searchParams.loc)  ?? "Tất cả";

  const filtered = JOBS.filter(
    (j) =>
      (dept === "Tất cả" || j.dept === dept) &&
      (loc === "Tất cả" || j.location === loc),
  );

  return (
    <>
      <Breadcrumb items={[{ label: "Tuyển dụng" }]} />

      <div className="ind-hero">
        <div>
          <Tag>TUYỂN DỤNG</Tag>
          <h1 className="mt-4">
            Cùng Stromann xây dựng<br />nền công nghiệp Việt Nam
          </h1>
          <p className="text-n-300 text-base leading-[1.6] mt-4 max-w-[540px]">
            Chúng tôi đang tìm những đồng đội đam mê hoá học và sản xuất công nghiệp. Tại Stromann, bạn sẽ làm việc cùng đội ngũ kỹ thuật giàu kinh nghiệm, học hỏi từ MÜNZING (Đức) và đóng góp trực tiếp vào sự phát triển của ngành sơn, mực in, nhựa Việt Nam.
          </p>
          <div className="flex gap-3 mt-6">
            <Btn variant="primary" size="lg" href="#jobs">Xem vị trí đang mở →</Btn>
            <Btn
              variant="secondary"
              size="lg"
              className="!bg-transparent !text-white !border-white/30"
              href="mailto:hr@stromann.vn"
            >
              Gửi CV chủ động
            </Btn>
          </div>
          <div className="flex gap-8 mt-8 pt-6 border-t border-white/10">
            <div>
              <div className="text-[28px] font-bold text-white">{JOBS.length}</div>
              <div className="text-xs text-n-400">Vị trí đang tuyển</div>
            </div>
            <div>
              <div className="text-[28px] font-bold text-white">40+</div>
              <div className="text-xs text-n-400">Nhân viên hiện tại</div>
            </div>
            <div>
              <div className="text-[28px] font-bold text-white">4.6/5</div>
              <div className="text-xs text-n-400">Mức độ hài lòng nội bộ</div>
            </div>
          </div>
        </div>
        <div className="ind-hero__media">
          <IndustryImage label="team photo · Stromann office" dark />
        </div>
      </div>

      <section className="section">
        <div className="grid grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <Tag variant="brand-soft">GIÁ TRỊ CỐT LÕI</Tag>
            <h2 className="text-[32px] font-bold my-3 tracking-[-0.01em] leading-[1.2]">
              Chúng tôi tin vào điều gì
            </h2>
            <p className="text-n-600 leading-[1.6]">
              Ba giá trị này không phải khẩu hiệu — chúng là cách chúng tôi tuyển người, đánh giá công việc và ra quyết định mỗi ngày.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {VALUES.map((v) => (
              <div key={v.num} className="why-row">
                <div className="why-row__num">{v.num}</div>
                <div>
                  <div className="why-row__title">{v.title}</div>
                  <div className="why-row__desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="text-center mb-12">
          <Tag variant="brand-soft">QUYỀN LỢI</Tag>
          <h2 className="text-[32px] font-bold mt-3 mb-0 tracking-[-0.01em]">
            Tại sao bạn sẽ thích Stromann
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-white border border-n-200 rounded-r-12 p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center text-2xl mb-3.5">
                {b.icon}
              </div>
              <div className="text-base font-bold text-n-900">{b.title}</div>
              <div className="text-[13px] text-n-600 mt-1.5 leading-[1.55]">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="jobs">
        <div className="sect-head sect-head--row mb-8">
          <div className="flex flex-col gap-3">
            <Tag variant="brand-soft">VỊ TRÍ ĐANG TUYỂN</Tag>
            <h2 className="sect-head__title m-0">{filtered.length} cơ hội đang chờ bạn</h2>
          </div>
          <div className="flex gap-3">
            <JobFilter dept={dept} loc={loc} depts={DEPTS} locs={LOCS} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((j) => (
            <Link
              key={j.id}
              href={`/recruitment/${j.id}`}
              className="card grid grid-cols-[1fr_auto] gap-6 items-center p-6"
            >
              <div>
                <div className="flex gap-2 items-center mb-2 flex-wrap">
                  {j.hot && <Tag variant="brand">🔥 HOT</Tag>}
                  <Tag variant="neutral">{j.dept}</Tag>
                  {j.tags.map((t) => (
                    <Tag key={t} variant="brand-soft">{t}</Tag>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-n-900 mt-1 mb-1.5">{j.title}</h3>
                <p className="text-n-600 text-[13px] leading-[1.55] m-0 max-w-[720px]">{j.summary}</p>
                <div className="flex gap-5 mt-3 text-xs text-n-500 flex-wrap">
                  <span>📍 {j.location}</span>
                  <span>⏰ {j.type}</span>
                  <span>💰 {j.salary}</span>
                  <span>📅 Hạn: {j.deadline}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Btn variant="primary">Ứng tuyển ngay</Btn>
                <span className="text-n-500 text-xs">Xem chi tiết →</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center p-12 text-n-500">
            Không có vị trí phù hợp — gửi CV chủ động đến{" "}
            <a href="mailto:hr@stromann.vn" className="text-accent font-bold">
              hr@stromann.vn
            </a>
          </div>
        )}
      </section>

      <section className="section section--alt">
        <div className="text-center mb-12">
          <Tag variant="brand-soft">QUY TRÌNH</Tag>
          <h2 className="text-[32px] font-bold mt-3 mb-0 tracking-[-0.01em]">
            4 bước để gia nhập Stromann
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4 relative">
          {STEPS.map((s, i, arr) => (
            <div key={s.n} className="relative">
              <div className="bg-white border border-n-200 rounded-r-12 p-6">
                <div
                  className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center font-bold mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.n}
                </div>
                <div className="font-bold text-base text-n-900">{s.t}</div>
                <div className="text-[13px] text-n-600 mt-1 leading-[1.5]">{s.d}</div>
              </div>
              {i < arr.length - 1 && (
                <div className="absolute top-9 -right-4 w-8 h-0.5 bg-n-300 z-[1]" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <h2 className="cta-banner__title">Không thấy vị trí phù hợp?</h2>
          <p className="cta-banner__sub">
            Gửi CV chủ động — chúng tôi luôn mở cửa cho người giỏi.
          </p>
        </div>
        <div className="cta-banner__ctas">
          <Btn variant="white" href="mailto:hr@stromann.vn">Gửi CV: hr@stromann.vn</Btn>
          <Btn variant="dark" href="/contact">Liên hệ HR</Btn>
        </div>
      </section>
    </>
  );
}
