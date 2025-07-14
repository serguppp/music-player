import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import Button from "./Button";
import { Track } from "@/types/types";
import { estimatePopularity } from "@/utils/estimatePopularity";

import { Clock, Heart, ListPlus, Share } from "lucide-react";
import { usePlayback } from "@/hooks/usePlayback";

type Props = {
  type?: "default" | "artist" | "playlist" | "search";
  tracks: Track[];
};

export default function TrackTable({ type, tracks }: Props) {
  const { playSingleTrack, playTracklist } = usePlayback();

  const tracksCopy = [...tracks];

  if (type == "search") {
    tracks = tracks.slice(0, 5);
  }

  return (
    <div className="flex flex-col gap-y-5">
      {/* Media controls Bar*/}
      {type != "search" ? (
        <div className="flex flex-row gap-2 ">
          <Button raw variant="play" onClick={playTracklist(tracksCopy)} />
          <Button raw variant="bar" onClick={() => {}} Icon={Heart} />
          <Button raw variant="bar" onClick={() => {}} Icon={ListPlus} />
          <Button raw variant="bar" onClick={() => {}} Icon={Share} />
        </div>
      ) : (
        ""
      )}

      {type === "artist" ? (
        <h2 className="px-2 font-bold text-2xl">Popular tracks</h2>
      ) : (
        ""
      )}

      {/* Table header */}
      <div className="grid grid-cols-[50px_1fr] lg:grid-cols-[50px_1fr_200px_50px] px-2">
        <div className="justify-self-end me-9">#</div>

        <div>
          <p>Title</p>
        </div>

        <div className="hidden lg:block justify-self-end lg:me-15">
          <p>{type === "playlist" ? "Album" : "Plays"}</p>
        </div>

        <div className="hidden lg:block justify-self-center ">
          <Clock />
        </div>
      </div>

      <hr className="border-card-hover w-full border-t -my-3" />

      {/* Table content */}
      <ul className="flex flex-col gap-3 ">
        {tracks.map((track, i) => (
          <li
            key={track.id}
            className="items-center group py-1 grid grid-cols-[50px_1fr] lg:grid-cols-[50px_1fr_200px_50px] px-2 hover:bg-card-hover rounded-lg"
          >
            <div className="group-hover:hidden justify-self-end me-9">
              {i + 1}
            </div>
            <div className="hidden  group-hover:block">
              <Button
                raw
                variant="bar_play"
                onClick={playSingleTrack(track)}
                className=""
              />
            </div>
            <div className="flex gap-3 items-center">
              {type !== "default" ? (
                <Image
                  src={track.album.cover_xl}
                  width={192}
                  height={192}
                  alt={track.album.title}
                  className="rounded-sm w-10 h-10"
                ></Image>
              ) : null}
              <div>
                <Link rel="preload" href={`/album/${track.album.id}`}>
                  {" "}
                  {track.title}{" "}
                </Link>
                <div className="text-xs text-normal-pink">
                  {track.contributors.map((c, i) => (
                    <Fragment key={i}>
                      <Link
                        rel="preload"
                        href={`/artist/${c.id}`}
                        className="hover:underline"
                      >
                        {c.name}
                      </Link>
                      {i < track.contributors.length - 1 && ", "}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            {type === "playlist" ? (
              <Link rel="preload" href={`/album/${track.album.id}`}>
                <div className="max-w-[200px] hidden lg:block justify-self-end me-5 lg:me-15 truncate">
                  <p>{track.album.title}</p>
                </div>
              </Link>
            ) : (
              <div className="hidden lg:block justify-self-end  me-5 md:me-15">
                {estimatePopularity(track.rank, track.release_date)}
              </div>
            )}
            <div className="hidden lg:block justify-self-center">
              {(track.duration / 60).toFixed(0)}:
              {track.duration % 60 < 10
                ? `0${track.duration % 60}`
                : track.duration % 60}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
