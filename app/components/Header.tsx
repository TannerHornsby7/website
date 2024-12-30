'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Darkmode from "./Darkmode";

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? "font-bold" : "";
  };

  return (
    <header className="flex justify-between items-center mb-4 sticky top-0 bg-tan/80 backdrop-blur-sm z-50 py-2">
      <Link href="/">
        <Image
          priority
          src="/ascii-art.webp"
          alt="Profile Picture"
          width={50}
          height={50}
          className="rounded-full transition-transform hover:scale-105"
        />
      </Link>
      <nav className="flex sm:justify-between gap-4 md:gap-8 lg:gap-12">
        <Link 
          href="/portfolio" 
          className={`transition-colors hover:text-gray-900 ${isActive('/portfolio')}`}
        >
          Portfolio
        </Link>
        <a 
          href="https://blog.tannerhornsby.com" 
          className={`transition-colors hover:text-gray-900 ${isActive('/blog')}`}
        >
          Posts
        </a>
        <Link 
          href="/letter" 
          className={`transition-colors hover:text-gray-900 ${isActive('/letter')}`}
        >
          Letter
        </Link>
        <Darkmode />
      </nav>
    </header>
  );
} 