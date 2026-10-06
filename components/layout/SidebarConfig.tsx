import { limits } from "@/lib/config/config.json";
import { useEffect, useState } from "react";

interface SidebarConfigProp {
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
    <div className="mt-auto">
      <h1>Config</h1>
      <div>
        <span>Size</span>
        <input
          type="number"
          min={limits.size_min}
          max={limits.size_max}
          value={size.draft}
          onChange={size.handleChange}
          onBlur={size.handleBlur}
          onKeyDown={size.handleKeyDown}
          className="w-auto px-2 py-1 border border-gray-700 bg-gray-300"
        />
      </div>
      <div>
        <span>Range</span>
        <input
          type="number"
          min={limits.range_min}
          max={limits.range_max}
          value={range.draft}
          onChange={range.handleChange}
          onBlur={range.handleBlur}
          onKeyDown={range.handleKeyDown}
          className="w-auto px-2 py-1 border border-gray-700 bg-gray-300"
        />
      </div>
      <div>
        <span>Seed</span>
        <input
          type="number"
          min={limits.seed_min}
          max={limits.seed_max}
          value={seed.draft}
          onChange={seed.handleChange}
          onBlur={seed.handleBlur}
          onKeyDown={seed.handleKeyDown}
          className="w-auto px-2 py-1 border border-gray-700 bg-gray-300"
        />
      </div>
    </div>
  );
}