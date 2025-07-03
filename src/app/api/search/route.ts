import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query){
        return NextResponse.json({ error: 'Brak zapytania' }, {status: 400});
    }

    try {
        const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Błąd serwera' }, {status: 500});
    }
}