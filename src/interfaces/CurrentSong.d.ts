export interface Song {
  id: string;
  title: string;
  duration: string;
  s3_link: string;
  artist: {
    id: string;
    name: string;
  };
  album: {
    id: string;
    title: string;
    picture: string;
  };
}
