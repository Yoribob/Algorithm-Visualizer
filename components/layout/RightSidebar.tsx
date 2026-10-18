import type { Algorithm, Category } from "@/lib/types/algorithm";
import type { SortOrder } from "@/lib/utils/comparators";
import type { ArrayPreset } from "@/lib/utils/generator";
import { SidebarConfig } from "./SidebarConfig";
interface SidebarProps {
  algorithm: Algorithm | null;
  category: Category | null;
  requiresSortedArray: boolean;
  showConfig: boolean;
  target: string | null;
  setTarget: (target: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
  arrayPreset: ArrayPreset;
  setArrayPreset: (preset: ArrayPreset) => void;
  sizeValue: number;
  rangeValue: number;
  seedValue: number;
  setSizeValue: (sizeValue: number) => void;
  setRangeValue: (rangeValue: number) => void;
  setSeedValue: (seedValue: number) => void;
}

export function RightSidebar({
  algorithm,
  category,
  requiresSortedArray,
  showConfig,
  target,
  setTarget,
  sortOrder,
  setSortOrder,
  arrayPreset,
  setArrayPreset,
  sizeValue,
  setSizeValue,
  rangeValue,
  setRangeValue,
  seedValue,
  setSeedValue,
}: SidebarProps) {
  return (
    <aside
      aria-label="Algorithm details"
      className="flex w-72 shrink-0 flex-col gap-6 overflow-hidden border-l border-black/10 bg-side px-5 py-6 text-font"
    >
      <>
        {algorithm && (
          <>
            <section className="space-y-3">
              <h2 className="break-words text-2xl font-bold leading-tight">
                {algorithm.name}
              </h2>
              <p className="text-sm leading-6 text-black/70">
                {algorithm.description}
              </p>
              <div className="flex items-center justify-between gap-3 border-y border-black/10 py-3 text-sm">
                <span className="text-black/60">Difficulty</span>
                <span className="rounded-full bg-main px-2.5 py-1 font-semibold">
                  {algorithm.difficulty}
                </span>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-md font-bold uppercase tracking-wider">
                Complexity
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-black/60">Worst case</dt>
                  <dd className="break-all text-right font-mono">
                    {algorithm.timeComplexity[0]}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-black/60">Average case</dt>
                  <dd className="break-all text-right font-mono">
                    {algorithm.timeComplexity[1]}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-black/60">Best case</dt>
                  <dd className="break-all text-right font-mono">
                    {algorithm.timeComplexity[2]}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3 border-t border-black/10 pt-2.5">
                  <dt className="shrink-0 text-black/60">Space</dt>
                  <dd className="break-all text-right font-mono font-semibold">
                    {algorithm.spaceComplexity}
                  </dd>
                </div>
              </dl>
            </section>
          </>
        )}

      {showConfig ? (
        <SidebarConfig
          category={category}
          requiresSortedArray={requiresSortedArray}
          target={target}
          setTarget={setTarget}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          arrayPreset={arrayPreset}
          setArrayPreset={setArrayPreset}
          sizeValue={sizeValue}
          setSizeValue={setSizeValue}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          seedValue={seedValue}
          setSeedValue={setSeedValue}
        />
      ) : !algorithm ? (
        <p className="text-sm leading-6 text-black/60">
          Select an algorithm
        </p>
      ) : null}
      </>
    </aside>
  );
}
