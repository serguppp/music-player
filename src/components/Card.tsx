'use client'

import Image from "next/image";
import Link from "next/link";
import { Artist, Album, Track, Playlist } from "@/types/types";
	
import Button from "./Button";
import { isAlbum, isArtist, isPlaylist, isTrack } from "@/utils/typeGuards";
import { usePlayback } from "@/hooks/usePlayback"

type Props = { 
	item: Track | Album | Artist | Playlist;
	variant?: 'square' | 'circle';
	carousel?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Card({
	item,
	variant='square',
	carousel=false,
}: Props) {
	let imageUrl: string;
	let title: string;
	let subtitle: string;
	let release_date: string;

	if (isTrack(item)){ //Track
			imageUrl = item.album.cover_xl;
			title = item.title;
			subtitle = item.artist.name;
			release_date = "";
	} else if (isArtist(item)){ // Artist
			imageUrl = item.picture_xl;
			title = item.name;
			subtitle = "Artist";
			release_date = "";
	} else if (isAlbum(item)){ //Album
			imageUrl = item.cover_xl;
			title = item.title;
			subtitle = item.artist.name;
			release_date = item.release_date.slice(0,4);
	} else {
			imageUrl = item.picture_xl;
			title = item.title;
			subtitle = item.nb_tracks + " tracks";
			release_date = "";
	}

	const { playSingleTrack, playAlbum, playArtist, playPlaylist } = usePlayback();
	const linkUrl = `/${isTrack(item) ? `album/${item.album.id}` : `${item.type}/${item.id}` }`;

	return(
		<div className="relative group w-fit">        
			<Link rel="preload" href={linkUrl}>
				<div className="group relative bg-card max-w-48 px-3 py-2 flex flex-col gap-1 rounded-lg text-white font-[family-name:var(--font-geist-sans)] hover:scale-105 hover:bg-card-hover hover:shadow-md hover:shadow-normal-blue ease-in-out transition-all duration-300">
					<Image loading="lazy" src={imageUrl} width={256} height={256} alt={title} className={`${variant === "circle" ? "rounded-full" : "rounded-lg"} shadow-card shadow-lg`}></Image>
					<p className="text-lg font-medium line-clamp-1">{title}</p>
					<p className="text-sm font-extralight">{carousel ? release_date : subtitle}</p>
				</div>
			</Link>

			{isTrack(item) ? 
				<Button raw variant="card_play" onClick={playSingleTrack(item)}></Button>
			: isAlbum(item) ?
				<Button raw variant="card_play" onClick={playAlbum(item)}></Button>
			: isArtist(item) ?
				<Button raw variant="card_play" onClick={playArtist(item)}></Button>
			: isPlaylist(item) ?
				<Button raw variant="card_play" onClick={playPlaylist(item)}></Button>
			: null
			}
		</div>

	);
}