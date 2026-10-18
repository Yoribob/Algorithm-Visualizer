import type { Step } from "@/lib/types/steps";
import type { SortOrder } from "@/lib/utils/comparators";

export function jumpSearch(
  arr: number[],
  target: number,
  sortOrder: SortOrder = "ascending",
): { found: boolean; index: number | null; steps: Step[] } {
  const steps: Step[] = [];

  if (arr.length === 0) {
    return { found: false, index: null, steps };
  }

  const blockSize = Math.max(1, Math.floor(Math.sqrt(arr.length)));
  let prev = 0;
  let next = blockSize;

  while (
    next < arr.length &&
    ((sortOrder === "ascending" && target > arr[Math.min(next, arr.length - 1)]) ||
      (sortOrder === "descending" && target < arr[Math.min(next, arr.length - 1)]))
  ) {
    steps.push({
      array: [...arr],
      activeIndex: next,
      searchTarget: target,
      discardedIndexes: arr
        .map((_, index) => index)
        .filter((index) => index >= prev && index < next),
    });

    prev = next;
    next += blockSize;
  }

  const end = Math.min(next, arr.length - 1);

  for (let i = prev; i <= end; i++) {
    steps.push({
      array: [...arr],
      activeIndex: i,
      searchTarget: target,
      ...(arr[i] === target ? { foundIndex: i } : {}),
    });

    if (arr[i] === target) {
      return { found: true, index: i, steps };
    }
  }

  return { found: false, index: null, steps };
}

