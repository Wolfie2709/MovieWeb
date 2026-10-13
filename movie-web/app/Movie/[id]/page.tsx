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
  const posterBackground = getImagePath(movieDetails?.poster_path || movieDetails?.backdrop_path, true);

  return (
    <main className="min-h-screen bg-[#070b13] px-5 py-8 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="relative mb-8 overflow-hidden rounded-[30px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(7,11,19,0.96) 0%, rgba(7,11,19,0.90) 28%, rgba(7,11,19,0.70) 52%, rgba(7,11,19,0.88) 100%), url(${posterBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900 shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
              <Image
                src={getImagePath(movieDetails?.poster_path || movieDetails?.backdrop_path)}
                alt={movieDetails?.title || "Movie poster"}
                width={640}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center py-2 md:py-4">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-red-300/90">
                <span>Featured</span>
                <span className="text-white/50">•</span>
                <span>{movieDetails?.release_date?.slice(0, 4) || "Now showing"}</span>
              </div>

              <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                {movieDetails?.title}
              </h1>

              <div className="mb-5 flex flex-wrap gap-2">
                {movieDetails?.genres?.map((genre) => (
                  <span key={genre.id} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="max-w-3xl text-base leading-7 text-gray-200 md:text-lg">
                {movieDetails?.overview}
              </p>

              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold tracking-wide text-white">Casts</h2>
                <div className="flex flex-wrap gap-4">
                  {movieCredits?.cast?.slice(0, 5).map((cast) => (
                    <CastCard key={cast.id} cast={cast} />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
        <div className="space-y-8 pb-16">
          <SimilarContainer items={similarMovies} mediaType="movie" title="Similar Movies" />
        </div>
        
      </div>
    </main>
  );
};

export default MovieDetailsPage;