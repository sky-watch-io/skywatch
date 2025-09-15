import type { Metadata } from "next";
import { Audiowide, Noto_Sans, Noto_Sans_Mono, Geist_Mono } from "next/font/google";
import "./globals.css";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-audiowide",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyWatch"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} ${audiowide.variable} antialiased font-sans h-full`}
      >
        {children}
      </body>
    </html>
  );
}
