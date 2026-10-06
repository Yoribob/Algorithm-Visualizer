import type { CompareFn } from "@/lib/types/algorithm";

export function getRanks(
  values: number[],
  compareFn: CompareFn,
): Map<number, number> {
  const sortedCopy = [...values].sort(compareFn);
  const ranks = new Map<number, number>();
  sortedCopy.forEach((value, index) => ranks.set(value, index));
  return ranks;
}
