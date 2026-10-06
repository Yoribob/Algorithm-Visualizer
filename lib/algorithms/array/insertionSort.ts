import type { CompareFn } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";

export function insertionSort(arr: number[], compareFn: CompareFn) {
  const sorted = [...arr];
  const steps: Step[] = [];
  const sortedIndexes: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    const key = sorted[i];
    let j = i - 1;
    sortedIndexes.push(0);
    while (j >= 0 && compareFn(sorted[j], key) > 0) {
      steps.push({
        array: [...sorted],
        comparingIndexes: [j, j + 1],
        activeIndex: i,
        sortedIndexes: [...sortedIndexes],
      });

      sorted[j + 1] = sorted[j];

      steps.push({
        array: [...sorted],
        comparingIndexes: [j, j + 1],
        activeIndex: j + 1,
        swapped: true,
        sortedIndexes: [...sortedIndexes],
      });

      j--;
    }

    sorted[j + 1] = key;

    steps.push({
      array: [...sorted],
      comparingIndexes: [j + 1, i],
      activeIndex: j + 1,
      sortedIndexes: [...sortedIndexes],
    });

    sortedIndexes.push(i);

    steps.push({
      array: [...sorted],
      activeIndex: j + 1,
      sortedIndexes: [...sortedIndexes],
    });
  }

  return { sorted, steps };
}
