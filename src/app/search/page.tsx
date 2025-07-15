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
  } 
    
  const promises = [
    fetchItems(query, "track").then(items => getFullItemListDetails(items, "track")),
    fetchItems(query, "artist").then(items => getFullItemListDetails(items, "artist")),
    fetchItems(query, "album").then(items => getFullItemListDetails(items, "album")),
  ];

  const [tracks, artists, albums] = await Promise.all(promises);

  const results = {
    tracks: tracks || [],
    artists: artists || [],
    albums: albums || [],
  };

  return <View results={results} />;

}
