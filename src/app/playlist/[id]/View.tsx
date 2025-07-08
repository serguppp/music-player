'use client'

import { useState, useEffect } from 'react';
import Image from "next/image"
import Button from "@/components/Button";
import { Album, Track, Playlist } from "@/app/types/types";
import { FastAverageColor } from 'fast-average-color';
import { Heart, Icon, ListPlus } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Share } from 'lucide-react';

type HeaderProps = {
  playlist: Playlist;
}

function adjustFontSize(text: string): string {
	const length = text.length;
	if (length < 20) return 'text-7xl';
	if (length < 40) return 'text-5xl';
	if (length < 60) return 'text-3xl';
	return 'text-2xl';
}

export default function View( {playlist} : HeaderProps){
	const [bgColor, setBgColor] = useState('#1e1e1e');

	useEffect(() => {
		const fac = new FastAverageColor();
		fac.getColorAsync(playlist.picture_xl, { mode: 'precision' })
		.then(color => {
			if (color) setBgColor(color.hex);
		})
		.catch(e => console.error(e));
	}, [playlist.picture_xl]);


	const handlePlay = () =>{
		console.log("Playing:", playlist.title);
	}

	const titleStyle = adjustFontSize(playlist.title);

  return (
    	<div className="bg-card flex flex-col gap-y-5 p-5 rounded-4xl " style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)` }}>
			<div className="rounded-t-4xl w-full">
				<div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
					<div className="xl:min-w-52 xl:min-h-52">
						<Image src={playlist.picture_xl} alt={'Album Cover'}  width={192} height={192} className="w-52 h-52 rounded-2xl shadow-lg"></Image>
					</div>
					<div className="flex flex-col justify-center relative min-w-sm ">
						<div className="flex flex-col">
							<p>Playlist</p>
							<h1 className={`${titleStyle} font-bold`}>{playlist.title}</h1>
                            <p>{playlist.description}</p>                            
						</div>

						<div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
							<p className="font-bold" >{playlist.creator.name} •</p>
							<p>{playlist.nb_tracks} tracks •</p>
							<p>{(playlist.duration/60).toFixed(0)} m {(playlist.duration%60)} s </p>
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

		<div className = "grid grid-cols-[50px_1fr_1fr] lg:grid-cols-[50px_1fr_300px_300px_50px] px-2">
			<div className="justify-self-end me-9">
				<p>#</p>
			</div>

			<div>
				<p>Title</p>
			</div>

			<div className="justify-self-end me-1 lg:me-15">
				<p>Author</p>
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
			{playlist.tracks.data.map((track, i)=>(
			<li key={track.id} className="group py-1 grid grid-cols-[50px_1fr_1fr] lg:grid-cols-[50px_1fr_300px_300px_50px] px-2 hover:bg-card-hover rounded-lg" >
				<div className="group-hover:hidden justify-self-end me-9">{i+1}</div>
				<div className="hidden group-hover:block self-start"><Button raw variant="bar_play" onClick={handlePlay} className=""/></div>
				<div className="lg:min-w-[220px]">{track.title}</div>
                <div className="justify-self-end lg:me-15">{track.artist.name}</div>
                <div className="max-w-[200px] hidden lg:block justify-self-end me-5 lg:me-15 truncate">{track.album.title}</div>
				<div className="hidden lg:block justify-self-center" >{(track.duration/60).toFixed(0)}:{(track.duration%60)<10 ? `0${track.duration%60}`: track.duration%60}</div>
			</li>
		))}
		</ul>
    
	</div>
    
  );
}