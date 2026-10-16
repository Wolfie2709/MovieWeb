"use client"
import React from 'react'
import Image from 'next/image';
import { TV } from '../../type'
import { getImagePath } from '../lib/getImagePath';
import Link from 'next/link';

type TVCardProps = {
  tv: TV;
  mode?: 'grid' | 'carousel';
};

const TVCard = ({ tv, mode = 'carousel' }: TVCardProps) => {
  const containerClass = mode === 'grid'
    ? 'w-full'
    : 'group shrink-0  w-[185px] sm:w-[220px] md:w-[230px]';

  return (
    <div className={containerClass}>
      <Link href={`/TVSeries/${tv.id}`} className="group/container block cursor-pointer">
        <div className="group/poster relative overflow-hidden rounded-3xl z-10">
          <Image
  src={getImagePath(tv?.poster_path || tv?.backdrop_path)}
  alt={tv.name}
  width={380}
  height={570}
  className="relative w-full h-72 2xl:h-80 object-cover rounded-3xl after:content-[''] after:absolute after:inset-0 after:rounded-3xl hover:after:bg-black/60 after:transition after:ease-in-out after:duration-300"
/>
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover/container:bg-black/35" />
          <button
            type="button"
            aria-label="Play trailer"
            tabIndex={-1}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-main px-8 py-4 text-xl text-white opacity-0 scale-50 shadow-btn transition ease-in-out duration-300 group-hover/poster:opacity-100 group-hover/poster:scale-100 hover:shadow-btn-hover"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </button>
        </div>
        <h3 className="mt-4 line-clamp-2 text-sm md:text-lg font-medium text-white transition duration-300 ease-in-out group-hover/container:text-red-main">
          {tv.name}
        </h3>
      </Link>
    </div>
  )
}

export default TVCard;