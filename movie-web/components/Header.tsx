"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const links = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/Movie" },
    { name: "TV Series", href: "/TVSeries" },
  ]
  return (
    <header
  className={`fixed inset-x-0 bottom-0 z-50 w-full border-t border-white/10 pb-[env(safe-area-inset-bottom)]
    transition-all duration-500 ease-in-out
    md:bottom-auto md:top-0 md:border-b md:border-t-0 md:pb-0
    ${isAtTop ? "bg-black/85 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none" : "bg-black/85 backdrop-blur-xl"}`}
>
      <div suppressHydrationWarning className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 md:px-8 md:py-8 lg:px-12">
        <Link href="/" className="group flex items-center text-white">
          <Image src="/tmovie-55621206.png" alt="theMovies Logo" width={45} height={45} className="h-8 w-8  md:h-[45px] md:w-[45px]"/>
          <span className="text-sm font-semibold sm:pl-2 text-white transition-colors duration-200 group-hover:text-red-500 md:text-4xl md:ml-3 sm:text-lg ">
            theMovies
          </span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
            className="relative text-sm font-semibold transition-colors duration-200 hover:text-red-500 md:text-2xl"
          >
            <span
              className={`after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-red-500 after:transition-transform after:duration-200 after:content-[''] ${pathname === "/" ? "after:scale-x-100 hover:after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 text-white/90"
                }`}
            >
              Home
            </span>
          </Link>

          <Link
            href="/Movie"
            className="relative text-sm font-semibold transition-colors duration-200 hover:text-red-500 md:text-2xl"
          >
            <span
              className={`after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-red-500 after:transition-transform after:duration-200 after:content-[''] ${pathname === "/Movie" ? "after:scale-x-100  hover:after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 text-white/90"
                }`}
            >
              Movies
            </span>
          </Link>

          <Link
            href="/TVSeries"
            className="relative text-sm font-semibold transition-colors duration-200 hover:text-red-500 md:text-2xl"
          >
            <span
              className={`after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-red-500 after:transition-transform after:duration-200 after:content-[''] ${pathname === "/TVSeries" ? "after:scale-x-100  hover:after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 text-white/90"
                }`}
            >
              TV Series
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;