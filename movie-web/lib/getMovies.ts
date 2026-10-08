import type { MovieDetails, SearchResults, Videos } from "../../type";

const fetcher = async <T>(url: URL, cacheTime?: number): Promise<T | null> => {
    try {

        const token = process.env.TMDB_READ_ACCESS_KEY ?? process.env.TMDB_API_KEY;
        const headers = new Headers({ accept: "application/json", "Content-Type": "text/plain; charset=utf-8" });
        const response = await fetch(url.toString(), {
            method: "GET",
            headers,
            next: {
                revalidate: cacheTime ?? 60 * 60 * 24,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`TMDB request failed (${response.status}): ${text || response.statusText}`);
            return null;
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error(`TMDB fetch failed for ${url.toString()}:`, error);
        return null;
    }
};

export const getUpcomingMovies = async() => {
    const url = new URL("https://api.themoviedb.org/3/movie/upcoming?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<SearchResults>(url);
    return data?.results ?? [];
} ;

export const getTopRatedMovies = async() => {
    const url = new URL("https://api.themoviedb.org/3/movie/top_rated?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<SearchResults>(url);
    return data?.results ?? [];
} ;

export const getPopularMovies = async() => {
    const url = new URL("https://api.themoviedb.org/3/movie/popular?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<SearchResults>(url);
    return data?.results ?? [];
} ;

export const getDiscoverMovies = async(id?:string, keywords?: string) => {
    const url = new URL("https://api.themoviedb.org/3/discover/movie?api_key=4f85134e0e3de33d9af45eb9596b5735");
    keywords && url.searchParams.set("with_keywords", keywords);
    id && url.searchParams.set("with_genres", id);

    const data = await fetcher<SearchResults>(url);
    return data?.results ?? [];
} ;

export const getNowPlayingMovies = async() => {
    const url = new URL("https://api.themoviedb.org/3/movie/now_playing?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<SearchResults>(url);
    return data?.results ?? [];
} ;

export const getSearchedMovies = async(term: string) => {
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("query", term);
    const data = await fetcher<SearchResults>(url);
    return data?.results ?? [];
};

export const getMovieVideos = async(id?: string) => {
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=4f85134e0e3de33d9af45eb9596b5735`);
    const data = await fetcher<Videos>(url);
    return data?.videos ?? [];
};

export const getMovieDetails = async(id?: string) => {
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}?api_key=4f85134e0e3de33d9af45eb9596b5735`);
    const data = await fetcher<MovieDetails>(url);
    return data ?? null;
};

