import { useEffect, useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import { useQuery } from 'react-query';

import { songContext } from './contexts/song';
import { getSongs } from './api';
import Songs from './Songs';

import styles from './styles/Player.module.scss';

function PlayerInJS() {
  const [songListReady, setSongListReady] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  const [songList, setSongList] = useState([]);

  const { data: musics, isFetched } = useQuery('songs', getSongs);

  const playerRef = useRef(null);

  const playIndex = (index) => {
    return playerRef.current.playByIndex(index);
  };

  useEffect(() => {
    if (isFetched) {
      setCurrentSong(musics[0]);
      setSongList(
        musics.map((song) => {
          const [min, sec] = (song.duration || '2:10').split(':');

          return {
            name: song.title,
            musicSrc: song.s3_link,
            cover: song.album?.picture,
            singer: song.artist?.name,
            duration: +min * 60 + +sec,
          };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musics]);

  useEffect(() => {
    if (songList.length > 1) {
      setSongListReady(true);
    }
  }, [songList]);

  return (
    <songContext.Provider value={{ currentSong, setCurrentSong, musics, playIndex }}>
      <main className={styles.container}>
        {songListReady && (
          <ReactJkMusicPlayer
            className={styles.chakra}
            getAudioInstance={(instance) => {
              playerRef.current = instance;
            }}
            audioLists={[...songList]}
            defaultPosition={{
              bottom: 20,
              left: 20,
            }}
            showMediaSession
            autoPlay={false}
            showThemeSwitch={false}
            theme={'dark'}
            glassBg
            showDownload={false}
            onAudioPlayTrackChange={(currentId, trackList) => {
              const currentSong = trackList.findIndex((e) => e.id === currentId);
              setCurrentSong(musics[currentSong] || musics[0]);
            }}
          />
        )}
        <Songs musics={musics} />
      </main>
    </songContext.Provider>
  );
}

export default PlayerInJS;
