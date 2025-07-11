import { Track, Album, Artist, Playlist } from "@/types/types";
import { fetchItem, fetchItems } from "@/lib/data";
import View from "./View";
import { getFullItemListDetails } from "@/lib/tracks";
import { redirect } from "next/navigation";
export default async function Home({searchParams} : {searchParams : {q : string}}){
	const { q } = await searchParams;
	if (!q){
		redirect("/");
	} else{
		const searchedTracks = await fetchItems(q, "track");
		const searchedArtists = await fetchItems(q, "artist");
		const searchedAalbums = await fetchItems(q, "album");
		
		const tracks = await getFullItemListDetails(searchedTracks, "track");
		const artists = await getFullItemListDetails(searchedArtists, "artist");
		const albums  = await getFullItemListDetails(searchedAalbums, "album");

		const results = {
			tracks: tracks || [],
			artists: artists || [],
			albums: albums || [],
		};
		
		return(
				<View results={results}/>
		)
	}
}