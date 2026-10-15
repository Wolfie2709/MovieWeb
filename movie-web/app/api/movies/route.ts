import {
  getDiscoverMoviesPage,
  getNowPlayingMoviesPage,
  getPopularMoviesPage,
  getSearchedMoviesPage,
  getTopRatedMoviesPage,
  getUpcomingMoviesPage,
} from "@/lib/getMovies";

const movieCategoryFetchers = {
  now_playing: getNowPlayingMoviesPage,
  upcoming: getUpcomingMoviesPage,
  discover: getDiscoverMoviesPage,
  popular: getPopularMoviesPage,
  top_rated: getTopRatedMoviesPage,
} as const;

type MovieCategory = keyof typeof movieCategoryFetchers;

const isMovieCategory = (value: string): value is MovieCategory => value in movieCategoryFetchers;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "now_playing").toLowerCase();
  const query = (searchParams.get("query") ?? "").trim();

  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isInteger(pageParam) && pageParam > 0 ? Math.min(pageParam, 500) : 1;

  try {
    if (query.length > 0) {
      const data = await getSearchedMoviesPage(query, page);
      return Response.json(data);
    }

    if (!isMovieCategory(category)) {
      return Response.json({ error: "Invalid category" }, { status: 400 });
    }

    const data = await movieCategoryFetchers[category](page);
    return Response.json(data);
  } catch (error) {
    console.error("Movie API route failed:", error);
    return Response.json({ error: "Failed to load movies" }, { status: 500 });
  }
}