import DashNavbar3 from "@/components/Layout/Backend/Navbar/DashNavbar3";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`overflow-hidden`}>
      <NextTopLoader color="#007bff" />
      <DashNavbar3>{children}</DashNavbar3>
    </div>
  );
}
