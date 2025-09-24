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
  title: "SkyWatch",
  description: `A modern web analytics platform that helps you understand your visitors with real-time insights, 
    session replays, error tracking, performance metrics, and user behavior analysis`,
  other: {
    "format-detection": "telephone=no,email=no"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="apple-mobile-web-app-title" content="SkyWatch" />
        <meta
          name="theme-color"
          content="#ff9fa0"
          media="(prefers-color-scheme: light)" />
        <meta
          name="theme-color"
          content="#db924c"
          media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} ${audiowide.variable} antialiased font-sans h-full`}
      >
        {children}
      </body>
    </html>
  );
}
