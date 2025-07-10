import Button from "@/components/Button";
import Shelf from "@/components/Shelf";
import { fetchNewAlbums, fetchTop} from "@/lib/data";

export default async function Home() {
  // Types: tracks, albums, artists, playlists, podcasts
  const topTracks = await fetchTop("tracks");
  const topArtists = await fetchTop("artists");
  const topPlaylists = await fetchTop("playlists");  
  const newAlbums = await fetchNewAlbums();
  return (
    <div className="flex flex-col gap-y-20">
        <section className="hero-bg min-h-screen md:min-h-[90vh] rounded-4xl flex items-center p-5 md:p-10">
            <div className="max-w-2xl lg:w-2/3 xl:w-1/3">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
              All the <span className="text-normal-pink">Best Songs</span>
              <br/>
              in One Place
            </h1>
            <h2 className="mt-8 text-sm text-white leading-relaxed text-justify">
              On our website, you can access an amazing collection of popular and new songs. Stream your favourite tracks in high quality and enjoy without interruptions. Whatever you taste in music, we have it all for you!
            </h2>

            <div className="flex mt-8 gap-8 h-10">
              <Button variant="fill" href="/" className="justify-center ">Discover Now</Button>
              <Button variant="outline_blue" href="/asa" className="justify-center text-normal-blue">Create Playlist</Button>
            </div>
          </div>
        </section>

      <section className="px-10">
          <Shelf items={topTracks} variant="square">Weekly Top <span className="text-normal-pink">Songs</span></Shelf>
      </section>

      <section className="px-10">
          <Shelf items={newAlbums} variant="square">New <span className="text-normal-pink">Album </span>Releases</Shelf>
      </section>

      <section className="px-10">
          <Shelf items={topArtists} variant="circle">Popular <span className="text-normal-pink">Artists</span></Shelf>
      </section>

      <section className="px-10">
          <Shelf items={topPlaylists} variant="square">Top <span className="text-normal-pink">Playlists</span></Shelf>
      </section>
    </div>

  );
}
