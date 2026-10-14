
import React from "react";
import CarouselBanner from "../components/carouselBanner";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies } from "../lib/getMovies";
import {getPopularTVSeries, getTopRatedTVSeries} from "../lib/getTVSeries";
import MovieContainer from "../components/MovieContainer";
import TVContainer from "../components/TVContainer";

export default async function Home() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularTVSeries = await getPopularTVSeries();
  const topRatedTVSeries = await getTopRatedTVSeries();
  return (
   <main suppressHydrationWarning className="bg-black">
    <CarouselBanner />
    <div suppressHydrationWarning className= "space-y-8 pb-16 max-w-screen-2xl mx-auto">
      <MovieContainer movies={nowPlayingMovies} title="Trending Movies" isVertical={true}/>
      <MovieContainer movies={popularMovies} title="Popular Movies" />
      <MovieContainer movies={topRatedMovies} title="Top Rated Movies" />
      <TVContainer tv={popularTVSeries} title="Popular TV" />
      <TVContainer tv={topRatedTVSeries} title="Top Rated TV" />
    </div>
   </main>
  );
}
