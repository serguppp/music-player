import { NextResponse } from "next/server";

//Get newest albums from Deezer
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    if (!limit){
        return NextResponse.json({ error: 'Brak parametrów' }, {status: 400});
    }

    try {
        const response = await fetch(`https://api.deezer.com/editorial/0/releases${limit ? `?limit=${limit}` : ''}`);
        const data = await response.json();
        if (data.error){
            return NextResponse.json({error: 'Brak nowych albumów'}, {status: 404});
        }
        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({error: 'Błąd serwera'}, {status: 500});
    }
}