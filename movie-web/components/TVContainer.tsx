"use client"
import React from 'react'

import type { TV } from "../../type.ts";
import Link from 'next/link';
import TVCard from './TVCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

type Props = {
    title?: string;
    tv: TV[];
    isVertical?: boolean;
}

const TVContainer = ({ title, tv }: Props) => {
    const viewMoreHref = `/TVSeries?title=${encodeURIComponent(title ?? "")}`;

    return (
       <div className="mt-8 md:mt-16 mx-auto w-full max-w-[1600px] px-6 md:px-10">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
    <Link href={viewMoreHref} className="btn-sm btn-default">View More</Link>
  </div>

  <Swiper
    modules={[Autoplay]}
    spaceBetween={16}
    slidesPerView={2}
    breakpoints={{
      640:  { slidesPerView: 4 },
      1024: { slidesPerView: 6 },
    }}
    rewind
    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
    className="my-swiper"
  >
    {tv.map((item) => (
      <SwiperSlide key={item.id}>
        <TVCard tv={item} mode="carousel" />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
    )
}

export default TVContainer;
