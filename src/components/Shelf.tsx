'use client'
import Card from "./Card";
import { ReactNode } from "react";
import { Artist, Album, Track, Playlist } from "@/types/types";
import Button from "./Button";
import { Plus } from "lucide-react";

type Props ={
	children?: ReactNode;
	items: (Track | Album | Artist | Playlist)[];
	variant?: 'square' | 'circle';
	button?: boolean;
	href?: string;
}

export default function Shelf({
	children,
	items,
	variant = 'square',
	button = true,
	href = '/discover'
}: Props){
	return (
		<div className="max-w-screen flex flex-col gap-6 ">
			<h1 className="text-3xl md:text-4xl font-bold text-white">{children}</h1>
			<div className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-start ${button? 'xl:flex' : 'xl:grid-cols-6'}`}>
				{items.map((item)=>
					<Card key={item.id} item={item} variant={variant}></Card>
				)}
				{button? 
					<Button raw variant="shelf" href="/discover" Icon={Plus} className="self-center justify-self-center">View all</Button>
				: null
				}
			</div>
		</div>
	)
}