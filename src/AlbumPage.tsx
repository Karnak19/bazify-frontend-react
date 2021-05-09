import React, { useContext, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_ALBUMS, GET_ALBUM_SONGS } from "./queries";
import Albums from "./Albums";
import { songContext } from "./contexts/song";

function AlbumPage() {
  const { setSongs } = useContext(songContext);

  const { data, loading } = useQuery<{ albums: Album[] }>(GET_ALBUMS);
  const [
    getAlbumSongs,
    { data: albumData, loading: albumLoading, called },
  ] = useLazyQuery<{ album: Album }, { id: string }>(GET_ALBUM_SONGS);

  useEffect(() => {
    if (albumData && !albumLoading) {
      const { album } = albumData;
      setSongs(
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
    <main className="container text-center m-auto px-5 font-cabin py-5 pb-24 min-h-screen">
      {!loading && <Albums albums={data.albums} handleClick={getAlbumSongs} />}
    </main>
  );
}

export default AlbumPage;
