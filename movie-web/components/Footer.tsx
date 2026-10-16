import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="max-w-4xl h-full mx-auto flex flex-col justify-around">
        <div className="mb-5 flex items-center justify-center">
          <Link href="/" className="group inline-flex items-center gap-3 text-white">
            <Image src="/tmovie-55621206.png" alt="theMovies Logo" width={50} height={50} />
            <span className="text-2xl font-semibold transition-colors duration-200 group-hover:text-red-500 md:text-4xl">
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
                className="w-1/2 px-2 py-1 transition-all duration-200 hover:text-red-500 sm:w-1/3"
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
