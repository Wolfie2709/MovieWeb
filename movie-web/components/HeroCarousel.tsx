"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../../type";
import { getImagePath } from "../lib/getImagePath";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  movies: Movie[];
}

const HeroCarousel = ({ movies }: Props) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  if (!movies?.length) return null;

  return (
    <section className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {movies.map((movie, index) => (
            <article
              key={movie.id}
              className="relative min-h-[62vh] flex-[0_0_100%] lg:min-h-[78vh]"
            >
              <Image
                src={getImagePath(movie.backdrop_path || movie.poster_path, true)}
                alt={movie.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/20" />

              <div className="absolute inset-0 z-20 flex items-end">
                <div className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-6 md:pb-16">
                  <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div>
                      <h2 className="mb-4 max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                        {movie.title}
                      </h2>

                      <p className="mb-6 max-w-2xl text-sm text-gray-200 md:text-base lg:line-clamp-4">
                        {movie.overview}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/Movie/${movie.id}`}
                          className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
                        >
                          Watch now
                        </Link>
                        <Link
                          href={`/Movie/${movie.id}`}
                          className="rounded-md border border-white/40 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Watch trailer
                        </Link>
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <div className="overflow-hidden rounded-xl border border-white/20 bg-black/40 shadow-2xl">
                        <Image
                          src={getImagePath(movie.poster_path || movie.backdrop_path)}
                          alt={movie.title}
                          width={300}
                          height={450}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;