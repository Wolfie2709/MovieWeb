"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchStore } from "@/lib/store/searchStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getMoviesByCategory, searchMovies } from "@/lib/client/movieApi";
import SearchInput from "@/components/SearchInput";
import CardSkeleton from "@/components/CardSkeleton";
import MediaCard from "@/components/MediaCard";


const categoryNameMap: Record<string, string> = {
  "Now Playing": "now_playing",
  Upcoming: "upcoming",
  Discover: "discover",
  Popular: "popular",
  "Top Rated": "top_rated",
};

const MoviePageHome = () => {
  const searchParams = useSearchParams();
  const setKeywords = useSearchStore((state) => state.setKeyword);
  const searchQuery = searchParams.get("query")?.trim() ?? "";
  const isSearchMode = searchQuery.length > 0;
  const categoryTitle = searchParams.get("title") ?? "Movies";
  const category = categoryNameMap[categoryTitle] ?? "now_playing";
  const heading = "Movies";

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
    queryKey: isSearchMode ? ["movies", "search", searchQuery] : ["movies", "category", category],
    queryFn: ({ pageParam }) =>
      isSearchMode ? searchMovies(searchQuery, pageParam) : getMoviesByCategory(category, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
  const movies = useMemo(() => {
    const all = data?.pages.flatMap((page) => page.results) ?? [];
    return Array.from(new Map(all.map((m) => [m.id, m])).values());
  }, [data]);

  return (
    <main className="min-h-screen bg-black-main text-white">
      <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] bg-black-main pb-8 pt-18 md:pt-26">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-black font-semibold text-white md:text-4xl">
              {heading}
            </h1>
          </div>


        </div>
      </div>

      <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
        <div className="max-w-screen-2xl mx-auto">
        <div className="relative flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit md:h-10">
          <SearchInput />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
              <CardSkeleton key={`sk-${i}`} mode="grid" />
            ))
            : movies.map((movie) => (
              <MediaCard key={movie.id} item={movie}  />
            ))}

          {isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={`more-${i}`} mode="grid" />
            ))}
        </div>

        {isError && (
          <p className="py-8 text-red-400">
            Failed to load movies: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        <div>

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
      </div>
    </main>
  );
};

export default function MoviePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050505]/80 text-white">
          <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] to-[#050505]/80 pb-8 pt-24 md:pt-28">
            <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
              <div className="mb-6 text-center">
                <h1 className="text-4xl font-black font-semibold text-white md:text-4xl">Movies</h1>
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
      <MoviePageHome />
    </Suspense>
  );
}