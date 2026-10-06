import { BarChart } from "@/components/visualizer/BarChart";
import type { Step } from "@/lib/types/steps";

interface SortVisualizerProps {
  currentStep: Step;
  ranks: Map<number, number>;
  playbackSpeed: number;
}

export function SortVisualizer({
  currentStep,
  ranks,
  playbackSpeed,
}: SortVisualizerProps) {
  return (
    <BarChart
      values={currentStep.array}
      comparingIndexes={currentStep.comparingIndexes}
      activeIndex={currentStep.activeIndex}
      sortedIndexes={currentStep.sortedIndexes}
      playbackSpeed={playbackSpeed}
      getHeight={(value) => ranks.get(value)! + 1}
    />
  );
}
