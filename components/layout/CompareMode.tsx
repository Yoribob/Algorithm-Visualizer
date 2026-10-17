import type { Algorithm, AlgorithmEntry } from "@/lib/types/algorithm";

export type CompareCategory = "Sort" | "Search";

interface CompareModeProps {
  algorithms: AlgorithmEntry;
  category: CompareCategory | null;
  selectedAlgorithms: [Algorithm | null, Algorithm | null];
  onSelectCategory: (category: CompareCategory | null) => void;
  onSelectFirst: (algorithm: Algorithm | null) => void;
  onSelectSecond: (algorithm: Algorithm | null) => void;
}

export function CompareMode({
  algorithms = [],
  category = null,
  selectedAlgorithms = [null, null],
  onSelectCategory,
  onSelectFirst,
  onSelectSecond,
}: CompareModeProps) {
  const availableAlgorithms = algorithms.filter(
    (algorithm): algorithm is Algorithm => Boolean(algorithm),
  );
  const categoryAlgorithms = category
    ? availableAlgorithms.filter((algorithm) => algorithm.category === category)
    : [];
  const firstAlgorithm = selectedAlgorithms[0] ?? null;
  const secondAlgorithm = selectedAlgorithms[1] ?? null;

  const selectAlgorithm = (
    slug: string,
    onSelect: (algorithm: Algorithm | null) => void,
  ) => {
    const algorithm = categoryAlgorithms.find((entry) => entry.slug === slug);
    onSelect(algorithm ?? null);
  };

  return (
    <div className="space-y-3 rounded-md border border-black/10 bg-main p-3">
      <label className="block text-sm font-semibold">
        <span className="mb-1 block">Category</span>
        <select
          value={category ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            onSelectCategory(value === "Sort" || value === "Search" ? value : null);
          }}
          className="w-full rounded-md border border-black/15 bg-white px-2 py-2 text-sm outline-none focus:border-bar focus:ring-2 focus:ring-bar/15"
        >
          <option value="">Select a category</option>
          <option value="Sort">Array</option>
          <option value="Search">Search</option>
        </select>
      </label>

      {category && (
        <>
          <label className="block text-sm font-semibold">
            <span className="mb-1 block">First algorithm</span>
            <select
              value={firstAlgorithm?.slug ?? ""}
              onChange={(event) =>
                selectAlgorithm(event.target.value, onSelectFirst)
              }
              className="w-full rounded-md border border-black/15 bg-white px-2 py-2 text-sm outline-none focus:border-bar focus:ring-2 focus:ring-bar/15"
            >
              <option value="">Select an algorithm</option>
              {categoryAlgorithms.map((algorithm) => (
                <option
                  key={algorithm.slug}
                  value={algorithm.slug}
                  disabled={
                    categoryAlgorithms.length > 1 &&
                    algorithm.slug === secondAlgorithm?.slug
                  }
                >
                  {algorithm.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold">
            <span className="mb-1 block">Second algorithm</span>
            <select
              value={secondAlgorithm?.slug ?? ""}
              onChange={(event) =>
                selectAlgorithm(event.target.value, onSelectSecond)
              }
              className="w-full rounded-md border border-black/15 bg-white px-2 py-2 text-sm outline-none focus:border-bar focus:ring-2 focus:ring-bar/15"
            >
              <option value="">Select an algorithm</option>
              {categoryAlgorithms.map((algorithm) => (
                <option
                  key={algorithm.slug}
                  value={algorithm.slug}
                  disabled={
                    categoryAlgorithms.length > 1 &&
                    algorithm.slug === firstAlgorithm?.slug
                  }
                >
                  {algorithm.name}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
}
