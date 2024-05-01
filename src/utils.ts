import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from "@/API";

export const getBackdropUrl = (path: string) => {
  return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${path}`;
};

export const getPosterUrl = (path: string) => {
  return `${IMAGE_BASE_URL}${POSTER_SIZE}${path}`;
};

export const isPersistedState = <T>(key: string) => {
  const sessionState = sessionStorage.getItem(key);
  return sessionState && (JSON.parse(sessionState) as T);
};
