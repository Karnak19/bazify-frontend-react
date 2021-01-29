import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getSongs } from "./api";
import CurrentSong from "./CurrentSong";

import styles from "./Player.module.scss";
import Songs from "./Songs";
import usePlayer from "./usePlayer";

function NewPlayer() {
  const { isLoading, error, data: musics } = useQuery("songs", getSongs);
  const [currentSong, setCurrentSong] = useState({});
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  const playerRef = useRef();
  const timelineRef = useRef();
  const hoverPlayheadRef = useRef();
  const playheadRef = useRef();

  const {
    changeCurrentTime,
    hoverTimeLine,
    resetTimeLine,
    timeUpdate,
    nextSong,
    prevSong,
    playOrPause,
    clickAudio,
  } = usePlayer(
    {
      playerRef,
      timelineRef,
      hoverPlayheadRef,
      playheadRef,
    },
    { musics, index, pause },
    { setCurrentTime, setIndex, setPause }
  );

  useEffect(() => {
    if (musics) {
      setCurrentSong(musics[index]);
    }
  }, [musics, index]);

  useEffect(() => {
    playerRef.current.addEventListener("timeupdate", timeUpdate, false);
    playerRef.current.addEventListener("ended", nextSong, false);
    timelineRef.current.addEventListener("click", changeCurrentTime, false);
    timelineRef.current.addEventListener("mousemove", hoverTimeLine, false);
    timelineRef.current.addEventListener("mouseout", resetTimeLine, false);

    return () => {
      playerRef.current.removeEventListener("timeupdate", timeUpdate);
      playerRef.current.removeEventListener("ended", nextSong);
      timelineRef.current.removeEventListener("click", changeCurrentTime);
      timelineRef.current.removeEventListener("mousemove", hoverTimeLine);
      timelineRef.current.removeEventListener("mouseout", resetTimeLine);
    };
  }, []);

  const currentSongProps = {
    playerRef,
    currentSong,
    prevSong,
    playOrPause,
    pause,
    currentTime,
    nextSong,
    timelineRef,
    playheadRef,
    hoverPlayheadRef,
  };

  return (
    <main className={styles.container}>
      <CurrentSong {...currentSongProps} />
      <Songs musics={musics} clickAudio={clickAudio} />
    </main>
  );
}

export default NewPlayer;
