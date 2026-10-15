import type { Movie, MovieDetails, VideoProps, Credits, MoviesPage } from "../../../type";

type MoviesResponse = {
  results: Movie[];
    page?: number;
  total_pages?: number;
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

const fetchMovies = async (params: URLSearchParams): Promise<MoviesPage> => {
  const response = await fetch(`/api/movies?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = (await response.json()) as MoviesResponse;
  return {
    results: data.results ?? [],
    page: data.page ?? 1,
    totalPages: data.total_pages ?? 1,
  };
};

export const getMoviesByCategory = async (category: string, page=1): Promise<MoviesPage> => {
  const params = new URLSearchParams({ category, page: page.toString() });
  return fetchMovies(params);
};

export const searchMovies = async (query: string, page=1): Promise<MoviesPage> => {
  const params = new URLSearchParams({ query, page: page.toString() });
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
