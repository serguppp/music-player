'use client'

import { useState } from "react";
import { Track, Album, Playlist, Artist, ItemTypes } from "@/types/types";
import Image from "next/image";

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
              <div>	
				<Image src={result.album.cover_xl} width={192} height={192} alt={'es'}></Image>

                🎵 {result.title}  {result.artist.name}
              </div>
            )}
            {result.type === "album" && (
              <p>
                💿 {result.title} – {result.artist.name}
              </p>
            )}
            {result.type === "artist" && (
              <p>
                🎤 {result.name}
              </p>
            )}
            {result.type === "playlist" && (
              <p>
                📃 {result.title} – {result.creator.name}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}