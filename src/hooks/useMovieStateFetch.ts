import API from "@/API";
import { MovieState } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type LoadingType = "favorite" | "watchlist" | "rated";

export const useMovieStateFetch = (movieId: number) => {
  const { user } = useAuth();

  const [state, setState] = useState<MovieState>({} as MovieState);
  const [isLoading, setLoading] = useState<LoadingType[]>([]);
  const [error, setError] = useState<boolean>(false);

  const isOnWatchlist = useMemo(() => {
    return state.watchlist;
  }, [state]);

  const isOnFavorite = useMemo(() => {
    return state.favorite;
  }, [state]);

  const isRated = useMemo(() => {
    return state.rated;
  }, [state]);

  useEffect(() => {
    const fetchMovieState = async () => {
      if (!user) return;

      try {
        setError(false);
        setLoading(["favorite", "watchlist", "rated"]);

        const sessionId = user.sessionId;
        const movieState = await API.fetchMovieState(sessionId, movieId);

        setState(movieState);
      } catch (error) {
        setError(true);
      }

      setLoading([]);
    };

    fetchMovieState();
  }, [movieId, user]);

  useEffect(() => {});

  const addToWatchList = async () => {
    try {
      setError(false);
      setLoading(["watchlist"]);

      if (!user) return;
      await API.addToWatchList(movieId, !state.watchlist, user.sessionId);

      const sessionId = user.sessionId;

      const movieState = await API.fetchMovieState(sessionId, movieId);
      setState(movieState);
    } catch (error) {
      setError(true);
    }

    setLoading([]);
  };

  const addToFavorite = async () => {
    try {
      setError(false);
      setLoading(["favorite"]);

      if (!user) return;
      await API.addToFavorite(movieId, !state.favorite, user.sessionId);

      const sessionId = user.sessionId;

      const movieState = await API.fetchMovieState(sessionId, movieId);
      setState(movieState);
    } catch (error) {
      setError(true);
    }

    setLoading([]);
  };

  const rateMovie = async (value: number) => {
    try {
      setError(false);
      setLoading(["rated"]);

      if (!user) return;
      await API.addRating(movieId, user.sessionId, value);

      const sessionId = user.sessionId;

      const movieState = await API.fetchMovieState(sessionId, movieId);
      setState(movieState);
    } catch (error) {
      setError(true);
    }

    setLoading([]);
  };

  return {
    movieState: state,
    isOnWatchlist,
    isOnFavorite,
    isRated,
    isLoading,
    error,
    addToWatchList,
    addToFavorite,
    rateMovie,
  };
};
