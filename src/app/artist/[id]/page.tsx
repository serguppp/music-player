import { fetchArtistAlbums, fetchArtistTopTracks, fetchItemByID } from "@/lib/data";
import { Track } from "@/types/types";
import View from "./View";
import Page404 from "@/components/Page404";
import { getFullItemDetails, getFullItemListDetails, getFullTrackDetails } from "@/lib/tracks";
import { isArtist } from "@/utils/typeGuards";

export default async function Home({params} : {params : { id:string }}){
	const id  =  await params.id;
	const item = await fetchItemByID("artist", id);

	if (!item || !isArtist(item)){
		return (
			<Page404/>
		)
	}
	else{
		const topTracks = await fetchArtistTopTracks(id, 5);
		const tracks = topTracks ? await getFullTrackDetails(topTracks) : [];
		
		const artistAlbums = item.nb_album > 0 ? await fetchArtistAlbums(id) : [];
		const albums = artistAlbums ? await getFullItemListDetails(artistAlbums, "album") : [];

		return(
				<View item={item} tracks={tracks} albums={albums}/>
		)
	}

}