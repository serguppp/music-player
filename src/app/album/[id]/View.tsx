'use client'

import { useState, useEffect } from 'react';
import Image from "next/image"
import Button from "@/components/Button";
import { Album, Track } from "@/app/types/types";
import { FastAverageColor } from 'fast-average-color';
import { Icon } from 'lucide-react';
import { Clock } from 'lucide-react';

type HeaderProps = {
  album: Album;
}

function adjustFontSize(text: string): string {
	const length = text.length;
	if (length < 20) return 'text-7xl';
	if (length < 40) return 'text-5xl';
	if (length < 60) return 'text-3xl';
	return 'text-2xl';
}

function estimatePopularity(rank: number, date: string): string {
	let base = Math.round(500 * Math.exp(rank / 175000) * 10000	);

	const currentYear = new Date().getFullYear();
  	const releaseYear = parseInt(date.slice(0, 4));

	const age = currentYear - releaseYear;	

	if (age==0) base*=0.01;
	else if (age==1) base*=0.5;
	else if (age==2) base*=0.75;

	return Math.round(base).toLocaleString('pl-PL');
}

export default function View( {album} : HeaderProps){
	const [bgColor, setBgColor] = useState('#1e1e1e');

	useEffect(() => {
		const fac = new FastAverageColor();
		fac.getColorAsync(album.cover_xl, { mode: 'precision' })
		.then(color => {
			if (color) setBgColor(color.hex);
		})
		.catch(e => console.error(e));
	}, [album.cover_xl]);


	const handlePlay = () =>{
		console.log("Playing:", album.title);
	}

	const titleStyle = adjustFontSize(album.title);

  return (
    	<div className="bg-card flex flex-col gap-y-5 p-5 rounded-4xl " style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)` }}>
			<div className="rounded-t-4xl w-full">
				<div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
					<div className="xl:min-w-52 xl:min-h-52">
						<Image src={album.cover_xl} alt={'Album Cover'}  width={192} height={192} className="w-52 h-52 rounded-2xl shadow-lg"></Image>
					</div>
					<div className="flex flex-col justify-center relative min-w-sm ">
						<div className="flex flex-col">
							<p>{album.record_type}</p>
							<h1 className={`${titleStyle} font-bold`}>{album.title}</h1>
						</div>

						<div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
							<p className="font-bold">{album.artist.name} •</p>
							<p>{album.release_date.slice(0,4)} •</p>
							<p>{album.nb_tracks} tracks •</p>
							<p>{(album.duration/60).toFixed(0)} m {(album.duration%60)} s </p>
						</div>  
					</div>
			</div>
      	</div>

      	<div className="flex flex-row ">
          <Button raw variant="play" onClick={handlePlay} className=""/>
      	</div>

		<div className = "grid grid-cols-[50px_1fr_150px_50px] px-2">
			<div>
				<p>#</p>
			</div>

			<div>
				<p>Tytuł</p>
			</div>

			<div className="justify-self-end me-5 md:me-15">
				<p>Odtworzenia</p>
			</div>
			<div className="justify-self-center">
				<Clock/>			
			</div>
		</div>

		<hr className="border-card-hover w-full border-t"/>

		<ul className="flex flex-col gap-3 ">
			{album.tracks.data.map((track, i)=>(
			<li key={track.id} className="py-1 grid grid-cols-[50px_1fr_150px_50px] px-2 hover:bg-card-hover rounded-lg" >
				<div>{i+1} </div>
				<div>{track.title}</div>	
				<div className="justify-self-end  me-5 md:me-15">{estimatePopularity(track.rank, album.release_date)}</div>
				<div className="justify-self-center" >{(track.duration/60).toFixed(0)}:{(track.duration%60)<10 ? `0${track.duration%60}`: track.duration%60}</div>
			</li>
		))}
		</ul>
    
	</div>
    
  );
}