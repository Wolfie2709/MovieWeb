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
  const backdropImage = getImagePath(movieDetails?.backdrop_path || movieDetails?.poster_path, true);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="w-full">
        <div
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(4,6,10,0.92) 0%, rgba(4,6,10,0.82) 22%, rgba(4,6,10,0.72) 52%, rgba(4,6,10,0.96) 100%), url(${backdropImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundAttachment: "fixed",
          }}
          className="pt-10 md:pt-20 "
        >
          <div className="mx-auto w-full max-w-[1600px] px-0 md:px-2 md:py-2 lg:px-4 ">
            <div className="mb-8 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:pt-0 lg:pb-0 lg:pr-0 lg:pl-0">
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-zinc-900 shadow-xl lg:h-[500px]">
                <Image
                  src={getImagePath(movieDetails?.poster_path || movieDetails?.backdrop_path)}
                  alt={movieDetails?.title || "Movie poster"}
                  width={640}
                  height={960}
                  className="h-full w-full object-cover "
                />
              </div>

              <div className="px-5 pb-10 pt-6 md:px-8 lg:px-8 lg:pt-10">
                <h1 className="mb-3 text-3xl font-bold md:text-5xl">{movieDetails?.title}</h1>

                <div className="mb-4 flex flex-wrap gap-2">
                  {movieDetails?.genres?.map((genre) => (
                    <span key={genre.id} className="rounded-full border border-white/20 px-3 py-1 text-xs text-gray-200">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="max-w-5xl text-gray-300 md:text-lg">{movieDetails?.overview}</p>

                <h2 className="mb-4 mt-8 text-2xl font-bold tracking-wide">Casts</h2>
                <div className="mb-2 flex flex-wrap gap-4">
                  {movieCredits?.cast?.slice(0, 5).map((cast) => (
                    <CastCard key={cast.id} cast={cast} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 pb-8 md:px-8">
          {featuredVideos.length > 0 ? (
            <div className="gap-5 ">
              {featuredVideos.map((video) => (
                <div key={video.id}>
                  <p className="mb-2 text-3xl font-bold text-gray-300 py-3">{video.name}</p>
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
        </div>

        <div className="space-y-8 pb-16">
          <SimilarContainer items={similarMovies} mediaType="movie" title="Similar Movies" />
        </div>
      </div>
    </main>
  );
};

export default MovieDetailsPage;