import {Play, Pause, RotateCcw, ChevronLeft, ChevronRight} from "lucide-react"

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
}: ControlsProps) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onPrev}
        disabled={disablePrev}
      >
        <ChevronLeft />
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}
        disabled={disableNext}
      >
        <ChevronRight />
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onAuto}
        disabled={disableNext}
      >
        {isAuto ? <Pause /> : <Play />}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onReset}
      >
        <RotateCcw />
      </button>
      <input
  type="range"
  min={20}
  max={150}
  step={10}
  value={speed}
  onChange={(event) => onSpeedChange(Number(event.target.value))}
  className="w-40 accent-slate-600"
/>
    </div>
  );
}
