import { ItemTypes, Track } from "@/types/types";
import { fetchItemByID } from "@/lib/data";
import { isTrack } from "@/utils/typeGuards";
import { delay } from "@/lib/data";

const API_DELAY = 0.05;

// This function returns full details about tracks.
// It is used to fetch full track information when tracks are part of albums, artists, or playlists, 
// as these are often represented by partial track objects.

export async function getFullTrackDetails(tracks: Track[]): Promise<Track[]> {
	if (!tracks) return [];

	const detailedTracks: Track[] = [];
		for (const track of tracks) {
			const fullTrack = await fetchItemByID("track", track.id);
			
			if (fullTrack && isTrack(fullTrack)) {
					detailedTracks.push(fullTrack);
			}
			await delay(API_DELAY); 
	}

	return detailedTracks;
}

export async function getFullItemListDetails(items: ItemTypes[], type: string): Promise<ItemTypes[]> {
	if (!items) return [];

	const detailedItems: ItemTypes[] = [];

	for (const item of items) {
			const fullItem = await fetchItemByID(type, item.id);
			
			if (fullItem && fullItem.type === type) {
					detailedItems.push(fullItem);
			}

			await delay(API_DELAY);
	}
	
	return detailedItems;
}
