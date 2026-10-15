import type { Algorithm, AlgorithmEntry } from "@/lib/types/algorithm";

interface CompareModeProps {
  algorithms: AlgorithmEntry;
  firstAlgorithm: Algorithm;
  secondAlgorithm: Algorithm;
  onSelectFirst: (algorithm: Algorithm) => void;
  onSelectSecond: (algorithm: Algorithm) => void;
}

export function CompareMode({
  algorithms,
  firstAlgorithm,
  secondAlgorithm,
  onSelectFirst,
  onSelectSecond,
}: CompareModeProps) {
  const selectAlgorithm = (
    slug: string,
    onSelect: (algorithm: Algorithm) => void,
  ) => {
    const algorithm = algorithms.find((entry) => entry.slug === slug);
    if (algorithm) {
      onSelect(algorithm);
    }
  };

  return (
    <div className="space-y-3 rounded-md border border-black/10 bg-main p-3">
      <label className="block text-sm font-semibold">
        <span className="mb-1 block">First algorithm</span>
        <select
          value={firstAlgorithm.slug}
          onChange={(event) =>
            selectAlgorithm(event.target.value, onSelectFirst)
          }
          className="w-full rounded-md border border-black/15 bg-white px-2 py-2 text-sm outline-none focus:border-bar focus:ring-2 focus:ring-bar/15"
        >
          {algorithms.map((algorithm) => (
            <option
              key={algorithm.slug}
              value={algorithm.slug}
              disabled={algorithm.slug === secondAlgorithm.slug}
            >
              {algorithm.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        <span className="mb-1 block">Second algorithm</span>
        <select
          value={secondAlgorithm.slug}
          onChange={(event) =>
            selectAlgorithm(event.target.value, onSelectSecond)
          }
          className="w-full rounded-md border border-black/15 bg-white px-2 py-2 text-sm outline-none focus:border-bar focus:ring-2 focus:ring-bar/15"
        >
          {algorithms.map((algorithm) => (
            <option
              key={algorithm.slug}
              value={algorithm.slug}
              disabled={algorithm.slug === firstAlgorithm.slug}
            >
              {algorithm.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
