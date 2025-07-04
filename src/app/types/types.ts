export type Artist = {
    id: number;
    name: string;
    picture_xl: string;
    link: string;
    type: 'artist';
}

export type Album = {
    id: number;
    title: string;
    cover_xl: string;
    artist: Artist;
    link: string;
    type: 'album';
}

export type Track = {
    id: number;
    title: string;
    artist: Artist;
    album: Album;
    link: string;
    type: 'track';
}