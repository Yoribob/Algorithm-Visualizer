import type { Step } from "@/lib/types/steps";
interface StatusBarProps {
  steps: Step[];
  currentStepIndex: number;
  showLogs: boolean;
  onToggleLogs: () => void;
}

function sliceArray({
  steps,
  currentStepIndex,
}: Pick<StatusBarProps, "steps" | "currentStepIndex">) {
  const slicedArray = steps.slice(0, currentStepIndex + 1).reverse();
  return slicedArray;
}

function getMessage(step: Step) {
  let message = "";
  if (step.swapped && step.comparingIndexes) {
    const [firstIndex, secondIndex] = step.comparingIndexes;
    message = `Swapping values ${step.array[firstIndex]} and ${step.array[secondIndex]}`;
  } else if (step.swapped && step.activeIndex !== undefined) {
    message = `Updating value ${step.array[step.activeIndex]}`;
  } else if (step.swapped) {
    message = "Updating array";
  }
  else if (step.comparingIndexes)
    message = `Comparing values ${step.array[step.comparingIndexes[0]]} and ${step.array[step.comparingIndexes[1]]}`;
  else if (step.sortedIndexes)
    message = `Sorted value: ${step.array[step.sortedIndexes[step.sortedIndexes.length - 1]]}`;
  if (step.min !== undefined && step.min !== null) {
    message = message + ` | min value: ${step.min}`;
  }
  return message;
}

export function StatusBar({
  steps,
  currentStepIndex,
  showLogs,
  onToggleLogs,
}: StatusBarProps) {
  if (!steps.length) {
    return null;
  }

  const visibleSteps = sliceArray({ steps, currentStepIndex });

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-main p-3 text-lg">
      <div className="relative font-bold h-15">
        <span className="text-4xl">Status log</span>
        <button
          aria-pressed={showLogs}
          onClick={onToggleLogs}
          className={`absolute right-0 mr-5 cursor-pointer rounded-full border-2 border-bar px-3 py-0.5 text-sm font-semibold transition duration-150 ease-out active:scale-95 ${
            showLogs ? "bg-bar text-white" : "text-bar hover:bg-bar/10"
          }`}
        >
          Logs
        </button>
      </div>

      <div className="-mx-3 min-h-0 flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {showLogs
            ? visibleSteps.map((step, index) => (
                <li key={index}>
                  {currentStepIndex - index + 1}.{" "}
                  {getMessage(step)}
                </li>
              ))
            : visibleSteps.slice(0, 1).map((step) => (
                <li key={currentStepIndex} className="text-4xl">
                  {getMessage(step)}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
