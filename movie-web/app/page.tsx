import Image from "next/image";
import React from "react";
import CarouselBanner from "../components/carouselBanner";
import { getNowPlayingMovies, getUpcomingMovies,  getDiscoverMovies, getPopularMovies, getTopRatedMovies } from "../lib/getMovies";
import {getOnTheAirTVSeries, getPopularTVSeries, getTopRatedTVSeries, getAiringTVSeries} from "../lib/getTVSeries";
import MovieContainer from "../components/MovieContainer";
import TVContainer from "../components/TVContainer";

export default async function Home() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const discoverMovies = await getDiscoverMovies();
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const airingTVSeries = await getAiringTVSeries();
  const onTheAirTVSeries = await getOnTheAirTVSeries();
  const popularTVSeries = await getPopularTVSeries();
  const topRatedTVSeries = await getTopRatedTVSeries();
  return (
   <main suppressHydrationWarning className="bg-black">
    <CarouselBanner />
    <div suppressHydrationWarning >
      <MovieContainer movies={nowPlayingMovies} title="Now Playing" isVertical={true}/>
      <MovieContainer movies={upcomingMovies} title="Upcoming" />
      <MovieContainer movies={discoverMovies} title="Discover" />
      <MovieContainer movies={popularMovies} title="Popular" />
      <MovieContainer movies={topRatedMovies} title="Top Rated" />
      <TVContainer tv={airingTVSeries} title="Airing Today" />
      <TVContainer tv={onTheAirTVSeries} title="On The Air" />
      <TVContainer tv={popularTVSeries} title="Popular" />
      <TVContainer tv={topRatedTVSeries} title="Top Rated" />
    </div>
   </main>
  );
}
