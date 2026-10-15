import {
  getAiringTVPage,
  getOnTheAirTVPage,
  getPopularTVPage,
  getSearchedTVPage,
  getTopRatedTVPage,
} from "@/lib/getTVSeries";

const tvSeriesCategoryFetchers = {
  airing_today: getAiringTVPage,
  on_the_air: getOnTheAirTVPage,
  popular: getPopularTVPage,
  top_rated: getTopRatedTVPage,
} as const;

type TVSeriesCategory = keyof typeof tvSeriesCategoryFetchers;

const isTVSeriesCategory = (value: string): value is TVSeriesCategory => value in tvSeriesCategoryFetchers;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "airing_today").toLowerCase();
  const query = (searchParams.get("query") ?? "").trim();

  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isInteger(pageParam) && pageParam > 0 ? Math.min(pageParam, 500) : 1;

  try {
    if (query.length > 0) {
      const data = await getSearchedTVPage(query, page);
      return Response.json(data);
    }

    if (!isTVSeriesCategory(category)) {
      return Response.json({ error: "Invalid category" }, { status: 400 });
    }

    const data = await tvSeriesCategoryFetchers[category](page);
    return Response.json(data);
  } catch (error) {
    console.error("TV Series API route failed:", error);
    return Response.json({ error: "Failed to load TV series" }, { status: 500 });
  }
}