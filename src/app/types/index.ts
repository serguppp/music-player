export type Artist = {
  name: string;
};

export type Album = {
  cover_small: string;
};

export type Track = {
  id: number;
  title: string;
  artist: Artist;
  album: Album;
  preview: string;
};