// page.tsx (no "use client" here)
import type { Metadata } from "next";
import TVSeriesPageClient from "./TVSeriesPageClient";

export const metadata: Metadata = {
  title: "TV Series",
  description: "Explore TV series from available list",
  openGraph: {
    type: "website",
    title: "TV Series",
    description: "Explore TV series from available list",
    siteName: "Movie Web",
    images: [
      {
        url: "/theTVSeries.png",
        width: 1200,
        height: 630,
        alt: "TV Series",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TV Series",
    description: "Explore TV series from available list",
    images: ["/theTVSeries.png"],
  },
};

export default function TVSeriesPage() {
  return <TVSeriesPageClient />;
}