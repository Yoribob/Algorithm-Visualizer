import { BarChart } from "@/components/visualizer/BarChart";
import { BoxChart } from "@/components/visualizer/BoxChart";
import type { Category } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";

interface SortVisualizerProps {
  currentStep: Step;
  ranks: Map<number, number>;
  playbackSpeed: number;
  compact?: boolean;
  category: Category;
}

export function SortVisualizer({
  currentStep,
  ranks,
  playbackSpeed,
  compact = false,
  category,
}: SortVisualizerProps) {
  switch (category) {
    case "Sort":
      return (
        <BarChart
          values={currentStep.array}
          comparingIndexes={currentStep.comparingIndexes}
          activeIndex={currentStep.activeIndex}
          sortedIndexes={currentStep.sortedIndexes}
          playbackSpeed={playbackSpeed}
          getHeight={(value) => ranks.get(value)! + 1}
          compact={compact}
        />
      );
    case "Search":
      return (
        <BoxChart
          values={currentStep.array}
          comparingIndexes={currentStep.comparingIndexes}
          activeIndex={currentStep.activeIndex}
          foundIndex={currentStep.foundIndex}
          discardedIndexes={currentStep.discardedIndexes}
          playbackSpeed={playbackSpeed}
          compact={compact}
        />
      );
    default:
      return null;
  }
}
