'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          src="/ascii-art.png"
          alt="Profile Picture"
          width={50}
          height={50}
          className="rounded-full transition-transform hover:scale-105"
        />
      </Link>
      <nav className="flex gap-8">
        <Link 
          href="/portfolio" 
          className={`transition-colors hover:text-gray-900 ${isActive('/portfolio')}`}
        >
          Portfolio
        </Link>
        <a 
          href="https://tannerhornsby.com/blog/index.html" 
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
      </nav>
    </header>
  );
} 