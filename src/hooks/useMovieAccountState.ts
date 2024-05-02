import API from "@/API";
import { MovieState } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type LoadingType = "favorite" | "watchlist";

export const useMovieAccountState = (movieId: number) => {
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

  useEffect(() => {
    const fetchMovieState = async () => {
      if (!user) return;

      try {
        setError(false);
        setLoading(["favorite", "watchlist"]);

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

  return {
    movieState: state,
    isOnWatchlist,
    isOnFavorite,
    isLoading,
    error,
    addToWatchList,
    addToFavorite,
  };
};
