import type { CompareFn } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";

export function bubbleSort(arr: number[], compareFn: CompareFn) {
  const sorted = [...arr];
  const steps: Step[] = [];
  const sortedIndexes: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        array: [...sorted],
        comparingIndexes: [j, j + 1],
        sortedIndexes: [...sortedIndexes],
      });

      if (compareFn(sorted[j], sorted[j + 1]) > 0) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        steps.push({
          array: [...sorted],
          comparingIndexes: [j, j + 1],
          swapped: true,
          sortedIndexes: [...sortedIndexes],
        });
      }
    }

    sortedIndexes.push(arr.length - 1 - i);

    steps.push({
      array: [...sorted],
      sortedIndexes: [...sortedIndexes],
    });
  }

  return { sorted, steps };
}
