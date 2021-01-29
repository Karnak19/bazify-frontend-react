import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

import { getSongs } from "./api";
import styles from "./App.module.scss";

function Player() {
  const { isLoading, error, data: musics } = useQuery("songs", getSongs);
  const [currentSong, setCurrentSong] = useState({});
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  const playerRef = useRef();
  const timelineRef = useRef();
  const hoverPlayheadRef = useRef();
  const playheadRef = useRef();

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

  const changeCurrentTime = (e) => {
    const duration = playerRef.current.duration;

    const playheadWidth = timelineRef.current.offsetWidth;
    const offsetWidth = timelineRef.current.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;

    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

    playheadRef.current.style.width = userClickWidthInPercent + "%";
    playerRef.current.currentTime = (duration * userClickWidthInPercent) / 100;
  };

  const hoverTimeLine = (e) => {
    const duration = playerRef.current.duration;

    const playheadWidth = timelineRef.current.offsetWidth;

    const offsetWidth = timelineRef.current.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;
    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

    if (userClickWidthInPercent <= 100) {
      hoverPlayheadRef.current.style.width = userClickWidthInPercent + "%";
    }

    const time = (duration * userClickWidthInPercent) / 100;

    if (time >= 0 && time <= duration) {
      hoverPlayheadRef.current.dataset.content = formatTime(time);
    }
  };

  const resetTimeLine = () => {
    hoverPlayheadRef.current.style.width = 0;
  };

  const timeUpdate = () => {
    const duration = playerRef.current.duration;
    const timelineWidth =
      timelineRef.current.offsetWidth - playheadRef.current.offsetWidth;
    const playPercent = 100 * (playerRef.current.currentTime / duration);
    playheadRef.current.style.width = playPercent + "%";
    setCurrentTime(formatTime(parseInt(playerRef.current.currentTime)));
  };

  const formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);

    const formatTime = minutes + ":" + seconds;

    return formatTime;
  };

  const updatePlayer = () => {
    const currentSong = musics[index];
    const audio = new Audio(currentSong.s3_link);
    playerRef.current.load();
  };

  const nextSong = () => {
    setIndex((index + 1) % musics.length);
    updatePlayer();
    if (pause) {
      playerRef.current.play();
    }
  };

  const prevSong = () => {
    setIndex((index + musics.length - 1) % musics.length);
    updatePlayer();
    if (pause) {
      playerRef.current.play();
    }
  };

  const playOrPause = () => {
    const currentSong = musics[index];
    const audio = new Audio(currentSong.s3_link);
    if (!pause) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    setPause((pause) => !pause);
  };

  const clickAudio = (key) => {
    setIndex(key);
    updatePlayer();
    if (pause) {
      playerRef.current.play();
    }
  };

  return (
    <>
      <Helmet>
        <title>{currentSong.title}</title>
      </Helmet>
      <div className={styles.card}>
        <div className={styles["current-song"]}>
          <audio ref={playerRef}>
            <source src={currentSong.s3_link} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          <div className={styles["img-wrap"]}>
            <img src={currentSong.album?.picture} />
          </div>
          <span className={styles["song-name"]}>{currentSong.title}</span>
          <span className={styles["song-autor"]}>
            {currentSong.artist?.name}
          </span>

          <div className={styles.time}>
            <div className={styles["current-time"]}>{currentTime}</div>
            <div className={styles["end-time"]}>{currentSong.duration}</div>
          </div>

          <div ref={timelineRef} id="timeline">
            <div ref={playheadRef} id="playhead"></div>
            <div
              ref={hoverPlayheadRef}
              className={styles["hover-playhead"]}
              data-content="0:00"
            ></div>
          </div>

          <div className={styles.controls}>
            <button
              onClick={prevSong}
              className={`${styles.prev} ${styles["prev-next"]} ${styles["current-btn"]}`}
            >
              <i className={`${styles.fas} ${styles["fa-backward"]}`}></i>
            </button>

            <button
              onClick={playOrPause}
              className={`${styles.play} ${styles["current-btn"]}`}
            >
              {!pause ? (
                <i className={`${styles.fas} ${styles["fa-play"]}`}></i>
              ) : (
                <i className={`${styles.fas} ${styles["fa-pause"]}`}></i>
              )}
            </button>
            <button
              onClick={nextSong}
              className={`${styles.next} ${styles["prev-next"]} ${styles["current-btn"]}`}
            >
              <i className={`${styles.fas} ${styles["fa-forward"]}`}></i>
            </button>
          </div>
        </div>
        <div className={styles["play-list"]}>
          {musics?.map((music, key = 0) => (
            <div
              key={key}
              onClick={() => clickAudio(key)}
              className={
                `${styles.track} ` +
                (index === key && !pause ? `${styles["current-audio"]}` : "") +
                (index === key && pause ? `${styles["play-now"]}` : "")
              }
            >
              <img
                className={styles["track-img"]}
                src={music.album?.picture}
                alt={music.album?.title}
              />
              <div className={styles["track-discr"]}>
                <span className={styles["track-name"]}>{music.title}</span>
                <span className={styles["track-author"]}>
                  {music?.artist?.name}
                </span>
              </div>
              <span className={styles["track-duration"]}>
                {index === key ? currentTime : currentSong.duration || "3:00"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Player;
