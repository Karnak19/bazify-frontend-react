import { useEffect, useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import { useQuery } from 'react-query';

import { songContext } from './contexts/song';
import { getSongs } from './api';
import Songs from './Songs';

import styles from './styles/Player.module.scss';

function PlayerInJS() {
  const [currentSong, setCurrentSong] = useState({});
  const [songList, setSongList] = useState([]);

  const { data: musics } = useQuery('songs', getSongs, {
    placeholderData: [{}],
  });

  const playerRef = useRef(null);

  const playIndex = (index) => {
    return playerRef.current.playByIndex(index);
  };

  useEffect(() => {
    const transformSongDatas = (songs) => {
      return songs.map((song) => {
        const [min, sec] = (song.duration || '2:10').split(':');

        return {
          name: song.title,
          musicSrc: song.s3_link,
          cover: song.album?.picture,
          singer: song.artist?.name,
          duration: +min * 60 + +sec,
        };
      });
    };

    setCurrentSong(musics[0]);

    setSongList(transformSongDatas(musics));
  }, [musics]);

  return (
    <songContext.Provider value={{ currentSong, setCurrentSong, musics, playIndex }}>
      <main className={styles.container}>
        <ReactJkMusicPlayer
          getAudioInstance={(instance) => {
            playerRef.current = instance;
          }}
          audioLists={songList}
          defaultPosition={{
            bottom: 20,
            left: 20,
          }}
          showMediaSession
          autoPlay={false}
          showThemeSwitch={false}
          theme={'dark'}
          glassBg
          onAudioPlayTrackChange={(currentId, trackList) => {
            const currentSong = trackList.findIndex((e) => e.id === currentId);
            setCurrentSong(musics[currentSong - 1]);
          }}
        />
        <Songs musics={musics} />
      </main>
    </songContext.Provider>
  );
}

export default PlayerInJS;
