import React from 'react'
import {getMovieVideos} from "../../../lib/getMovies";

type Props=
{  params:{
    id: string;
  }
}
const MovieDetailsPage = async ({params: {id}}: Props) => {
  const movies = await getMovieVideos(id);
  return (
    <div>page</div>
  )
}

export default MovieDetailsPage;