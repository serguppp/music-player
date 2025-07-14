"use client";
import Shelf from "@/components/Shelf";
import { Album, ItemTypes } from "@/types/types";
import { useState } from "react";

type Props = {
  topTracks: ItemTypes[],
  newAlbums: Album[],
  topArtists: ItemTypes[],
  topPlaylists: ItemTypes[],
};

export default function View({topTracks, newAlbums, topArtists, topPlaylists} : Props) {
  const [section, setSection] = useState<string>("top-songs");

  const navItems = [
    { id: "top-songs", label: "Top Songs" },
    { id: "new-albums", label: "New Albums" },
    { id: "popular-artists", label: "Popular Artists" },
    { id: "top-playlists", label: "Top Playlists" },
  ];

  return (
    <div className="flex flex-col gap-y-20">
      <nav className="flex text-xs md:text-base justify-center gap-x-8 py-4 bg-background/10 backdrop-blur-md sticky top-16 z-10 ">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`cursor-pointer  hover:text-normal-pink transition-colors ${
              section === id ? "underline text-normal-pink" : "text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {section === "top-songs" && (
        <section id="top-songs" className={`px-10`}>
          <Shelf button={false} items={topTracks} variant="square">
            Weekly Top <span className="text-normal-pink">Songs</span>
          </Shelf>
        </section>
      )}

      {section === "new-albums" && (
        <section id="new-albums" className="px-10">
          <Shelf button={false} items={newAlbums} variant="square">
            New <span className="text-normal-pink">Album </span>Releases
          </Shelf>
        </section>
      )}

      {section === "popular-artists" && (
        <section id="popular-artists" className="px-10">
          <Shelf button={false} items={topArtists} variant="circle">
            Popular <span className="text-normal-pink">Artists</span>
          </Shelf>
        </section>
      )}

      {section === "top-playlists" && (
        <section id="top-playlists" className="px-10">
          <Shelf button={false} items={topPlaylists} variant="square">
            Top <span className="text-normal-pink">Playlists</span>
          </Shelf>
        </section>
      )}
    </div>
  );
}
