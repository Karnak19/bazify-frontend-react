import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CurrentPlaying from './CurrentPlaying';
import { songContext } from './contexts/song';
import { getSongs } from './api';
import { Song } from './interfaces/CurrentSong';
import Songs from './Songs';

import styles from './styles/Player.module.scss';

function NewPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>({} as Song);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: musics } = useQuery<Song[]>('songs', getSongs, {
    placeholderData: [
      {
        id: '',
        title: '',
        s3_link: '',
        duration: '',
        artist: { id: '', name: '' },
        album: { id: '', picture: '', title: '' },
      },
    ],
  });

  useEffect(() => {
    setCurrentSong(musics[0]);
  }, [musics]);

  return (
    <songContext.Provider value={{ currentSong, setCurrentSong, musics }}>
      <main className={styles.container}>
        <CurrentPlaying currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <Songs musics={musics} />
      </main>
    </songContext.Provider>
  );
}

export default NewPlayer;
