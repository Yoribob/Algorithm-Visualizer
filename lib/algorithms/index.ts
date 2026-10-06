import { bubbleSort } from "@/lib/algorithms/array/bubbleSort";
import { selectionSort } from "./array/selectionSort";
import { insertionSort } from "./array/insertionSort";
import { mergeSort } from "./array/mergeSort";
import { quickSortSimple } from "./array/quickSortSimple";
import type { AlgorithmEntry } from "@/lib/types/algorithm";

export const algorithms: AlgorithmEntry = [
  {
    name: "Bubble Sort",
    slug: "bubble-sort",
    category: "Array",
    description:
      "Repeatedly steps through the array, comparing adjacent elements and swapping them if they're in the wrong order.",
    difficulty: "Easy",
    timeComplexity: ["O(n^2)", "O(n^2)", "O(n)"],
    spaceComplexity: "O(1)",
    run: bubbleSort,
  },
  {
    name: "Selection Sort",
    slug: "selection-sort",
    category: "Array",
    description:
      "Repeatedly finds the minimum (or maximum) element from the unsorted portion of the array and swaps it into its correct position.",
    difficulty: "Easy",
    timeComplexity: ["O(n^2)", "O(n^2)", "O(n^2)"],
    spaceComplexity: "O(1)",
    run: selectionSort,
  },
  {
    name: "Insertion Sort",
    slug: "insertion-sort",
    category: "Array",
    description:
      "Builds the sorted array one element at a time by repeatedly taking the next element and inserting it into its correct position among the previously sorted elements.",
    difficulty: "Easy",
    timeComplexity: ["O(n)", "O(n^2)", "O(n^2)"],
    spaceComplexity: "O(1)",
    run: insertionSort,
  },
  {
  name: "Merge Sort",
  slug: "merge-sort",
  category: "Array",
  description:
    "A divide-and-conquer algorithm that recursively splits the array into halves, sorts each half, and then merges the sorted halves back together.",
  difficulty: "Medium",
  timeComplexity: ["O(n \\log n)", "O(n \\log n)", "O(n \\log n)"],
  spaceComplexity: "O(n)",
  run: mergeSort,
  },
  {
  name: "Quick Sort",
  slug: "quick-sort",
  category: "Array",
  description:
    "A divide-and-conquer algorithm that selects a pivot element, partitions the array into elements smaller and larger than the pivot, and recursively sorts the sub-arrays.",
  difficulty: "Medium",
  timeComplexity: ["O(n \\log n)", "O(n \\log n)", "O(n^2)"],
  spaceComplexity: "O(n)",
  run: quickSortSimple,
},
];
