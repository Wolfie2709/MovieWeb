"use client";
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTVDetails, getTVVideos, getTVCredits, getSimilarTVSeries } from "@/lib/client/tvApi";
import DetailsHero from '@/components/DetailsHero';
import VideoContainer from '@/components/VideoContainer';
import MediaContainer from '@/components/MediaContainer';
import DetailsSkeleton from '@/components/DetailsSkeleton'

const TVDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

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
    data: tv,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useQuery({
    queryKey: ["tvDetails", id],
    queryFn: () => getTVDetails(id as string),
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
    data: similarTVSeries = [],
  } = useQuery({
    queryKey: ["similarTVSeries", id],
    queryFn: () => getSimilarTVSeries(id as string),
    enabled: Boolean(id),
  });

  if (isDetailsLoading || isVideosLoading || isCreditsLoading) {
return <DetailsSkeleton />;
  }

  if (isDetailsError || isVideosError || isCreditsError) {
    return (
      <main className="min-h-screen bg-black px-5 py-10 text-red-400">
        Failed to load TV series: {(detailsError || videosError || creditsError) instanceof Error ? (detailsError || videosError || creditsError)?.message : "Unknown error"}
      </main>
    );
  }

  return (
    <main className=" bg-black text-white">
      <div className="w-full">
         <DetailsHero
          title={tv.name}
          overview={tv.overview}
          posterPath={tv.poster_path}
          backdropPath={tv.backdrop_path}
          genres={tv.genres}
          cast={tvCredits?.cast ?? []} />
        <VideoContainer videos={tvVideos} />
        <div className="space-y-8 pb-16">
          <MediaContainer items={similarTVSeries} mediaType="tv" title="Similar TV Series" />
        </div>
      </div>
    </main>
  );
};

export default TVDetailsPage;