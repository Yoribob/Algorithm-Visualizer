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
