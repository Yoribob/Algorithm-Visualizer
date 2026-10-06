import type { CompareFn } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";

export function selectionSort(arr: number[], compareFn: CompareFn) {
  const sorted = [...arr];
  const steps: Step[] = [];
  const sortedIndexes: number[] = [];

  for (let i = 0; i < sorted.length; i++) {
    let targetIndex = i;

    for (let j = i + 1; j < sorted.length; j++) {
      steps.push({
        array: [...sorted],
        comparingIndexes: [targetIndex, j],
        sortedIndexes: [...sortedIndexes],
        min: sorted[targetIndex],
      });

      if (compareFn(sorted[targetIndex], sorted[j]) > 0) {
        targetIndex = j;
      }
    }

    if (targetIndex !== i) {
      [sorted[i], sorted[targetIndex]] = [sorted[targetIndex], sorted[i]];

      steps.push({
        array: [...sorted],
        comparingIndexes: [i, targetIndex],
        swapped: true,
        sortedIndexes: [...sortedIndexes],
      });
    }

    sortedIndexes.push(i);

    steps.push({
      array: [...sorted],
      sortedIndexes: [...sortedIndexes],
    });
  }

  return { sorted, steps };
}