'use client'

import { ItemTypes } from "@/types/types";
import TrackTable from "@/components/TrackTable";
import { isTrackArray } from "@/utils/typeGuards";
import Shelf from "@/components/Shelf";

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
    <div className="bg-background flex flex-col gap-y-5 p-5 rounded-4xl">
      <div className="flex flex-col gap-10 mt-20 min-w-full ">
			<h2 className="px-2 font-bold text-2xl">Tracks</h2> 

			<div className="w-full">
				<TrackTable type="search" tracks={isTrackArray(results.tracks) ? results.tracks : [] }/>
			</div>
			
			<div>
				<h2 className="px-2 font-bold text-2xl">Authors</h2> 
				<Shelf items={results.artists.slice(0,5)} variant="circle"></Shelf>
			</div>

			<div>
				<h2 className="px-2 font-bold text-2xl">Albums</h2> 
				<Shelf items={results.albums.slice(0,5)} variant="square"></Shelf>
			</div>

		</div>
    </div>
  );
}

