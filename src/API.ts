import {
  Account,
  Credits,
  Genre,
  LoginCredential,
  Movie,
  MoviesResponse,
  MovieState,
} from "@/types";

const API_URL: string = "https://api.themoviedb.org/3/";
const API_KEY: string | undefined = import.meta.env.VITE_TMDB_API_KEY;

export const SEARCH_BASE_URL: string = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;
export const POPULAR_BASE_URL: string = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;

export const IMAGE_BASE_URL: string = "http://image.tmdb.org/t/p/";
// Options: w300, w780, w1280, original
export const BACKDROP_SIZE: string = "w1280";
// Options: w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE: string = "w780";

console.log(API_KEY);

const defaultConfig: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiSettings = {
  fetchMovies: async (
    searchTerm: string,
    page: number,
  ): Promise<MoviesResponse> => {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${POPULAR_BASE_URL}&page=${page}`;

    return await (await fetch(endpoint, defaultConfig)).json();
  },
  fetchMovieById: async (id?: string): Promise<Movie & { genres: Genre[] }> => {
    const endpoint = `${API_URL}movie/${id}?api_key=${API_KEY}`;
    return await (await fetch(endpoint, defaultConfig)).json();
  },
  fetchCredits: async (id?: string): Promise<Credits> => {
    const endpoint = `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;

    return await (await fetch(endpoint, defaultConfig)).json();
  },
  fetchRequestToken: async (): Promise<string> => {
    const reqToken = await (
      await fetch(`${API_URL}authentication/token/new?api_key=${API_KEY}`)
    ).json();
    return reqToken.request_token;
  },
  login: async (credential: LoginCredential, requestToken: string) => {
    const bodyData = {
      ...credential,
      request_token: requestToken,
    };

    const data = await (
      await fetch(
        `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}`,
        {
          ...defaultConfig,
          method: "POST",
          body: JSON.stringify(bodyData),
        },
      )
    ).json();

    if (data.success) {
      const sessionId = await (
        await fetch(`${API_URL}authentication/session/new?api_key=${API_KEY}`, {
          ...defaultConfig,
          method: "POST",
          body: JSON.stringify({ request_token: requestToken }),
        })
      ).json();
      return sessionId;
    }
  },
  logout: async (sessionId: string | undefined) => {
    const bodyData = {
      session_id: `${sessionId}`,
      preview: "",
    };

    return await (
      await fetch(`${API_URL}authentication/session?api_key=${API_KEY}`, {
        ...defaultConfig,
        method: "DELETE",
        body: JSON.stringify(bodyData),
      })
    ).json();
  },
  fetchAccountDetails: async (
    sessionId: string | undefined,
  ): Promise<Account> => {
    return await (
      await fetch(
        `${API_URL}account?session_id=${sessionId}&api_key=${API_KEY}`,
      )
    ).json();
  },
  fetchUserWatchList: async (
    accountId: number | undefined,
    sessionId: string | undefined,
  ): Promise<MoviesResponse> => {
    return await (
      await fetch(
        `${API_URL}account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`,
        defaultConfig,
      )
    ).json();
  },
  fetchUserFavorites: async (
    accountId: number | undefined,
    sessionId: string | undefined,
  ): Promise<MoviesResponse> => {
    return await (
      await fetch(
        `${API_URL}account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc`,
        defaultConfig,
      )
    ).json();
  },
  fetchMovieState: async (
    sessionId: string,
    movieId: number,
  ): Promise<MovieState> => {
    return await (
      await fetch(
        `${API_URL}movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${sessionId}`,
        defaultConfig,
      )
    ).json();
  },
  addToWatchList: async (
    movieId: number | undefined,
    isOnWatchlist: boolean,
    sessionId: string | undefined,
  ) => {
    const bodyData = {
      media_type: "movie",
      media_id: movieId,
      watchlist: isOnWatchlist,
    };

    return await (
      await fetch(
        `${API_URL}account/${movieId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          ...defaultConfig,
          method: "POST",
          body: JSON.stringify(bodyData),
        },
      )
    ).json();
  },
  addToFavorite: async (
    movieId: number | undefined,
    isOnWatchlist: boolean,
    sessionId: string | undefined,
  ) => {
    const bodyData = {
      media_type: "movie",
      media_id: movieId,
      favorite: isOnWatchlist,
    };

    return await (
      await fetch(
        `${API_URL}account/${movieId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          ...defaultConfig,
          method: "POST",
          body: JSON.stringify(bodyData),
        },
      )
    ).json();
  },
  addRating: async (
    movieId: number | undefined,
    sessionId: string | undefined,
    value: number,
  ) => {
    const dataBody = {
      value: value,
    };

    return await (
      await fetch(
        `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          ...defaultConfig,
          method: "POST",
          body: JSON.stringify(dataBody),
        },
      )
    ).json();
  },
};

export default apiSettings;
