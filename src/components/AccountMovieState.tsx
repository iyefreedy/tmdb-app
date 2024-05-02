import PrimaryButton from "@/components/PrimaryButton";
import { useMovieAccountState } from "@/hooks/useMovieAccountState";
import {
  BookmarkIcon as OutlineBookmarkIcon,
  HeartIcon as OutlineHeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import {
  BookmarkIcon as SolidBookmarIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import withTooltip from "./withTooltip";
import Spinner from "./Spinner";

interface Props {
  movieId: number;
}

const AccountMovieState: React.FC<Props> = ({ movieId }) => {
  const {
    isOnWatchlist,
    isOnFavorite,
    isLoading,
    addToWatchList,
    addToFavorite,
  } = useMovieAccountState(movieId);

  const TooltipButton = withTooltip(PrimaryButton);

  return (
    <div className="flex items-center justify-center gap-x-4 text-sm font-medium md:justify-start">
      <TooltipButton
        type="button"
        className={`flex items-center rounded-full p-2 shadow-lg transition hover:scale-110`}
        onClick={addToWatchList}
        message="Add to watchlist"
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
        message="Add to favorite"
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

      <PrimaryButton
        type="button"
        className="flex items-center rounded-full p-4"
      >
        <SparklesIcon className="h-5 w-5" />
      </PrimaryButton>
    </div>
  );
};

export default AccountMovieState;
