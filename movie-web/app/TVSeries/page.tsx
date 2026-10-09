"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TVCard from '@/components/TVCard';
import { getTVByCategory, searchTVSeries } from "@/lib/client/tvApi";

const categoryNameMap: Record<string, string> = {
  OnTheAir: "on_the_air",
  AiringToday: "airing_today",
  Popular: "popular",
  "Top Rated": "top_rated",
};

const TVSeriesPageHome = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")?.trim() ?? "";
  const isSearchMode = searchQuery.length > 0;
  const categoryTitle = searchParams.get("title") ?? "OnTheAir";
  const category = categoryNameMap[categoryTitle] ?? "on_the_air";
  const heading = isSearchMode ? `Search Results: ${searchQuery}` : categoryTitle;

  const {
    data: tvSeries = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: isSearchMode ? ["tv", "search", searchQuery] : ["tv", "category", category],
    queryFn: () => (isSearchMode ? searchTVSeries(searchQuery) : getTVByCategory(category)),
  });

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{heading}</h1>
      </div>

      {isLoading && <p className="text-gray-300">Loading TV series...</p>}
      {isError && (
        <p className="text-red-400">
          Failed to load TV series: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tvSeries.map((tv) => (
          <TVCard key={tv.id} tv={tv} />
        ))}
      </div>
    </main>
  );
};

export default function TVSeriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black px-5 py-10 text-white">Loading TV series...</div>}>
      <TVSeriesPageHome />
    </Suspense>
  );
}