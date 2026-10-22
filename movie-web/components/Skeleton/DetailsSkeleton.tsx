import React from 'react'
import CastCardSkeleton from "@/components/Skeleton/CastCardSkeleton";


const Bar = ({ className = "" }: { className?: string }) => (
    <div className={`rounded bg-white/10 ${className}`} />
);

const DetailsSkeleton = () => {

    return (
        <div className="w-full animate-pulse" aria-hidden="true">
            <div className="pt-8 md:pt-16" >
                <div className="relative px-4 md:px-5 lg:px-20 py-7 ">
                    <div className="mb-0 grid gap-0 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)] md:items-start">
                        <div className="mx-auto w-48 overflow-hidden rounded-[22px] border border-white/10 bg-zinc-900 shadow-xl md:mx-0 md:w-full md:h-[360px] lg:h-[500px] md:px-1" />
                        <div className="px-4 pb-0 lg:pt-0">
                            <div className="mb-2 text-2xl font-bold md:text-5xl" />

                            <div className="py-4 flex flex-wrap gap-2 px-1 mb-4">
                                <div className="h-7 rounded-full bg-white/10 lg:h-8" />
                            </div>
                            <div className="space-y-2">
                                <Bar className="h-3.5 w-full" />
                                <Bar className="h-3.5 w-full" />
                                <Bar className="h-3.5 w-11/12" />
                                <Bar className="h-3.5 w-2/3" />
                            </div>

                            <Bar className="mb-3 mt-6 h-6 w-24" />
                            <div className="flex flex-wrap gap-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <CastCardSkeleton key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsSkeleton