import React from 'react'
import Link from 'next/link';

const Footer = () => {
    return (
        <footer
            className="relative overflow-hidden border-t border-white/10 bg-black"
            style={{
                backgroundImage: "url('/footer-bg-e4b3ddb4.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.78)_60%,rgba(0,0,0,0.95))]" />

            <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 py-10 md:px-8 lg:px-12">
                <div className="mb-8 flex items-center justify-center md:justify-start">
                    <Link href="/" className="group inline-flex items-center gap-3 text-white">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7CCB5A] shadow-[0_0_22px_rgba(124,203,90,0.6)] md:h-12 md:w-12">
                            <span className="ml-1 h-0 w-0 border-y-[6px] border-l-[11px] border-y-transparent border-l-white md:border-y-[7px] md:border-l-[12px]" />
                        </span>
                        <span className="text-3xl items-center justify-center font-semibold tracking-[-0.08em] transition-colors duration-200 group-hover:text-red-500 md:text-5xl">
                            theMovies
                        </span>
                    </Link>
                </div>

                <div className="grid gap-4 text-center text-lg font-black uppercase tracking-[-0.05em] text-white/90 sm:grid-cols-3 lg:grid-cols-3 xl:text-2xl">
                    <Link href="/" className="transition-all duration-200 hover:text-red-500">Home</Link>
                    <Link href="/Movie" className="transition-all duration-200 hover:text-red-500">Movies</Link>
                    <Link href="/TVSeries" className="transition-all duration-200 hover:text-red-500">TV Series</Link>
                    <Link href="#" className="transition-all duration-200 hover:text-red-500">Contact us</Link>
                    <Link href="#" className="transition-all duration-200 hover:text-red-500">Terms of services</Link>
                    <Link href="#" className="transition-all duration-200 hover:text-red-500">About us</Link>
                    <Link href="#" className="transition-all duration-200 hover:text-red-500">Premium</Link>
                    <Link href="#" className="transition-all duration-200 hover:text-red-500">Privacy policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
