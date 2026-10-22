"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { getMovieVideos } from "@/lib/client/movieApi";

type Props = {
  movieId: number | null;
  onClose: () => void;
};

const TrailerModal = ({ movieId, onClose }: Props) => {
  const { 
    data: videos = [], 
    isLoading, 
    isError } = useQuery({
    queryKey: ["movie", "videos", String(movieId)],
    queryFn: () => getMovieVideos(String(movieId)),
    enabled: movieId !== null,
  });

  useEffect(() => {
    if (movieId === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [movieId, onClose]);

  if (movieId === null) return null;

  const youtube = videos.filter((v) => v.site === "YouTube");
  const trailer = youtube.find((v) => v.type === "Trailer") ?? youtube[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Trailer"
    >
      <div
        className="relative w-full max-w-4xl rounded-lg bg-neutral-900 p-3 md:p-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
        >
          <X size={28} />
        </button>

        <div className="aspect-video w-full overflow-hidden rounded bg-black">
          {isLoading && (
            <div className="flex h-full items-center justify-center text-gray-300">
              Loading trailer...
            </div>
          )}

          {!isLoading && trailer && (
            <iframe
              title={trailer.name}
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          )}

          {!isLoading && !trailer && (
            <div className="flex h-full items-center justify-center text-gray-300">
              {isError ? "Failed to load trailer." : "No trailer available."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;