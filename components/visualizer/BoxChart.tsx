import { Box } from "@/components/visualizer/Box";

type BoxChartProps<T> = {
  values: T[];
  comparingIndexes?: [number, number];
  activeIndex?: number;
  foundIndex?: number;
  discardedIndexes?: number[];
  playbackSpeed: number;
  compact?: boolean;
};

export function BoxChart<T>({
  values,
  comparingIndexes,
  activeIndex,
  foundIndex,
  discardedIndexes,
  playbackSpeed,
  compact = false,
}: BoxChartProps<T>) {
  return (
    <div className="min-w-0 w-full max-w-full overflow-auto">
      <div
        className={`mx-auto grid gap-x-1 ${
          compact ? "w-full" : "w-max"
        }`}
        style={{
          gridTemplateColumns: compact
            ? "repeat(20, minmax(0, 1fr))"
            : "repeat(20, 65px)",
        }}
      >
      {values.map((value, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            className="flex min-w-0 flex-col items-center"
          >
            <Box
              label={String(value)}
              isHighLighted={comparingIndexes?.includes(index)}
              isActive={isActive}
              isFound={foundIndex === index}
              isDiscarded={discardedIndexes?.includes(index)}
              playbackSpeed={playbackSpeed}
              compact={compact}
            />
            <span className="h-3 text-[10px] leading-3 font-semibold">
              {isActive ? `Index ${index}` : ""}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
}
