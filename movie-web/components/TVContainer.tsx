// "use client"
// import React from 'react'

// import type { TV } from "../../type.ts";
// import Link from 'next/dist/client/link.js';
// import Image from 'next/image';
// import { cn } from '@/lib/utils';
// import MovieCard from './MovieCard';
// import  useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';

// type Props = {
//     title?: string;
//     tvs: TV[];
//     isVertical?: boolean;
// }

// const MovieContainer = ({ title, tvs, isVertical }: Props) => {
//        const [emblaRef] = useEmblaCarousel({loop: false }, [Autoplay()])
//        const viewMoreHref = `/MoreMovie?title=${encodeURIComponent(title ?? "")}`;
//     return (
//         <div>
//             <div className="mx-10 py-2 items-center justify-between border-b border-b-gray-500 relative mb-4">
//                 <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
//                 <Link href={viewMoreHref}
//                     className="bg-gray-800 text-s text-white uppercase px-2 py-1 rounded-md border-indigo-600 font-semibold ">
//                     View More
//                 </Link>
//             </div>
//             <div ref={emblaRef} className={cn("flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5")}>
//                 {tvs.map((tv) => (
//                     <MovieCard key={tv.id} tv={tv}/>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MovieContainer