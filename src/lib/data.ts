import { NextResponse } from "next/server";
/*async function fetchTrack(trackName: string){
  const response = await fetch(`http://localhost:3000/api/search?q=${trackName}&type=track`);
  const data = await response.json();
  
  if (data.data && data.data.length > 0){
    return data.data[0]; 
  }
  return null;
}

async function fetchArtist(artistName:string){
  const response = await fetch(`http://localhost:3000/api/search?q=${artistName}&type=artist`);
  const data = await response.json();

  if (data.data && data.data.length > 0){
    return data.data[0]; 
  }
  return null;
}
*/

// Fetching items (types: "artist", "album", "track")
export async function fetchItem(name:string, type:string){
    const response = await fetch(`http://localhost:3000/api/search?q=${name}&type=${type}`);
    const data = await response.json();

    if (data.data && data.data.length > 0){
        return data.data[0]; 
    }
    return null;
}

export async function fetchTop(type: string){
    const response = await fetch(`http://localhost:3000/api/chart?type=${type}&limit=5`);
    const data = await response.json();

    if (data.data && data.data.length >0){
        return data.data
    }
    return [];
}

export async function fetchNewAlbums(){
    const response = await fetch(`http://localhost:3000/api/editorial?limit=5`);
    const data = await response.json();

    if (data.data && data.data.length > 0){
        return data.data;
    }

    return [];
}