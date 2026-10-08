import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className= "h-100 lg:h-120 px-8 py-12 md:p-16 bg-[#191919]">
        <div className="max-w-4xl h-full mx-auto flex flex-col justify-around">
            <a className="flex items-center justify-center hover:cursor-pointer group" href="/">
             <Image src="/tmovie-55621206.png" alt="Logo" width={40} height={40} /> 
             <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">theMovies</h1>
             </a>
            <div className="flex text-white font-semibold text-base md:text-2xl items-start justify-between flex-wrap -mx-2">
                <a className="footer-item" href="/">Home</a>
                <a className="footer-item" href="/">Live</a>
                <a className="footer-item" href="/">Contact</a>
                <a className="footer-item" href="/">About</a>
                <a className="footer-item" href="/">Terms of Service</a>
                <a className="footer-item" href="/">Privacy Policy</a>
                <a className="footer-item" href="/">Careers</a>
                <a className="footer-item" href="/">Blog</a>
                <a className="footer-item" href="/">Support</a>
                <a className="footer-item" href="/">FAQ</a>
            </div>
        </div>
    </div>
  )
}

export default Footer

/*    
    <div className="bg-[#191919]">
            
        <div>
                        <Link href="/">
                <Image src="/tmovie-55621206.png" alt="Logo" width={40} height={40} /> 
                <span className="text-xl uppercase font-bold items-center text-white">THE MOVIES</span>
            </Link> 
            
            <h2 className= "text-2xl uppercase font-bold text-white tracking-wide py-2 mb-5 relative">Home</h2>
            <h2 className= "text-2xl uppercase font-bold text-white tracking-wide py-2 mb-5 relative">Contact us</h2>
            <h2 className= "text-2xl uppercase font-bold text-white tracking-wide py-2 mb-5 relative">Terms of Service</h2>
            <h2 className= "text-2xl uppercase font-bold text-white tracking-wide py-2 mb-5 relative">About us</h2>
        </div>
        <div>
            <h2></h2>
        </div>
        <div>

        </div>
    </div>
  ) */