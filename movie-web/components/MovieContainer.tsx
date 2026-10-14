"use client"
import React from 'react'

import type { Movie } from "../../type.ts";
import Link from 'next/link';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

type Props = {
    title?: string;
    movies: Movie[];
    isVertical?: boolean;
}

const MovieContainer = ({ title, movies }: Props) => {
    const viewMoreHref = `/Movie?title=${encodeURIComponent(title ?? "")}`;

    return (
        <div className="mt-8 md:mt-16">
            <div className="mx-10  flex items-center justify-between px-2">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
                <Link
                    href={viewMoreHref}
                    className="btn-sm btn-default"
                >
                    View More
                </Link>
            </div>

            <Swiper
                 modules={[Autoplay]}
                                spaceBetween={14}
                                 slidesPerView={2}
    breakpoints={{
      640:  { slidesPerView: 4 },
      1024: { slidesPerView: 6 },
    }}
                                rewind
                                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                className="my-swiper mt-8" 
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} mode="carousel" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MovieContainer