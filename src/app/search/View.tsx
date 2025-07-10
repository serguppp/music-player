'use client'

import { useState } from "react";
import { Track, Album, Playlist, Artist, ItemTypes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
	results : ItemTypes[];
}

export default function View({ results }: Props) {
  return (
    <div>
      <ul>
        {results.map((result, id) => (
		
          <li key={result.id} className="mb-4">
			
            {result.type === "track" && (
				
              <Link rel="preload" href={`album/${result.album.id}`}>	
				<Image loading="lazy"  src={result.album.cover_xl} width={192} height={192} alt={'es'}></Image>
                🎵 {result.title}  {result.artist.name}
              </Link>
            )}
            {result.type === "album" && (
              <p>
                💿 {result.title} - {result.artist.name}
              </p>
            )}
            {result.type === "artist" && (
              <p>
                🎤 {result.name}
              </p>
            )}
            {result.type === "playlist" && (
              <p>
                📃 {result.title} - {result.creator.name}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}