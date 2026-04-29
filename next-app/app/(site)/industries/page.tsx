import type { Metadata } from "next";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import {
  countProductsPerIndustry,
  listProductIndustries,
  listTechnicalIssues,
  type ProductIndustryRow,
  type TechIssueRow,
} from "@/lib/catalog";

export const metadata: Metadata = { title: "Ngành ứng dụng — Stromann Việt Nam" };

function IndContent({
  ind,
  techs,
  productCount,
}: {
  ind: ProductIndustryRow;
  techs: TechIssueRow[];
  productCount: number;
}) {
  return (
    <div>
      <Tag variant="brand-soft">{ind.code ?? "INDUSTRY"}</Tag>
      <h2 className="text-[32px] font-bold m-0 my-3 tracking-[-0.01em]">{ind.name}</h2>
      <p className="text-n-600 leading-[1.6] mb-6">
        {ind.overview_description ?? ind.short_description ?? ""}
      </p>
      {techs.length > 0 && (
        <>
          <h4 className="mb-4">Vấn đề Stromann có thể giải quyết:</h4>
          <div className="problem-grid">
            {techs.map((t, i) => (
              <div key={t.id} className="problem-card">
                <div className="problem-card__num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="problem-card__title">{t.name}</div>
                  {t.description && <div className="problem-card__desc">{t.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="mt-6 flex gap-3 items-center">
        <Btn variant="primary" href={`/products?i=${ind.slug}`}>
          Xem {productCount} sản phẩm cho ngành này →
        </Btn>
      </div>
    </div>
  );
}

export default async function IndustriesPage() {
  const [industries, techs, counts] = await Promise.all([
    listProductIndustries({ enabledOnly: true }),
    listTechnicalIssues({ enabledOnly: true }),
    countProductsPerIndustry(),
  ]);

  return (
    <>
      <Breadcrumb items={[{ label: "Ngành ứng dụng" }]} />

      <div className="ind-hero">
        <div>
          <Tag>NGÀNH ỨNG DỤNG</Tag>
          <h1 className="mt-4">
            Giải pháp phụ gia cho<br />ngành công nghiệp
          </h1>
          <p className="text-n-300 text-base leading-[1.6] mt-4 max-w-[540px]">
            Mỗi ngành có những thách thức kỹ thuật riêng — từ kiểm soát bọt khí trong sơn nước đến tối ưu phân tán pigment trong masterbatch. Stromann có giải pháp chuyên biệt cho từng nhu cầu.
          </p>
        </div>
        <div className="ind-hero__media">
          <IndustryImage label={`industries · ${industries.length} ngành`} dark />
        </div>
      </div>

      {industries.map((ind, i) => {
        const altRow = i % 2 === 1;
        const gridCols = altRow ? "grid-cols-[1.2fr_1fr]" : "grid-cols-[1fr_1.2fr]";
        const photo = (
          <div className="h-[360px] rounded-r-16 overflow-hidden">
            <IndustryImage label={ind.name} />
          </div>
        );
        return (
          <section key={ind.id} className={`section${altRow ? " section--alt" : ""}`}>
            <div className={`grid ${gridCols} gap-12 items-center`}>
              {altRow ? (
                <>
                  <IndContent ind={ind} techs={techs} productCount={counts[ind.id] ?? 0} />
                  {photo}
                </>
              ) : (
                <>
                  {photo}
                  <IndContent ind={ind} techs={techs} productCount={counts[ind.id] ?? 0} />
                </>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
