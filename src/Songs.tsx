import { Song as ISong } from './interfaces/CurrentSong';
import Song from './Song';

import styles from './styles/Songs.module.scss';

interface IProps {
  musics: ISong[];
}

const Songs = ({ musics }: IProps) => {
  return (
    <div className={styles.list}>
      {musics?.map((music, key = 0) => {
        return <Song song={music} index={key} key={key} />;
      })}
    </div>
  );
};

export default Songs;
