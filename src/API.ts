import { Credits, Genre, LoginCredential, Movie, Movies } from "@/types";

const API_URL: string = "https://api.themoviedb.org/3/";
const API_KEY: string | undefined = import.meta.env.VITE_TMDB_API_KEY;

export const SEARCH_BASE_URL: string = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;
export const POPULAR_BASE_URL: string = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;

const REQUEST_TOKEN_URL = `${API_URL}authentication/token/new?api_key=${API_KEY}`;
const LOGIN_URL = `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}`;
const SESSION_ID_URL = `${API_URL}authentication/session/new?api_key=${API_KEY}`;

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
  fetchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
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
  getRequestToken: async (): Promise<string> => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  login: async (credential: LoginCredential, requestToken: string) => {
    const bodyData = {
      ...credential,
      request_token: requestToken,
    };

    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        method: "POST",
        body: JSON.stringify(bodyData),
      })
    ).json();

    if (data.success) {
      const sessionId = await (
        await fetch(SESSION_ID_URL, {
          ...defaultConfig,
          method: "POST",
          body: JSON.stringify({ request_token: requestToken }),
        })
      ).json();
      return sessionId;
    }
  },
};

export default apiSettings;
