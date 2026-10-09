"use client";
import React from 'react'
import SimilarContainer from '@/components/SimilarContainer';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from "@/lib/client/movieApi";
import CastCard from "@/components/CastCard";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";

const MovieDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  

  const {
    data: movieCredits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
    error: creditsError,
  } = useQuery({
queryKey: ["movieCredits", id],
queryFn: () => getMovieCredits(id as string),
enabled: Boolean(id),
  })

  const {
    data: movieDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id as string),
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
    isLoading: isSimilarLoading,
    isError: isSimilarError,      
    error: similarError,
  } = useQuery({
    queryKey: ["similarMovies", id],  
    queryFn: () => getSimilarMovies(id as string),
    enabled: Boolean(id),
  });
  
  if (isDetailsLoading || isVideosLoading || isCreditsLoading) {
    return <main className="min-h-screen bg-black px-5 py-10 text-white">Loading movie...</main>;
  }

  if (isDetailsError || isVideosError || isCreditsError) {
    return (
      <main className="min-h-screen bg-black px-5 py-10 text-red-400">
        Failed to load movie: {(detailsError || videosError || creditsError) instanceof Error ? (detailsError || videosError || creditsError)?.message : "Unknown error"}
      </main>
    );
  }


  const youtubeVideos = movieVideos.filter((video) => video.site === "YouTube");
  const trailerVideos = youtubeVideos.filter((video) => video.type === "Trailer");
  const otherYoutubeVideos = youtubeVideos.filter((video) => video.type !== "Trailer");
  const featuredVideos = [...trailerVideos, ...otherYoutubeVideos].slice(0, 4);

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <h1 className="mb-3 text-3xl font-bold">{movieDetails?.title}</h1>
      <Image
              src={getImagePath(movieDetails?.poster_path || movieDetails?.backdrop_path)}
              alt={movieDetails?.title || "Movie poster"}
              width={160}
              height={160}
              className="h-20 w-20 rounded-lg object-cover shadow-md shadow-gray-900 sm:h-24 sm:w-24"
            />
      <p className="mb-6 max-w-3xl text-gray-300">{movieDetails?.overview}</p>

      <div className="mb-8 grid gap-3 text-sm text-gray-200 sm:grid-cols-2 lg:grid-cols-4">
        <p>Release: {movieDetails?.release_date || "N/A"}</p>
        <p>Runtime: {movieDetails?.runtime ? `${movieDetails.runtime} min` : "N/A"}</p>
        <p>Rating: {movieDetails?.vote_average?.toFixed(1) ?? "N/A"}</p>
        <p>Status: {movieDetails?.status || "N/A"}</p>
      </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       {movieCredits?.cast?.slice(0, 5).map((cast) => (
                    <CastCard key={cast.id} cast={cast}/>
                ))}
      </div>

      {featuredVideos.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {featuredVideos.map((video) => (
            <div key={video.id}>
              <p className="mb-2 text-sm text-gray-300">{video.name}</p>
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  title={video.name}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No videos found for this movie.</p>
      )}
   <SimilarContainer movies={similarMovies} title="Similar Movies" />
    </main>
  );
};

export default MovieDetailsPage;