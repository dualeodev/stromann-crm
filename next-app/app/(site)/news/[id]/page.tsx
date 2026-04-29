import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { NEWS } from "@/lib/data";

export function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const n = NEWS.find((x) => x.id === params.id);
  if (!n) return {};
  return {
    title: `${n.title} — Stromann Việt Nam`,
    description: n.title,
  };
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = NEWS.find((n) => n.id === params.id);
  if (!article) notFound();

  const related = NEWS.filter((n) => n.id !== article.id).slice(0, 3);

  const headingCls = "text-2xl font-bold text-n-900 mt-10 mb-3";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Tin tức", href: "/news" },
          { label: article.title },
        ]}
      />

      <article className="max-w-[880px] mx-auto px-20 pt-12 pb-16">
        <header className="flex flex-col gap-4 items-start mb-8">
          <Tag variant="brand-soft">{article.tag}</Tag>
          <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.015em] m-0 text-n-900">
            {article.title}
          </h1>
          <div className="flex gap-3 items-center text-[13px] text-n-500">
            <span>📅 {article.date}</span>
            <span>•</span>
            <span>⏱ {article.read}</span>
            <span>•</span>
            <span>✍ Tech Team</span>
          </div>
        </header>

        <div className="h-[420px] rounded-r-16 overflow-hidden mb-8">
          <IndustryImage label={article.tag.toLowerCase()} />
        </div>

        <div className="text-base leading-[1.75] text-n-700">
          <p className="text-lg text-n-800 leading-[1.6] mt-0">
            {article.title}. Bài viết tổng hợp từ kinh nghiệm thực tế của đội kỹ sư Stromann cùng tài liệu kỹ thuật từ MÜNZING (Đức) — giúp bạn nắm bắt nhanh các điểm cốt lõi và áp dụng được vào công thức sản xuất của mình.
          </p>

          <h2 className={headingCls}>1. Bối cảnh</h2>
          <p>
            Trong sản xuất công nghiệp hiện đại, việc lựa chọn phụ gia phù hợp đóng vai trò quyết định đến chất lượng cuối cùng của sản phẩm. Mỗi hệ sản xuất — từ sơn nước hệ acrylic, mực in flexo gốc nước, đến nhựa masterbatch — đều có những yêu cầu kỹ thuật riêng biệt cần được đáp ứng.
          </p>

          <h2 className={headingCls}>2. Phân tích kỹ thuật</h2>
          <p>
            Stromann phân phối các phụ gia chuyên dụng từ MÜNZING với hơn 180 năm kinh nghiệm trong ngành hóa chất công nghiệp. Việc kết hợp đúng dòng sản phẩm với đúng vấn đề kỹ thuật giúp tối ưu công thức và giảm chi phí sản xuất đáng kể.
          </p>

          <blockquote className="my-8 px-5 py-4 bg-brand-50 border-l-[3px] border-accent rounded-lg text-[15px] text-n-800">
            💡 <b>Mẹo từ chuyên gia:</b> Luôn test ở 2 mức liều — khuyến nghị và 1.5× — để xác định
            “vùng an toàn” của công thức.
          </blockquote>

          <h2 className={headingCls}>3. Khuyến nghị áp dụng</h2>
          <ul className="pl-6 leading-[1.9]">
            <li>Xác định rõ hệ sản xuất và loại pigment đang sử dụng</li>
            <li>Test mẫu nhỏ trước khi áp dụng cho lô lớn</li>
            <li>Lưu chứng từ COA / MSDS đầy đủ cho từng lô hàng</li>
            <li>Liên hệ đội kỹ sư Stromann nếu gặp vấn đề ngoài tầm xử lý nội bộ</li>
          </ul>

          <h2 className={headingCls}>Kết luận</h2>
          <p>
            Việc lựa chọn phụ gia đúng không chỉ là quyết định kỹ thuật mà còn là quyết định kinh doanh — ảnh hưởng trực tiếp đến chất lượng sản phẩm, hiệu suất sản xuất và sự hài lòng của khách hàng cuối. Đội ngũ Stromann luôn sẵn sàng đồng hành cùng bạn từ R&amp;D đến sản xuất quy mô lớn.
          </p>

          <div className="mt-10 pt-6 border-t border-n-200 flex gap-2 items-center flex-wrap">
            <span className="text-[13px] text-n-500 font-semibold mr-1">Tags:</span>
            <Tag variant="neutral">#stromann</Tag>
            <Tag variant="neutral">#munzing</Tag>
            <Tag variant="neutral">#{article.tag.toLowerCase().replace(/\s+/g, "-")}</Tag>
          </div>
        </div>

        <aside className="mt-12 p-8 bg-n-900 text-white rounded-r-16">
          <h3 className="m-0 text-[22px] font-bold">Cần tư vấn sâu hơn về chủ đề này?</h3>
          <p className="mt-2 text-n-400 text-sm leading-[1.6]">
            Đội kỹ sư Stromann sẵn sàng hỗ trợ bạn — phản hồi trong 4h làm việc.
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Btn variant="primary" href="/contact">Tư vấn kỹ thuật →</Btn>
            <Btn variant="white" href="/quote">Yêu cầu báo giá</Btn>
          </div>
        </aside>
      </article>

      <section className="section section--alt">
        <h2 className="text-[28px] font-bold m-0 mb-8 tracking-[-0.01em]">Bài viết liên quan</h2>
        <div className="news-grid">
          {related.map((n) => (
            <Link key={n.id} href={`/news/${n.id}`} className="news-card">
              <div className="news-card__media">
                <IndustryImage label={n.tag.toLowerCase()} />
              </div>
              <div className="news-card__body">
                <Tag variant="brand-soft">{n.tag}</Tag>
                <h3 className="news-card__title">{n.title}</h3>
                <div className="news-card__meta mt-auto">
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
