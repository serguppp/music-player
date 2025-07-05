import Image from "next/image";
import Link from "next/link";
import type { ReactNode, ElementType } from "react";
import { usePathname } from 'next/navigation';
import { Artist } from "@/app/types/types";
import { Album } from "@/app/types/types";
import { Track } from "@/app/types/types";
    
import Button from "./Button";
import { Play } from "lucide-react";

type CardProps = { 
    item: Track | Album | Artist;
    variant?: 'square' | 'circle';
    className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Card({
    item,
    variant='square',
    className='',
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

    const baseStyles = "w-auto px-3 py-2 flex flex-col gap-1 rounded-lg text-white font-[family-name:var(--font-geist-sans)] hover:bg-card-hover transition-all"
    const variantStyles = {
        square: "bg-card hover:scale-105",
        circle: "bg-card hover:scale-105",
    }

    const combinedStyles = `${variantStyles[variant]} ${baseStyles} `

    return(
        <div className="relative group w-fit">        
            <Link href={item.link || `https://www.deezer.com/album/${item.id}`} className="">
                <div className={`${combinedStyles} group relative`}>
                    <Image src={imageUrl} width={256} height={256} alt={title} className={`${variant === "circle" ? 'rounded-full' : 'rounded-lg'} shadow-card shadow-lg`}></Image>
                    <p className="text-lg font-medium">{title}</p>
                    <p className="text-sm font-extralight">{subtitle}</p>
                </div>
            </Link>

            <Button raw variant="play" Icon={Play} onClick={()=>{}}></Button>
        </div>

    );
}