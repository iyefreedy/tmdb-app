import { Cast } from "@/types";
import { getPosterUrl } from "@/utils";
import React from "react";
import noPhotoPlaceHolder from "@assets/no-photo-placeholder.jpg";
import Overlay from "./Overlay";

interface Props {
  actor: Cast;
}

const ActorCard: React.FC<Props> = ({ actor }) => {
  return (
    <Overlay>
      <img
        src={
          actor.profile_path
            ? getPosterUrl(actor.profile_path)
            : noPhotoPlaceHolder
        }
        alt={actor.name}
        loading="lazy"
        className="object-cover object-center transition-all"
      />
      <div className="absolute bottom-4 left-4 font-bold">
        <p className="text-white shadow-black text-shadow">{actor.name}</p>
        <p className="text-sm text-gray-100 shadow-black text-shadow-sm">
          {`${actor.character}`}
        </p>
      </div>
    </Overlay>
  );
};

export default ActorCard;
