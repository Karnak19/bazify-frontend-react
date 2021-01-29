import styles from "./Song.module.scss";

function Song({
  keyProp,
  album,
  artist,
  duration,
  id,
  s3_link,
  title,
  clickAudio,
}) {
  return (
    <div className={styles.song} onClick={() => clickAudio(keyProp)}>
      <img src={album.picture} alt={album.title} />
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{artist.name}</p>
      </div>
      <div className={styles.duration}>{duration}</div>
    </div>
  );
}

export default Song;
