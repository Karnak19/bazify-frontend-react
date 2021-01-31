import { useContext } from 'react';
import { songContext } from '../contexts/song';
import { Song } from '../interfaces/CurrentSong';

export default function usePlay() {
  const { musics, currentSong, setCurrentSong } = useContext(songContext);

  const findIndex = () => {
    return musics.findIndex((e) => e.id === currentSong.id);
  };

  const nextSong = () => {
    setCurrentSong(musics[findIndex() + 1]);
  };

  const prevSong = () => {
    setCurrentSong(musics[findIndex() - 1]);
  };

  const selectSong = (song: Song) => {
    setCurrentSong(song);
  };

  return {
    nextSong,
    prevSong,
    selectSong,
  };
}
