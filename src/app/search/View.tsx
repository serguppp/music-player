'use client'

import { useState } from "react";
import { Track, Album, Playlist, Artist, ItemTypes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import TrackTable from "@/components/TrackTable";
import { isArtist, isTrackArray } from "@/utils/typeGuards";

type SearchResults = {
	tracks: ItemTypes[];
	artists: ItemTypes[];
	albums: ItemTypes[];
}

type Props = {
	results :  SearchResults;
}

export default function View({ results }: Props) {
  return (
    <div className="bg-card flex flex-col gap-y-5 p-5 rounded-4xl">
      <div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
		<div className="">
			<TrackTable type="search" tracks={isTrackArray(results.tracks) ? results.tracks : [] }/>
		</div>

		<div className="grid">
			<ul>
				{results.artists.map((result, id) => (
				<li key={result.id} className="mb-4">
					{isArtist(result) && (
					<Link rel="preload" href={`artist/${result.id}`}>	
						<Image loading="lazy"  src={result.picture_xl} width={192} height={192} alt={'es'}></Image>
						🎵 {result.name}
					</Link>
					)}
				</li>
				))}
			</ul>
		</div>

      </div>
      
    </div>
  );
}