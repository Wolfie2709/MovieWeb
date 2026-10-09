import {
  getDiscoverMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getSearchedMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

const movieCategoryFetchers = {
  now_playing: getNowPlayingMovies,
  upcoming: getUpcomingMovies,
  discover: getDiscoverMovies,
  popular: getPopularMovies,
  top_rated: getTopRatedMovies,
} as const;

type MovieCategory = keyof typeof movieCategoryFetchers;

const isMovieCategory = (value: string): value is MovieCategory => value in movieCategoryFetchers;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "now_playing").toLowerCase();
  const query = (searchParams.get("query") ?? "").trim();

  try {
    if (query.length > 0) {
      const results = await getSearchedMovies(query);
      return Response.json({ results });
    }

    if (!isMovieCategory(category)) {
      return Response.json({ error: "Invalid category" }, { status: 400 });
    }

    const results = await movieCategoryFetchers[category]();
    return Response.json({ results });
  } catch (error) {
    console.error("Movie API route failed:", error);
    return Response.json({ error: "Failed to load movies" }, { status: 500 });
  }
}
