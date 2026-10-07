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
    <div className= "overflow-hidden cursor-pointer relative">
        <div className= "flex">
            {movies.map((movie)=>(
                <div key= {movie.id}>
                    <Image src={getImagePath(movie.backdrop_path, true)} 
                    alt={movie.title} 
                    width={1920} 
                    height={1080}
                    />
                    <p>Title</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default HeroCarousel