import FooterBottom from "@/components/Footer/FooterBottom";
import DashNavbar2 from "@/components/Navbar/DashNavbar2";
import Navbar from "@/components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`overflow-hidden`}>
      <NextTopLoader color="#007bff" />
      <DashNavbar2>{children}</DashNavbar2>
    </div>
  );
}
