import { fetchItems } from "@/lib/data";
import View from "./View";
import { getFullItemListDetails } from "@/lib/tracks";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [q: string]: string | string[] | undefined }>

export default async function Page(props: {searchParams:SearchParams}) {
  const q = (await props.searchParams).q;
  const query = Array.isArray(q) ? q[0] : q;

  if (!query) {
    redirect("/");
  } else {
    const searchedTracks = await fetchItems(query, "track");
    const searchedArtists = await fetchItems(query, "artist");
    const searchedAalbums = await fetchItems(query, "album");

    const tracks = await getFullItemListDetails(searchedTracks, "track");
    const artists = await getFullItemListDetails(searchedArtists, "artist");
    const albums = await getFullItemListDetails(searchedAalbums, "album");

    const results = {
      tracks: tracks || [],
      artists: artists || [],
      albums: albums || [],
    };

    return <View results={results} />;
  }
}
