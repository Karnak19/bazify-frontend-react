import { useContext, useEffect } from 'react';
import { songContext } from '../contexts/song';
import usePlay from './usePlay';

export default function useMediaSession() {
  const { currentSong } = useContext(songContext);
  const { nextSong, prevSong } = usePlay();

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist?.name,
        album: currentSong.album?.name,
        artwork: [
          {
            src: currentSong.album?.picture || '',
          },
        ],
      });

      navigator.mediaSession.setActionHandler('previoustrack', prevSong);
      navigator.mediaSession.setActionHandler('nexttrack', nextSong);
    }
  }, [currentSong, prevSong, nextSong]);
}
