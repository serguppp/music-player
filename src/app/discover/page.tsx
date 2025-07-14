import { fetchNewAlbums, fetchTop } from "@/lib/data";
import View from "./View";

export default async function Page() {
  const topTracks = await fetchTop("tracks", 37);
  const topArtists = await fetchTop("artists", 36);
  const topPlaylists = await fetchTop("playlists", 36);
  const newAlbums = await fetchNewAlbums(36);

  return (
    <View
      topTracks={topTracks}
      newAlbums={newAlbums}
      topArtists={topArtists}
      topPlaylists={topPlaylists}
    />
  );
}
