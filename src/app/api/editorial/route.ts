import { NextResponse } from "next/server";

//Get newest tracks from Deezer
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    try {
        const response = await fetch(`https://api.deezer.com/editorial/0/releases${limit ? `?limit=${limit}` : ''}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({error: 'Błąd serwera'}, {status: 500});
    }
}