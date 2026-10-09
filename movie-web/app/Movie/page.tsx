"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import MovieCard from '@/components/MovieCard';
import { getMoviesByCategory, searchMovies } from "@/lib/client/movieApi";

const categoryNameMap: Record<string, string> = {
  "Now Playing": "now_playing",
  Upcoming: "upcoming",
  Discover: "discover",
  Popular: "popular",
  "Top Rated": "top_rated",
};

const MoviePageHome = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")?.trim() ?? "";
  const isSearchMode = searchQuery.length > 0;
  const categoryTitle = searchParams.get("title") ?? "Now Playing";
  const category = categoryNameMap[categoryTitle] ?? "now_playing";
  const heading = isSearchMode ? `Search Results: ${searchQuery}` : categoryTitle;

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
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{heading}</h1>
      </div>

      {isLoading && <p className="text-gray-300">Loading movies...</p>}
      {isError && (
        <p className="text-red-400">
          Failed to load movies: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
};

export default function MoviePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black px-5 py-10 text-white">Loading movies...</div>}>
      <MoviePageHome />
    </Suspense>
  );
}