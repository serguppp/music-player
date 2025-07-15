import { NextResponse } from 'next/server';

type Params = Promise<{slug: string[]}>

export async function GET(request: Request, data: { params: Params}) {
   
  const params  = await data.params;
  const path = params.slug.join('/');

  const req = await request;

  const { search } = new URL(req.url);

  const deezerApiUrl = `https://api.deezer.com/${path}${search}`;

  try {
    const apiResponse = await fetch(deezerApiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      return new NextResponse(apiResponse.statusText, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Deezer API error', error);
    return new NextResponse('Błąd serwera wewnętrznego', { status: 500 });
  }
}