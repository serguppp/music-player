import { fetchItemByID } from "@/lib/data";
import View from "./View";
import Page404 from "@/components/Page404";
import { getFullTrackDetails } from "@/lib/tracks";
import { isPlaylist } from "@/utils/typeGuards";

type Params = Promise<{id: string}>

export default async function Page(props: {params:Params}) {
  const id = (await props.params).id;
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
