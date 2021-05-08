import React from "react";
import { QueryLazyOptions } from "@apollo/client";

import Artist from "./Artist";

interface IProps {
  artists: Artist[];
  handleClick: (
    options?: QueryLazyOptions<{
      id: string;
    }>
  ) => void;
}

const alphabeticalOrder = (a: Artist, b: Artist) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

function Artists({ artists, handleClick }: IProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-5">
      {[...artists].sort(alphabeticalOrder).map((artist) => {
        return <Artist {...artist} handleClick={handleClick} />;
      })}
    </div>
  );
}

export default Artists;
