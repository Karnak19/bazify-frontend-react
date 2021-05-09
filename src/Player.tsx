import React, { useContext, useRef } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { songContext } from "./contexts/song";

function Player() {
  const { songs } = useContext(songContext);

  const playerRef = useRef(null);

  return (
    songs && (
      <ReactJkMusicPlayer
        className="font-chakra"
        getAudioInstance={(instance) => {
          playerRef.current = instance;
        }}
        audioLists={songs}
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
    )
  );
}

export default Player;
