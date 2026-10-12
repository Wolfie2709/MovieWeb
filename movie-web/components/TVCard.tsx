 "use client";
import React from 'react'
import Image from 'next/image';
import { TV } from '../../type';
import {getImagePath} from '../lib/getImagePath';
import { useRouter } from 'next/navigation';


const TVCard = ({tv}:{tv:TV}) => {
  const router = useRouter();
const handleRoute = () => {
  router.push(`/TVSeries/${tv.id}`);
};
  return (
    <div onClick={handleRoute} className="group shrink-0 w-42.5 cursor-pointer sm:w-47.5">
       <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md shadow-black/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
    <Image
        src={getImagePath(tv?.poster_path || tv?.backdrop_path)}
        alt={tv.name}
        width={380}
        height={570}
        className="h-63.75 w-full object-cover sm:h-71.25"
    />
</div>
<h3 className="mt-2 line-clamp-2 text-sm font-semibold text-white">{tv.name}</h3>
    </div>
  )
}

export default TVCard;