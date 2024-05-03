import PrimaryButton from "@/components/PrimaryButton";
import { useMovieAccountState } from "@/hooks/useMovieAccountState";
import {
  BookmarkIcon as OutlineBookmarkIcon,
  HeartIcon as OutlineHeartIcon,
  StarIcon as OutlineStarIcon,
} from "@heroicons/react/24/outline";

import {
  BookmarkIcon as SolidBookmarIcon,
  HeartIcon as SolidHeartIcon,
  StarIcon as SolidStarIcon,
} from "@heroicons/react/24/solid";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import withTooltip from "./withTooltip";
import Spinner from "./Spinner";
import RatingDialog from "./RatingDialog";

interface Props {
  movieId: number;
}

const AccountMovieState: React.FC<Props> = ({ movieId }) => {
  const {
    isOnWatchlist,
    isOnFavorite,
    isLoading,
    isRated,
    addToWatchList,
    addToFavorite,
    rateMovie,
  } = useMovieAccountState(movieId);

  const [value, setValue] = useState<number>(0);
  const [showRatingDialog, setShowRatingDialog] = useState<boolean>(false);

  const TooltipButton = withTooltip(PrimaryButton);

  const handleRateMovie: FormEventHandler = async (event) => {
    event.preventDefault();

    await rateMovie(value);

    setShowRatingDialog(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(parseFloat(event.target.value));
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-4 text-sm font-medium md:justify-start">
        <TooltipButton
          type="button"
          className={`flex items-center rounded-full p-2 shadow-lg transition hover:scale-110`}
          onClick={addToWatchList}
          message={isOnWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          {isLoading.includes("watchlist") ? (
            <Spinner className="my-0 h-5 w-5 py-0" />
          ) : isOnWatchlist ? (
            <SolidBookmarIcon className="h-5 w-5" />
          ) : (
            <OutlineBookmarkIcon className="h-5 w-5" />
          )}
        </TooltipButton>

        <TooltipButton
          type="button"
          className={`flex items-center rounded-full p-2 shadow-lg transition hover:scale-110`}
          message={isOnFavorite ? "Remove from favorite" : "Add to favorite"}
          onClick={addToFavorite}
        >
          {isLoading.includes("favorite") ? (
            <Spinner className="my-0 h-5 w-5 py-0" />
          ) : isOnFavorite ? (
            <SolidHeartIcon className="h-5 w-5" />
          ) : (
            <OutlineHeartIcon className="h-5 w-5" />
          )}
        </TooltipButton>

        <TooltipButton
          type="button"
          className={`flex items-center rounded-full p-2 shadow-lg transition hover:scale-110`}
          message={isOnFavorite ? "Remove from favorite" : "Add to favorite"}
          onClick={() => setShowRatingDialog(true)}
        >
          {isLoading.includes("rated") ? (
            <Spinner className="my-0 h-5 w-5 py-0" />
          ) : isRated ? (
            <SolidStarIcon className="h-5 w-5" />
          ) : (
            <OutlineStarIcon className="h-5 w-5" />
          )}
        </TooltipButton>
      </div>

      <RatingDialog
        show={showRatingDialog}
        onChange={handleChange}
        onSubmit={handleRateMovie}
        value={value}
        isLoading={isLoading.includes("rated")}
      />
    </>
  );
};

export default AccountMovieState;
