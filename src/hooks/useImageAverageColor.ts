
import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

// FIXME: color renders slowly

// This function calculates the average color of an image,
// used to create visually appealing gradients on item pages

export function BgColorFromImage(imageUrl: string){
  const [color, setColor] = useState<string | null>(null);

	useEffect(() => {
    if(!imageUrl) return;

		const fac = new FastAverageColor();
		fac.getColorAsync(imageUrl, { mode: 'precision' })
		.then(c => setColor(c ? c.hex : null))
        .catch(e => console.error(e));
	}, [imageUrl]);

  return color;
}

