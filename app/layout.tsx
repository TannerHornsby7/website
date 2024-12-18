import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import OptimizationBackground from "./components/OptimizationBackground";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tanner Hornsby",
  description: "the website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-tan text-gray-800 p-8 relative overflow-x-hidden`}
      >
        <OptimizationBackground />
        <Header />
        <main className="min-h-screen font-sans text-left max-w-3xl mx-auto relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
