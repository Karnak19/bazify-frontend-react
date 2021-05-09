interface Album {
  id?: string;
  title?: string;
  picture?: string;
  songs?: Song[];
  artist?: Artist;
}

interface Song {
  id?: string;
  title?: string;
  s3_link?: string;
  duration?: string;
  artist?: Artist;
  album?: Album;
}

interface Artist {
  id?: string;
  name?: string;
  picture?: string;
  songs?: Song[];
  albums?: Album[];
}
