import Card from "./Card";
import { ReactNode } from "react";
import { Artist } from "@/app/types/types";
import { Album } from "@/app/types/types";
import { Track } from "@/app/types/types";

type ShelfProps ={
    children: ReactNode;
    items: (Track | Album | Artist)[];
    variant?: 'square' | 'circle';
}

export default function Shelf({
    children,
    items,
    variant = 'square',
}: ShelfProps){
    return (
        <div className="w-full flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{children}</h1>
            <div className="flex gap-8">
                {items.map((item)=>
                    <Card key={item.id} href={item.link} item={item} variant={variant}></Card>
                )}
            </div>
        </div>
    )
}