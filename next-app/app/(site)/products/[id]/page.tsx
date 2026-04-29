import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
