import { fetchItemByID } from "@/lib/data";
import View from "./View";
import Page404 from "@/components/Page404";

export default async function Home({params} : {params : { id:string }}){
    const { id } =  await params;
    const item = await fetchItemByID("playlist", id);
    
    if (!item){
        return (
            <Page404/>
        )
    }
    else{
        return(
            <View playlist={item}/>
        )
    }

}