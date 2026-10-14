"use client";
import React from "react";

import type { Movie, TV } from "../../type.ts";
import Link from "next/link";
import MovieCard from "./MovieCard";
import TVCard from "./TVCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

type Props = {
  title?: string;
  items: Array<Movie | TV>;
  mediaType: "movie" | "tv";
  isVertical?: boolean;
};

const SimilarContainer = ({ title, items, mediaType }: Props) => {
  const viewMoreHref =
    mediaType === "movie"
      ? `/Movie?title=${encodeURIComponent(title ?? "")}`
      : `/TVSeries?title=${encodeURIComponent(title ?? "")}`;

  return (
    <div>
      <div className="mx-10 flex items-center justify-between py-2">
        <h2 className="text-xl font-semibold tracking-wider text-white">{title}</h2>

      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView="auto"
        rewind
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="!px-5 lg:!px-10 !py-5"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="!w-auto">
            {mediaType === "movie" ? (
              <MovieCard movie={item as Movie} mode="carousel" />
            ) : (
              <TVCard tv={item as TV} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarContainer;