import {
  getAiringTVSeries,
  getOnTheAirTVSeries,
  getPopularTVSeries,
  getSearchedTVSeries,
  getTopRatedTVSeries,
} from "@/lib/getTVSeries";

const tvSeriesCategoryFetchers = {
  airing_today: getAiringTVSeries,
  on_the_air: getOnTheAirTVSeries,
  popular: getPopularTVSeries,
  top_rated: getTopRatedTVSeries,
  search: getSearchedTVSeries,
} as const;

type TVSeriesCategory = Exclude<keyof typeof tvSeriesCategoryFetchers, "search">;

const isTVSeriesCategory = (value: string): value is TVSeriesCategory =>
  value in tvSeriesCategoryFetchers && value !== "search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "now_playing").toLowerCase();
  const query = (searchParams.get("query") ?? "").trim();

  try {
    if (query.length > 0) {
      const results = await getSearchedTVSeries(query);
      return Response.json({ results });
    }

    if (!isTVSeriesCategory(category)) {
      return Response.json({ error: "Invalid category" }, { status: 400 });
    }

    const results = await tvSeriesCategoryFetchers[category]();
    return Response.json({ results });
  } catch (error) {
    console.error("TV Series API route failed:", error);
    return Response.json({ error: "Failed to load TV series" }, { status: 500 });
  }
}
