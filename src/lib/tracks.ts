import { ItemTypes, Track } from "@/types/types";
import { fetchItemByID } from "@/lib/data";

// FIXME: Add timeout between api requests

// This function returns full details about tracks.
// It is used to fetch full track information when tracks are part of albums, artists, or playlists, 
// as these are often represented by partial track objects.

export async function getFullTrackDetails(tracks : Track[]) : Promise<Track[]>{
    const result = tracks ? (
        await Promise.all(
            tracks.map((track) => fetchItemByID("track", track.id)))).filter((t): t is Track => t !== null && t.type === "track")
            : [];
    return result;
}

export async function getFullItemListDetails(items : ItemTypes[], type : string) : Promise<ItemTypes[]>{
    const result = items ? (
        await Promise.all(
            items.map((item) => fetchItemByID(type, item.id)))).filter((t): t is ItemTypes => t !== null && t.type === type)
            : [];
    return result;
}

export async function getFullItemDetails(item : ItemTypes, type : string) : Promise<ItemTypes | null>{
    const result = item ? fetchItemByID(type, item.id) : null;
    return result;
}