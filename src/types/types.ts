export type ItemTypes = Track | Album | Artist | Playlist;

export type Artist = {
    id: string;
    name: string;
    picture_xl: string;
    link: string;
    nb_fan: number;
    type: 'artist';
};

export type Album = {
    id: string;
    title: string;
    cover_xl: string;
    nb_tracks: number;
    artist: Artist;
    tracks: { data: Track[] };
    record_type: string;
    release_date: string;
    duration: number;
    link: string;
    type: 'album';
};

export type Track = {
    id: string;
    title: string;
    artist: Artist;
    album: Album;
    link: string;
    rank: number;
    release_date: string;
    duration: number;
    contributors: { id: string, name: string}[];
    type: 'track';
};

export type Playlist = {
    id: string;
    title: string;
    description: string;
    duration: number;
    tracks: {data: Track[]};
    nb_tracks: number;
    fans: number;
    picture_xl: string;
    link: string;
    creator: {name: string };
    type: 'playlist';
};