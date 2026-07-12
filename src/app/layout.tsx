import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Octo Air — Premium Havacılık Bilgi Platformu",
  description:
    "Uçuş prensipleri, kokpit sistemleri, CRM, emniyet ve vaka analizlerini sade ve derinlikli anlatan Türkçe havacılık bilgi platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <svg width="0" height="0" className="absolute" aria-hidden>
          <defs>
            <clipPath id="airplane-window-clip" clipPathUnits="objectBoundingBox">
              <path d="M0.16,0.035 C0.06,0.035,0.02,0.09,0.015,0.18 C0.005,0.42,0.005,0.58,0.015,0.82 C0.02,0.91,0.06,0.965,0.16,0.965 L0.84,0.965 C0.94,0.965,0.98,0.91,0.985,0.82 C0.995,0.58,0.995,0.42,0.985,0.18 C0.98,0.09,0.94,0.035,0.84,0.035 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
