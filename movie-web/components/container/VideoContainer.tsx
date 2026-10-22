import React from 'react'
import { VideoProps } from '../../../type'

type VideoContainerProps = {
    videos: VideoProps[];
    limit?: number;
}

const VideoContainer = ({videos, limit=4}: VideoContainerProps) => {
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");
  const trailerVideos = youtubeVideos.filter((video) => video.type === "Trailer");
  const otherYoutubeVideos = youtubeVideos.filter((video) => video.type !== "Trailer");
  const featuredVideos = [...trailerVideos, ...otherYoutubeVideos].slice(0, limit);
  return (
            <div className="px-5 pb-8 md:px-8 lg:px-16">
          {featuredVideos.length > 0 ? (
            <div className="gap-5 ">
              {featuredVideos.map((video) => (
                <div key={video.id}>
                  <p className="mb-2 text-2xl font-bold text-white py-3">{video.name}</p>
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
                    <iframe
                      title={video.name}
                      src={`https://www.youtube.com/embed/${video.key}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No videos found for this movie.</p>
          )}
        </div>
  )
}

export default VideoContainer;