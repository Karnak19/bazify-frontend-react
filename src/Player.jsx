import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

import { getSongs } from "./api";
import "./App.scss";

function Player() {
  const { isLoading, error, data: musics } = useQuery("songs", getSongs);
  const [currentSong, setCurrentSong] = useState({});
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  const playerRef = useRef();
  const timelineRef = useRef();
  const hoverPlayheadRef = useRef();
  const playheadRef = useRef();

  useEffect(() => {
    if (musics) {
      setCurrentSong(musics[index]);
    }
  }, [musics, index]);

  useEffect(() => {
    playerRef.current.addEventListener("timeupdate", timeUpdate, false);
    playerRef.current.addEventListener("ended", nextSong, false);
    timelineRef.current.addEventListener("click", changeCurrentTime, false);
    timelineRef.current.addEventListener("mousemove", hoverTimeLine, false);
    timelineRef.current.addEventListener("mouseout", resetTimeLine, false);

    return () => {
      playerRef.current.removeEventListener("timeupdate", timeUpdate);
      playerRef.current.removeEventListener("ended", nextSong);
      timelineRef.current.removeEventListener("click", changeCurrentTime);
      timelineRef.current.removeEventListener("mousemove", hoverTimeLine);
      timelineRef.current.removeEventListener("mouseout", resetTimeLine);
    };
  }, []);

  const changeCurrentTime = (e) => {
    const duration = playerRef.current.duration;

    const playheadWidth = timelineRef.current.offsetWidth;
    const offsetWidth = timelineRef.current.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;

    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

    playheadRef.current.style.width = userClickWidthInPercent + "%";
    playerRef.current.currentTime = (duration * userClickWidthInPercent) / 100;
  };

  const hoverTimeLine = (e) => {
    const duration = playerRef.current.duration;

    const playheadWidth = timelineRef.current.offsetWidth;

    const offsetWidth = timelineRef.current.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;
    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

    if (userClickWidthInPercent <= 100) {
      hoverPlayheadRef.current.style.width = userClickWidthInPercent + "%";
    }

    const time = (duration * userClickWidthInPercent) / 100;

    if (time >= 0 && time <= duration) {
      hoverPlayheadRef.current.dataset.content = formatTime(time);
    }
  };

  const resetTimeLine = () => {
    hoverPlayheadRef.current.style.width = 0;
  };

  const timeUpdate = () => {
    const duration = playerRef.current.duration;
    const timelineWidth =
      timelineRef.current.offsetWidth - playheadRef.current.offsetWidth;
    const playPercent = 100 * (playerRef.current.currentTime / duration);
    playheadRef.current.style.width = playPercent + "%";
    setCurrentTime(formatTime(parseInt(playerRef.current.currentTime)));
  };

  const formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);

    const formatTime = minutes + ":" + seconds;

    return formatTime;
  };

  const updatePlayer = () => {
    const currentSong = musics[index];
    const audio = new Audio(currentSong.s3_link);
    playerRef.current.load();
  };

  const nextSong = () => {
    setIndex((index + 1) % musics.length);
    updatePlayer();
    if (pause) {
      playerRef.current.play();
    }
  };

  const prevSong = () => {
    setIndex((index + musics.length - 1) % musics.length);
    updatePlayer();
    if (pause) {
      playerRef.current.play();
    }
  };

  const playOrPause = () => {
    const currentSong = musics[index];
    const audio = new Audio(currentSong.s3_link);
    if (!pause) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    setPause((pause) => !pause);
  };

  const clickAudio = (key) => {
    setIndex(key);
    updatePlayer();
    if (pause) {
      playerRef.current.play();
    }
  };

  return (
    <>
      <Helmet>
        <title>{currentSong.title}</title>
      </Helmet>
      <div className="card">
        <div className="current-song">
          <audio ref={playerRef}>
            <source src={currentSong.s3_link} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          <div className="img-wrap">
            <img src={currentSong.album?.picture} />
          </div>
          <span className="song-name">{currentSong.title}</span>
          <span className="song-autor">{currentSong?.artist?.name}</span>

          <div className="time">
            <div className="current-time">{currentTime}</div>
            <div className="end-time">{currentSong.duration || "3:00"}</div>
          </div>

          <div ref={timelineRef} id="timeline">
            <div ref={playheadRef} id="playhead"></div>
            <div
              ref={hoverPlayheadRef}
              className="hover-playhead"
              data-content="0:00"
            ></div>
          </div>

          <div className="controls">
            <button onClick={prevSong} className="prev prev-next current-btn">
              <i className="fas fa-backward"></i>
            </button>

            <button onClick={playOrPause} className="play current-btn">
              {!pause ? (
                <i className="fas fa-play"></i>
              ) : (
                <i className="fas fa-pause"></i>
              )}
            </button>
            <button onClick={nextSong} className="next prev-next current-btn">
              <i className="fas fa-forward"></i>
            </button>
          </div>
        </div>
        <div className="play-list">
          {musics?.map((music, key = 0) => (
            <div
              key={key}
              onClick={() => clickAudio(key)}
              className={
                "track " +
                (index === key && !pause ? "current-audio" : "") +
                (index === key && pause ? "play-now" : "")
              }
            >
              <img className="track-img" src={music.album?.picture} />
              <div className="track-discr">
                <span className="track-name">{music.title}</span>
                <span className="track-author">{music?.artist?.name}</span>
              </div>
              <span className="track-duration">
                {index === key ? currentTime : currentSong.duration || "3:00"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Player;
