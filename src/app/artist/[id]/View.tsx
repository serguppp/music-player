'use client'

import { useState, useEffect } from 'react';
import Image from "next/image"
import Button from "@/components/Button";
import { Artist, Album, Track } from "@/types/types";
import { Heart, Icon, ListPlus } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Share } from 'lucide-react';
import { BgColorFromImage } from '@/hooks/useImageAverageColor';

type Props = {
	item : Artist;
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

export default function View( {item} : Props){
const bgColor = BgColorFromImage(item.picture_xl);

	const handlePlay = () =>{
		console.log("Playing:", item.name);
	}

	const titleStyle = adjustFontSize(item.name);

  return (
    	<div className="bg-card flex flex-col gap-y-5 p-5 rounded-4xl " style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 400px)` }}>
			<div className="rounded-t-4xl w-full">
				<div className="flex flex-col lg:flex-row gap-5 mt-20 w-full ">
					<div className="lg:min-w-52 lg:min-h-52">
						<Image src={item.picture_xl} alt={'item Cover'}  width={192} height={192} className="w-52 h-52 rounded-2xl shadow-lg"></Image>
					</div>
					<div className="flex flex-col justify-center relative min-w-sm ">
						<div className="flex flex-col">
							<p>artist</p>
							<h1 className={`${titleStyle} font-bold`}>{item.name}</h1>
						</div>

						<div className="text-sm flex gap-1 lg:absolute lg:bottom-0 ">
							<p className="font-bold">{item.id} •</p>
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

		<div className = "grid grid-cols-[50px_1fr_200px_50px] px-2">
			<div className="justify-self-end me-9">
				<p>#</p>
			</div>

			<div>
				<p>Title</p>
			</div>

			<div className="hidden lg:block justify-self-end me-5 md:me-15">
				<p>Plays</p>
			</div>
			<div className="hidden lg:block justify-self-center">
				<Clock/>			
			</div>
		</div>

		<hr className="border-card-hover w-full border-t"/>

		<ul className="flex flex-col gap-3 ">
			

		</ul>
    
	</div>
  )
}