import { useState } from "react";
import { Algorithm } from "@/lib/types/algorithm";
import { SidebarConfig } from "./SidebarConfig";
interface SidebarProps {
  algorithm: Algorithm | null;
  sizeValue: number;
  rangeValue: number;
  seedValue: number;
  setSizeValue: (sizeValue: number) => void;
  setRangeValue: (rangeValue: number) => void;
  setSeedValue: (seedValue: number) => void;
}

function TimeComplexityList({ algorithm }: { algorithm: Algorithm | null }) {
  if (!algorithm?.timeComplexity) return null;

  return (
    <>
      <span>Worst case: {algorithm.timeComplexity[0]}</span>
      <span>Average case: {algorithm.timeComplexity[1]}</span>
      <span>Best case: {algorithm.timeComplexity[2]}</span>
    </>
  );
}

export function RightSidebar({
  algorithm,
  sizeValue,
  setSizeValue,
  rangeValue,
  setRangeValue,
  seedValue,
  setSeedValue,
}: SidebarProps) {
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  return (
    <div className="flex w-1/6 flex-shrink-0 flex-col bg-gray-400 p-4">
      {algorithm ? (
        <>
          <h1 className="text-xl font-bold">{algorithm?.name}</h1>
          <span>{algorithm?.description}</span>
          <span>Difficulty: {algorithm?.difficulty}</span>

          <div
            className="mt-4 font-semibold cursor-pointer"
            onClick={() => setIsTimeOpen(!isTimeOpen)}
          >
            Time Complexity
          </div>

          {isTimeOpen && <TimeComplexityList algorithm={algorithm} />}

          <div>Space Complexity: {algorithm?.spaceComplexity}</div>

          <SidebarConfig
            sizeValue={sizeValue}
            setSizeValue={setSizeValue}
            rangeValue={rangeValue}
            setRangeValue={setRangeValue}
            seedValue={seedValue}
            setSeedValue={setSeedValue}
          />
        </>
      ) : (
        <p>Select an algorithm</p>
      )}
    </div>
  );
}
