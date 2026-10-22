import type { Metadata } from "next";

import DetailsPageClient from "@/components/DetailsPageClient";

async function getMovieForMeta(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4f85134e0e3de33d9af45eb9596b5735`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    }
  );
  console.log("TMDB status:", res.status);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await getMovieForMeta(id);
    const path = movie.backdrop_path || movie.poster_path;
    const image = path
      ? `https://image.tmdb.org/t/p/w1280${path}`
      : "/theMovies.png";

    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        type: "website",
        title: movie.title,
        description: movie.overview,
        siteName: "Movie Web",
        images: [{ url: image, width: 1280, height: 720, alt: movie.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: movie.title,
        description: movie.overview,
        images: [image],
      },
    };
  } catch (e) {
    console.error("generateMetadata failed:", e);
    return { title: "Movie Web" };
  }
}

export default function Page() {
  return <DetailsPageClient mediaType="movie" />;
}