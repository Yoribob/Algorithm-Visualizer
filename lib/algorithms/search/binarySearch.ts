import type { Step } from "@/lib/types/steps";
import type { SortOrder } from "@/lib/utils/comparators";

export function binarySearch(
  arr: number[],
  target: number,
  sortOrder: SortOrder = "ascending",
): { found: boolean; index: number | null; steps: Step[] } {
  const steps: Step[] = [];

  let low = 0;
  let high = arr.length - 1;

  while (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    const found = arr[mid] === target;

    if (found) {
      steps.push({
        array: [...arr],
        activeIndex: mid,
        foundIndex: mid,
        searchTarget: target,
      });
      return { found: true, index: mid, steps };
    }

    if ((arr[mid] > target) === (sortOrder === "ascending")) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

    steps.push({
      array: [...arr],
      activeIndex: mid,
      searchTarget: target,
      discardedIndexes: arr
        .map((_, index) => index)
        .filter((index) => (index < low || index > high) && index !== mid),
    });
  }

  return { found: false, index: null, steps };
}
