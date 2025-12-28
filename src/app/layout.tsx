import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TokenRemaing from "../../components/TokenRemaing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillNest AI",
  description: "SkillNest AI analyzes resumes against job descriptions and highlights skill gaps with actionable recommendations.",
  icons: {
    icon: "/favicon.svg",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TokenRemaing />
        {children}
      </body>
    </html>
  );
}
