import { fetchItemByID } from "@/lib/data";
import View from "./View";
import Page404 from "@/components/Page404";
import { getFullTrackDetails } from "@/lib/tracks";
import { isPlaylist } from "@/utils/typeGuards";

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const {id} = await(params);
  const item = await fetchItemByID("playlist", id);

  if (!item || !isPlaylist(item)) {
    return <Page404 />;
  } else {
    const tracks = item.tracks.data
      ? await getFullTrackDetails(item.tracks.data)
      : [];
    return <View item={item} tracks={tracks} />;
  }
}
