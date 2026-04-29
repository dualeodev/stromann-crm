import type { Metadata } from "next";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { TIMELINE, STATS } from "@/lib/data";

export const metadata: Metadata = { title: "Giới thiệu — Stromann Việt Nam" };

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Giới thiệu" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" className="self-start">VỀ CHÚNG TÔI</Tag>
        <h1>Stromann Việt Nam — đối tác phụ gia bạn có thể tin cậy</h1>
        <p>
          Hơn 10 năm đồng hành cùng các nhà sản xuất sơn, mực in và nhựa hàng đầu Việt Nam, mang đến
          giải pháp phụ gia chất lượng cao từ MÜNZING (Đức).
        </p>
      </div>

      <section className="section">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[32px] font-bold leading-[1.2] m-0 tracking-[-0.01em]">
              Sứ mệnh: nâng tầm chất lượng sản xuất công nghiệp Việt Nam
            </h2>
            <p className="text-n-600 leading-[1.7] mt-5">
              Stromann tin rằng các nhà sản xuất tại Việt Nam xứng đáng được tiếp cận với những phụ gia chuyên dụng và dịch vụ kỹ thuật ở tiêu chuẩn quốc tế. Chúng tôi không chỉ bán sản phẩm — chúng tôi đồng hành cùng khách hàng từ R&amp;D đến sản xuất quy mô lớn.
            </p>
            <p className="text-n-600 leading-[1.7]">
              Phòng lab kỹ thuật riêng tại TP.HCM cho phép chúng tôi thử nghiệm công thức cùng khách hàng, đề xuất phụ gia phù hợp và tối ưu chi phí mà không phải gửi mẫu ra nước ngoài.
            </p>
          </div>
          <div className="h-[400px] rounded-r-16 overflow-hidden">
            <IndustryImage label="company photo" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="stat-grid">
          {STATS.map((s) => (
            <div key={s.lbl} className="stat-card">
              <div className="stat-card__num">{s.num}</div>
              <div className="stat-card__lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <Tag variant="brand-soft">HÀNH TRÌNH</Tag>
            <h2 className="text-[32px] font-bold leading-[1.2] m-0 mt-3 tracking-[-0.01em]">
              Cột mốc của chúng tôi
            </h2>
            <p className="text-n-600 mt-4 leading-[1.6]">
              Từ một nhà phân phối nhỏ tại TP.HCM đến đối tác chính thức của MÜNZING (Đức) với mạng lưới khách hàng B2B trên toàn quốc.
            </p>
          </div>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div key={t.year} className="timeline__item">
                <span className="timeline__dot"></span>
                <div>
                  <div className="timeline__year">{t.year}</div>
                  <div className="timeline__title">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="h-[320px] rounded-r-16 overflow-hidden">
            <IndustryImage label="MÜNZING factory · Germany" />
          </div>
          <div>
            <Tag variant="brand">ĐỐI TÁC CHIẾN LƯỢC</Tag>
            <h2 className="text-[32px] font-bold m-0 my-3 tracking-[-0.01em]">
              MÜNZING — hơn 180 năm chuyên gia phụ gia
            </h2>
            <p className="text-n-600 leading-[1.7]">
              Thành lập 1830 tại Đức, MÜNZING là nhà sản xuất phụ gia hiệu suất cao hàng đầu thế giới. Stromann là đối tác phân phối chính thức tại Việt Nam từ 2016, đảm bảo nguồn gốc và chất lượng từng lô hàng.
            </p>
            <Btn variant="dark" className="mt-4" href="https://munzing.com" target="_blank">
              Tìm hiểu MÜNZING →
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
