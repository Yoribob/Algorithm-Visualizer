import type { CompareFn } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";

export function mergeSort(
  arr: number[],
  compareFn: CompareFn,
): { sorted: number[]; steps: Step[] } {
  const sorted = [...arr];
  const steps: Step[] = [];

  function merge(start: number, middle: number, end: number) {
    const left = sorted.slice(start, middle);
    const right = sorted.slice(middle, end);
    let leftIndex = 0;
    let rightIndex = 0;
    let targetIndex = start;

    while (leftIndex < left.length && rightIndex < right.length) {
      const leftArrayIndex = start + leftIndex;
      const rightArrayIndex = middle + rightIndex;

      steps.push({
        array: [...sorted],
        comparingIndexes: [leftArrayIndex, rightArrayIndex],
      });

      if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
        sorted[targetIndex] = left[leftIndex];
        leftIndex++;
      } else {
        sorted[targetIndex] = right[rightIndex];
        rightIndex++;
      }

      steps.push({
        array: [...sorted],
        activeIndex: targetIndex,
        swapped: true,
      });
      targetIndex++;
    }

    while (leftIndex < left.length) {
      sorted[targetIndex] = left[leftIndex];
      leftIndex++;
      steps.push({
        array: [...sorted],
        activeIndex: targetIndex,
        swapped: true,
      });
      targetIndex++;
    }

    while (rightIndex < right.length) {
      sorted[targetIndex] = right[rightIndex];
      rightIndex++;
      steps.push({
        array: [...sorted],
        activeIndex: targetIndex,
        swapped: true,
      });
      targetIndex++;
    }
  }

  function sort(start: number, end: number) {
    if (end - start <= 1) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    sort(start, middle);
    sort(middle, end);
    merge(start, middle, end);
  }

  sort(0, sorted.length);
  steps.push({
    array: [...sorted],
    sortedIndexes: sorted.map((_, index) => index),
  });

  return { sorted, steps };
}