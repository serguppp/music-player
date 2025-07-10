import type { ItemTypes, Track, Playlist, Album, Artist } from "@/types/types";

// Arrays
export function isTrackArray(items: ItemTypes[]): items is Track[] {
  return items.every(item => item.type === "track");
}

export function isAlbumArray(items: ItemTypes[]): items is Album[] {
  return items.every(item => item.type === "album");
}

export function isPlaylistArray(items: ItemTypes[]): items is Playlist[] {
  return items.every(item => item.type === "playlist");
}

export function isArtistArray(items: ItemTypes[]): items is Artist[] {
  return items.every(item => item.type === "artist");
}


// Single items
export function isTrack(item: ItemTypes): item is Track { 
  return item.type === "track";
}

export function isAlbum(item: ItemTypes): item is Album {
  return item.type === "album";
}

export function isPlaylist(item: ItemTypes): item is Playlist {
  return item.type === "playlist"
}

export function isArtist(item: ItemTypes): item is Artist {
  return item.type === "artist";
}