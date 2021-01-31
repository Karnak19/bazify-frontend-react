import { useContext } from "react";
import { songContext } from "../contexts/song";

export default function usePlay() {
  const { player, pause, setCurrentSong, setPause } = useContext(songContext);

  const playOrPause = () => {
    if (!pause) {
      player.current.play();
    } else {
      player.current.pause();
    }
    setPause((state) => !state);
  };

  const selectSong = (song) => {
    setCurrentSong(song);
  };

  return {
    playOrPause,
    selectSong,
  };
}
