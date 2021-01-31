import Song from "./Song";

import styles from "./styles/Songs.module.scss";

function Songs({ musics, clickAudio }) {
  return (
    <div className={styles.list}>
      {musics?.map((music, key = 0) => {
        return <Song song={music} key={key} />;
      })}
    </div>
  );
}

export default Songs;
