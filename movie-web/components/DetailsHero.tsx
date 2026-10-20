"use client"
import React from 'react'
import Image from 'next/image'
import CastCard from './CastCard'
import { getImagePath } from '@/lib/getImagePath'
import { Cast } from '../../type'


type DetailsHeroProps = {
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  genres: { id: number; name: string }[];
  cast: Cast[];
};
const DetailsHero = ({ title, overview, posterPath, backdropPath, genres, cast }: DetailsHeroProps) => {
  const backdropImage = getImagePath(backdropPath || posterPath, true);


  return (
    <div
       style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,1) 60%), url(${backdropImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
  }}
      className="pt-4 md:pt-16"
    >
      <div className="relative flex px-4 md:px-5 lg:px-16 py-8 md:pb-18 md:pt-16">
        <div className="grid gap-3 lg:gap-5 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[350px_minmax(0,1fr)] md:items-start">
          <div className="hidden md:block mx-auto w-48 overflow-hidden rounded-[22px] shadow-xl md:mx-0 md:w-full md:h-[360px] lg:h-[500px]">
            <Image
              src={getImagePath(posterPath || backdropPath)}
              alt={title || "Poster"}
              width={960}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-4 md:px-4 pb-0 lg:pt-0">
            <h1 className="py-2 lg:py-4 text-3xl font-bold md:text-5xl lg:text-7xl">{title}</h1>

            <div className="py-4 flex flex-wrap gap-2 px-1 mb-4">
              {genres?.map((genre) => (
                <span key={genre.id} className="bg-black px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="py-0 md:py-1 lg:py-4 text-white text-xs md:text-sm lg:text-base">{overview}</p>

            <h2 className="mb-1 mt-4 text-xl font-semibold ">Casts</h2>
            <div className="mb-0 flex flex-wrap gap-3">
              {cast.slice(0, 5).map((cast) => (
                <CastCard key={cast.id} cast={cast} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHero