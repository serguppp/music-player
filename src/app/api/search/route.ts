import { NextResponse } from "next/server";

//Search one track/album/artist
//This function returns the best match
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type');

    if (!query || !type){
        return NextResponse.json({ error: 'Brak parametrów' }, {status: 400});
    }

    try {
        const response = await fetch(`https://api.deezer.com/search/${type}?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.error){
            return NextResponse.json({error: 'Brak obiektów'}, {status: 404});
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Błąd serwera' }, {status: 500});
    }
}

