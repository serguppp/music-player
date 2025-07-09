import { Album, Artist, Playlist, Track } from "@/types/types";
import { NextResponse } from "next/server";

export type ItemTypes = Track | Album | Artist | Playlist;

const DEEZER_API_URL = "https://api.deezer.com";

async function apiFetch<T>(url:string): Promise<T | null> {
    try{
        const response = await fetch(url);
        if(!response.ok){
            console.log("Deezer API failed response for url: ", url);
            return null;
        }

        const data = await response.json();
        if(data.error){
            console.error(`API returned an error:`, data.error);
            return null;
        }        

        return (data.data || data) as T;
    } catch(error){
        console.log (`Failed to fetch item from ${url}`, error);
        return null;
    }
}

// Fetching items (types: "artist", "album", "track", "playlist")
export async function fetchItem(name:string, type:string) : Promise<ItemTypes | null>{
   const url = `${DEEZER_API_URL}/search/${type}?q=${name}`;
   return await apiFetch<ItemTypes>(url);
    
}

export async function fetchItemByID(type:string, id: string) : Promise<ItemTypes | null>{
    const url = `${DEEZER_API_URL}/${type}/${id}`;
    return await apiFetch<ItemTypes>(url);
}

// Fetch top global items selected by Deezer team;
export async function fetchTop(type: string) : Promise<ItemTypes[]>{
    const url = `${DEEZER_API_URL}/chart/0/${type}?limit=5`;
    return (await apiFetch<ItemTypes[]>(url)) ?? [];
}

export async function fetchNewAlbums() : Promise<Album[]>{
    const url = `${DEEZER_API_URL}/editorial/0/releases?limit=5`;
    return (await apiFetch<Album[]>(url)) ?? [];
}

