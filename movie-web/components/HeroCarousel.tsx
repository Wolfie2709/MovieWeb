"use client";

import React from 'react'

import {Movie} from "../../type";
import Image from 'next/image';
import {getImagePath} from '../lib/getImagePath';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'

interface Props {
    movies: Movie[];
}
const HeroCarousel = ({movies}: Props) => {
    const [emblaRef] = useEmblaCarousel({loop: false }, [Autoplay()])
  return (
    <div  className= "overflow-hidden cursor-pointer relative">
        <div className= "flex">
            {movies.map((movie)=>(
                <div key= {movie.id} className="relative min-w-0 flex-[0_0_100%]">
                    <Image src={getImagePath(movie.backdrop_path, true)} 
                    alt={movie.title} 
                    width={1920} 
                    height={1080}
                    />
                    <div className="hidden lg:inline absolute top-0 pt-40 xl:pt-72 left-0 bg-transparent z-20 h-full w-full bg-linear-to-r from-gray-900/90 via-transparent to-transparent p-10 space-y-5 text-white">
                     <h2 className="text-5xl font-bold max-w-2xl">{movie.title}</h2>
                     <p className= "max-w-xl line-clamp-3">{movie.overview}</p>
                     
                     </div>
                   
                </div>
            ))}
        </div>
        <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-gray-900/90 to-transparent via-gray-900/30 to-gray-300 dark:to-[#121212]"/>
    </div>
  )
}

export default HeroCarousel