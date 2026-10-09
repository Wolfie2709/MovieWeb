"use client"
import React from 'react'

import type { Movie } from "../../type.ts";
import Link from 'next/dist/client/link.js';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import MovieCard from './MovieCard';
import  useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
    title?: string;
    movies: Movie[];
    isVertical?: boolean;
}

const SimilarContainer = ({ title, movies }: Props) => {
       const [emblaRef] = useEmblaCarousel({loop: false }, [Autoplay()])
       const viewMoreHref = `/Movie?title=${encodeURIComponent(title ?? "")}`;
    return (
        <div>
            <div className="mx-10 py-2 items-center justify-between border-b border-b-gray-500 relative mb-4">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
            </div>
            <div ref={emblaRef} className={cn("flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5")}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    )
}

export default SimilarContainer