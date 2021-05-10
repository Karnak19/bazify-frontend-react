import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_ARTISTS, GET_ARTIST_SONGS } from "./queries";
import { songContext } from "./contexts/song";
import Artists from "./Artists";
import FilterInput from "./FilterInput";
import useDebounce from "./hooks/useDebounce";

function ArtistPage() {
  const [inputValue, setInputValue] = useState("");
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);

  const { setSongs } = useContext(songContext);

  const filter = useDebounce(inputValue, 1000);

  const { data, loading } = useQuery<{ artists: Artist[] }>(GET_ARTISTS);
  const [
    getAlbumSongs,
    { data: albumData, loading: albumLoading, called },
  ] = useLazyQuery<{ artist: Artist }, { id: string }>(GET_ARTIST_SONGS);

  useEffect(() => {
    if (!loading) {
      setFilteredArtists(data.artists);
    }
  }, [data]);

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

  useEffect(() => {
    if (data && !loading) {
      setFilteredArtists(
        data.artists.filter((b) => {
          if (filter === "") {
            return true;
          }
          return b.name.toLowerCase().includes(filter.toLowerCase());
        })
      );
    }
  }, [filter]);

  return (
    <main className="container text-center m-auto px-5 font-cabin py-5 pb-24 min-h-screen">
      <FilterInput value={inputValue} setter={setInputValue} />
      {!loading && (
        <Artists artists={filteredArtists} handleClick={getAlbumSongs} />
      )}
    </main>
  );
}

export default ArtistPage;
