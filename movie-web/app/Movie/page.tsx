// page.tsx (no "use client" here)
import type { Metadata } from "next";
import MoviePageClient from "./MoviePageClient";
import MediaPage from "@/components/MediaPageClient";

export const metadata: Metadata = {
  title: "Movies",
  description: "Explore movies from available movie list",
  openGraph: {
    type: "website",
    title: "Movies",
    description: "Explore movies from available movie list",
    siteName: "Movie Web",
    images: [
      {
        url: "/theMovies.png",
        width: 1200,
        height: 630,
        alt: "Movies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies",
    description: "Explore movies from available movie list",
    images: ["/theMovies.png"],
  },
};

export default function MoviePage() {
  return <MediaPage type="movie" />;
}