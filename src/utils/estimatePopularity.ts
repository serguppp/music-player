export function estimatePopularity(rank: number): string {
	const base = Math.round(500 * Math.exp(rank / 175000) * 10000	);

	return Math.round(base).toLocaleString('pl-PL');
}	