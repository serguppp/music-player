'use client'
import Card from "./Card";
import { ReactNode } from "react";
import { Artist } from "@/app/types/types";
import { Album } from "@/app/types/types";
import { Track } from "@/app/types/types";
import Button from "./Button";
import { Plus } from "lucide-react";

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
        <div className="max-w-screen flex flex-col gap-6 ">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{children}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:flex gap-4 md:gap-8 items-start ">
                {items.map((item)=>
                    <Card key={item.id} item={item} variant={variant}></Card>
                )}
                <Button raw variant="shelf" href="/discover" Icon={Plus} className="self-center justify-self-center">View all</Button>
            </div>
        </div>
    )
}