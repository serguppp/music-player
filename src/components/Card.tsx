import Image from "next/image";
import Link from "next/link";
import type { ReactNode, ElementType } from "react";
import { usePathname } from 'next/navigation';
import { Artist } from "@/app/types/types";
import { Album } from "@/app/types/types";
import { Track } from "@/app/types/types";
import PlayButton from "./PlayButton";

type CardProps = { 
    item: Track | Album | Artist;
    variant?: 'square' | 'circle';
    className?: string;
    href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Card({
    item,
    variant='square',
    className='',
    href,
    ...props
}: CardProps) {
    let imageUrl: string;
    let title: string;
    let subtitle: string;

    if (item.type==="track"){ //Track
        imageUrl = item.album.cover_xl;
        title = item.title;
        subtitle = item.artist.name;
    } else if (item.type=="artist"){ // Album
        imageUrl = item.picture_xl;
        title = item.name;
        subtitle = "Artist";
    } else{ //Artist
        imageUrl = item.cover_xl;
        title = item.title;
        subtitle = item.artist.name;
    }

    const baseStyles = "w-52 px-3 py-2 flex flex-col gap-1 rounded-lg text-white font-[family-name:var(--font-geist-sans)] hover:bg-card-hover transition-all"
    const variantStyles = {
        square: "bg-card  hover:scale-105",
        circle: "bg-card  hover:scale-105",
    }

    const combinedStyles = `${variantStyles[variant]} ${baseStyles} `

    return(
        <Link href={href} className="">
            <div className={`${combinedStyles} group relative`}>
                <Image src={imageUrl} width={256} height={256} alt={title} className={`${variant === "circle" ? 'rounded-full' : 'rounded-lg'} shadow-card shadow-lg`}></Image>
                <PlayButton/>
                <p className="text-lg font-medium">{title}</p>
                <p className="text-sm font-extralight">{subtitle}</p>
            </div>

        </Link>
    );
}