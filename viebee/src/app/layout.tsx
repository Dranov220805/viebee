import type { Metadata } from "next";
import Providers from "./providers";
import "@/public/css/globals.css";
import MainHeader from "@/src/layouts/MainHeader";
import MainFooter from "@/src/layouts/MainFooter";

export const metadata: Metadata = {
  title: "VieBee — Mapping Living Heritage, Empowering Communities",
  description:
    "Discover Vietnam beyond the guidebooks. P2P experiential travel platform connecting international travelers directly with grassroots local hosts via GIS Cultural Map and AI Cultural Copilot.",
  keywords: [
    "VieBee",
    "Living Heritage",
    "Vietnam Cultural Workshops",
    "Chè Bưởi Cooking",
    "Bamboo Weaving",
    "GIS Cultural Map",
    "LangChain RAG Copilot",
    "UII Sandbox 2026",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-[#fdfbf7] antialiased">
        <Providers>
          <MainHeader />
          <main className="flex-1">{children}</main>
          <MainFooter />
        </Providers>
      </body>
    </html>
  );
}
