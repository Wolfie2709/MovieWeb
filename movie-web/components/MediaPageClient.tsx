"use client"
import React from 'react'
import { Suspense, useEffect, useMemo } from "react";
import { useSearchStore } from "@/lib/store/searchStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getMoviesByCategory, searchMovies } from "@/lib/client/movieApi";
import { getTVByCategory, searchTVSeries } from '@/lib/client/tvApi';
import { MoviesPage, TVSeriesPage,  Movie, TV } from '../../type';
import SearchInput from "@/components/SearchInput";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import MediaCard from "@/components/card/MediaCard";

type MediaItem = Movie | TV;

type Page = MoviesPage | TVSeriesPage

type MediaConfig={
    queryKeyPrefix: string;
    label: string;
  defaultTitle: string;
  defaultCategory: string;
  categoryNameMap: Record<string, string>;
  getByCategory: (category: string, page: number) => Promise<Page>;
  search: (query: string, page: number) => Promise<Page>;
  getHeading: (args: {
    categoryTitle: string;
    searchQuery: string;
    isSearchMode: boolean;
  }) => string;
  fallbackTitle: string;
};

const configs = {
  movie: {
    queryKeyPrefix: "movies",
    label: "movies",
    defaultTitle: "Movies",
    defaultCategory: "now_playing",
    categoryNameMap: {
      "Now Playing": "now_playing",
      Upcoming: "upcoming",
      Discover: "discover",
      Popular: "popular",
      "Top Rated": "top_rated",
    },
    getByCategory: getMoviesByCategory,
    search: searchMovies,
    getHeading: () => "Movies",
    fallbackTitle: "Movies",
  },
  tv: {
    queryKeyPrefix: "tv",
    label: "TV series",
    defaultTitle: "Tv Series",
    defaultCategory: "popular",
    categoryNameMap: {
      "On The Air": "on_the_air",
      "Airing Today": "airing_today",
      Popular: "popular",
      "Top Rated": "top_rated",
      "TV Series": "popular",
    },
    getByCategory: getTVByCategory,
    search: searchTVSeries,
    getHeading: ({ categoryTitle, searchQuery, isSearchMode }) =>
      isSearchMode ? `Search Results: ${searchQuery}` : categoryTitle,
    fallbackTitle: "TV Series",
  },
} satisfies Record<string, MediaConfig>;
 
export type MediaType = keyof typeof configs;
 

const MediaPageHome = ({ config }: { config: MediaConfig }) => {
  const searchParams = useSearchParams();
  const setKeywords = useSearchStore((state) => state.setKeyword);
  const searchQuery = searchParams.get("query")?.trim() ?? "";
  const isSearchMode = searchQuery.length > 0;
  const categoryTitle = searchParams.get("title") ?? config.defaultTitle;
  const category = config.categoryNameMap[categoryTitle] ?? config.defaultCategory;
  const heading = config.getHeading({ categoryTitle, searchQuery, isSearchMode });
 
  useEffect(() => {
    if (searchQuery) {
      setKeywords(searchQuery);
    }
  }, [searchQuery, setKeywords]);
 
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: isSearchMode
      ? [config.queryKeyPrefix, "search", searchQuery]
      : [config.queryKeyPrefix, "category", category],
    queryFn: ({ pageParam }) =>
      isSearchMode
        ? config.search(searchQuery, pageParam)
        : config.getByCategory(category, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
 
  const items = useMemo(() => {
    const all: MediaItem[] = data?.pages.flatMap((page):MediaItem[] => page.results) ?? [];
    return Array.from(new Map(all.map((item) => [item.id, item])).values());
  }, [data]);
 
  return (
    <main className="min-h-screen bg-black-main text-white">
      <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] bg-black-main pb-8 pt-18 md:pt-26">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-black font-semibold text-white">{heading}</h1>
          </div>
        </div>
      </div>
 
      <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="relative flex items-center rounded-full bg-black w-full md:w-fit lg:w-fit md:h-10">
            <SearchInput />
          </div>
 
          <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <CardSkeleton key={`sk-${i}`} mode="grid" />
                ))
              : items.map((item) => <MediaCard key={item.id} item={item} />)}
 
            {isFetchingNextPage &&
              Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={`more-${i}`} mode="grid" />
              ))}
          </div>
 
          {isError && (
            <p className="py-8 text-red-400">
              Failed to load {config.label}:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          )}
 
          {hasNextPage && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn-sm btn-default"
              >
                {isFetchingNextPage ? "Loading..." : "Watch more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
 
export default function MediaPage({ type }: { type: MediaType }) {
  const config: MediaConfig = configs[type];
 
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050505]/80 text-white">
          <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] to-[#050505]/80 pb-8 pt-24 md:pt-28">
            <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
              <div className="mb-6 text-center">
                <h1 className="text-4xl font-black font-semibold text-white">
                  {config.fallbackTitle}
                </h1>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-4 md:px-8 lg:px-10">
            <div className="mb-16 h-12 w-full rounded-full bg-black md:w-96" />
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <CardSkeleton key={i} mode="grid" />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <MediaPageHome config={config} />
    </Suspense>
  );
}
 