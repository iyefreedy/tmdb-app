import API from "@/API";
import { Cast, Crew, Genre, Movie } from "@/types";
import { useEffect, useState } from "react";

type MovieState = Movie & {
  actors: Cast[];
  directors: Crew[];
  genres: Genre[];
};

export const useMovieFetch = (id: string) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setLoading(true);

        const movie = await API.fetchMovieById(id);
        const credits = await API.fetchCredits(id);

        const directors = credits.crew.filter(
          (crew) => crew.job === "Director",
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchMovieById();
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(id, JSON.stringify(state));
  }, [id, state]);

  return { movie: state, error, loading };
};
