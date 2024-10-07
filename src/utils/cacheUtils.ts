export function exponent(index: number): number {
    if (index == 1) return 0;

    return 1 + exponent(Math.floor(index/2));
}
