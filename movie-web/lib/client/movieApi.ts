import type { Movie, MovieDetails, VideoProps, Credits } from "../../../type";

type MoviesResponse = {
  results: Movie[];
  error?: string;
};

type MovieVideosResponse = {
  results: VideoProps[];
  error?: string;
};

type SimilarMoviesResponse = {
  results: Movie[];
  error?: string;
};

const fetchMovies = async (params: URLSearchParams): Promise<Movie[]> => {
  const response = await fetch(`/api/movies?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = (await response.json()) as MoviesResponse;
  return data.results ?? [];
};

export const getMoviesByCategory = async (category: string): Promise<Movie[]> => {
  const params = new URLSearchParams({ category });
  return fetchMovies(params);
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const params = new URLSearchParams({ query });
  return fetchMovies(params);
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await fetch(`/api/movies/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as MovieDetails;
};

export const getMovieVideos = async (id: string): Promise<VideoProps[]> => {
  const response = await fetch(`/api/movies/${encodeURIComponent(id)}/videos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = (await response.json()) as MovieVideosResponse;
  return data.results ?? [];
};

export const getMovieCredits = async (id: string): Promise<Credits> => {
    const response = await fetch(`/api/movies/${encodeURIComponent(id)}/credits`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

  return (await response.json()) as Credits;
};

export const getSimilarMovies = async (id: string): Promise<Movie[]> => {
    const response = await fetch(`/api/movies/${encodeURIComponent(id)}/similar`,{
        cache: "no-store",
    });
    if (!response.ok){
        throw new Error(`Request failed: ${response.status}`);
    }
    const data = (await response.json()) as SimilarMoviesResponse;
    return data.results ??[];

}
