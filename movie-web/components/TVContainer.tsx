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
        <div className="mt-8 md:mt-16">
            <div className="mx-10 mb-4 flex items-center justify-between px-2">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
                <Link
                    href={viewMoreHref}
                    className="btn-sm btn-default"
                >
                    View More
                </Link>
            </div>

            <Swiper
                 modules={[Autoplay]}
                                spaceBetween={14}
                                slidesPerView={6}
                                rewind
                                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                className="my-swiper" 
            >
                {tv.map((item) => (
                    <SwiperSlide key={item.id} className="!w-auto">
                        <TVCard tv={item} mode="carousel" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TVContainer;
