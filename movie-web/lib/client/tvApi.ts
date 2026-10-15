import type { TV, TVDetails, VideoProps, Credits, TVSeriesPage } from "../../../type";

type TVResponse = {
  results: TV[];
  page: number;
  total_pages: number;
  error?: string;
};

type TVVideosResponse = {
  results: VideoProps[];
  error?: string;
};

type SimilarTVResponse = {
  results: TV [];
  error?: string;
};

const fetchTVSeries = async (params: URLSearchParams): Promise<TVSeriesPage> => {
  const response = await fetch(`/api/tv?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

 const data = (await response.json()) as TVResponse;
  return {
    results: data.results ?? [],
    page: data.page ?? 1,
    totalPages: data.total_pages ?? 1,
  };

};

export const getTVByCategory = async (category: string, page=1): Promise<TVSeriesPage> => {
  const params = new URLSearchParams({ category,  page: page.toString() });
  return fetchTVSeries(params);
};

export const searchTVSeries = async (query: string, page=1): Promise<TVSeriesPage> => {
  const params = new URLSearchParams({ query,  page: page.toString() });
  return fetchTVSeries(params);
};

export const getTVDetails = async (id: string): Promise<TVDetails> => {
  const response = await fetch(`/api/tv/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as TVDetails;
};

export const getTVVideos = async (id: string): Promise<VideoProps[]> => {
  const response = await fetch(`/api/tv/${encodeURIComponent(id)}/videos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = (await response.json()) as TVVideosResponse;
  return data.results ?? [];
};

export const getTVCredits = async (id: string): Promise<Credits> => {
    const response = await fetch(`/api/tv/${encodeURIComponent(id)}/credits`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

  return (await response.json()) as Credits;
};

export const getSimilarTVSeries = async (id: string): Promise<TV[]> => {
    const response = await fetch(`/api/tv/${encodeURIComponent(id)}/similar`,{
        cache: "no-store",
    });
    if (!response.ok){
        throw new Error(`Request failed: ${response.status}`);
    }
    const data = (await response.json()) as SimilarTVResponse;
    return data.results ??[];

}
