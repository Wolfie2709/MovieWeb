import type { Metadata } from "next";
import TVDetailsPageClient from "./TVSeriesDetailsPageClient";

async function getTVForMeta(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=4f85134e0e3de33d9af45eb9596b5735`,
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
    const tv = await getTVForMeta(id);
    const path = tv.backdrop_path || tv.poster_path;
    const image = path
      ? `https://image.tmdb.org/t/p/w1280${path}`
      : "/theMovies.png";

    return {
      title: tv.name,
      description: tv.overview,
      openGraph: {
        type: "website",
        title: tv.name,
        description: tv.overview,
        siteName: "Movie Web",
        images: [{ url: image, width: 1280, height: 720, alt: tv.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: tv.name,
        description: tv.overview,
        images: [image],
      },
    };
  } catch (e) {
    console.error("generateMetadata failed:", e);
    return { title: "Movie Web" };
  }
}

export default function Page() {
  return <TVDetailsPageClient />;
}