"use client";

import Image from "next/image";
import { BgColorFromImage } from "@/hooks/useImageAverageColor";
import { adjustFontSize } from "@/utils/adjustFontSize";
import Carousel from "@/components/Carousel";
import TrackTable from "@/components/TrackTable";
import { useArtistAlbums, useArtistTopTracks, useItemByID } from "@/hooks/useQueries";
import LoadingPage from "@/components/LoadingPage";
import { isArtist, isTrackArray } from "@/utils/typeGuards";
import Page404 from "@/components/Page404";

type Props = {
  id: string;
};

export default function ArtistView({ id }: Props) {
  const { data: artist, isLoading: isLoadingArtist } = useItemByID("artist", id);
  const item = artist && isArtist(artist) ? artist : null;

  const { data: tracks, isLoading: isLoadingTracks } = useArtistTopTracks(id, 5);
  const { data: albums, isLoading: isLoadingAlbums } = useArtistAlbums(id ?? "");

  const isLoading = isLoadingArtist || isLoadingTracks || isLoadingAlbums;

  const bgColor = BgColorFromImage(item?.picture_small ?? "");
  const titleStyle = adjustFontSize(item?.name ?? "");

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!item || !isArtist(item)) {
    return <Page404/>;
  }
  
  return (
    <div
      className="max-w-7xl bg-card flex flex-col gap-y-5 p-5 rounded-4xl"
      style={{
        background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)`,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
        <div className="lg:min-w-52 lg:min-h-52">
          <Image
            loading="lazy"
            src={item.picture_xl}
            alt={"item Cover"}
            width={192}
            height={192}
            className="w-52 h-52 rounded-full shadow-black"
          />
        </div>
        <div className="flex flex-col justify-center relative min-w-sm ">
          <div className="flex flex-col">
            <p>artist</p>
            <h1 className={`${titleStyle} font-bold`}>{item.name}</h1>
          </div>
          <div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
            <p>
              {Math.round(item.nb_fan).toLocaleString("pl-PL")} listeners this month
            </p>
          </div>
        </div>
      </div>

      <TrackTable type="artist" tracks={tracks ? isTrackArray(tracks) ? tracks : [] : []} />

      <div className="flex flex-col gap-5 w-full h-[500px]">
        <h2 className="px-2 font-bold text-2xl">Discography</h2>
        <div className="">
          <Carousel items={albums ?? []} className="p-10" />
        </div>
      </div>
    </div>
  );
} 