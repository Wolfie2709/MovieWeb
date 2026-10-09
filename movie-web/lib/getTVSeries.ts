import type { TV, TVDetails, TVSearchResults, Videos } from "../../type";

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

export const getAiringTVSeries = async(): Promise<TV[]> => {
    const url = new URL("https://api.themoviedb.org/3/tv/airing_today?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<TVSearchResults>(url);
    return data?.results ?? [];
} ;

export const getOnTheAirTVSeries = async(): Promise<TV[]> => {
    const url = new URL("https://api.themoviedb.org/3/tv/on_the_air?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<TVSearchResults>(url);
    return data?.results ?? [];
} ;

export const getPopularTVSeries = async(): Promise<TV[]> => {
    const url = new URL("https://api.themoviedb.org/3/tv/popular?api_key=4f85134e0e3de33d9af45eb9596b5735");
    const data = await fetcher<TVSearchResults>(url);
    return data?.results ?? [];
} ;

export const getTopRatedTVSeries = async(id?:string, keywords?: string): Promise<TV[]> => {
    const url = new URL("https://api.themoviedb.org/3/tv/top_rated?api_key=4f85134e0e3de33d9af45eb9596b5735");
    keywords && url.searchParams.set("with_keywords", keywords);
    id && url.searchParams.set("with_genres", id);

    const data = await fetcher<TVSearchResults>(url);
    return data?.results ?? [];
} ;

export const getSearchedTVSeries = async(query: string): Promise<TV[]> => {
    const url = new URL("https://api.themoviedb.org/3/search/tv?api_key=4f85134e0e3de33d9af45eb9596b5735");
    url.searchParams.set("query", query);
    const data = await fetcher<TVSearchResults>(url);
    return data?.results ?? [];
};

export const getTVVideos = async(id?: string) => {
    const url = new URL(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=4f85134e0e3de33d9af45eb9596b5735`);
    const data = await fetcher<Videos>(url);
    return data?.results ?? [];
};

export const getTVSeriesDetails = async(id?: string) => {
    const url = new URL(`https://api.themoviedb.org/3/tv/${id}?api_key=4f85134e0e3de33d9af45eb9596b5735`);
    const data = await fetcher<TVDetails>(url);
    return data ?? null;
};

