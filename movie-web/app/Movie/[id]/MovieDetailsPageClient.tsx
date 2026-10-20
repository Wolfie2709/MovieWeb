"use client";
import React from 'react'
import SimilarContainer from '@/components/SimilarContainer';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from "@/lib/client/movieApi";
import CastCard from "@/components/CastCard";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import MovieDetailsSkeleton from '@/components/MovieDetailsSkeleton';
import DetailsHero from '@/components/DetailsHero';
import VideoContainer from '@/components/VideoContainer';


const MovieDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: movie,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id as string),
    enabled: Boolean(id),
  });

  const {
    data: credits
  } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id as string),
    enabled: Boolean(id),
  });

  const {
    data: movieVideos = [],
    isLoading: isVideosLoading,
    isError: isVideosError,
    error: videosError,
  } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => getMovieVideos(id as string),
    enabled: Boolean(id),
  });


  const {
    data: similarMovies = [],
  } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: () => getSimilarMovies(id as string),
    enabled: Boolean(id),
  });
  

  if (isVideosLoading||isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (isVideosError) {
    return (
      <main className=" bg-black px-5 py-10 text-red-400">
        Failed to load movie: {(videosError) instanceof Error ? (videosError)?.message : "Unknown error"}
      </main>
    );
  }
  

  return (
    <main className=" bg-black text-white">
      <div className="w-full">
        <DetailsHero
          title={movie.title}
          overview={movie.overview}
          posterPath={movie.poster_path}
          backdropPath={movie.backdrop_path}
          genres={movie.genres}
          cast={credits?.cast ?? []} />
        <VideoContainer videos={movieVideos} />
        <div className="space-y-8 pb-16">
          <SimilarContainer items={similarMovies} mediaType="movie" title="Similar Movies" />
        </div>
      </div>
    </main>
  );
};

export default MovieDetailsPage;