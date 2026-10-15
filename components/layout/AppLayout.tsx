"use client";

import { algorithms } from "@/lib/algorithms";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { SortVisualizer } from "../visualizer/SortVisualizer";
import { Controls } from "../visualizer/Controls";
import { StatusBar } from "./StatusBar";
import * as comparators from "@/lib/utils/comparators";
import type { SortOrder } from "@/lib/utils/comparators";
import { getRanks } from "@/lib/utils/ranks";
import { generateArrayNumber } from "@/lib/utils/generator";
import type { ArrayPreset } from "@/lib/utils/generator";
import { useStepPlayer } from "@/hooks/useStepPlayer";
import { useState } from "react";
import type { Algorithm } from "@/lib/types/algorithm";
import type { Step } from "@/lib/types/steps";
import * as config from "@/lib/config/config.json";

interface AlgorithmPanelProps {
  algorithm: Algorithm;
  sortOrder: SortOrder;
  showLogs: boolean;
  onToggleLogs: () => void;
  sizeValue: number;
  rangeValue: number;
  seedValue: number;
  arrayPreset: ArrayPreset;
}

function AlgorithmPanel({
  algorithm,
  sortOrder,
  showLogs,
  onToggleLogs,
  sizeValue,
  rangeValue,
  seedValue,
  arrayPreset,
}: AlgorithmPanelProps) {
  const array = generateArrayNumber(
    sizeValue,
    rangeValue,
    seedValue,
    arrayPreset,
    sortOrder,
  );
  const compareFn =
    sortOrder === "ascending"
      ? comparators.ascendingNumber
      : comparators.descendingNumber;
  const steps: Step[] = algorithm.run(array, compareFn).steps;
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
      <div className="flex min-h-0 flex-1 flex-col items-center justify-end mt-20">
        <SortVisualizer
          currentStep={currentStep}
          ranks={ranks}
          playbackSpeed={playbackSpeed}
        />
      </div>
      <hr className="my-8 h-px w-full self-center border-0 bg-bar"/>
      <StatusBar
        steps={steps}
        currentStepIndex={step}
        showLogs={showLogs}
        onToggleLogs={onToggleLogs}
      />
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
        steps={steps}
        currentStepIndex={step}
      />
    </div>
  );
}

interface ComparisonPanelProps {
  algorithms: [Algorithm, Algorithm];
  sortOrder: SortOrder;
  showLogs: boolean;
  sizeValue: number;
  rangeValue: number;
  seedValue: number;
  arrayPreset: ArrayPreset;
}

function ComparisonPanel({
  algorithms,
  sortOrder,
  showLogs,
  sizeValue,
  rangeValue,
  seedValue,
  arrayPreset,
}: ComparisonPanelProps) {
  const [algorithmLogs, setAlgorithmLogs] = useState<[boolean, boolean]>([
    showLogs,
    showLogs,
  ]);
  const array = generateArrayNumber(
    sizeValue,
    rangeValue,
    seedValue,
    arrayPreset,
    sortOrder,
  );
  const compareFn =
    sortOrder === "ascending"
      ? comparators.ascendingNumber
      : comparators.descendingNumber;
  const firstSteps = algorithms[0].run(array, compareFn).steps;
  const secondSteps = algorithms[1].run(array, compareFn).steps;
  const timelineSteps =
    firstSteps.length >= secondSteps.length ? firstSteps : secondSteps;
  const {
    step,
    isAuto,
    playbackSpeed,
    goNext,
    goPrev,
    goAuto,
    goReset,
    handleSpeedChange,
  } = useStepPlayer(timelineSteps.length);
  const ranks = getRanks(array, comparators.ascendingNumber);

  const renderAlgorithm = (
    algorithm: Algorithm,
    steps: Step[],
    algorithmIndex: 0 | 1,
  ) => {
    const algorithmStepIndex = Math.min(step, steps.length - 1);
    const currentStep = steps[algorithmStepIndex] ?? steps[0];
    if (!currentStep) {
      return null;
    }

    return (
      <section
        key={algorithm.slug}
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-3 pt-3"
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="truncate text-lg font-bold">{algorithm.name}</h2>
        </div>
        <div className="flex min-h-0 flex-1 items-end justify-center overflow-hidden pb-2">
          <SortVisualizer
            currentStep={currentStep}
            ranks={ranks}
            playbackSpeed={playbackSpeed}
            compact
          />
        </div>
        <hr className="h-px w-full shrink-0 border-0 bg-bar" />
        <div className="h-[35%] min-h-0 shrink-0">
          <StatusBar
            steps={steps}
            currentStepIndex={algorithmStepIndex}
            showLogs={algorithmLogs[algorithmIndex]}
            onToggleLogs={() =>
              setAlgorithmLogs((currentLogs) => {
                const nextLogs: [boolean, boolean] = [...currentLogs];
                nextLogs[algorithmIndex] = !currentLogs[algorithmIndex];
                return nextLogs;
              })
            }
          />
        </div>
      </section>
    );
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="flex min-h-0 flex-1 divide-x divide-black/10">
        {renderAlgorithm(algorithms[0], firstSteps, 0)}
        {renderAlgorithm(algorithms[1], secondSteps, 1)}
      </div>
      <Controls
        onNext={goNext}
        onPrev={goPrev}
        onAuto={goAuto}
        onReset={goReset}
        onSpeedChange={handleSpeedChange}
        speed={playbackSpeed}
        disableNext={step === timelineSteps.length - 1}
        disablePrev={step === 0}
        isAuto={isAuto}
        steps={firstSteps}
        currentStepIndex={Math.min(step, firstSteps.length - 1)}
        secondStepCounter={{
          currentStepIndex: Math.min(step, secondSteps.length - 1),
          totalSteps: secondSteps.length,
        }}
      />
    </div>
  );
}

export function AppLayout() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm | null>(
    null,
  );
  const [compareAlgorithms, setCompareAlgorithms] = useState<
    [Algorithm, Algorithm]
  >([algorithms[0], algorithms[1]]);
  const [isComparing, setIsComparing] = useState(false);
  const [sizeValue, setSizeValue] = useState(config.defaults.size);
  const [rangeValue, setRangeValue] = useState(config.defaults.range);
  const [seedValue, setSeedValue] = useState(config.defaults.seed);
  const [arrayPreset, setArrayPreset] = useState<ArrayPreset>("random");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");
  const [showLogs, setShowLogs] = useState(true);

  const toggleCompare = () => {
    if (isComparing) {
      setIsComparing(false);
      return;
    }

    const firstAlgorithm = currentAlgorithm ?? algorithms[0];
    const secondAlgorithm =
      algorithms.find((algorithm) => algorithm.slug !== firstAlgorithm.slug) ??
      algorithms[1];
    setCompareAlgorithms([firstAlgorithm, secondAlgorithm]);
    setIsComparing(true);
  };

  const selectCompareFirst = (algorithm: Algorithm) => {
    setCompareAlgorithms(([first, second]) => {
      if (algorithm.slug === second.slug) {
        return [algorithm, first];
      }
      return [algorithm, second];
    });
  };

  const selectCompareSecond = (algorithm: Algorithm) => {
    setCompareAlgorithms(([first, second]) => {
      if (algorithm.slug === first.slug) {
        return [second, algorithm];
      }
      return [first, algorithm];
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftSidebar
        algorithms={algorithms}
        selected={currentAlgorithm}
        onSelect={setCurrentAlgorithm}
        isComparing={isComparing}
        onToggleCompare={toggleCompare}
        compareAlgorithms={compareAlgorithms}
        onSelectCompareFirst={selectCompareFirst}
        onSelectCompareSecond={selectCompareSecond}
      />
      {isComparing ? (
        <div className="flex min-h-0 flex-1 justify-center">
          <ComparisonPanel
            key={`${compareAlgorithms[0].slug}-${compareAlgorithms[1].slug}-${sortOrder}-${arrayPreset}-${sizeValue}-${rangeValue}-${seedValue}`}
            algorithms={compareAlgorithms}
            sortOrder={sortOrder}
            showLogs={showLogs}
            sizeValue={sizeValue}
            rangeValue={rangeValue}
            seedValue={seedValue}
            arrayPreset={arrayPreset}
          />
        </div>
      ) : currentAlgorithm ? (
        <div className="flex min-h-0 flex-1 justify-center">
          <AlgorithmPanel
            key={`${currentAlgorithm.slug}-${sortOrder}-${arrayPreset}-${sizeValue}-${rangeValue}-${seedValue}`}
            algorithm={currentAlgorithm}
            sortOrder={sortOrder}
            showLogs={showLogs}
            onToggleLogs={() => setShowLogs((visible) => !visible)}
            sizeValue={sizeValue}
            rangeValue={rangeValue}
            seedValue={seedValue}
            arrayPreset={arrayPreset}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>Select an algorithm</p>
        </div>
      )}
      <RightSidebar
        algorithm={currentAlgorithm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sizeValue={sizeValue}
        setSizeValue={setSizeValue}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
        seedValue={seedValue}
        setSeedValue={setSeedValue}
        arrayPreset={arrayPreset}
        setArrayPreset={setArrayPreset}
      />
    </div>
  );
}
