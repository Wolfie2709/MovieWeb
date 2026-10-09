import type { TV, TVDetails, VideoProps, Credits } from "../../../type";

type TVResponse = {
  results: TV[];
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

const fetchTVSeries = async (params: URLSearchParams): Promise<TV[]> => {
  const response = await fetch(`/api/tv?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = (await response.json()) as TVResponse;
  return data.results ?? [];
};

export const getTVByCategory = async (category: string): Promise<TV[]> => {
  const params = new URLSearchParams({ category });
  return fetchTVSeries(params);
};

export const searchTVSeries = async (query: string): Promise<TV[]> => {
  const params = new URLSearchParams({ query });
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
