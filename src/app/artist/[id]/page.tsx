import {
  fetchArtistAlbums,
  fetchArtistTopTracks,
  fetchItemByID,
} from "@/lib/data";
import View from "./View";
import Page404 from "@/components/Page404";
import { getFullItemListDetails, getFullTrackDetails } from "@/lib/tracks";
import { isArtist } from "@/utils/typeGuards";

type Params = Promise<{id: string}>

export default async function Page(props: {params:Params}) {
  const id = (await props.params).id;
  const item = await fetchItemByID("artist", id);

  if (!item || !isArtist(item)) {
    return <Page404 />;
  } 

  const [tracks, albums] = await Promise.all([
    fetchArtistTopTracks(id, 5).then(topTracks => {
      return topTracks ? getFullTrackDetails(topTracks) : [];
    }),
    (async () => {
      if (item.nb_album > 0){
        const artistAlbums = await fetchArtistAlbums(id);
        return artistAlbums ? getFullItemListDetails(artistAlbums, "album") : [];
      }
      return [];
    })(),]);


  return <View item={item} tracks={tracks} albums={albums} />;
  
}
