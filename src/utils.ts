import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from "@/API";

export const getBackdropUrl = (path: string) => {
  return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${path}`;
};

export const getPosterUrl = (path: string) => {
  return `${IMAGE_BASE_URL}${POSTER_SIZE}${path}`;
};

export const isPersistedState = <T>(key: string) => {
  const sessionState = sessionStorage.getItem(key);
  return sessionState ? (JSON.parse(sessionState) as T) : null;
};

export const convertToTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};

export const formatDate = (strDate: string | undefined) => {
  if (!strDate) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const date = Date.parse(strDate);
  return formatter.format(date);
};

export const convertToCurrency = (num: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return formatter.format(num);
};
