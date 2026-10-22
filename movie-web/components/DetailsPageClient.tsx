"use client"
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from "@/lib/client/movieApi";
import { getTVDetails, getTVCredits, getTVVideos,getSimilarTVSeries } from '@/lib/client/tvApi';
import DetailsHero from '@/components/DetailsHero';
import VideoContainer from '@/components/container/VideoContainer';
import MediaContainer from '@/components/container/MediaContainer';
import DetailsSkeleton from '@/components/Skeleton/DetailsSkeleton';
import { MovieDetails, TVDetails, Movie, TV, VideoProps } from '../../type';

type MediaType = "movie" | "tv";
type Details = MovieDetails | TVDetails;
type Similar = Movie[] | TV[];

const config = {
    movie: {
        getDetails: getMovieDetails,
        getCredits: getMovieCredits,
        getVideos: getMovieVideos,
        getSimilar: getSimilarMovies,
        getTitle: (d: any) => d.title as string,
        similarHeading: "Similar Movies",
        errorLabel: "movie",
    },
    tv: {
        getDetails: getTVDetails,
        getCredits: getTVCredits,
        getVideos: getTVVideos,
        getSimilar: getSimilarTVSeries,
        getTitle: (d: any) => d.name as string,
        similarHeading: "Similar TV Series",
        errorLabel: "TV",
    },
} as const;

type Props = {mediaType: MediaType};


const DetailsPageClient = ({mediaType}:Props) => {
    const params = useParams<{ id: string }>();
    const id = params?.id
    const cfg = config[mediaType];
    const enabled = Boolean(id);

    const details = useQuery<Details>({
        queryKey: [mediaType, "details", id],
        queryFn: () => cfg.getDetails(id as string),
        enabled,
    });

    const credits = useQuery({
        queryKey: [mediaType, "credits", id],
        queryFn: () => cfg.getCredits(id as string),
        enabled,
    })

    const videos = useQuery({
        queryKey: [mediaType, "videos", id],
        queryFn: () => cfg.getVideos(id as string),
        enabled,
    })

    const similar = useQuery<Similar>({
        queryKey: [mediaType, "similar", id],
        queryFn: () => cfg.getSimilar(id as string),
        enabled,
    })

    if(details.isLoading||videos.isLoading||similar.isLoading){
        return <DetailsSkeleton />
    }

    const media = details.data;

  return (
     <main className=" bg-black text-white mx-auto">
      <div className="w-full">
        <DetailsHero
          title={cfg.getTitle(media)}
          overview={media.overview}
          posterPath={media.poster_path}
          backdropPath={media.backdrop_path}
          genres={media.genres}
          cast={credits?.data?.cast ?? []} />
        <VideoContainer videos={videos.data??[]} />
        <div className="space-y-8 pb-16">
          <MediaContainer items={similar.data??[]} mediaType={mediaType} title={cfg.similarHeading}/>
        </div>
      </div>
    </main>
  )
}

export default DetailsPageClient