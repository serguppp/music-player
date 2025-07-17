import { Album, Track, ItemTypes } from "@/types/types";

const IS_SERVER = typeof window === 'undefined';

const DEEZER_API_URL = IS_SERVER ? "https://api.deezer.com" : "/api/deezer";

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function apiFetch<T>(url:string): Promise<T | null> {
	try{
		const response = await fetch(url, { cache: 'no-store'});
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

// Fetching item (types: "artist", "album", "track", "playlist")
export async function fetchItem(type:string, name:string) : Promise<ItemTypes | null>{
	const url = `${DEEZER_API_URL}/search/${type}?q=${name}`;
	return await apiFetch<ItemTypes>(url);
}

// Fetching list of items
export async function fetchItems(type:string, name:string, limit:number) : Promise<ItemTypes[]>{
	const url = `${DEEZER_API_URL}/search/${type}?q=${name}&limit=${limit}`;
	return (await apiFetch<ItemTypes[]>(url)) ?? [];
}

// Fetching item by its ID
export async function fetchItemByID(type:string, id: string) : Promise<ItemTypes | null>{
	const url = `${DEEZER_API_URL}/${type}/${id}`;
	return await apiFetch<ItemTypes>(url);
}

// Fetch top global items selected by Deezer team 
export async function fetchTopItems(type: string, limit: number) : Promise<ItemTypes[]>{
	const url = `${DEEZER_API_URL}/chart/0/${type}?limit=${limit}`;
	return (await apiFetch<ItemTypes[]>(url)) ?? [];
}

// Fetch new albums 
export async function fetchNewAlbums(limit: number) : Promise<Album[]>{
	const url = `${DEEZER_API_URL}/editorial/0/releases?limit=${limit}`;
	return (await apiFetch<Album[]>(url)) ?? [];
}

// Fetch top artist's tracks.
export async function fetchArtistTopTracks(id: string, limit: number): Promise<Track[]>{
	const url = `${DEEZER_API_URL}/artist/${id}/top?limit=${limit}`
	return (await apiFetch<Track[]>(url)) ?? [];
}

// Fetch artists' albums.
export async function fetchArtistAlbums(id: string) : Promise<Album []>{
	const url = `${DEEZER_API_URL}/artist/${id}/albums/`
	return (await apiFetch<Album[]>(url)) ?? [];
}