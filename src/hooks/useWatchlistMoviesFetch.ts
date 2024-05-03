import API from "@/API";
import { Movie, MoviesResponse } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const initialState: MoviesResponse = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

export const useWatchlistMoviesFetch = () => {
  const { user } = useAuth();

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        setError(false);
        setLoading(true);

        if (!user) {
          setError(true);
          return;
        }

        const account = await API.fetchAccountDetails(user.sessionId);
        const movies = await API.fetchUserWatchList(account.id, user.sessionId);

        setState((previousState) => ({
          ...movies,
          results:
            movies.page > 1
              ? [...previousState.results, ...movies.results]
              : [...movies.results],
        }));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchFavoriteMovies();
  }, [user]);

  return { state, loading, error };
};
