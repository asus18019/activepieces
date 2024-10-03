export const calculatePercentage = (
    part: number,
    total: number,
    fixed: number = 2
): number => {
    return +((part / total) * 100).toFixed(fixed);
}