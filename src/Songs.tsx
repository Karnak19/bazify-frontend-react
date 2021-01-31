import { memo } from 'react';
import { Song as ISong } from './interfaces/CurrentSong';
import Song from './Song';

import styles from './styles/Songs.module.scss';

interface IProps {
  musics: ISong[];
}

const Songs = memo(({ musics }: IProps) => {
  return (
    <div className={styles.list}>
      {musics?.map((music, key = 0) => {
        return <Song song={music} key={key} />;
      })}
    </div>
  );
});

export default Songs;
