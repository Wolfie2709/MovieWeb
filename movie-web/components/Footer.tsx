import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'Live' },
  { href: '#', label: 'You must watch' },
  { href: '#', label: 'Contact us' },
  { href: '#', label: 'FAQ' },
   { href: '#', label: 'Recent release' },
  { href: '#', label: 'Terms of services' },
  { href: '#', label: 'Premium' },
   { href: '#', label: 'Top IMDB' },
  { href: '#', label: 'About us' },
  { href: '#', label: 'Privacy policy' },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-black"
      style={{
        backgroundImage: " url('/footer-bg-e4b3ddb4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 py-5 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="mb-10 flex items-center justify-center">
          <Link href="/" className="group inline-flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7CCB5A] shadow-[0_0_22px_rgba(124,203,90,0.6)] md:h-12 md:w-12">
              <span className="ml-1 h-0 w-0 border-y-[6px] border-l-[11px] border-y-transparent border-l-white md:border-y-[7px] md:border-l-[12px]" />
            </span>
            <span className="text-3xl font-semibold tracking-[-0.08em] transition-colors duration-200 group-hover:text-red-500 md:text-5xl">
              theMovies
            </span>
          </Link>
        </div>

        <div className="grid gap-4 text-center text-lg font-black uppercase tracking-[-0.05em] text-white/90 sm:grid-cols-2 md:grid-cols-3 xl:text-2xl">
          <div className="contents">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-all duration-200 hover:text-red-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
