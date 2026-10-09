"use client"
import React from 'react'
import Image from 'next/image';
import { Cast } from '../../type'
import {getImagePath} from '../lib/getImagePath';


const CastCard = ({cast}:{cast:Cast}) => {
  return (
    <div className="group flex w-full max-w-sm items-center gap-3 overflow-hidden rounded-xl bg-gray-900/60 p-3 transition duration-300 hover:bg-gray-800/80">
      <Image
        src={getImagePath(cast?.profile_path)}
        alt={cast.name}
        width={160}
        height={160}
        className="h-20 w-20 rounded-lg object-cover shadow-md shadow-gray-900 sm:h-24 sm:w-24"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-white sm:text-base">{cast.name}</p>
        <p className="truncate text-xs text-gray-300 sm:text-sm">{cast.character || "Cast"}</p>
      </div>
    </div>
  )
}

export default CastCard;