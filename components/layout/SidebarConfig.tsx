import { limits } from "@/lib/config/config.json";
import { useEffect, useState } from "react";
import type { SortOrder } from "@/lib/utils/comparators";
import type { ArrayPreset } from "@/lib/utils/generator";

interface SidebarConfigProp {
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useClampedNumberInput(
  value: number,
  setValue: (value: number) => void,
  min: number,
  max: number
) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      setDraft("");
      return;
    }

    if (!/^\d+$/.test(raw)) {
      return;
    }

    setDraft(raw);
  };

  const applyValue = () => {
    let num = Number(draft);
    if (draft === "" || isNaN(num)) {
      num = min;
    }
    const clamped = clamp(num, min, max);
    setValue(clamped);
    setDraft(String(clamped));
  };

  const handleBlur = () => {
    applyValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyValue();
      e.currentTarget.blur();
    }
  };

  return { draft, handleChange, handleBlur, handleKeyDown };
}

export function SidebarConfig({
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
}: SidebarConfigProp) {
  const size = useClampedNumberInput(
    sizeValue,
    setSizeValue,
    limits.size_min,
    limits.size_max
  );
  const range = useClampedNumberInput(
    rangeValue,
    setRangeValue,
    limits.range_min,
    limits.range_max
  );
  const seed = useClampedNumberInput(
    seedValue,
    setSeedValue,
    limits.seed_min,
    limits.seed_max
  );

  return (
    <section className="mt-auto space-y-4 rounded-lg border border-black/10 bg-main p-4">
      <h3 className="text-base font-bold">Array settings</h3>
      <div className="space-y-3">
        <label htmlFor="array-preset" className="block">
          <span className="mb-1.5 block text-sm font-medium">List preset</span>
          <select
            id="array-preset"
            value={arrayPreset}
            onChange={(event) => {
              const nextPreset = event.target.value;
              if (
                nextPreset === "random" ||
                nextPreset === "nearly-sorted" ||
                nextPreset === "reversed" ||
                nextPreset === "already-sorted" ||
                nextPreset === "few-unique-values"
              ) {
                setArrayPreset(nextPreset);
              }
            }}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-bar focus:ring-2 focus:ring-bar/15"
          >
            <option value="random">Random</option>
            <option value="nearly-sorted">Nearly sorted</option>
            <option value="reversed">Reversed</option>
            <option value="already-sorted">Already sorted</option>
            <option value="few-unique-values">Few unique values</option>
          </select>
        </label>
        <label htmlFor="sort-order" className="block">
          <span className="mb-1.5 block text-sm font-medium">Sort order</span>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(event) => {
              const nextOrder = event.target.value;
              if (nextOrder === "ascending" || nextOrder === "descending") {
                setSortOrder(nextOrder);
              }
            }}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-bar focus:ring-2 focus:ring-bar/15"
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </label>
        <label htmlFor="array-size" className="block">
          <span className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium">
            <span>Size</span>
            <span className="text-xs font-normal text-black/50">
              {limits.size_min}–{limits.size_max}
            </span>
          </span>
          <input
            id="array-size"
            type="number"
            min={limits.size_min}
            max={limits.size_max}
            value={size.draft}
            onChange={size.handleChange}
            onBlur={size.handleBlur}
            onKeyDown={size.handleKeyDown}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm tabular-nums outline-none transition focus:border-bar focus:ring-2 focus:ring-bar/15"
          />
        </label>
        <label htmlFor="array-range" className="block">
          <span className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium">
            <span>Range</span>
            <span className="text-xs font-normal text-black/50">
              {limits.range_min}–{limits.range_max}
            </span>
          </span>
          <input
            id="array-range"
            type="number"
            min={limits.range_min}
            max={limits.range_max}
            value={range.draft}
            onChange={range.handleChange}
            onBlur={range.handleBlur}
            onKeyDown={range.handleKeyDown}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm tabular-nums outline-none transition focus:border-bar focus:ring-2 focus:ring-bar/15"
          />
        </label>
        <label htmlFor="array-seed" className="block">
          <span className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium">
            <span>Seed</span>
            <span className="text-xs font-normal text-black/50">
              {limits.seed_min}–{limits.seed_max}
            </span>
          </span>
          <input
            id="array-seed"
            type="number"
            min={limits.seed_min}
            max={limits.seed_max}
            value={seed.draft}
            onChange={seed.handleChange}
            onBlur={seed.handleBlur}
            onKeyDown={seed.handleKeyDown}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm tabular-nums outline-none transition focus:border-bar focus:ring-2 focus:ring-bar/15"
          />
        </label>
      </div>
    </section>
  );
}