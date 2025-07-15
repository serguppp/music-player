import { fetchNewAlbums, fetchTop } from "@/lib/data";
import View from "./View";

export default async function Page() {
  const promises = [
    fetchTop("tracks",36),
    fetchTop("artists", 36),
    fetchTop("playlists", 36),
    fetchNewAlbums(36),
  ];

  const [topTracks, topArtists, topPlaylists, newAlbums] = await Promise.all(promises);

  return (
    <View
      topTracks={topTracks}
      newAlbums={newAlbums}
      topArtists={topArtists}
      topPlaylists={topPlaylists}
    />
  );
}
