import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Step } from "@/lib/types/steps";
type ControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  onAuto: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  speed: number;
  disablePrev: boolean;
  disableNext: boolean;
  isAuto: boolean;
  steps: Step[];
  currentStepIndex: number;
};

export function Controls({
  onPrev,
  onNext,
  onAuto,
  onReset,
  onSpeedChange,
  speed,
  disablePrev,
  disableNext,
  isAuto,
  steps,
  currentStepIndex,
}: ControlsProps) {
  return (
    <div className="flex justify-start px-12 py-8 font-semibold">
      <span className="mr-4 w-1/13 font-medium">
        <span className="text-3xl font-bold">{currentStepIndex}</span> /{" "}
        {steps.length}
      </span>
      <button
        className="flex justify-center w-1/20 cursor-pointer mx-1 bg-bar hover:bg-bar-200 hover:text-gray-200 active:scale-90
             text-white font-semibold py-2 px-4 rounded-full
             transition-transform duration-150 ease-out"
        onClick={onAuto}
        disabled={disableNext}
      >
        {isAuto ? "Pause" : "Play"}
      </button>
      <button
        className="cursor-pointer mx-1 bg-bar hover:bg-bar-200 hover:text-gray-200 active:scale-90
             text-white font-semibold py-2 px-4 rounded-full
             transition-transform duration-150 ease-out"
        onClick={onPrev}
        disabled={disablePrev}
      >
        Back
      </button>
      <button
        className="cursor-pointer mx-1 bg-bar hover:bg-bar-200 hover:text-gray-200 active:scale-90
             text-white font-semibold py-2 px-4 rounded-full
             transition duration-150 ease-out"
        onClick={onNext}
        disabled={disableNext}
      >
        Next
      </button>

      <button
        className="cursor-pointer mx-1 bg-bar hover:bg-bar-200 hover:text-gray-200 active:scale-90
             text-white font-semibold py-2 px-4 rounded-full
             transition-transform duration-150 ease-out"
        onClick={onReset}
      >
        Reset
      </button>
      <span className="flex items-center font-medium mx-2 ml-auto">Speed</span>
      <input
        type="range"
        min={20}
        max={150}
        step={10}
        value={speed}
        onChange={(event) => onSpeedChange(Number(event.target.value))}
        className="w-40 accent-bar"
      />
    </div>
  );
}
