import React from "react";

import { Song as ISong } from "./interfaces/CurrentSong";
import Song from "./Song";

interface IProps {
  musics: ISong[];
}

const Songs = ({ musics }: IProps) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:gap-3 h-inh p-5 bg-gray-900 text-white overflow-scroll">
      {musics?.map((music, key = 0) => {
        return <Song song={music} index={key} key={key} />;
      })}
    </div>
  );
};

export default Songs;
