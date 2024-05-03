export type Movie = {
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
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Account = {
  id: number;
  name: string;
  username: string;
};

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

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type Genre = {
  id: number;
  name: string;
};

export type LoginCredential = {
  username: string;
  password: string;
};

export type MovieState = {
  id: number;
  watchlist: boolean;
  favorite: boolean;
  rated: object | boolean;
};
