"use client";

import React from "react";
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

// Shared animation: hidden by default, animates in when Swiper marks the slide active.
const reveal =
 "opacity-0 -translate-y-24 transition duration-700 ease-in-out " +
  "group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:translate-y-0";

const HeroCarousel = ({ movies }: Props) => {
  if (!movies?.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 10000, disableOnInteraction: true, pauseOnMouseEnter: true }}
        loop
        speed={700}
        className="h-[25rem] md:h-[36rem] lg:h-[52rem]"
      >
        {movies.slice(0, 8).map((movie, index) => {
          const bgImage = getImagePath(movie.backdrop_path || movie.poster_path, true);
          const posterImage = getImagePath(movie.poster_path || movie.backdrop_path);

          return (
            <SwiperSlide key={movie.id} className="group ">
              <div className="absolute inset-0">
                <Image
                  src={bgImage}
                  alt={movie.title}
                  fill
                  sizes="100vw"
                  priority={index < 2}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
              </div>

              <div className="relative z-20 flex h-full items-center">
                <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-8 px-6 md:px-10 xl:px-12">
                  <div className="relative top-7 w-full lg:w-2/3 px-4 py-32 md:py-40 lg:py-48 xl:py-56">
                    <h2
                      className={`text-4xl font-bold text-white md:text-6xl lg:text-8xl ${reveal} group-[.swiper-slide-active]:delay-300`}
                    >
                      {movie.title}
                    </h2>

                    <p
                      className={`my-12 text-xs font-medium  text-white md:text-xl ${reveal} group-[.swiper-slide-active]:delay-[600ms]`}
                    >
                      {movie.overview}
                    </p>

                    <div
                      className={`mt-6 flex flex-wrap items-center gap-4 md:gap-1 ${reveal} group-[.swiper-slide-active]:delay-[900ms]`}
                    >
                      <Link
                        href={`/Movie/${movie.id}`}
                        className="btn-lg btn-primary mr-4 " 
                      >
                        Watch now
                      </Link>
                      <Link
                        href={`/Movie/${movie.id}`}
                        className="btn-lg btn-default"
                      >
                        Watch trailer
                      </Link>
                    </div>
                  </div>

                  {/* Poster: no backdrop-blur, lighter shadow */}
                  <div
                    className={`hidden xl:flex h-[420px] w-[290px] shrink-0 items-end justify-center ${reveal} group-[.swiper-slide-active]:delay-300`}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-xl">
                      <Image
                        src={posterImage}
                        alt={movie.title}
                        fill
                        sizes="290px"
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