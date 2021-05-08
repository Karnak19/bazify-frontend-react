import React, { useEffect, useRef, useState } from "react";
import ReactJkMusicPlayer, {
  ReactJkMusicPlayerAudioListProps,
} from "react-jinke-music-player";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_ALBUMS, GET_ALBUM_SONGS, GET_SONGS } from "./queries";
import Albums from "./Albums";

function NewPlayer() {
  const [songList, setSongList] = useState<ReactJkMusicPlayerAudioListProps[]>(
    []
  );

  const { data, loading } = useQuery<{ albums: Album[] }>(GET_ALBUMS);
  const [
    getAlbumSongs,
    { data: albumData, loading: albumLoading, called },
  ] = useLazyQuery<{ album: Album }, { id: string }>(GET_ALBUM_SONGS);

  const playerRef = useRef(null);

  const playIndex = (index: number) => {
    return playerRef.current.playByIndex(index);
  };

  useEffect(() => {
    if (albumData && !albumLoading) {
      const { album } = albumData;
      setSongList(
        album.songs.map((song) => {
          const [min, sec] = (song.duration || "2:10").split(":");

          return {
            name: song.title,
            musicSrc: song.s3_link,
            cover: album.picture,
            singer: album.artist.name,
            duration: +min * 60 + +sec,
          };
        })
      );
    }
  }, [albumData]);

  return (
    <main className="container text-center m-auto px-5 font-cabin py-5">
      {!loading && called && (
        <ReactJkMusicPlayer
          className="font-chakra"
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
          theme={"dark"}
          glassBg
          showDownload={false}
        />
      )}
      {!loading && <Albums albums={data.albums} handleClick={getAlbumSongs} />}
    </main>
  );
}

export default NewPlayer;
