export function adjustFontSize(text: string): string {
    const length = text.length;
    if (length < 20) return 'text-7xl';
    if (length < 40) return 'text-5xl';
    if (length < 60) return 'text-3xl';
    return 'text-2xl';
}