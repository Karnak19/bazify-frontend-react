import useAudioPlayer from "./hooks/useAudioPlayer.ts";
import styles from "./styles/Player.module.scss";

function CurrentSong({ currentSong }) {
  const { playing, setPlaying, curTime } = useAudioPlayer();

  return (
    <div className={styles.currentSong}>
      <audio id="audio">
        <source src={currentSong.s3_link} type="audio/mpeg" />
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
            <div className="current-time">{curTime}</div>
            <div className="end-time">{currentSong.duration}</div>
          </div>
        </div>
        <div className={styles.controls}>
          {playing ? (
            <button onClick={() => setPlaying(false)}>pause</button>
          ) : (
            <button onClick={() => setPlaying(true)}>play</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentSong;
