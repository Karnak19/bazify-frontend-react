import { useEffect } from "react";
import styles from "./styles/Player.module.scss";

function CurrentSong({
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
}) {
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist?.name,
        album: currentSong.album?.name,
        artwork: [
          {
            src: currentSong.album?.picture || "",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("previoustrack", prevSong);
      navigator.mediaSession.setActionHandler("nexttrack", nextSong);
    }
  }, [currentSong]);

  useEffect(() => {
    playerRef.current.load();
  }, [currentSong]);

  return (
    <div className={styles.currentSong}>
      <audio ref={playerRef}>
        <source src={currentSong.s3_link} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.infos}>
        <img src={currentSong.album?.picture} alt="" />
        <div className="">
          <h1>{currentSong.title}</h1>
          <h2>{currentSong.artist?.name}</h2>
          <h3>{currentSong.album?.title}</h3>
        </div>
      </div>
      <div className={styles.playing}>
        <div className={styles.timeline}>
          <div className={styles.time}>
            <div className="current-time">{currentTime}</div>
            <div className="end-time">{currentSong.duration}</div>
          </div>

          <div ref={timelineRef} id="timeline">
            <div ref={playheadRef} id="playhead"></div>
            <div
              ref={hoverPlayheadRef}
              className="hover-playhead"
              data-content="0:00"
            ></div>
          </div>
        </div>
        <div className={styles.controls}>
          <button onClick={prevSong}>last</button>
          <button onClick={playOrPause}>{!pause ? "play" : "pause"}</button>
          <button onClick={nextSong}>next</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentSong;
