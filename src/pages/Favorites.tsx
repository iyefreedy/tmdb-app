import { useFavoriteMovies } from "@/hooks/useFavoriteMovies";
import { getPosterUrl } from "@/utils";
import noImagePlaceholder from "@assets/no-image-placeholder.png";

const Favorites: React.FC = () => {
  const { state } = useFavoriteMovies();

  return (
    <main className="p-5">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Favorite Movies
      </h2>

      <ul>
        {state.results.map((movie) => (
          <li className="flex rounded-xl bg-white p-5 dark:bg-gray-900">
            <img
              src={
                movie.poster_path
                  ? getPosterUrl(movie.poster_path)
                  : noImagePlaceholder
              }
              alt={movie.original_title}
              width={100}
            />

            <div className="ml-4">
              <h3 className="mb-2 text-xl dark:text-gray-100">{movie.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {movie.overview}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Favorites;
