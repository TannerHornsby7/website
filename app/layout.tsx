import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Provider from "./provider";
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
  description: "adventure is in front of you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== 'undefined') {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      const header = document.documentElement;
      
      if (currentScroll <= 0) {
        header.style.setProperty('--header-translate', '0');
      }
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.setProperty('--header-translate', '-100%');
      }
      
      if (currentScroll < lastScroll) {
        header.style.setProperty('--header-translate', '0');
      }
      
      lastScroll = currentScroll;
    });
  }

  return (
    <html lang="en">
      <Provider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-tan text-gray-800 p-8 relative overflow-x-hidden`}
      >
        {/* <OptimizationBackground /> */}
        <Header />
        <main className="min-h-screen font-sans text-left max-w-3xl mx-auto relative z-10 px-16">
          {children}
        </main>
      </body>
      </Provider>
    </html>
  );
}
