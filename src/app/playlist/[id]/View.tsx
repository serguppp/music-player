'use client'

import Image from "next/image"
import { Track, Playlist } from "@/types/types";
import { BgColorFromImage } from '@/hooks/useImageAverageColor';
import { adjustFontSize } from "@/utils/adjustFontSize";
import TrackTable from "@/components/TrackTable";

type Props = {
	item : Playlist;
	tracks: Track[];
}

export default function View( {item, tracks} : Props){
	const bgColor = BgColorFromImage(item.picture_xl);

	const titleStyle = adjustFontSize(item.title);

  return (
		<div className="bg-card flex flex-col gap-y-5 p-5 rounded-4xl " style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)` }}>
			<div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
				<div className="xl:min-w-52 xl:min-h-52">
					<Image loading="lazy" src={item.picture_xl} alt={'Album Cover'}  width={192} height={192} className="w-52 h-52 rounded-2xl shadow-lg"></Image>
				</div>
				<div className="flex flex-col justify-center relative min-w-sm ">
					<div className="flex flex-col">
						<p>playlist</p>
						<h1 className={`${titleStyle} font-bold`}>{item.title}</h1>
						<p>{item.description}</p>                            
					</div>

					<div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
						<p className="font-bold" >{item.creator.name} •</p>
						<p>{item.nb_tracks} tracks •</p>
						<p>{(item.duration/60).toFixed(0)} m {(item.duration%60)} s </p>
					</div>  
				</div>
      		</div>

			<TrackTable type="playlist" tracks={tracks}/>
	</div>
  );
}