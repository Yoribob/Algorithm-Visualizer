export type TreeStep = {
  currentId: string | null;
  visitedIds: string[];
  queueIds: string[];
  searchTarget: number;
  status: "checking" | "found" | "not-found";
};

export type Step = {
  array: number[];
  comparingIndexes?: [number, number];
  activeIndex?: number;
  foundIndex?: number;
  discardedIndexes?: number[];
  searchTarget?: number;
  swapped?: boolean;
  sortedIndexes?: number[];
  min?: number;
};
