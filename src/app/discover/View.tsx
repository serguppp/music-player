"use client";
import LoadingPage from "@/components/LoadingPage";
import Shelf from "@/components/Shelf";
import Button from "@/components/Button";
import { useNewAlbums, useTopItems } from "@/hooks/useQueries";
import { useState } from "react";

export default function View() {
  const { data: topTracks, isLoading: isLoadingTopTracks } = useTopItems("tracks",36);
  const { data: topArtists, isLoading: isLoadingTopArtists } = useTopItems("artists",36);
  const { data: topPlaylists, isLoading: isLoadingTopPlaylists } = useTopItems("playlists", 36);
  const { data: newAlbums, isLoading: isLoadingNewAlbums } = useNewAlbums(36);

  const isLoading = isLoadingTopTracks || isLoadingTopArtists || isLoadingTopPlaylists || isLoadingNewAlbums;

  const [section, setSection] = useState<string>("top-songs");

  if (isLoading) {
    return <LoadingPage />;
  }

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
          <Button variant="state" raw
            key={id}
            onClick={() => setSection(id)}
            className={` ${
              section === id ? "underline text-normal-pink" : "text-white"
            }`}
          >
            {label}
          </Button>
        ))}
      </nav>

      {section === "top-songs" && (
        <section id="top-songs" className={`px-10`}>
          <Shelf button={false} items={topTracks? topTracks : []} variant="square">
            Weekly Top <span className="text-normal-pink">Songs</span>
          </Shelf>
        </section>
      )}

      {section === "new-albums" && (
        <section id="new-albums" className="px-10">
          <Shelf button={false} items={newAlbums? newAlbums: []} variant="square">
            New <span className="text-normal-pink">Album </span>Releases
          </Shelf>
        </section>
      )}

      {section === "popular-artists" && (
        <section id="popular-artists" className="px-10">
          <Shelf button={false} items={topArtists? topArtists : []} variant="circle">
            Popular <span className="text-normal-pink">Artists</span>
          </Shelf>
        </section>
      )}

      {section === "top-playlists" && (
        <section id="top-playlists" className="px-10">
          <Shelf button={false} items={topPlaylists? topPlaylists : []} variant="square">
            Top <span className="text-normal-pink">Playlists</span>
          </Shelf>
        </section>
      )}
    </div>
  );
}
