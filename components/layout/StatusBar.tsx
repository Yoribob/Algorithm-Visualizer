import type { Step } from "@/lib/types/steps";

interface StatusBarProps {
  steps: Step[];
  currentStepIndex: number;
}

function sliceArray({ steps, currentStepIndex }: StatusBarProps) {
  const slicedArray = steps.slice(0, currentStepIndex + 1).reverse();
  return slicedArray;
}

function getMessage(step: Step, currentStepIndex: number) {
  let message = "";
  if (step.swapped) message = `Swapping index ${currentStepIndex}`;
  else if (step.comparingIndexes)
    message = `Comparing ${step.comparingIndexes[0]} and ${step.comparingIndexes[1]}`;
  else if (step.sortedIndexes)
    message = `Sorted index: ${step.sortedIndexes[step.sortedIndexes.length - 1]}`;
  if (step.min !== undefined && step.min !== null) {
    message = message + ` | min:${step.min}`;
  }
  return message;
}

export function StatusBar({ steps, currentStepIndex }: StatusBarProps) {
  if (!steps.length) {
    return null;
  }

  return (
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col bg-gray-300 p-3 text-sm text-black">
      <div className="mb-2 font-semibold">Status log</div>
      <div className="mb-2 font-medium">
        Step: {currentStepIndex + 1} / {steps.length}
      </div>
      <div className="-mx-3 min-h-0 flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {sliceArray({ steps, currentStepIndex }).map((step, index) => (
            <li key={index}>
              {currentStepIndex - index + 1}.{" "}
              {getMessage(step, currentStepIndex)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
