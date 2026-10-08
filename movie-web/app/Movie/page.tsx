import React from 'react';
import MovieCard from '@/components/MovieCard';
import {
  getDiscoverMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/lib/getMovies';

type Props = {
  searchParams: {
    title?: string;
  };
};

const MoviePageHome = async ({ searchParams: { title } }: Props) => {
  const category = title ?? 'Now Playing';

  let movies = [];

  if (category === 'Now Playing') {
    movies = await getNowPlayingMovies();
  } else if (category === 'Upcoming') {
    movies = await getUpcomingMovies();
  } else if (category === 'Discover') {
    movies = await getDiscoverMovies();
  } else if (category === 'Popular') {
    movies = await getPopularMovies();
  } else if (category === 'Top Rated') {
    movies = await getTopRatedMovies();
  }

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{category}</h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
};

export default MoviePageHome;