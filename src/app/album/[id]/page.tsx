import { fetchItemByID } from "@/lib/data";
import Image from "next/image";
import Button from "@/components/Button";
import View from "./View";

export default async function Home({params} : {params : { id:string }}){
    const { id } =  await params;
    const item = await fetchItemByID("album", id);
    
    if (!item){
        return (
            <div>
                "Utwór nie istnieje"
            </div>
        )
    }
    else{
        return(
            <View album={item}/>
        )
    }

}