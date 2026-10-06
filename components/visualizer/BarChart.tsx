import { Bar } from "@/components/visualizer/Bar";

type BarChartProps<T> = {
  values: T[];
  comparingIndexes?: [number, number];
  activeIndex?: number;
  sortedIndexes?: number[];
  playbackSpeed: number;
  getHeight: (value: T) => number;
};

export function BarChart<T>({
  values,
  comparingIndexes,
  activeIndex,
  sortedIndexes,
  playbackSpeed,
  getHeight,
}: BarChartProps<T>) {
  return (
    <div className="flex flex-row items-end gap-1">
      {values.map((value, index) => (
        <Bar
          key={index}
          height={getHeight(value)}
          label={String(value)}
          isHighLighted={comparingIndexes?.includes(index)}
          isActive={activeIndex === index}
          isSorted={sortedIndexes?.includes(index)}
          playbackSpeed={playbackSpeed}
        />
      ))}
    </div>
  );
}
