import type { Step } from "@/lib/types/steps";

export function linearSearch(
  arr: number[],
  target: number,
): { found: boolean; index: number | null; steps: Step[] } {
  const steps: Step[] = [];

  for (let i = 0; i < arr.length; i++) {
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
