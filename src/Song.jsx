import { useEffect, useState } from "react";
import { Audio, Player } from "@vime/react";
import axios from "axios";

function Song() {
  const [song, setSong] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const { data } = await axios.get("http://localhost:5000/api/v1/songs");
      setSong(data[0]);
    };
    fetchSong();
  }, []);

  const handleFiles = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(Object.entries(files));
    Object.entries(files).forEach(([key, file]) => {
      formData.append(`file`, file);
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/songs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input
          type="file"
          name="file"
          multiple
          id="file"
          onChange={handleFiles}
        />
        <button type="submit">Send</button>
      </form>
      {song && (
        <Player controls>
          <Audio>
            <source data-src={song.s3_link} type="audio/mp3" />
          </Audio>
        </Player>
      )}
    </div>
  );
}

export default Song;
