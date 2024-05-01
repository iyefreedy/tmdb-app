import ActorCard from "@/components/ActorCard";
import Spinner from "@/components/Spinner";
import { useMovieFetch } from "@/hooks/useMovieFetch";
import { getBackdropUrl, getPosterUrl } from "@/utils";
import { StarIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import noImagePlaceHolder from "@assets/no-image-placeholder.png";
import { useScreenSize } from "@/hooks/useScreenSize";
import React, { useMemo } from "react";
import Badge from "@/components/Badge";

const Movie: React.FC = () => {
  const { id } = useParams();

  const { movie, loading, error } = useMovieFetch(id!);
  const { size } = useScreenSize();

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
        className={`relative h-80 animate-fade-in bg-[url('${heroImageUrl}')] bg-[length:100%,_cover] bg-center md:h-[400px]`}
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 41%,
            rgba(0, 0, 0, 0.60) 100%
          ), url(${heroImageUrl})`,
        }}
      >
        <img
          src={`${
            movie.poster_path
              ? getBackdropUrl(movie.poster_path)
              : noImagePlaceHolder
          }`}
          alt={movie.original_title}
          className="absolute -bottom-40 left-0 right-0 mx-auto w-48 rounded-xl border-4 border-white bg-opacity-70 object-cover shadow-xl md:-bottom-64 md:left-5 md:right-auto md:w-60"
        />
      </div>

      <div className="mt-44 p-5 text-center md:ml-72 md:mt-4 md:text-start">
        <h2 className="mb-2.5 text-xl font-bold text-slate-800 md:text-2xl dark:text-slate-200">
          {movie.original_title}
        </h2>

        <div>
          <h2 className="font-medium text-slate-800 dark:text-slate-200">
            Directors
          </h2>

          <div className="mb-2 dark:text-slate-400">
            {movie.directors?.map((director) => (
              <span className="text-sm" key={director.name}>
                {director.name}
              </span>
            ))}
          </div>
        </div>

        <p className="mb-2 text-sm text-slate-600 md:text-base dark:text-slate-200">
          {movie.overview}
        </p>

        <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
          {movie.genres?.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-center md:justify-start">
          <StarIcon className="mr-1.5 inline-block h-4 w-4 text-yellow-400 md:h-6 md:w-6" />
          <p className="text-sm font-medium md:text-lg dark:text-slate-200">
            {`${movie.vote_average?.toFixed(1)}`}
            <span className="ml-3 text-xs underline md:text-sm">{`${movie.vote_count} reviews`}</span>
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
