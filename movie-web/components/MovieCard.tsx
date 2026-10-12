"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { Movie } from '../../type'
import {getImagePath} from '../lib/getImagePath';


const MovieCard = ({movie}:{movie:Movie}) => {
    const router = useRouter();
    const handleRoute = () => {
        router.push(`/Movie/${movie.id}`);
    };
  return (
    <div onClick={handleRoute} className="group shrink-0 w-[170px] cursor-pointer sm:w-[190px]">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md shadow-black/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
            <Image src={getImagePath(movie?.poster_path || movie?.backdrop_path)} alt={movie.title} width={380} height={570} className="h-[255px] w-full object-cover sm:h-[285px]" />
        </div>
         <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-white">{movie.title}</h3>
    </div>
  )
}

export default MovieCard;