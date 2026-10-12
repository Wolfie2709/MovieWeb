"use client"
import React from 'react'

import type { TV } from "../../type.ts";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import TVCard from './TVCard';
import  useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
    title?: string;
    tv: TV[];
    isVertical?: boolean;
}

const TVContainer = ({ title, tv }: Props) => {
       const [emblaRef] = useEmblaCarousel({loop: false }, [Autoplay()])
       const viewMoreHref = `/TVSeries?title=${encodeURIComponent(title ?? "")}`;
    return (
        <div>
            <div className="mx-10 py-2 items-center justify-between border-b border-b-gray-500 relative mb-4">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
                <Link href={viewMoreHref}
                    className="bg-gray-800 text-sm text-white uppercase px-2 py-1 rounded-md border-indigo-600 font-semibold ">
                    View More
                </Link>
            </div>
            <div ref={emblaRef} className={cn("flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5")}>
                <div className= {cn("flex gap-4")}>
                {tv.map((tv) => (
                    <TVCard key={tv.id} tv={tv}/>
                ))}
                </div>
            </div>
        </div>
    )
};

export default TVContainer;