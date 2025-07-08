import { NextResponse } from "next/server";
// Fetching items (types: "artist", "album", "track", "playlist")
export async function fetchItem(name:string, type:string){
    const response = await fetch(`http://localhost:3000/api/search?q=${name}&type=${type}`);
    if(!response.ok){
        console.log("Deezer API failed response for item ", name, " ", type);
    }
    
    const data = await response.json();

    if (data.data && data.data.length > 0){
        return data.data[0]; 
    }
    return null;
}

export async function fetchItemByID(type:string, id: string){
    try{
        const response = await fetch(`https://api.deezer.com/${type}/${id}`);
        if(!response.ok){
            console.log("Deezer API failed response for track ", id);
        }

        const data = await response.json();

        if(data.error){
            return null;
        }

        return data;
  

    } catch(error){
        console.log ("Failed to fetch track", error);
        return null;
    }
}


// Fetch top global items selected by Deezer team;
export async function fetchTop(type: string){
    const response = await fetch(`https://api.deezer.com/chart/0/${type}&limit=5`);
    if(!response.ok){
        console.log("Deezer API failed response for top ", type);
    }

    const data = await response.json();

    if (data.data && data.data.length >0){
        return data.data
    }
    return [];
}

export async function fetchNewAlbums(){
    const response = await fetch(`https://api.deezer.com/editorial/0/releases?limit=5`);
    if(!response.ok){
        console.log("Deezer API failed response for newest albums");
    }
    
    const data = await response.json();

    if (data.data && data.data.length > 0){
        return data.data;
    }

    return [];
}

