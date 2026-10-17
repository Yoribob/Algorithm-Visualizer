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
import type { Algorithm, CompareFn } from "@/lib/types/algorithm";
import type { CompareCategory } from "./CompareMode";
import type { Step } from "@/lib/types/steps";
import * as config from "@/lib/config/config.json";

function getAlgorithmSteps(
  algorithm: Algorithm,
  array: number[],
  compareFn: CompareFn,
  target: number,
  sortOrder: SortOrder,
): Step[] {
  if (algorithm.category === "Sort") {
    return algorithm.run(array, compareFn).steps;
  }

  return algorithm.run(array, target, sortOrder).steps;
}

interface AlgorithmPanelProps {
  algorithm: Algorithm;
  array: number[];
  target: number;
  sortOrder: SortOrder;
  showLogs: boolean;
  onToggleLogs: () => void;
}

function AlgorithmPanel({
  algorithm,
  array,
  target,
  sortOrder,
  showLogs,
  onToggleLogs,
}: AlgorithmPanelProps) {
  const compareFn =
    sortOrder === "ascending"
      ? comparators.ascendingNumber
      : comparators.descendingNumber;
  const steps = getAlgorithmSteps(algorithm, array, compareFn, target, sortOrder);
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

  const category = algorithm.category;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-end mt-20">
        <SortVisualizer
          currentStep={currentStep}
          ranks={ranks}
          playbackSpeed={playbackSpeed}
          category={category}
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
  array: number[];
  target: number;
  sortOrder: SortOrder;
  showLogs: boolean;
}

function ComparisonPanel({
  algorithms,
  array,
  target,
  sortOrder,
  showLogs,
}: ComparisonPanelProps) {
  const [algorithmLogs, setAlgorithmLogs] = useState<[boolean, boolean]>([
    showLogs,
    showLogs,
  ]);
  const compareFn =
    sortOrder === "ascending"
      ? comparators.ascendingNumber
      : comparators.descendingNumber;
  const firstSteps = getAlgorithmSteps(
    algorithms[0],
    array,
    compareFn,
    target,
    sortOrder,
  );
  const secondSteps = getAlgorithmSteps(
    algorithms[1],
    array,
    compareFn,
    target,
    sortOrder,
  );
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

    const category = algorithm.category;

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
            category={category}
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
    [Algorithm | null, Algorithm | null]
  >([null, null]);
  const [compareCategory, setCompareCategory] =
    useState<CompareCategory | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [sizeValue, setSizeValue] = useState(config.defaults.size);
  const [rangeValue, setRangeValue] = useState(config.defaults.range);
  const [seedValue, setSeedValue] = useState(config.defaults.seed);
  const [arrayPreset, setArrayPreset] = useState<ArrayPreset>("random");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");
  const [showLogs, setShowLogs] = useState(true);
  const [target, setTarget] = useState<string | null>(null);
  const usesBinarySearch = isComparing
    ? compareAlgorithms.some((algorithm) => algorithm?.slug === "binary-search")
    : currentAlgorithm?.slug === "binary-search";
  const generatedArray = generateArrayNumber(
    sizeValue,
    rangeValue,
    seedValue,
    usesBinarySearch ? "already-sorted" : arrayPreset,
    sortOrder,
  );
  const array = generatedArray;
  const middleIndex = Math.floor((array.length - 1) / 2);
  const defaultTarget = array[middleIndex] ?? 0;
  const numericTarget = target === null || target.trim() === ""
    ? Number.NaN
    : Number(target);
  const effectiveTarget = Number.isSafeInteger(numericTarget)
    ? numericTarget
    : defaultTarget;
  const selectedComparisonAlgorithms: [Algorithm, Algorithm] | null =
    compareAlgorithms[0] && compareAlgorithms[1]
      ? [compareAlgorithms[0], compareAlgorithms[1]]
      : null;

  const toggleCompare = () => {
    if (isComparing) {
      setIsComparing(false);
      return;
    }

    setCompareCategory(null);
    setCompareAlgorithms([null, null]);
    setIsComparing(true);
  };

  const selectCompareCategory = (category: CompareCategory | null) => {
    if (
      category === "Sort" &&
      (compareCategory === "Search" ||
        (!compareCategory && currentAlgorithm?.category === "Search"))
    ) {
      setSizeValue(config.defaults.size);
    }
    setCompareCategory(category);
    setCompareAlgorithms([null, null]);
  };

  const selectAlgorithm = (algorithm: Algorithm) => {
    if (currentAlgorithm?.category === "Search" && algorithm.category === "Sort") {
      setSizeValue(config.defaults.size);
    }
    setCurrentAlgorithm(algorithm);
  };

  const selectCompareFirst = (algorithm: Algorithm | null) =>
    setCompareAlgorithms(([, second]) => [algorithm, second]);

  const selectCompareSecond = (algorithm: Algorithm | null) =>
    setCompareAlgorithms(([first]) => [first, algorithm]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftSidebar
        algorithms={algorithms}
        selected={currentAlgorithm}
        onSelect={selectAlgorithm}
        isComparing={isComparing}
        onToggleCompare={toggleCompare}
        compareCategory={compareCategory}
        compareAlgorithms={compareAlgorithms}
        onSelectCompareCategory={selectCompareCategory}
        onSelectCompareFirst={selectCompareFirst}
        onSelectCompareSecond={selectCompareSecond}
      />
      {isComparing ? (
        <div className="flex min-h-0 flex-1 justify-center">
          {selectedComparisonAlgorithms ? (
            <ComparisonPanel
              key={`${selectedComparisonAlgorithms[0].slug}-${selectedComparisonAlgorithms[1].slug}-${sortOrder}-${arrayPreset}-${sizeValue}-${rangeValue}-${seedValue}`}
              algorithms={selectedComparisonAlgorithms}
              array={array}
              target={effectiveTarget}
              sortOrder={sortOrder}
              showLogs={showLogs}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p>Select a category and two algorithms to compare</p>
            </div>
          )}
        </div>
      ) : currentAlgorithm ? (
        <div className="flex min-h-0 flex-1 justify-center">
          <AlgorithmPanel
            key={`${currentAlgorithm.slug}-${sortOrder}-${arrayPreset}-${sizeValue}-${rangeValue}-${seedValue}`}
            algorithm={currentAlgorithm}
            array={array}
            target={effectiveTarget}
            sortOrder={sortOrder}
            showLogs={showLogs}
            onToggleLogs={() => setShowLogs((visible) => !visible)}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>Select an algorithm</p>
        </div>
      )}
      <RightSidebar
        algorithm={isComparing ? compareAlgorithms[0] : currentAlgorithm}
        category={isComparing ? compareCategory : currentAlgorithm?.category ?? null}
        usesBinarySearch={usesBinarySearch}
        showConfig={
          isComparing
            ? selectedComparisonAlgorithms !== null
            : Boolean(currentAlgorithm)
        }
        target={target ?? String(defaultTarget)}
        setTarget={setTarget}
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
