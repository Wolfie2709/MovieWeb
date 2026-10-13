"use client"
import React from 'react'

import type { TV } from "../../type.ts";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import TVCard from './TVCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

type Props = {
    title?: string;
    tv: TV[];
    isVertical?: boolean;
}

const TVContainer = ({ title, tv }: Props) => {
    const viewMoreHref = `/TVSeries?title=${encodeURIComponent(title ?? "")}`;
    return (
        <div>
            <div className="mx-10 mb-4 flex items-center justify-between border-b border-b-gray-500 py-2">
                <h2 className="text-2xl uppercase font-bold tracking-wider text-white">{title}</h2>
                <Link href={viewMoreHref}
                    className="bg-gray-800 text-sm text-white uppercase px-2 py-1 rounded-md border-indigo-600 font-semibold ">
                    View More
                </Link>
            </div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView="auto"
                rewind
                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                className="!px-5 lg:!px-10 !py-5"
            >
                {tv.map((tv) => (
                    <SwiperSlide key= {tv.id} className="!w-auto">
                        <TVCard tv={tv} mode="carousel" />
                    </SwiperSlide>
                    
                ))}

            </Swiper>

        </div>
    )
};

export default TVContainer;
