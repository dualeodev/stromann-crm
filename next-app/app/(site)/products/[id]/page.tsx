import { notFound } from "next/navigation";
import { getProductWithRelationsBySlug, listProducts } from "@/lib/catalog";
import ProductDetail from "./ProductDetail";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductWithRelationsBySlug(params.id);
  if (!product) notFound();

  // Related: same first category, exclude self.
  const firstCategoryId = product.categories[0]?.id;
  let related = [] as Awaited<ReturnType<typeof listProducts>>["rows"];
  if (firstCategoryId) {
    const { rows } = await listProducts({
      publishedOnly: true,
      categorySlugs: [product.categories[0].slug],
      pageSize: 5,
    });
    related = rows.filter((r) => r.id !== product.id).slice(0, 4);
  }

  return <ProductDetail product={product} related={related} />;
}
