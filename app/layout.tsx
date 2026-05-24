import type { Metadata } from "next";
import { Inter, VT323 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import ScrollAnimator from "@/components/ScrollAnimator";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "UaZit — Classic Troublemaker",
  description:
    "UaZit is a multi-disciplinary artist, musician, and creative visionary. Rock 'n' roll, skateboarding, handmade fashion, and hypnotic stage presence.",
  keywords: ["UaZit", "music", "artist", "stalph", "rock", "skateboarding"],
  openGraph: {
    title: "UaZit",
    description: "Classic troublemaker. Eternal student of transmutation.",
    url: "https://uazit.art",
    siteName: "UaZit",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${vt323.variable}`}>
      <body className={inter.className}>
        <GrainOverlay />
        <Cursor />
        <Nav />
        <ScrollAnimator />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
