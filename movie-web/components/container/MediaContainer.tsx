"use client"
import React from 'react'

import type { Movie, TV } from "../../../type.js";
import Link from 'next/link';
import MediaCard from '../card/MediaCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css'

type Props={
    title?: string;
    items: Array<Movie|TV>
    mediaType: 'movie' | 'tv'
}

const autoplay = {delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true}


const MediaContainer = ({title, items, mediaType}: Props) => {
    const basePath = mediaType === 'movie' ? '/Movie' : '/TVSeries'
    const viewMoreHref = `${basePath}?title=${encodeURIComponent(title ?? '')}`
   
  return (
     <div className="mt-8 md:mt-16 mx-auto w-full px-3 md:px-6">
  <div className="flex items-center justify-between">
    <h2 className="text-white font-medium text-lg md:text-2xl">{title}</h2>
    <Link href={viewMoreHref} className="btn-sm btn-default sm:text-sm">View More</Link>
  </div>

  <Swiper
     modules={[Autoplay]}
                    spaceBetween={14}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
    rewind
    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
    className="my-swiper mt-8"
  >
    {items.map((item) => (
      <SwiperSlide key={item.id}>
        <MediaCard item={item} />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  )
}

export default MediaContainer