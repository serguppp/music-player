export type Artist = {
    id: number;
    name: string;
    picture_xl: string;
    link: string;
    type: 'artist';
};

export type Album = {
    id: number;
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
    id: number;
    title: string;
    artist: Artist;
    album: Album;
    link: string;
    rank: number;
    release_date: string;
    duration: number;
    type: 'track';
};

export type Playlist = {
    id: number;
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