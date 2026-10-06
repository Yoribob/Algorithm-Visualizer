"use client";

import { algorithms } from "@/lib/algorithms";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { SortVisualizer } from "../visualizer/SortVisualizer";
import { Controls } from "../visualizer/Controls";
import { StatusBar } from "./StatusBar";
import * as comparators from "@/lib/utils/comparators";
import { getRanks } from "@/lib/utils/ranks";
import { generateArrayNumber } from "@/lib/utils/generator";
import { useStepPlayer } from "@/hooks/useStepPlayer";
import { useState } from "react";
import type { Algorithm } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";
import * as config from "@/lib/config/config.json";

interface AlgorithmPanelProps {
  algorithm: Algorithm;
  sizeValue: number;
  rangeValue: number;
  seedValue: number;
}

function AlgorithmPanel({
  algorithm,
  sizeValue,
  rangeValue,
  seedValue,
}: AlgorithmPanelProps) {
  const array = generateArrayNumber(sizeValue, rangeValue, seedValue);
  const steps: Step[] = algorithm.run(array, comparators.ascendingNumber).steps;
  const ranks = getRanks(array, comparators.ascendingNumber);
  const {
    step,
    isAuto,
    playbackSpeed,
    goNext,
    goPrev,
    goAuto,
    goReset,
    handleSpeedChange,
  } = useStepPlayer(steps.length);
  const currentStep = steps[step] ?? steps[0];

  if (!currentStep) {
    return null;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-end">
        <SortVisualizer
          currentStep={currentStep}
          ranks={ranks}
          playbackSpeed={playbackSpeed}
        />
      </div>
      <StatusBar steps={steps} currentStepIndex={step} />
      <Controls
        onNext={goNext}
        onPrev={goPrev}
        onAuto={goAuto}
        onReset={goReset}
        onSpeedChange={handleSpeedChange}
        speed={playbackSpeed}
        disableNext={step === steps.length - 1}
        disablePrev={step === 0}
        isAuto={isAuto}
      />
    </div>
  );
}

export function AppLayout() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm | null>(
    null,
  );
  const [sizeValue, setSizeValue] = useState(config.defaults.size);
  const [rangeValue, setRangeValue] = useState(config.defaults.range);
  const [seedValue, setSeedValue] = useState(config.defaults.seed);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftSidebar
        algorithms={algorithms}
        selected={currentAlgorithm}
        onSelect={setCurrentAlgorithm}
      />
      {currentAlgorithm ? (
        <div className="flex min-h-0 flex-1 justify-center">
          <AlgorithmPanel
            key={`${currentAlgorithm.slug}-${sizeValue}-${rangeValue}-${seedValue}`}
            algorithm={currentAlgorithm}
            sizeValue={sizeValue}
            rangeValue={rangeValue}
            seedValue={seedValue}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>Select an algorithm</p>
        </div>
      )}
      <RightSidebar
        algorithm={currentAlgorithm}
        sizeValue={sizeValue}
        setSizeValue={setSizeValue}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
        seedValue={seedValue}
        setSeedValue={setSeedValue}
      />
    </div>
  );
}
