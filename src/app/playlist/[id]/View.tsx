'use client'

import Image from "next/image"
import Button from "@/components/Button";
import { Album, Track, Playlist } from "@/types/types";
import { Heart, Icon, ListPlus } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Share } from 'lucide-react';
import { BgColorFromImage } from '@/hooks/useImageAverageColor';
import { adjustFontSize } from "@/utils/adjustFontSize";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
	item : Playlist;
	tracks: Track[];
}

export default function View( {item, tracks} : Props){
	const bgColor = BgColorFromImage(item.picture_xl);

	const handlePlay = () =>{
		console.log("Playing:", item.title);
	}

	const titleStyle = adjustFontSize(item.title);

  return (
    	<div className="bg-card flex flex-col gap-y-5 p-5 rounded-4xl " style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)` }}>
			<div className="rounded-t-4xl w-full">
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
      	</div>

      	<div className="flex flex-row gap-2 ">
          	<Button raw variant="play" onClick={handlePlay}/>
		  	<Button raw variant="bar" onClick={handlePlay} Icon = {Heart}/>
		   	<Button raw variant="bar" onClick={handlePlay} Icon = {ListPlus}/>
			<Button raw variant="bar" onClick={handlePlay} Icon = {Share}/>
      	</div>

		<div className = "grid grid-cols-[50px_1fr] lg:grid-cols-[50px_1fr_200px_50px] px-2">
			<div className="justify-self-end me-9">
				<p>#</p>
			</div>

			<div>
				<p>Title</p>
			</div>
            
            <div className="hidden lg:block justify-self-end lg:me-15">
				<p>Album</p>
			</div>

			<div className="hidden lg:block justify-self-end ">
				<Clock/>			
			</div>
		</div>

		<hr className="border-card-hover w-full border-t"/>

		<ul className="flex flex-col gap-3 ">
			{tracks ? tracks.map((track, i)=>(
			<li key={track.id} className="items-center group py-1 grid grid-cols-[50px_1fr] lg:grid-cols-[50px_1fr_200px_50px] px-2 hover:bg-card-hover rounded-lg" >
				<div className="group-hover:hidden justify-self-end me-9"><p>{i+1}</p></div>
				<div className="hidden group-hover:block"><Button raw variant="bar_play" onClick={handlePlay} className=""/></div>
				<div className="relative">
					<Link rel="preload" href={`/album/${track.album.id}`}><p>{track.title}</p></Link>
					<div className="text-xs text-normal-pink">
						{track.contributors.map((c, i) => (
							<Fragment key={i}>
							<Link rel="preload" href={`/artist/${c.id}`} className="hover:underline">{c.name}</Link>
							{i < track.contributors.length - 1 && ", "}
							</Fragment>
						))}
					</div>
				</div>
                <div className="max-w-[200px] hidden lg:block justify-self-end me-5 lg:me-15 truncate"><p>{track.album.title}</p></div>
				<div className="hidden lg:block justify-self-center" ><p>{(track.duration/60).toFixed(0)}:{(track.duration%60)<10 ? `0${track.duration%60}`: track.duration%60}</p></div>
			</li>
		)) : ""}
		</ul>
    
	</div>
    
  );
}