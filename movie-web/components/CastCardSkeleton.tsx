import React from 'react'
const CastCardSkeleton = () => {
    return (
        <div aria-hidden="true" className="group w-[100px] shrink-0 animate-pulse">
            <div className="h-[147px] w-full object-cover rounded-xl border border-white/10 bg-white/10" />
            <div className="mt-2 space-y-1.5">
                <div className="h-3.5 w-4/5 rounded bg-white/10" />
                <div className="h-3.5 w-3/5 rounded bg-white/10" />
            </div>
        </div>
    )
}

export default CastCardSkeleton;