import React from 'react'
import {getDiscoverMovies} from "../lib/getMovies";
import HeroCarousel from './HeroCarousel';

interface Props {
    id?:string;
    keywords?: string;
}

const CarouselBanner = async ({id, keywords}: Props) => {
    const movies = await getDiscoverMovies(id, keywords);

  return (
    <HeroCarousel movies={movies} />
  )
}

export default CarouselBanner