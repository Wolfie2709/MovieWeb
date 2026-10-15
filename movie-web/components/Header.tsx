"use client"
import React from 'react'
import Link from 'next/link';
import {usePathname} from "next/navigation";
import {useState, useEffect} from "react";
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
  className={`fixed left-0 top-0 z-50 w-full  transition-all duration-500 ease-in-out ${
    isAtTop ? "bg-transparent" : " backdrop-blur-xl bg-black/85"
  }`}
>
      <div suppressHydrationWarning className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-8 md:px-8 lg:px-12">
<Link href="/" className="group flex items-center text-white">
  <Image src="/tmovie-55621206.png" alt="theMovies Logo" width={45} height={45} />
  <span className="text-2xl font-semibold text-white transition-colors duration-200 group-hover:text-red-500 md:text-4xl md:ml-3">
    theMovies
  </span>
</Link>

      <nav className="flex items-center gap-6 md:gap-10">
      <Link
        href="/"
        className="relative text-lg font-semibold transition-colors duration-200 hover:text-red-500 md:text-2xl"
      >
        <span
          className={`after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-red-500 after:transition-transform after:duration-200 after:content-[''] ${
            pathname === "/" ? "after:scale-x-100 hover:after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 text-white/90"
          }`}
        >
          Home
        </span>
      </Link>

      <Link
        href="/Movie"
        className="relative text-lg font-semibold transition-colors duration-200 hover:text-red-500 md:text-2xl"
      >
        <span
          className={`after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-red-500 after:transition-transform after:duration-200 after:content-[''] ${
            pathname === "/Movie" ? "after:scale-x-100  hover:after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 text-white/90"
          }`}
        >
          Movies
        </span>
      </Link>

      <Link
        href="/TVSeries"
        className="relative text-lg font-semibold transition-colors duration-200 hover:text-red-500 md:text-2xl"
      >
        <span
          className={`after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-red-500 after:transition-transform after:duration-200 after:content-[''] ${
            pathname === "/TVSeries" ? "after:scale-x-100  hover:after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 text-white/90"
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