import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSidebar from "@/components/FloatingSidebar";
import { Btn } from "@/components/ui";
import { getMegaMenuData } from "@/lib/catalog";

const EXPLORE = [
  { label: "Sản phẩm Defoamer", href: "/products?i=son" },
  { label: "Sản phẩm Dispersant", href: "/products?i=muc-in" },
  { label: "Hỗ trợ kỹ thuật", href: "/contact" },
  { label: "Tin tức kỹ thuật", href: "/news" },
];

export default async function NotFound() {
  const mega = await getMegaMenuData();
  return (
    <>
      <Header mega={mega} />
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-3xl flex flex-col items-center text-center">
          <div className="text-[160px] leading-none font-extrabold text-accent tracking-tight max-md:text-[110px]">
            404
          </div>
          <h1 className="mt-6 text-[28px] font-bold text-n-900 max-md:text-[22px]">
            Không tìm thấy trang
          </h1>
          <p className="mt-3 text-[15px] text-n-600 max-w-xl">
            Liên kết bạn đang truy cập có thể đã được di chuyển hoặc không còn tồn tại. Bạn có thể quay về trang chủ hoặc tra cứu sản phẩm.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Btn variant="primary" href="/">Về trang chủ</Btn>
            <Btn variant="secondary" href="/products">Khám phá sản phẩm</Btn>
            <Btn variant="dark" href="/contact">Liên hệ Stromann</Btn>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-3 justify-center">
            <span className="text-[13px] font-bold text-n-700">Hoặc khám phá:</span>
            {EXPLORE.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="px-4 py-2 rounded-full border border-n-200 text-[13px] text-n-700 bg-white hover:border-n-900 hover:text-n-900 transition-colors"
              >
                {e.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <FloatingSidebar />
      <Footer />
    </>
  );
}
