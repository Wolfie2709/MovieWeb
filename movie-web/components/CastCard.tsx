"use client"
import React from 'react'
import Image from 'next/image';
import { Cast } from '../../type'
import {getImagePath} from '../lib/getImagePath';


const CastCard = ({cast}:{cast:Cast}) => {
  return (
    <div className="group w-[100px] shrink-2 md:shrink-0">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md shadow-black/40 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <Image
          src={getImagePath(cast?.profile_path)}
          alt={cast.name}
          width={192}
          height={240}
          className="h-[147px] w-full object-cover"
        />
      </div>
      <p className="text-white text-xs md:text-sm font-sm">{cast.name}</p>
    </div>
  )
}

export default CastCard;