import { Bar } from "@/components/visualizer/Bar";

type BarChartProps<T> = {
  values: T[];
  comparingIndexes?: [number, number];
  activeIndex?: number;
  sortedIndexes?: number[];
  playbackSpeed: number;
  getHeight: (value: T) => number;
  compact?: boolean;
};

export function BarChart<T>({
  values,
  comparingIndexes,
  activeIndex,
  sortedIndexes,
  playbackSpeed,
  getHeight,
  compact = false,
}: BarChartProps<T>) {
  return (
    <div className={`flex flex-row items-end ${compact ? "w-full gap-0.5" : "gap-1"}`}>
      {values.map((value, index) => (
        <Bar
          key={index}
          height={getHeight(value)}
          label={String(value)}
          isHighLighted={comparingIndexes?.includes(index)}
          isActive={activeIndex === index}
          isSorted={sortedIndexes?.includes(index)}
          playbackSpeed={playbackSpeed}
          compact={compact}
        />
      ))}
    </div>
  );
}
