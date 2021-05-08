import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
      s3_link
      duration
      artist {
        name
      }
      album {
        picture
      }
    }
  }
`;

export const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      id
      title
      picture
      songs {
        id
      }
      artist {
        name
      }
    }
  }
`;

export const GET_ALBUM_SONGS = gql`
  query GetAlbumSongs($id: ID!) {
    album(id: $id) {
      picture
      songs {
        id
        title
        s3_link
        duration
      }
      artist {
        name
      }
    }
  }
`;
