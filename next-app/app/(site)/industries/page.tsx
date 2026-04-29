import type { Metadata } from "next";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { INDUSTRIES } from "@/lib/data";
import type { Industry } from "@/lib/types";

export const metadata: Metadata = { title: "Ngành ứng dụng — Stromann Việt Nam" };

const PROBLEMS: Array<{ num: string; title: string; desc: string }> = [
  { num: "01", title: "Bọt khí trong khâu phối trộn", desc: "Kiểm soát bọt vi mô và bọt thô ở cả khâu sản xuất lẫn thi công." },
  { num: "02", title: "Phân tán pigment kém",          desc: "Cải thiện ổn định của hệ huyền phù, giảm sa lắng theo thời gian." },
  { num: "03", title: "Bề mặt và độ trải",             desc: "Wetting agent giúp lan tỏa đều, không gây hiệu ứng cratering." },
  { num: "04", title: "Độ nhớt và rheology",           desc: "Tối ưu profile lưu biến cho gia công và lưu trữ." },
];

function categoryLabel(id: string) {
  if (id === "coatings") return "COATINGS";
  if (id === "ink") return "PRINTING INKS";
  return "PLASTICS";
}

function IndContent({ ind }: { ind: Industry }) {
  return (
    <div>
      <Tag variant="brand-soft">{categoryLabel(ind.id)}</Tag>
      <h2 className="text-[32px] font-bold m-0 my-3 tracking-[-0.01em]">{ind.title}</h2>
      <p className="text-n-600 leading-[1.6] mb-6">{ind.desc}</p>
      <h4 className="mb-4">Vấn đề Stromann có thể giải quyết:</h4>
      <div className="problem-grid">
        {PROBLEMS.map((p) => (
          <div key={p.num} className="problem-card">
            <div className="problem-card__num">{p.num}</div>
            <div>
              <div className="problem-card__title">{p.title}</div>
              <div className="problem-card__desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Btn variant="primary" className="mt-6" href="/products">
        Xem sản phẩm cho ngành này →
      </Btn>
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Ngành ứng dụng" }]} />

      <div className="ind-hero">
        <div>
          <Tag>NGÀNH ỨNG DỤNG</Tag>
          <h1 className="mt-4">
            Giải pháp phụ gia cho<br />3 ngành công nghiệp
          </h1>
          <p className="text-n-300 text-base leading-[1.6] mt-4 max-w-[540px]">
            Mỗi ngành có những thách thức kỹ thuật riêng — từ kiểm soát bọt khí trong sơn nước đến tối ưu phân tán pigment trong masterbatch. Stromann có giải pháp chuyên biệt cho từng nhu cầu.
          </p>
        </div>
        <div className="ind-hero__media">
          <IndustryImage label="industries · 3 ngành" dark />
        </div>
      </div>

      {INDUSTRIES.map((ind, i) => {
        const altRow = i % 2 === 1;
        const gridCols = altRow ? "grid-cols-[1.2fr_1fr]" : "grid-cols-[1fr_1.2fr]";
        const photo = (
          <div className="h-[360px] rounded-r-16 overflow-hidden">
            <IndustryImage label={ind.title} />
          </div>
        );
        return (
          <section key={ind.id} className={`section${altRow ? " section--alt" : ""}`}>
            <div className={`grid ${gridCols} gap-12 items-center`}>
              {altRow ? (
                <>
                  <IndContent ind={ind} />
                  {photo}
                </>
              ) : (
                <>
                  {photo}
                  <IndContent ind={ind} />
                </>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
