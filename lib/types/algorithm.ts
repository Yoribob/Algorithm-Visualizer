import type { Step } from "@/lib/types/steps";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category = "Array" | "Tree" | "Graph" | "Searching" | "Pathfinding";
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
  category: "Array";
  run: (
    arr: number[],
    compareFn: CompareFn,
  ) => { sorted: number[]; steps: Step[] };
}

export interface Algorithm extends SortAlgorithm {}

export type AlgorithmEntry = Algorithm[];
