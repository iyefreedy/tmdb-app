import API from "@/API";
import { Movie, MoviesResponse } from "@/types";

import { useEffect, useState } from "react";

const initialState: MoviesResponse = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [state, setState] = useState<MoviesResponse>(initialState);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const fetchMovies = async (page: number, searchTerm: string = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((previousState) => ({
        ...movies,
        results:
          page > 1
            ? [...previousState.results, ...movies.results]
            : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  // Handling search movies or initial
  useEffect(() => {
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Handling load more movies
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  return {
    state,
    loading,
    error,
    isLoadingMore,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  };
};
