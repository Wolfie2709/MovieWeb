import React from 'react'
import Image from 'next/image';
import { TV } from '../../type'
import {getImagePath} from '../lib/getImagePath';


const TVCard = ({tv}:{tv:TV}) => {
  return (
    <div className="group relative shrink-0 cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:drop-shadow-2xl">
        <div className="relative">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-gray-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="absolute bottom-5 left-5 z-20 translate-y-4 text-white font-bold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{tv.name}</p>
            <Image src={getImagePath(tv?.backdrop_path || tv?.poster_path)}
                alt={tv.name} width={1920} height={1080}
                className="h-56 w-fit object-cover shadow-md shadow-gray-900 drop-shadow-xl transition duration-500 ease-out lg:min-w-[400px]"
            />
        </div>
    </div>
  )
}

export default TVCard;