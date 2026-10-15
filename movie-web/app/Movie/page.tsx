"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchStore } from "@/lib/store/searchStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import MovieCard from '@/components/MovieCard';
import { getMoviesByCategory, searchMovies } from "@/lib/client/movieApi";
import SearchInput from "@/components/SearchInput";

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
    <main className="min-h-screen bg-[#050505]/80 text-white">
      <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] to-[#050505]/80 pb-8 pt-24 md:pt-28">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-black font-semibold text-white md:text-4xl">
              {heading}
            </h1>
          </div>


        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-4 md:px-8 lg:px-10">
        {isLoading && (
          <p className="py-8 text-gray-300">Loading movies...</p>
        )}

        {isError && (
          <p className="py-8 text-red-400">
            Failed to load movies: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        <div>
          <div className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit mb-16">
            <SearchInput />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} mode="grid" />
            ))}
          </div>
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

export default function MoviePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] px-5 py-10 text-white">Loading movies...</div>}>
      <MoviePageHome />
    </Suspense>
  );
}