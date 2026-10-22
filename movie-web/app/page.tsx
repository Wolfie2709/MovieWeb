
import React from "react";
import CarouselBanner from "../components/carouselBanner";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies } from "../lib/getMovies";
import {getPopularTVSeries, getTopRatedTVSeries} from "../lib/getTVSeries";
import MediaContainer from "@/components/container/MediaContainer";

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
      <MediaContainer items={nowPlayingMovies} title="Trending Movies" mediaType="movie" />
      <MediaContainer items={popularMovies} title="Popular Movies" mediaType="movie"/>
      <MediaContainer items={topRatedMovies} title="Top Rated Movies" mediaType="movie"/>
      <MediaContainer items={popularTVSeries} title="Popular TV" mediaType="movie"/>
      <MediaContainer items={topRatedTVSeries} title="Top Rated TV" mediaType="movie"/>
    </div>
   </main>
  );
}
