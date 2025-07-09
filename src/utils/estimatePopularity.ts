export function estimatePopularity(rank: number, date: string): string {
    let base = Math.round(500 * Math.exp(rank / 175000) * 10000	);

    const currentYear = new Date().getFullYear();
    const releaseYear = parseInt(date.slice(0, 4));

    const age = currentYear - releaseYear;	

    if (age==0) base*=0.01;
    else if (age==1) base*=0.5;
    else if (age==2) base*=0.75;

    return Math.round(base).toLocaleString('pl-PL');
}