"use client"
import React from 'react'

import type { Movie, TV } from "../../type.ts";
import { cn } from '@/lib/utils';
import MovieCard from './MovieCard';
import TVCard from './TVCard';
import  useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
    title?: string;
    items: Array<Movie | TV>;
    mediaType: "movie" | "tv";
    isVertical?: boolean;
}

const SimilarContainer = ({ title, items, mediaType }: Props) => {
       const [emblaRef] = useEmblaCarousel({loop: false }, [Autoplay()])
    return (
        <div>
            <div className="mx-10 py-2 items-center justify-between border-b border-b-gray-500 relative mb-4">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
            </div>
            <div ref={emblaRef} className={cn("flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5")}>
              <div className={cn("flex gap-4")}>
                  {items.map((item) => (
                    mediaType === "movie" ? (
                        <MovieCard key={item.id} movie={item as Movie} />
                    ) : (
                        <TVCard key={item.id} tv={item as TV} />
                    )
                ))}
              </div>
            </div>
        </div>
    )
}

export default SimilarContainer