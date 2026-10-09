export type Movie={
adult: boolean;
backdrop_path: string;
genre_ids: number[];
id: number;
original_language: string;
original_title: string;
overview: string;
release_date: string;
title: string;
video: boolean;
vote_average: number;
vote_count: number;
poster_path: string;
}

export type TV ={
    backdrop_path: string;
    first_air_date: string;
    genre_ids:number[];
    id:number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}


export type SearchResults={
    page:number;
    results: Movie[];
    total_pages:number;
    total_results:number;
}

export type TVSearchResults={
    page:number;
    results: TV[];
    total_pages:number;
    total_results:number;
}

export type Genre={
    id: number;
    name: string;
}

export type Genres={
 genres: Genre[];
}

export type VideoProps={
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
};

export type Videos={
    results: VideoProps[];
}

export type Collection={
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: Movie[];
}



export type MovieDetails={
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object[];
    budget:number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Companies[];
    production_countries: Countries[];
    release_date: string;
    revenue: number;    
    runtime: number;
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;   
    vote_count: number;
}
export type SpokenLanguages={
    english_name: string;
    iso_639_1: string;
    name: string;
}

export type Countries={
    iso_3166_1: string;
    name: string;
}

export type Companies={

}

export interface Props {
    id?:string;
    keywords?: string;
}

export type TVDetails={
    adult: boolean;
    backdrop_path: string;
    created_by: object[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id:number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air:object[];
    name: string;
    next_episode_to_air: object[];
    networks: object[];
    number_of_episodes: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Companies[];
    production_countries: Production_Countries[];
    seasons: object[];
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
};

export type Production_Countries= {
    iso_3166_1: string;
    name:string;
} 

export type TVSeasons={

}

export type Credits={
    id: string;
    cast: Cast[];
}

export type Cast={
    adult: boolean;
    gender: number;
    id: number; 
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

