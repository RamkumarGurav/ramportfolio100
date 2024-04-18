import FooterBottom from "@/components/Footer/FooterBottom";
import Navbar from "@/components/Navbar/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-black`}>
      <NextTopLoader color="#ff2424" />
      {/* <Navbar />   */}
      <main>{children}</main>
      <ScrollToTop />
      <FooterBottom />
    </div>
  );
}
