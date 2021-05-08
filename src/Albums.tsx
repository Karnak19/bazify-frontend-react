import React from "react";
import { QueryLazyOptions } from "@apollo/client";

import Album from "./Album";

interface IProps {
  albums: Album[];
  handleClick: (
    options?: QueryLazyOptions<{
      id: string;
    }>
  ) => void;
}

const alphabeticalOrder = (a: Album, b: Album) => {
  if (a.artist.name < b.artist.name) {
    return -1;
  }
  if (a.artist.name > b.artist.name) {
    return 1;
  }
  return 0;
};

function Albums({ albums, handleClick }: IProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-5">
      {[...albums].sort(alphabeticalOrder).map((album) => {
        return <Album {...album} handleClick={handleClick} />;
      })}
    </div>
  );
}

export default Albums;
