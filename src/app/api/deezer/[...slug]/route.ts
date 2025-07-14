import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { slug: string[] } }
) {
  const { params } = context;
  const path = params.slug.join('/');

  const { search } = new URL(request.url);

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