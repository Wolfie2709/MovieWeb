"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TVCard from '@/components/TVCard';
import { getTVByCategory, searchTVSeries } from "@/lib/client/tvApi";
import { useSearchStore } from "@/lib/store/searchStore";
import SearchInput from "@/components/SearchInput";
import TvCardSkeleton from "@/components/TvCardSkeleton";

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
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
   queryKey: isSearchMode ? ["tv", "search", searchQuery] : ["tv", "category", category],
       queryFn: ({ pageParam }) =>
         isSearchMode ? searchTVSeries(searchQuery, pageParam) : getTVByCategory(category, pageParam),
       initialPageParam: 1,
       getNextPageParam: (lastPage) =>
         lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
    const tvSeries = useMemo(() => {
      const all = data?.pages.flatMap((page) => page.results) ?? [];
      return Array.from(new Map(all.map((tv) => [tv.id, tv])).values());
    }, [data]);
  

  return (
    <main className="min-h-screen bg-[#050505]/80 text-white">
      <div className="bg-gradient-to-b from-[#dfe2e6] via-[#7a7b7d] to-[#050505] pb-8 pt-20 md:pt-28">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
          <div className="mb-3 text-center">
            <h1 className="text-4xl font-black font-semibold text-white">
              {heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 md:px-4 lg:px-10">
          <div className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit mb-16">
            <SearchInput />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
              <TvCardSkeleton key={`sk-${i}`} mode="grid" />
            ))
            : tvSeries.map((tv) => (
              <TVCard key={tv.id} tv={tv} mode="grid" />
            ))}

          {isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, i) => (
              <TvCardSkeleton key={`more-${i}`} mode="grid" />
            ))}
        </div>
        {isError && (
          <p className="py-8 text-red-400">
            Failed to load TV series: {error instanceof Error ? error.message : "Unknown error"}
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