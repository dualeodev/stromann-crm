import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { NEWS } from "@/lib/data";

export function generateStaticParams() {
  return NEWS.map(n => ({ id: n.id }));
}

export function generateMetadata({ params }) {
  const n = NEWS.find(x => x.id === params.id);
  if (!n) return {};
  return {
    title: `${n.title} — Stromann Việt Nam`,
    description: n.title,
  };
}

export default function NewsDetailPage({ params }) {
  const article = NEWS.find(n => n.id === params.id);
  if (!article) notFound();

  const related = NEWS.filter(n => n.id !== article.id).slice(0, 3);

  return (
    <>
      <Breadcrumb items={[
        { label: "Tin tức", href: "/news" },
        { label: article.title },
      ]} />

      <article style={{ maxWidth: 880, margin: "0 auto", padding: "48px 80px 64px" }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", marginBottom: 32 }}>
          <Tag variant="brand-soft">{article.tag}</Tag>
          <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em", margin: 0, color: "var(--n-900)" }}>
            {article.title}
          </h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 13, color: "var(--n-500)" }}>
            <span>📅 {article.date}</span>
            <span>•</span>
            <span>⏱ {article.read}</span>
            <span>•</span>
            <span>✍ Tech Team</span>
          </div>
        </header>

        <div style={{ height: 420, borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
          <IndustryImage label={article.tag.toLowerCase()} />
        </div>

        <div style={{ fontSize: 16, lineHeight: 1.75, color: "var(--n-700)" }}>
          <p style={{ fontSize: 18, color: "var(--n-800)", lineHeight: 1.6, marginTop: 0 }}>
            {article.title}. Bài viết tổng hợp từ kinh nghiệm thực tế của đội kỹ sư Stromann cùng tài liệu kỹ thuật từ MÜNZING (Đức) — giúp bạn nắm bắt nhanh các điểm cốt lõi và áp dụng được vào công thức sản xuất của mình.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--n-900)", marginTop: 40, marginBottom: 12 }}>1. Bối cảnh</h2>
          <p>
            Trong sản xuất công nghiệp hiện đại, việc lựa chọn phụ gia phù hợp đóng vai trò quyết định đến chất lượng cuối cùng của sản phẩm. Mỗi hệ sản xuất — từ sơn nước hệ acrylic, mực in flexo gốc nước, đến nhựa masterbatch — đều có những yêu cầu kỹ thuật riêng biệt cần được đáp ứng.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--n-900)", marginTop: 40, marginBottom: 12 }}>2. Phân tích kỹ thuật</h2>
          <p>
            Stromann phân phối các phụ gia chuyên dụng từ MÜNZING với hơn 180 năm kinh nghiệm trong ngành hóa chất công nghiệp. Việc kết hợp đúng dòng sản phẩm với đúng vấn đề kỹ thuật giúp tối ưu công thức và giảm chi phí sản xuất đáng kể.
          </p>

          <blockquote style={{ margin: "32px 0", padding: "16px 20px", background: "var(--brand-50)", borderLeft: "3px solid var(--accent)", borderRadius: 8, fontSize: 15, color: "var(--n-800)" }}>
            💡 <b>Mẹo từ chuyên gia:</b> Luôn test ở 2 mức liều — khuyến nghị và 1.5× — để xác định "vùng an toàn" của công thức.
          </blockquote>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--n-900)", marginTop: 40, marginBottom: 12 }}>3. Khuyến nghị áp dụng</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 1.9 }}>
            <li>Xác định rõ hệ sản xuất và loại pigment đang sử dụng</li>
            <li>Test mẫu nhỏ trước khi áp dụng cho lô lớn</li>
            <li>Lưu chứng từ COA / MSDS đầy đủ cho từng lô hàng</li>
            <li>Liên hệ đội kỹ sư Stromann nếu gặp vấn đề ngoài tầm xử lý nội bộ</li>
          </ul>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--n-900)", marginTop: 40, marginBottom: 12 }}>Kết luận</h2>
          <p>
            Việc lựa chọn phụ gia đúng không chỉ là quyết định kỹ thuật mà còn là quyết định kinh doanh — ảnh hưởng trực tiếp đến chất lượng sản phẩm, hiệu suất sản xuất và sự hài lòng của khách hàng cuối. Đội ngũ Stromann luôn sẵn sàng đồng hành cùng bạn từ R&D đến sản xuất quy mô lớn.
          </p>

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--n-200)", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--n-500)", fontWeight: 600, marginRight: 4 }}>Tags:</span>
            <Tag variant="neutral">#stromann</Tag>
            <Tag variant="neutral">#munzing</Tag>
            <Tag variant="neutral">#{article.tag.toLowerCase().replace(/\s+/g, "-")}</Tag>
          </div>
        </div>

        <aside style={{ marginTop: 48, padding: 32, background: "var(--n-900)", color: "#fff", borderRadius: 16 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Cần tư vấn sâu hơn về chủ đề này?</h3>
          <p style={{ margin: "8px 0 0", color: "var(--n-400)", fontSize: 14, lineHeight: 1.6 }}>
            Đội kỹ sư Stromann sẵn sàng hỗ trợ bạn — phản hồi trong 4h làm việc.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <Btn variant="primary" href="/contact">Tư vấn kỹ thuật →</Btn>
            <Btn variant="white" href="/quote">Yêu cầu báo giá</Btn>
          </div>
        </aside>
      </article>

      <section className="section section--alt">
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 32px", letterSpacing: "-0.01em" }}>Bài viết liên quan</h2>
        <div className="news-grid">
          {related.map(n => (
            <Link key={n.id} href={`/news/${n.id}`} className="news-card">
              <div className="news-card__media"><IndustryImage label={n.tag.toLowerCase()} /></div>
              <div className="news-card__body">
                <Tag variant="brand-soft">{n.tag}</Tag>
                <h3 className="news-card__title">{n.title}</h3>
                <div className="news-card__meta" style={{ marginTop: "auto" }}>
                  <span>{n.date}</span><span>•</span><span>{n.read}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
