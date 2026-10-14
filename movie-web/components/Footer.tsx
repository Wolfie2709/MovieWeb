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
      className="relative overflow-hidden border-t border-white/10 bg-black h-100 lg:h-120 px-8 py-12 md:p-16"
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

        <div className="flex text-white font-semibold text-base md:text-2xl items-start justify-between flex-wrap -mx-2">
          <div className="contents ">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-all duration-200 hover:text-red-500 w-1/2 sm:w-1/3 px-2 py-1"
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
