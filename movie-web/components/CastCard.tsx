"use client"
import React from 'react'
import Image from 'next/image';
import { Cast } from '../../type'
import {getImagePath} from '../lib/getImagePath';


const CastCard = ({cast}:{cast:Cast}) => {
  return (
    <div className="group w-24 shrink-0">
  <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md shadow-black/40 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
    <Image
      src={getImagePath(cast?.profile_path)}
      alt={cast.name}
      width={192}
      height={240}
      className="h-32 w-full object-cover"
    />
  </div>
  <p className="mt-2 truncate text-sm font-medium text-white">{cast.name}</p>
</div>
  )
}

export default CastCard;