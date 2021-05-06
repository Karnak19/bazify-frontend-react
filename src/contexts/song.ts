import React, { createContext } from "react";

import { Song } from "../interfaces/CurrentSong";

interface SongContextType {
  currentSong: Song;
  musics: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  playIndex: (index: number) => void;
}

export const songContext = createContext<SongContextType>(null!);
