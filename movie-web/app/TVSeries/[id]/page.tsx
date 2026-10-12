"use client"

import React from 'react'
import SimilarContainer from '@/components/SimilarContainer';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTVDetails, getTVVideos, getTVCredits, getSimilarTVSeries } from "@/lib/client/tvApi";
import CastCard from "@/components/CastCard";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";

const TVDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: tvDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useQuery({
    queryKey: ["tvDetails", id],
    queryFn: () => getTVDetails(id as string),
    enabled: Boolean(id),
  });

  const {
    data: tvCredits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
    error: creditsError,
  } = useQuery({
    queryKey: ["tvCredits", id],
    queryFn: () => getTVCredits(id as string),
    enabled: Boolean(id),
  });

  const {
    data: tvVideos = [],
    isLoading: isVideosLoading,
    isError: isVideosError,
    error: videosError,
  } = useQuery({
    queryKey: ["tvVideos", id],
    queryFn: () => getTVVideos(id as string),
    enabled: Boolean(id),
  });
  const {
    data: similarTVSeries,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useQuery({
    queryKey: ["similarTVSeries", id],
    queryFn: () => getSimilarTVSeries(id as string),
    enabled: Boolean(id),
  });

  if (isDetailsLoading || isCreditsLoading || isVideosLoading || isSimilarLoading) {
    return <main className="min-h-screen bg-black px-5 py-10 text-white">Loading TV series...</main>;
  }

  if (isDetailsError || isCreditsError || isVideosError || isSimilarError) {
    return <main className="min-h-screen bg-black px-5 py-10 text-red-400">
      Failed to load TV series: {(detailsError || videosError || creditsError) instanceof Error ? (detailsError || videosError || creditsError)?.message : "Unknown error"}
    </main>
  }

  const youtubeVideos = tvVideos.filter(video => video.site === "YouTube");
  const trailerVideos = youtubeVideos.filter(video => video.type === "Trailer");
  const otherYoutubeVideos = youtubeVideos.filter(video => video.type !== "Trailer");
  const featuredVideo = [...trailerVideos, ...otherYoutubeVideos].slice(0, 4);


  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl">
    <Image
      src={getImagePath(tvDetails?.poster_path || tvDetails?.backdrop_path)}
      alt={tvDetails?.name || "TV series poster"}
      width={640}
      height={960}
      className="h-full w-full object-cover"
    />
  </div>

  <div>
    <h1 className="mb-3 text-3xl font-bold">{tvDetails?.name}</h1>

    <div className="mb-4 flex flex-wrap gap-2">
      {tvDetails?.genres?.map((genre) => (
        <span key={genre.id} className="rounded-full border border-white/20 px-3 py-1 text-xs text-gray-200">
          {genre.name}
        </span>
      ))}
    </div>

    <p className="mb-6 max-w-3xl text-gray-300">{tvDetails?.overview}</p>

    <h2 className="mb-4 text-2xl font-semibold tracking-wide">Casts</h2>
    <div className="mb-6 flex flex-wrap gap-4">
      {tvCredits?.cast?.slice(0, 5).map((cast) => (
        <CastCard key={cast.id} cast={cast} />
      ))}
    </div>

    <div className="grid gap-3 text-sm text-gray-200 sm:grid-cols-2 lg:grid-cols-4">
      <p>Release: {tvDetails?.first_air_date || "N/A"}</p>
    </div>
  </div>
</div>
        <h2 className="mb-4 text-2xl font-semibold uppercase tracking-wide">Videos</h2>
        {featuredVideo.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {featuredVideo.map((video) => (
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
        <SimilarContainer items={similarTVSeries} mediaType="tv" title="Similar TV Series" />
      </div>
    </main>
  );
};

export default TVDetailsPage;
