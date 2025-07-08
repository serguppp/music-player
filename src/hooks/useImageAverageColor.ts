import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

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

