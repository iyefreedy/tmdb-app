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

export const useFavoriteMovies = () => {
  const { user } = useAuth();

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (!user) return;
      const account = await API.fetchAccountDetails(user.sessionId);
      const movies = await API.fetchUserFavorites(account.id, user.sessionId);

      setState((previousState) => ({
        ...movies,
        results:
          movies.page > 1
            ? [...previousState.results, ...movies.results]
            : [...movies.results],
      }));
    };

    fetchFavoriteMovies();
  }, [user]);

  return { state };
};
