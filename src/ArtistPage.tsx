import React, { useContext, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import {
  GET_ALBUMS,
  GET_ALBUM_SONGS,
  GET_ARTISTS,
  GET_ARTIST_SONGS,
} from "./queries";
import Albums from "./Albums";
import { songContext } from "./contexts/song";
import Artists from "./Artists";

function AlbumPage() {
  const { setSongs } = useContext(songContext);

  const { data, loading } = useQuery<{ artists: Artist[] }>(GET_ARTISTS);
  const [
    getAlbumSongs,
    { data: albumData, loading: albumLoading, called },
  ] = useLazyQuery<{ artist: Artist }, { id: string }>(GET_ARTIST_SONGS);

  useEffect(() => {
    if (albumData && !albumLoading) {
      const { artist } = albumData;
      setSongs(
        artist.songs.map((song) => {
          const [min, sec] = (song.duration || "2:10").split(":");

          return {
            name: song.title,
            musicSrc: song.s3_link,
            cover: artist.picture,
            singer: artist.name,
            duration: +min * 60 + +sec,
          };
        })
      );
    }
  }, [albumData]);

  return (
    <main className="container text-center m-auto px-5 font-cabin py-5 pb-24 min-h-screen">
      {!loading && (
        <Artists artists={data.artists} handleClick={getAlbumSongs} />
      )}
    </main>
  );
}

export default AlbumPage;
