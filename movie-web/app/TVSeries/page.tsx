"use client";

import { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TVCard from '@/components/TVCard';
import { getTVByCategory, searchTVSeries } from "@/lib/client/tvApi";
import { useSearchStore } from "@/lib/store/searchStore";
import SearchInput from "@/components/SearchInput";

const categoryNameMap: Record<string, string> = {
  "On The Air": "on_the_air",
  "Airing Today": "airing_today",
  Popular: "popular",
  "Top Rated": "top_rated",
  "TV Series": "popular",
};

const TVSeriesPageHome = () => {
  const searchParams = useSearchParams();
  const setKeywords = useSearchStore((state) => state.setKeyword);
  const searchQuery = searchParams.get("query")?.trim() ?? "";
  const isSearchMode = searchQuery.length > 0;
  const categoryTitle = searchParams.get("title") ?? "Tv Series";
  const category = categoryNameMap[categoryTitle] ?? "popular";
  const heading = isSearchMode ? `Search Results: ${searchQuery}` : categoryTitle;

  useEffect(() => {
    if (searchQuery) {
      setKeywords(searchQuery);
    }
  }, [searchQuery, setKeywords]);

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
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] to-[#050505] pb-8 pt-24 md:pt-28">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
          <div className="mb-3 text-center">
            <h1 className="text-l font-semibold  text-white md:text-4xl">
              {heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 md:px-8 lg:px-10">
        {isLoading && (
          <p className="py-8 text-gray-300">Loading TV series...</p>
        )}

        {isError && (
          <p className="py-8 text-red-400">
            Failed to load TV series: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        <div>
          <div className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit mb-6">
            <SearchInput />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {tvSeries.map((tv) => (
              <TVCard key={tv.id} tv={tv} mode="grid" />
            ))}
          </div>
        </div>
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