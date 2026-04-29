import { PRODUCTS } from "@/lib/data";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }));
}

export default function ProductDetailPage({ params }) {
  const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0];
  return <ProductDetail product={product} />;
}
