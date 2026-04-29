import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { INDUSTRIES } from "@/lib/data";

export const metadata = { title: "Ngành ứng dụng — Stromann Việt Nam" };

function IndContent({ ind }) {
  const problems = [
    { num: "01", title: "Bọt khí trong khâu phối trộn", desc: "Kiểm soát bọt vi mô và bọt thô ở cả khâu sản xuất lẫn thi công." },
    { num: "02", title: "Phân tán pigment kém", desc: "Cải thiện ổn định của hệ huyền phù, giảm sa lắng theo thời gian." },
    { num: "03", title: "Bề mặt và độ trải", desc: "Wetting agent giúp lan tỏa đều, không gây hiệu ứng cratering." },
    { num: "04", title: "Độ nhớt và rheology", desc: "Tối ưu profile lưu biến cho gia công và lưu trữ." },
  ];
  return (
    <div>
      <Tag variant="brand-soft">{ind.id === "coatings" ? "COATINGS" : ind.id === "ink" ? "PRINTING INKS" : "PLASTICS"}</Tag>
      <h2 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0", letterSpacing: "-0.01em" }}>{ind.title}</h2>
      <p style={{ color: "var(--n-600)", lineHeight: 1.6, marginBottom: 24 }}>{ind.desc}</p>
      <h4 style={{ marginBottom: 16 }}>Vấn đề Stromann có thể giải quyết:</h4>
      <div className="problem-grid">
        {problems.map(p => (
          <div key={p.num} className="problem-card">
            <div className="problem-card__num">{p.num}</div>
            <div>
              <div className="problem-card__title">{p.title}</div>
              <div className="problem-card__desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Btn variant="primary" style={{ marginTop: 24 }} href="/products">Xem sản phẩm cho ngành này →</Btn>
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
          <h1 style={{ marginTop: 16 }}>Giải pháp phụ gia cho<br/>3 ngành công nghiệp</h1>
          <p style={{ color: "var(--n-300)", fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 540 }}>
            Mỗi ngành có những thách thức kỹ thuật riêng — từ kiểm soát bọt khí trong sơn nước đến tối ưu phân tán pigment trong masterbatch. Stromann có giải pháp chuyên biệt cho từng nhu cầu.
          </p>
        </div>
        <div className="ind-hero__media"><IndustryImage label="industries · 3 ngành" dark /></div>
      </div>

      {INDUSTRIES.map((ind, i) => (
        <section key={ind.id} className={`section${i % 2 === 1 ? " section--alt" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 48, alignItems: "center" }}>
            {i % 2 === 0 ? (
              <>
                <div style={{ height: 360, borderRadius: 16, overflow: "hidden" }}><IndustryImage label={ind.title} /></div>
                <IndContent ind={ind} />
              </>
            ) : (
              <>
                <IndContent ind={ind} />
                <div style={{ height: 360, borderRadius: 16, overflow: "hidden" }}><IndustryImage label={ind.title} /></div>
              </>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
