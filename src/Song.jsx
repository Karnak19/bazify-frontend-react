import React, { useContext } from "react";

import { songContext } from "./contexts/song";

const Song = ({ song, index }) => {
  const {
    setCurrentSong,
    currentSong: { id },
    playIndex,
  } = useContext(songContext);

  const isSelected = () => (id === song.id ? "border border-pink-700" : "");

  return (
    <div
      className={`flex flex-row p-1 m-1 md:m-0 md:h-full justify-start items-center rounded-lg bg-gray-700 cursor-pointer hover:bg-gray-800 ${isSelected()}`}
      onClick={() => {
        playIndex(index);
        setCurrentSong(song);
      }}
    >
      <img
        className="rounded-lg -m-1 object-contain h-10 md:h-full md:max-h-28"
        src={song.album?.picture}
        alt={song.album?.title}
      />
      <div>
        <p className="text-base pl-4 font-chakra">{song.title}</p>
        <p className="text-xxs pl-4 font-chakra">{song.artist?.name}</p>
      </div>
      <div className="ml-auto">{song.duration}</div>
    </div>
  );
};

export default Song;
