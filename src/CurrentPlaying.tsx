import { useEffect, useRef } from 'react';
import { Audio, Player } from '@vime/react';
import { BiPlay, BiPause, BiSkipNext, BiSkipPrevious } from 'react-icons/bi';

import { Song } from './interfaces/CurrentSong';
import usePlay from './hooks/usePlay';
import useMediaSession from './hooks/useMediaSession';

import styles from './styles/Player.module.scss';

interface IProps {
  currentSong: Song;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

function CurrentPlaying({ currentSong, isPlaying, setIsPlaying }: IProps) {
  const player = useRef<HTMLVmPlayerElement>(null);

  useEffect(() => {
    console.log('render !');
  });

  const { nextSong, prevSong } = usePlay();

  useMediaSession();

  const playOrPause = () => {
    if (isPlaying) {
      player.current?.pause();
    } else {
      player.current?.play();
    }
    setIsPlaying((state) => !state);
  };

  return (
    <div className={styles.currentSong}>
      <Player ref={player}>
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
          <button className={styles.prev} onClick={prevSong}>
            <BiSkipPrevious />
          </button>
          <button className={styles.play} onClick={playOrPause}>
            {isPlaying ? <BiPause /> : <BiPlay />}
          </button>
          <button className={styles.next} onClick={nextSong}>
            <BiSkipNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrentPlaying;
