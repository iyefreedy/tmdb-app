import ActorCard from "@/components/ActorCard";
import Spinner from "@/components/Spinner";
import { useMovieFetch } from "@/hooks/useMovieFetch";
import {
  convertToCurrency,
  convertToTime,
  formatDate,
  getBackdropUrl,
  getPosterUrl,
} from "@/utils";
import { StarIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import noImagePlaceHolder from "@assets/no-image-placeholder.png";
import { useScreenSize } from "@/hooks/useScreenSize";
import React, { useMemo } from "react";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import AccountMovieState from "@/components/AccountMovieState";

const Movie: React.FC = () => {
  const { movieId } = useParams();
  const { user } = useAuth();
  const { movie, loading, error } = useMovieFetch(movieId!);
  const { size } = useScreenSize();

  const directors = useMemo(() => {
    return movie.directors?.map((director) => director.name).join(",");
  }, [movie]);

  const heroImageUrl = useMemo(() => {
    if (movie.poster_path && size.width < 1024) {
      return getPosterUrl(movie.poster_path);
    }

    if (movie.backdrop_path) {
      return getBackdropUrl(movie.backdrop_path);
    }

    return noImagePlaceHolder;
  }, [size.width, movie]);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      <div
        className={`relative animate-fade-in bg-[length:100%,_cover] bg-center p-5 md:flex`}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImageUrl})`,
        }}
      >
        <img
          src={`${
            movie.poster_path
              ? getBackdropUrl(movie.poster_path)
              : noImagePlaceHolder
          }`}
          alt={movie.original_title}
          className="mx-auto h-auto w-48 rounded-xl border-4 border-white bg-opacity-70 object-cover bg-blend-overlay shadow-xl md:-bottom-64 md:left-5 md:right-auto md:w-60"
        />

        <div className="p-5 text-center md:text-start">
          <h2 className="mb-1.5 text-xl font-bold  text-slate-200 shadow-black text-shadow md:text-2xl">
            {movie.original_title}
          </h2>

          {movie.tagline && (
            <p className="mb-1.5 italic text-gray-400">{movie.tagline}</p>
          )}

          <p className="mb-2 text-sm text-gray-300 shadow-black text-shadow-sm md:text-base">
            {movie.overview}
          </p>

          <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {movie.genres?.map((genre) => (
              <Badge key={genre.id} className="bg-orange-400 text-gray-900">
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="mb-2 flex items-center justify-center md:justify-start">
            <StarIcon className="mr-1.5 inline-block h-4 w-4 text-yellow-400 md:h-6 md:w-6" />
            <p className="text-sm font-medium text-neutral-100 md:text-lg">
              {`${movie.vote_average?.toFixed(1)}`}
              <span className="ml-3 text-xs underline md:text-sm">{`${movie.vote_count} reviews`}</span>
            </p>
          </div>
          {user && <AccountMovieState movieId={parseInt(movieId!)} />}
        </div>
      </div>
      <div className="mb-2 grid grid-cols-3 gap-4 p-5">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Directors
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{directors}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Duration
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {convertToTime(movie.runtime)}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Budget
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {convertToCurrency(movie.budget)}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Revenue
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {convertToCurrency(movie.revenue)}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Status
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{movie.status}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Release date
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </div>
      <div className="mt-8 p-5">
        <h2 className="mb-4 font-bold text-slate-800 md:text-xl">Actors</h2>

        <div className="grid grid-cols-card justify-center gap-8">
          {movie.actors?.map((actor, index) => (
            <ActorCard actor={actor} key={actor.character + index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Movie;
