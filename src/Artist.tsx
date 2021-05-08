import React from "react";
import { QueryLazyOptions } from "@apollo/client";

interface IProps extends Artist {
  handleClick: (
    options?: QueryLazyOptions<{
      id: string;
    }>
  ) => void;
}

function Album({ id, songs, name, picture, handleClick }: IProps) {
  return (
    <div
      className="h-48 bg-cover rounded-md"
      style={{
        backgroundImage: `url(${picture})`,
        backgroundPosition: "center",
      }}
      onClick={() =>
        handleClick({
          variables: {
            id: id,
          },
        })
      }
    >
      <div className="bg-trueGray-900 bg-opacity-80 hover:bg-opacity-30 rounded-md h-full transition duration-200 cursor-pointer group flex flex-col justify-end overflow-hidden">
        <div className="group-hover:bg-trueGray-200 group-hover:bg-opacity-70 group-hover:text-trueGray-900 transition duration-200">
          <p className="font-chakra text-trueGray-400 group-hover:text-trueGray-700">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Album;
