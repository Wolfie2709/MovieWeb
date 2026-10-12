import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './SearchInput';

const Header = () => {
  return (
    <header>
    <div suppressHydrationWarning className='w-full sticky top-0 z-50 border-b border-white/10 bg-mainColor text-white backdrop-blur'>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/">
          <Image src="/tmovie-55621206.png" alt="Logo" width={40} height={40} /> 
          <span className='text-xl font-bold text-green-500 items-center p-2'>THE MOVIES</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase md:flex">
          <Link href="/"> Home </Link>
          <Link href="/Movie"> Movies </Link>
          <Link href="/TVSeries"> TV Series </Link>
        </nav>
        <div className= "w-full md:w-auto md:min-w-[280px] lg:min-w-[340px]">
          <SearchInput />
        </div>
      </div>
    </div>
    </header>
  )
}

export default Header;