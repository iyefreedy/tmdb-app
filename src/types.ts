export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  backdrop_path?: string;
  release_date: string;
  poster_path?: string;
  adult: boolean;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export type Cast = {
  character: string;
  credit_id: string;
  name: string;
  profile_path?: string;
};

export type Crew = {
  job: string;
  name: string;
  credit_id: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type LoginCredential = {
  username: string;
  password: string;
};
