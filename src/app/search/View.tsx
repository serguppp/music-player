"use client";

import TrackTable from "@/components/TrackTable";
import { isTrackArray } from "@/utils/typeGuards";
import Shelf from "@/components/Shelf";
import {useItems } from "@/hooks/useQueries";
import LoadingPage from "@/components/LoadingPage";

type Props = {
  query: string;
};

export default function View({ query }: Props) {
  const { data: tracks, isLoading: isLoadingTracks } = useItems("track", query, 5);
  const { data: artists, isLoading: isLoadingArtists } = useItems("artist", query, 5);
  const { data: albums, isLoading: isLoadingAlbums } = useItems("album", query, 5);

  const isLoading = 
    isLoadingTracks || isLoadingArtists || isLoadingAlbums;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-background flex flex-col gap-y-5 p-5 rounded-4xl">
      <div className="flex flex-col gap-10 mt-20 min-w-full ">
        <h2 className="px-2 font-bold text-2xl">Tracks</h2>

        <div className="w-full">
          <TrackTable
            type="search"
            tracks={tracks ? isTrackArray(tracks) ? tracks : [] : []}
          />
        </div>

        <div>
          <h2 className="px-2 font-bold text-2xl">Authors</h2>
          <Shelf items={artists ?? []} variant="circle"></Shelf>
        </div>

        <div>
          <h2 className="px-2 font-bold text-2xl">Albums</h2>
          <Shelf items={albums ?? []} variant="square"></Shelf>
        </div>
      </div>
    </div>
  );
}
