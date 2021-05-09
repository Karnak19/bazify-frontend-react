import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_ALBUMS, GET_ALBUM_SONGS } from "./queries";
import { songContext } from "./contexts/song";
import Albums from "./Albums";
import FilterInput from "./FilterInput";
import useDebounce from "./hooks/useDebounce";

function AlbumPage() {
  const [inputValue, setInputValue] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);

  const { setSongs } = useContext(songContext);

  const filter = useDebounce(inputValue, 1000);

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

  useEffect(() => {
    setFilteredAlbums(data.albums);
  }, [data]);

  useEffect(() => {
    setFilteredAlbums(
      data.albums.filter((b) => {
        if (filter === "") {
          return true;
        }
        return b.title.toLowerCase().includes(filter.toLowerCase());
      })
    );
  }, [filter]);

  return (
    <main className="container text-center m-auto px-5 font-cabin py-5 pb-24 min-h-screen">
      <FilterInput value={inputValue} setter={setInputValue} />
      {!loading && (
        <Albums albums={filteredAlbums} handleClick={getAlbumSongs} />
      )}
    </main>
  );
}

export default AlbumPage;
