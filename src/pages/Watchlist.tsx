import AccountMovieState from "@/components/AccountMovieState";
import Spinner from "@/components/Spinner";
import { useWatchlistMoviesFetch } from "@/hooks/useWatchlistMoviesFetch";
import { getPosterUrl } from "@/utils";
import noImagePlaceholder from "@assets/no-image-placeholder.png";

const Watchlist: React.FC = () => {
  const { state, loading } = useWatchlistMoviesFetch();

  return (
    <main className="p-5">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Watchlist Movies
      </h2>

      <ul className="space-y-4">
        {loading ? (
          <Spinner />
        ) : (
          state.results.map((movie) => (
            <li className="rounded-xl bg-white p-5 shadow-lg md:flex dark:bg-gray-900">
              <img
                src={
                  movie.poster_path
                    ? getPosterUrl(movie.poster_path)
                    : noImagePlaceholder
                }
                alt={movie.original_title}
                width={100}
              />

              <div className="mt-4 md:ml-4 md:mt-0">
                <div className="mb-2">
                  <h3 className="mb-2 text-xl dark:text-gray-100">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {movie.overview}
                  </p>
                </div>

                <AccountMovieState movieId={movie.id} />
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Watchlist;
