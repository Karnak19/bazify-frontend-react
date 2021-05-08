import React, { createContext, ReactChildren, useState } from "react";
import { ReactJkMusicPlayerAudioListProps } from "react-jinke-music-player";

interface SongContextType {
  songs: ReactJkMusicPlayerAudioListProps[];
  setSongs: React.Dispatch<
    React.SetStateAction<ReactJkMusicPlayerAudioListProps[]>
  >;
}

export const songContext = createContext<SongContextType>(null!);

export function SongsProvider({ children }: { children: ReactChildren }) {
  const [songs, setSongs] = useState<ReactJkMusicPlayerAudioListProps[]>([]);

  return (
    <songContext.Provider value={{ songs, setSongs }}>
      {children}
    </songContext.Provider>
  );
}
