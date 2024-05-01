import HeroImage from "@/components/HeroImage";
import SearchBar from "@/components/SearchBar";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import noImagePlaceHolder from "@assets/no-image-placeholder.png";

import Spinner from "@/components/Spinner";
import Card from "@/components/MovieCard";
import { getBackdropUrl, getPosterUrl } from "@/utils";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useMemo } from "react";
import PrimaryButton from "@/components/PrimaryButton";

const Home = () => {
  const { state, searchTerm, loading, setSearchTerm, setIsLoadingMore, error } =
    useHomeFetch();

  const { size } = useScreenSize();

  const heroImageUrl = useMemo(() => {
    if (state.results.length < 1) {
      return noImagePlaceHolder;
    }

    if (state.results[0].poster_path && size.width < 1024) {
      return getPosterUrl(state.results[0].poster_path);
    }

    if (state.results[0].backdrop_path) {
      return getBackdropUrl(state.results[0].backdrop_path);
    }

    return noImagePlaceHolder;
  }, [size.width, state.results]);

  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          title={state.results[0].title}
          overview={state.results[0].overview}
          image={heroImageUrl}
        />
      ) : null}

      <SearchBar dispatcher={setSearchTerm} />

      <div className="grid grid-cols-1 gap-8 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {state.results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && <Spinner />}

      {state.page < state.total_pages && !loading && (
        <div className="p-5 text-center">
          <PrimaryButton
            className="mx-auto px-6 "
            onClick={() => setIsLoadingMore(true)}
          >
            Load more
          </PrimaryButton>
        </div>
      )}
    </>
  );
};

export default Home;
