export type Step = {
  array: number[];
  comparingIndexes?: [number, number];
  activeIndex?: number;
  swapped?: boolean;
  sortedIndexes?: number[];
  min?: number;
};
