import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./bootstrap.css";
import "./custom.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollTriggerRefresh from "@/components/layout/ScrollTriggerRefresh";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "VAPS GROUP - Advanced E-learning Solutions",
  description: "VAPS advanced e-learning enables educational institutions (Schools, College, Universities, Autonomous Colleges) teach smarter, better and deliver quality classes to their students.",
  keywords: "VAPS, education ERP, e-learning, school management, college management, university management, digital campus, NEP platform",
  authors: [{ name: "VAPS Technosoft" }],
  openGraph: {
    title: "VAPS GROUP - Advanced E-learning Solutions",
    description: "25 Years of Powering Educational Excellence",
    type: "website",
    locale: "en_IN",
    siteName: "VAPS GROUP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${raleway.variable} font-poppins antialiased`}
      >
        <ScrollTriggerRefresh />
        <CustomCursor />
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
