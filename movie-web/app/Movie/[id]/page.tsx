import type { Metadata } from "next";
import MovieDetailsClient from "./MovieDetailsPageClient";
import { getMovieDetails } from "@/lib/client/movieApi";
import { getImagePath } from "@/lib/getImagePath";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(id);
   const path = movie.backdrop_path || movie.poster_path;
    const image = path ? `https://image.tmdb.org/t/p/original${path}` : "/theMovies.png";


    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        type: "website",
        title: movie.title,
        description: movie.overview,
        siteName: "Movie Web",
        images: [{ url: image, width: 1200, height: 630, alt: movie.title }],
      },
    };
  } catch (e) {
  console.error("generateMetadata failed:", e);
    return { title: "Movie Web" }; // fallback if the fetch fails
  }
}

export default function Page() {
  return <MovieDetailsClient />;
}