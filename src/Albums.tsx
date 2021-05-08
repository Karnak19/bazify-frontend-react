import React from "react";
import { QueryLazyOptions } from "@apollo/client";

interface IProps {
  albums: Album[];
  handleClick: (
    options?: QueryLazyOptions<{
      id: string;
    }>
  ) => void;
}

function Albums({ albums, handleClick }: IProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-5">
      {[...albums]
        .sort((a, b) => {
          if (a.artist.name < b.artist.name) {
            return -1;
          }
          if (a.artist.name > b.artist.name) {
            return 1;
          }
          return 0;
        })
        .map((album) => {
          return (
            <div
              className="h-48 bg-cover rounded-md"
              style={{
                backgroundImage: `url(${album.picture})`,
                backgroundPosition: "center",
              }}
              onClick={() =>
                handleClick({
                  variables: {
                    id: album.id,
                  },
                })
              }
            >
              <div className="bg-trueGray-900 bg-opacity-80 hover:bg-opacity-30 text-white rounded-md h-full transition duration-200 cursor-pointer group flex flex-col justify-end overflow-hidden">
                <div className="group-hover:bg-trueGray-200 group-hover:text-trueGray-900 transition duration-200">
                  <p className="text-2xl">{album.title}</p>
                  <p>{album.artist.name}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Albums;
