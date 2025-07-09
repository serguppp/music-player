import { fetchArtistTopTracks, fetchItemByID } from "@/lib/data";
import { Track } from "@/types/types";
import View from "./View";
import Page404 from "@/components/Page404";
import { getFullTrackDetails } from "@/lib/tracks";

export default async function Home({params} : {params : { id:string }}){
    const id   =  await params.id;
    const item = await fetchItemByID("artist", id);

    
    if (!item || item.type != "artist"){
        return (
            <Page404/>
        )
    }
    else{
        const topTracks = await fetchArtistTopTracks(id, 5);
        const tracks = topTracks != null ? await getFullTrackDetails(topTracks) : [];

        return(
            <View item={item} tracks={tracks}/>
        )
    }

}