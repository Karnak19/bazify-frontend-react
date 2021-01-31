import styles from "./styles/Song.module.scss";

function Song({ song }) {
  return (
    <div className={styles.song} onClick={() => {}}>
      <img src={song.album.picture} alt={song.album.title} />
      <div>
        <p className={styles.title}>{song.title}</p>
        <p className={styles.subtitle}>{song.artist.name}</p>
      </div>
      <div className={styles.duration}>{song.duration}</div>
    </div>
  );
}

export default Song;
