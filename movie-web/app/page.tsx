import Image from "next/image";
import React from "react";
import CarouselBanner from "../components/carouselBanner";
import { getNowPlayingMovies, getUpcomingMovies,  getDiscoverMovies, getPopularMovies, getTopRatedMovies } from "../lib/getMovies";

export default async function Home() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const discoverMoviees = await getDiscoverMovies();
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  return (
   <main>
    <CarouselBanner />
   </main>
  );
}
