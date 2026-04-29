import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSidebar from "@/components/FloatingSidebar";
import { getMegaMenuData } from "@/lib/catalog";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const mega = await getMegaMenuData();
  return (
    <>
      <Header mega={mega} />
      <main>{children}</main>
      <FloatingSidebar />
      <Footer />
    </>
  );
}
