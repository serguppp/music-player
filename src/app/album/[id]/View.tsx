"use client";

import Image from "next/image";
import { useItemByID, useItemDetails } from "@/hooks/useQueries";
import { BgColorFromImage } from "@/hooks/useImageAverageColor";
import { adjustFontSize } from "@/utils/adjustFontSize";
import Link from "next/link";
import TrackTable from "@/components/TrackTable";
import LoadingPage from "@/components/LoadingPage";
import { isAlbum, isTrackArray } from "@/utils/typeGuards";
import Page404 from "@/components/Page404";

type Props = {
  id: string;
};

export default function AlbumView({ id }: Props) {
  const { data: album, isLoading: isLoadingAlbum } = useItemByID("album", id)
  const item = album && isAlbum(album) ? album : null;

  const { data: tracks, isLoading: isLoadingTracks } = useItemDetails(item?.tracks.data ?? [], "track");

  const bgColor = BgColorFromImage(item?.cover_small ?? ""); 
  const titleStyle = adjustFontSize(item?.title ?? "");

  if (isLoadingAlbum || isLoadingTracks) {
    return <LoadingPage />;
  }

  if (!item || !isAlbum(item)) {
    return <Page404/>;
  }

  return (
    <div
      className="max-w-full bg-card flex flex-col gap-y-5 p-5 rounded-4xl "
      style={{
        background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)`,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
        <div className="lg:min-w-52 lg:min-h-52">
          <Image
            loading="lazy"
            src={item.cover_xl}
            alt={"item Cover"}
            width={192}
            height={192}
            className="w-52 h-52 rounded-2xl shadow-lg"
          ></Image>
        </div>
        <div className="flex flex-col justify-center relative min-w-sm ">
          <div className="flex flex-col">
            <p>{item.record_type}</p>
            <h1 className={`${titleStyle} font-bold`}>{item.title}</h1>
          </div>
          <div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
            <Link rel="preload" href={`/artist/${item.artist.id}`}>
              <p className="font-bold hover:underline">{item.artist.name}</p>
            </Link>
            <p>• {item.release_date.slice(0, 4)} •</p>
            <p>{item.nb_tracks} tracks •</p>
            <p>
              {(item.duration / 60).toFixed(0)} m {item.duration % 60} s{" "}
            </p>
          </div>
        </div>
      </div>
      <TrackTable type="default" tracks={isTrackArray(tracks) ? tracks : []} />
    </div>
  );
}
