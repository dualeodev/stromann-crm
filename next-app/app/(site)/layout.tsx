import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSidebar from "@/components/FloatingSidebar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FloatingSidebar />
      <Footer />
    </>
  );
}
