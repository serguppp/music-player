import { Album, Artist, Playlist, Track } from "@/types/types";
import { NextResponse } from "next/server";

export type ItemTypes = Track | Album | Artist | Playlist;
// Fetching items (types: "artist", "album", "track", "playlist")
export async function fetchItem(name:string, type:string) : Promise<ItemTypes | null>{
    try{
        const response = await fetch(`http://localhost:3000/api/search?q=${name}&type=${type}`);
        if(!response.ok){
            console.log("Deezer API failed response for item ", name, " ", type);
            return null;
        }
        
        const data = await response.json();
        if(data.error){
            return null;
        }
        return data as ItemTypes;
    } catch(error){
        console.log ("Failed to fetch item ", error);
        return null;
    }
    
}

export async function fetchItemByID(type:string, id: string) : Promise<ItemTypes | null>{
    try{
        const response = await fetch(`https://api.deezer.com/${type}/${id}`);
        if(!response.ok){
            console.log("Deezer API failed response for track ", id);
            return null;
        }

        const data = await response.json();
        if(data.error){
            return null;
        }
        return data as ItemTypes;
    } catch(error){
        console.log ("Failed to fetch track", error);
        return null;
    }
}


// Fetch top global items selected by Deezer team;
export async function fetchTop(type: string) : Promise<ItemTypes[]>{
    try{
        const response = await fetch(`https://api.deezer.com/chart/0/${type}?limit=5`);
        if(!response.ok){
            console.log("Deezer API failed response for top ", type);
            return [];
        }

        const data = await response.json();
        return data.data ?? [];
    } catch(error){
        console.log("Failed to fetch Top tracks ", error);
        return [];
    }
}

export async function fetchNewAlbums() : Promise<ItemTypes[]>{
    try{
        const response = await fetch(`https://api.deezer.com/editorial/0/releases?limit=5`);
        if(!response.ok){
            console.log("Deezer API failed response for newest albums");
        }
        
        const data = await response.json();
        return data.data ?? [];
    } catch(error){
        console.log("Failed to fetch new albums", error);
        return [];   
    }
}

