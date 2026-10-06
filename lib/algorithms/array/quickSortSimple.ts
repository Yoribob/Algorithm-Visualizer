import type { CompareFn } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";

export function quickSortSimple(
  arr: number[],
  compareFn: CompareFn,
): { sorted: number[]; steps: Step[] } {
  const sorted = [...arr];
  const steps: Step[] = [];

  function sort(low: number, high: number) {
    if (low >= high) {
      return;
    }

    const pivot = sorted[high];
    let pivotIndex = low;

    for (let currentIndex = low; currentIndex < high; currentIndex++) {
      steps.push({
        array: [...sorted],
        comparingIndexes: [currentIndex, high],
        activeIndex: high,
      });

      if (compareFn(sorted[currentIndex], pivot) <= 0) {
        if (pivotIndex !== currentIndex) {
          [sorted[pivotIndex], sorted[currentIndex]] = [
            sorted[currentIndex],
            sorted[pivotIndex],
          ];
          steps.push({
            array: [...sorted],
            comparingIndexes: [pivotIndex, currentIndex],
            swapped: true,
            activeIndex: high,
          });
        }
        pivotIndex++;
      }
    }

    if (pivotIndex !== high) {
      [sorted[pivotIndex], sorted[high]] = [sorted[high], sorted[pivotIndex]];
      steps.push({
        array: [...sorted],
        comparingIndexes: [pivotIndex, high],
        swapped: true,
      });
    }

    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }

  sort(0, sorted.length - 1);
  steps.push({
    array: [...sorted],
    sortedIndexes: sorted.map((_, index) => index),
  });

  return { sorted, steps };
}
