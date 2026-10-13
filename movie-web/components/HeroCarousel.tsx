"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../../type";
import { getImagePath } from "../lib/getImagePath";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Props {
  movies: Movie[];
}

const HeroCarousel = ({ movies }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!movies?.length) return null;

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        speed={700}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-[92vh]"
      >
        {movies.map((movie, index) => {
          const bgImage = getImagePath(movie.backdrop_path || movie.poster_path, true);
          const posterImage = getImagePath(movie.poster_path || movie.backdrop_path);
          const isActive = activeIndex === index || (activeIndex === movies.length - 1 && index === 0);

          return (
            <SwiperSlide key={movie.id} className="relative h-full">
              <div className="absolute inset-0">
                <Image
                  src={bgImage}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  className="object-cover brightness-[0.40] contrast-95 saturate-100"
                />
              </div>

              <div className="relative z-20 flex h-full items-center">
                <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-8 px-6 pb-10 pt-28 md:px-10 md:pb-16 xl:px-12">
                  <div
                    className="max-w-[980px] -translate-y-4"
                  >
                    <h2 className={`mb-5 text-6xl font-black leading-[0.9] tracking-[-0.08em] ${
                      isActive ? "animate-in slide-in-from-top duration-700 ease-out text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)]" : "opacity-0"}`}>
                      {movie.title}
                    </h2>

                    <p className={`max-w-[920px] text-4xl leading-relaxed text-white/90 md:text-xl xl:text-[1.9rem] xl:leading-[1.2] line-clamp-2 ${
                      isActive ? "animate-in slide-in-from-top duration-700 ease-out" : "opacity-0"}`}>
                      {movie.overview}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4 md:gap-6">
                      <Link
                        href={`/Movie/${movie.id}`}
                        className={`inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3.5 text-lg font-semibold text-white shadow-[0_0_28px_rgba(239,68,68,0.6)] transition-transform duration-200 hover:scale-[1.02] hover:bg-red-500 md:px-9 md:py-4 md:text-xl
                          ${
                      isActive ? "animate-in slide-in-from-top duration-700 ease-out" : "opacity-0"}`}
                      >
                        Watch now
                      </Link>
                      <Link
                        href={`/Movie/${movie.id}`}
                        className={`inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-7 py-3.5 text-lg font-semibold text-white transition-colors duration-200 hover:bg-white/8 md:px-9 md:py-4 md:text-xl ${
                          isActive ? "animate-in slide-in-from-top duration-700 ease-out" : "opacity-0"}`}
                      >
                        Watch trailer
                      </Link>
                    </div>
                  </div>

                  <div className="hidden xl:flex h-[520px] w-[360px] items-end justify-center">
                    <div className="relative h-full w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-[0_26px_80px_rgba(0,0,0,0.7)] backdrop-blur-sm">
                      <Image
                        src={posterImage}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;