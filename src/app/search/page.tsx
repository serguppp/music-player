import { Track, Album, Artist, Playlist } from "@/types/types";
import { fetchItem, fetchItems } from "@/lib/data";
import View from "./View";

export default async function Home({searchParams} : {searchParams : {q : string}}){
    const query = await searchParams.q;
    if (!query){
        return (
            <div>
                brak query
            </div>
        )
    }
    else{
        const data = await fetchItems(query, "");
        const results = data ? data : []
        return(
            <View results={results}/>
        )
    }

}