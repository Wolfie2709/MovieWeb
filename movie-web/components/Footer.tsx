import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-[#191919] px-8 py-12 md:px-16">
            <div className="max-w-4xl h-full mx-auto flex flex-col justify-around">
                <Link href="/" className="flex items-center gap-2 mb-6 group">
                    <Image src="/tmovie-55621206.png" alt="Logo" width={40} height={40} />
                    <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">theMovies</h1>
                </Link>
                <div className="flex flex-wrap items-start justify-between gap-3 text-base font-semibold text-white md:text-xl">
                    <Link className="footer-item" href="/">Home</Link>
                    <Link className="footer-item" href="/Movie">Movies</Link>
                    <Link className="footer-item" href="/TVSeries">TV Series</Link>
                    <Link className="footer-item" href="#">Contact</Link>
                    <Link className="footer-item" href="#">About</Link>
                    <Link className="footer-item" href="#">Terms of Service</Link>
                    <Link className="footer-item" href="#">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
