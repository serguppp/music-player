import Image from "next/image";
import Link from 'next/link';
import Button from "@/components/Button";
import Shelf from "@/components/Shelf";

async function fetchTrack(trackName: string){
  const response = await fetch(`http://localhost:3000/api/search?q=${trackName}&type=track`);
  const data = await response.json();
  
  if (data.data && data.data.length > 0){
    return data.data[0]; 
  }
  return null;
}

async function fetchArtist(artistName:string){
  const response = await fetch(`http://localhost:3000/api/search?q=${artistName}&type=artist`);
  const data = await response.json();

  if (data.data && data.data.length > 0){
    return data.data[0]; 
  }
  return null;
}

async function _fetch(name:string, type:string){
    const response = await fetch(`http://localhost:3000/api/search?q=${name}&type=${type}`);
  const data = await response.json();

  if (data.data && data.data.length > 0){
    return data.data[0]; 
  }
  return null;
}

export default async function Home() {
  const track = await _fetch("Hinata", "track");
  const track2 = await _fetch("Candy quebonafide", "track");
  const artist = await _fetch("Szpaku", "artist");
  const artist2 = await _fetch("Quebonafide", "artist");
  const album = await _fetch("chore melodie", "album");
  const album2 = await _fetch("romantic psycho", "album");

  return (
        <div className="">
          <main className="flex flex-col gap-y-20 font-[family-name:var(--font-geist-sans)]">
              <section className="hero-bg min-h-screen md:min-h-[90vh] rounded-4xl flex items-center p-10">
                <div className="max-w-2xl lg:w-1/2 xl:w-1/3">
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
                <Shelf items={[track, track2]} variant="square">Weekly Top <span className="text-normal-pink">Songs</span></Shelf>
            </section>

            <section className="px-10">
                <Shelf items={[track, track2]} variant="square">New Release <span className="text-normal-pink">Songs</span></Shelf>
            </section>

            <section className="px-10">
                <Shelf items={[artist, artist2]} variant="circle">Popular <span className="text-normal-pink">Artists</span></Shelf>
            </section>

            <section className="px-10">
                <Shelf items={[album, album2]} variant="square">Top <span className="text-normal-pink">Albums</span></Shelf>
            </section>
          </main>
        </div>
    
  );
}
