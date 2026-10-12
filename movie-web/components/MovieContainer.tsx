"use client"
import React from 'react'

import type { Movie } from "../../type.ts";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MovieCard from './MovieCard';
import  useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
    title?: string;
    movies: Movie[];
    isVertical?: boolean;
}

const MovieContainer = ({ title, movies }: Props) => {
       const [emblaRef] = useEmblaCarousel({loop: false }, [Autoplay()])
       const viewMoreHref = `/Movie?title=${encodeURIComponent(title ?? "")}`;
    return (
        <div>
            <div className="mx-10 mb-4 flex items-center justify-between border-b border-b-gray-500 py-2">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
                <Link href={viewMoreHref}
                    className="bg-gray-800 text-sm text-white uppercase px-2 py-1 rounded-md border-indigo-600 font-semibold ">
                    View More
                </Link>
            </div>
            <div ref={emblaRef} className={cn("flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5")}>
                <div className= {cn("flex gap-4")}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
                </div>
            </div>
        </div>
    )
}

export default MovieContainer