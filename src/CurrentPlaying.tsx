import { useRef, useState } from "react";
import { Audio, Player } from "@vime/react";
import {
  FaPlay,
  FaPause,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

import { Song } from "./interfaces/CurrentSong";
import usePlay from "./hooks/usePlay";
import useMediaSession from "./hooks/useMediaSession";

import styles from "./styles/Player.module.scss";

interface IProps {
  currentSong: Song;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

function CurrentPlaying({ currentSong, isPlaying, setIsPlaying }: IProps) {
  const [volume, setVolume] = useState(10);
  const player = useRef<HTMLVmPlayerElement>(null);

  const { nextSong, prevSong } = usePlay();

  useMediaSession();

  const musicEnded = (e: CustomEvent) => {
    if (e.detail) {
      nextSong();
      setIsPlaying(true);
    }
  };

  const playOrPause = () => {
    if (isPlaying) {
      player.current?.pause();
    } else {
      player.current?.play();
    }
    setIsPlaying((state) => !state);
  };

  const haha = (e: CustomEvent) => {
    if (e.detail) {
      setIsPlaying(true);
      player.current?.play();
    }
  };

  return (
    <div className={styles.currentSong}>
      <Player
        ref={player}
        volume={volume}
        onVmPlaybackEnded={musicEnded}
        onVmPlaybackReady={haha}
      >
        <Audio>
          <source data-src={currentSong.s3_link} type="audio/mpeg" />
          Your browser does not support the audio element.
        </Audio>
      </Player>
      <div className={styles.playing}>
        <div className={styles.timeline}>
          <div className={styles.time}>
            <div className="current-time"></div>
            <div className="end-time">{currentSong.duration}</div>
          </div>
        </div>
        <div className={styles.controls}>
          <div>
            <h1 style={{ textAlign: "center" }}>{volume}</h1>
            <input
              type="range"
              value={volume}
              min={0}
              max={50}
              step={5}
              onChange={(e) => setVolume(+e.target.value)}
            />
          </div>
          <button className={styles.prev} onClick={prevSong}>
            <FaAngleDoubleLeft size={50} />
          </button>
          <button className={styles.play} onClick={playOrPause}>
            {isPlaying ? <FaPause size={50} /> : <FaPlay size={50} />}
          </button>
          <button className={styles.next} onClick={nextSong}>
            <FaAngleDoubleRight size={50} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrentPlaying;
