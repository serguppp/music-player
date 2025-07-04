import Image from "next/image";
import Link from 'next/link';
import Button from "@/components/Button";
export default function Home() {
  return (
        <div className="min-h-screen">
          <main>
              <section className="hero-bg min-h-screen rounded-4xl font-[family-name:var(--font-geist-sans)] flex items-center p-10">
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

            <section>
ee
            </section>
          </main>
        </div>
    
  );
}
