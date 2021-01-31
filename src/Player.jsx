import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getSongs } from "./api";
import Songs from "./Songs";
import CurrentSong from "./CurrentSong.copy.tsx";

import styles from "./styles/Player.module.scss";

function NewPlayer() {
  const [currentSong, setCurrentSong] = useState({});
  const { data: musics, isLoading } = useQuery("songs", getSongs);

  useEffect(() => {
    !isLoading && setCurrentSong(musics[0]);
  }, [musics]);

  return (
    <main className={styles.container}>
      <CurrentSong currentSong={currentSong} />
      <Songs musics={musics} />
    </main>
  );
}

export default NewPlayer;
