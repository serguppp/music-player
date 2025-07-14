"use client";

import Image from "next/image";
import { Artist, Album, Track, ItemTypes } from "@/types/types";
import { BgColorFromImage } from "@/hooks/useImageAverageColor";
import { adjustFontSize } from "@/utils/adjustFontSize";
import Carousel from "@/components/Carousel";
import TrackTable from "@/components/TrackTable";

type Props = {
  item: Artist;
  tracks: Track[];
  albums: Album[] | ItemTypes[];
};

export default function View({ item, tracks, albums }: Props) {
  const bgColor = BgColorFromImage(item.picture_xl);
  const titleStyle = adjustFontSize(item.name);
  // FIXME: add view all tracks
  return (
    <div
      className="max-w-7xl bg-card flex flex-col gap-y-5 p-5 rounded-4xl "
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
          ></Image>
        </div>
        <div className="flex flex-col justify-center relative min-w-sm ">
          <div className="flex flex-col">
            <p>artist</p>
            <h1 className={`${titleStyle} font-bold`}>{item.name}</h1>
          </div>

          <div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
            <p>
              {Math.round(item.nb_fan).toLocaleString("pl-PL")} listeners this
              month
            </p>
          </div>
        </div>
      </div>

      <TrackTable type="artist" tracks={tracks} />

      <div className="flex flex-col gap-5 w-full h-[500px]">
        <h2 className="px-2 font-bold text-2xl">Discography</h2>

        <div className="">
          <Carousel items={albums} artist={item.name} className="p-10" />
        </div>
      </div>
    </div>
  );
}
