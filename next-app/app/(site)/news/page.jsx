import Link from "next/link";
import { Tag, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { NEWS } from "@/lib/data";

export const metadata = { title: "Tin tức — Stromann Việt Nam" };

export default function NewsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Tin tức" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" style={{ alignSelf: "flex-start" }}>NEWSROOM</Tag>
        <h1>Tin tức & Kiến thức kỹ thuật</h1>
        <p>Cập nhật sản phẩm mới, kiến thức về phụ gia và case study thực tế từ ngành sơn, mực in và nhựa.</p>
      </div>

      <div style={{ padding: "0 80px" }}>
        <div className="toolbar">
          <div className="toolbar__chips">
            {["Tất cả", "Kiến thức kỹ thuật", "Sản phẩm", "Sự kiện", "Công ty"].map((c, i) => (
              <button key={c} className={`chip${i === 0 ? " active" : ""}`}>{c}</button>
            ))}
          </div>
          <input className="input" placeholder="Tìm kiếm bài viết..." style={{ width: 260 }} />
        </div>
      </div>

      <div className="news-listing-grid">
        {NEWS.map(n => (
          <Link key={n.id} className="news-card" href={`/news/${n.id}`}>
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

      <div className="pagination" style={{ paddingBottom: 64 }}>
        {[1,2,3,4,5].map(n => <button key={n} className={`pg${n === 1 ? " active" : ""}`}>{n}</button>)}
        <button className="pg">›</button>
      </div>
    </>
  );
}
