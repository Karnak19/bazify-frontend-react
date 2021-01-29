import Song from "./Song";

import styles from "./Songs.module.scss";

function Songs({ musics, clickAudio }) {
  return (
    <div className={styles.list}>
      {musics?.map((music, key = 0) => {
        return (
          <Song {...music} key={key} keyProp={key} clickAudio={clickAudio} />
        );
      })}
    </div>
  );
}

export default Songs;
