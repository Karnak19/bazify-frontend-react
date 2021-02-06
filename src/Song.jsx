import { useContext } from 'react';

import { songContext } from './contexts/song';

import styles from './styles/Song.module.scss';

const Song = ({ song, index }) => {
  const {
    setCurrentSong,
    currentSong: { id },
    playIndex,
  } = useContext(songContext);

  const isSelected = () => (id === song.id ? styles.playing : '');

  return (
    <div
      className={`${styles.song} ${isSelected()}`}
      onClick={() => {
        playIndex(index);
        setCurrentSong(song);
      }}
    >
      <img src={song.album?.picture} alt={song.album?.title} />
      <div>
        <p className={styles.title}>{song.title}</p>
        <p className={styles.subtitle}>{song.artist?.name}</p>
      </div>
      <div className={styles.duration}>{song.duration}</div>
    </div>
  );
};

export default Song;
