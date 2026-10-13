"use client";

import { Suspense, useEffect } from "react";
import { useSearchStore } from "@/lib/store/searchStore";
import { useQuery } from "@tanstack/react-query";
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
  const categoryTitle = searchParams.get("title") ?? "Now Playing";
  const category = categoryNameMap[categoryTitle] ?? "now_playing";
  const heading = isSearchMode ? `Search Results: ${searchQuery}` : categoryTitle;

  useEffect(() => {
    if (searchQuery) {
      setKeywords(searchQuery);
    }
  }, [searchQuery, setKeywords]);

  const {
    data: movies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: isSearchMode ? ["movies", "search", searchQuery] : ["movies", "category", category],
    queryFn: () => (isSearchMode ? searchMovies(searchQuery) : getMoviesByCategory(category)),
  });

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-8 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red-500">
              Discover
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[-0.05em] text-white md:text-5xl">
              {heading}
            </h1>
          </div>

          <div className="w-full max-w-lg md:w-auto">
            <SearchInput />
          </div>
        </div>

        {isLoading && (
          <p className="py-8 text-gray-300">Loading movies...</p>
        )}

        {isError && (
          <p className="py-8 text-red-400">
            Failed to load movies: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} mode="grid" />
          ))}
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