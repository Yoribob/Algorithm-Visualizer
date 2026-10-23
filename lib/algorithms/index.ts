import { bubbleSort } from "@/lib/algorithms/array/bubbleSort";
import { selectionSort } from "./array/selectionSort";
import { insertionSort } from "./array/insertionSort";
import { mergeSort } from "./array/mergeSort";
import { quickSortSimple } from "./array/quickSortSimple";
import { linearSearch } from "./search/linearSearch";
import { binarySearch } from "./search/binarySearch";
import { jumpSearch } from "./search/jumpSearch";
import { BFS } from "./tree/BFS";
import type { AlgorithmEntry } from "@/lib/types/algorithm";

export const algorithms: AlgorithmEntry = [
  {
    name: "Bubble Sort",
    slug: "bubble-sort",
    category: "Sort",
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
    category: "Sort",
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
    category: "Sort",
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
    category: "Sort",
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
    category: "Sort",
    description:
      "A divide-and-conquer algorithm that picks a pivot, moves smaller elements to its left and larger ones to its right, then recursively sorts each side.",
    difficulty: "Medium",
    timeComplexity: ["O(n \\log n)", "O(n \\log n)", "O(n^2)"],
    spaceComplexity: "O(\\log n)",
    run: quickSortSimple,
  },
  {
    name: "Linear Search",
    slug: "linear-search",
    category: "Search",
    description:
      "A sequential search that checks each element from the start of the array, one by one, until it finds the target or reaches the end of the list. It works on unsorted data.",
    difficulty: "Easy",
    timeComplexity: ["O(n)", "O(n)", "O(1)"],
    spaceComplexity: "O(1)",
    run: linearSearch,
  },
  {
    name: "Binary Search",
    slug: "binary-search",
    category: "Search",
    description:
      "A divide-and-conquer search that repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, until the target is found or the range is empty. It requires sorted data.",
    difficulty: "Easy",
    timeComplexity: ["O(log n)", "O(log n)", "O(1)"],
    spaceComplexity: "O(1)",
    run: binarySearch,
  },
  {
    name: "Jump Search",
    slug: "jump-search",
    category: "Search",
    description:
      "A block-based search that jumps ahead by a fixed step size and then performs a linear scan within the block containing the target. It requires sorted data.",
    difficulty: "Medium",
    timeComplexity: ["O(\sqrt{n})", "O(\sqrt{n})", "O(1)"],
    spaceComplexity: "O(1)",
    run: jumpSearch,
  },
  {
    name: "Breadth-First Search",
    slug: "bfs",
    category: "Tree",
    description:
      "A tree traversal algorithm that visits nodes level by level, from the root downward, using a queue. Also known as level-order traversal.",
    difficulty: "Easy",
    timeComplexity: ["O(n)", "O(n)", "O(n)"],
    spaceComplexity: "O(w)",
    run: BFS,
  },
];
