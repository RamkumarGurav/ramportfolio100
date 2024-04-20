import FooterBottom from "@/components/Footer/FooterBottom";
import Navbar from "@/components/Navbar/Navbar";
import Navbar1 from "@/components/Navbar/Navbar1";
import ScrollToTop from "@/components/ScrollToTop";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-black `}>
      <NextTopLoader color="#ff2424" />
      <Navbar1 />
      <main className={`overflow-hidden`}>{children}</main>
      <ScrollToTop />
      <FooterBottom />
    </div>
  );
}
