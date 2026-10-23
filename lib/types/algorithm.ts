import type { Step, TreeStep } from "@/lib/types/steps";
import type { Tree } from "@/lib/types/tree";
import type { SortOrder } from "@/lib/utils/comparators";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category = "Sort" | "Tree" | "Graph" | "Search" | "Pathfinding";
export type CompareFn = (a: number, b: number) => number;

export interface AlgorithmInfo {
  name: string;
  slug: string;
  category: Category;
  description: string;
  difficulty: Difficulty;
  timeComplexity: string[];
  spaceComplexity: string;
}

export interface SortAlgorithm extends AlgorithmInfo {
  category: "Sort";
  run: (
    arr: number[],
    compareFn: CompareFn,
  ) => { sorted: number[]; steps: Step[] };
}

export interface SearchAlgorithm extends AlgorithmInfo {
  category: "Search";
  run: (
    arr: number[],
    target: number,
    sortOrder: SortOrder,
  ) => { found: boolean; index: number | null; steps: Step[] };
}

export interface TreeAlgorithm extends AlgorithmInfo {
  category: "Tree";
  run: (
    root: Tree,
    target: number,
  ) => { found: boolean; id: string | null; steps: TreeStep[] };
}

export type Algorithm = SortAlgorithm | SearchAlgorithm | TreeAlgorithm;
export type AlgorithmEntry = Algorithm[];