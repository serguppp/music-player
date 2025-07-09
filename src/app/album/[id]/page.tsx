import { fetchItemByID } from "@/lib/data";
import View from "./View";
import Page404 from "@/components/Page404";
import { getFullTrackDetails } from "@/lib/tracks";

export default async function Home({params} : {params : { id:string }}){
    const id = await params.id;
    const item = await fetchItemByID("album", id);
    
    if (!item || item.type != "album"){
        return (
            <Page404/>
        )
    }
    else{
        const tracks = item.tracks.data ? await getFullTrackDetails(item.tracks.data) : [];
        return(
            <View item={item} tracks={tracks}/>
        )
    }

}