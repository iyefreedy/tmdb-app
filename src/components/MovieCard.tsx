import { Link } from "react-router-dom";
import noImagePlaceHolder from "@assets/no-image-placeholder.png";
import { Movie } from "@/types";
import { getPosterUrl } from "@/utils";

interface Props {
  movie: Movie;
}

const Card: React.FC<Props> = ({ movie }) => {
  return (
    <Link
      key={movie.id}
      to={`/movie/${movie.id}`}
      className="animate-fade-in overflow-hidden rounded-xl shadow-lg transition hover:scale-105 hover:opacity-80"
    >
      <img
        key={movie.id}
        className="object-cover"
        src={
          movie.poster_path
            ? getPosterUrl(movie.poster_path)
            : noImagePlaceHolder
        }
        alt={movie.title}
        loading="lazy"
      />
    </Link>
  );
};

export default Card;
