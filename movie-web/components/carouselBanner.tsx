"use server"

import React from 'react'
import {getDiscoverMovies} from "../lib/getMovies";
import HeroCarousel from './HeroCarousel';
import TrailerModal from './TrailerModal';

interface Props {
    id?:string;
    keywords?: string;
}

const CarouselBanner = async ({id, keywords}: Props) => {
    const movies = await getDiscoverMovies(id, keywords);

  return (
    <section id="hero-banner" className="bg-background text-foreground">
    <HeroCarousel movies={movies} />
    </section>
  )
}

export default CarouselBanner