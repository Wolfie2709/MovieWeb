import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './SearchInput';

const Header = () => {
  return (
    <div suppressHydrationWarning className='w-full flex items-center justify-between px-4 py-2 bg-mainColor text-white'>
      {/* Logo */}
      <Link href="/"><Image src="/tmovie-55621206.png" alt="Logo" width={40} height={40} /> </Link>
      <h1 className='text-xl font-bold text-green-500 items-center p-2'>THE MOVIES</h1>
      {/* Others */}
      <Link href="/Movie"> Movies </Link>
      <SearchInput />
    </div>
  )
}

export default Header;