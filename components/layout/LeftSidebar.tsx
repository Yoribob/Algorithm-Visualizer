"use client";

import { useState } from "react";
import type { AlgorithmEntry, Algorithm } from "@/lib/types/algorithm";
import { CompareMode } from "./CompareMode";
interface SidebarProps {
  algorithms: AlgorithmEntry;
  selected: Algorithm | null;
  onSelect: (algorithm: Algorithm) => void;
  isComparing: boolean;
  onToggleCompare: () => void;
  compareAlgorithms: [Algorithm, Algorithm];
  onSelectCompareFirst: (algorithm: Algorithm) => void;
  onSelectCompareSecond: (algorithm: Algorithm) => void;
}

export function LeftSidebar({
  algorithms,
  selected,
  onSelect,
  isComparing,
  onToggleCompare,
  compareAlgorithms,
  onSelectCompareFirst,
  onSelectCompareSecond,
}: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filteredAlgorithms = query
    ? algorithms.filter((alg) => alg.name.toLowerCase().includes(query))
    : algorithms;

  const categories = [
    ...new Set(filteredAlgorithms.map((algorithm) => algorithm.category)),
  ];

  const handleCategoryClick = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="flex h-screen min-h-0 w-1/10 min-w-48 shrink-0 flex-col gap-3 bg-side px-5 pt-5">
      <h1 className="text-2xl font-bold w-full flex justify-center">Algorithms</h1>
      <input
        className="bg-main rounded-md h-9 p-3 border border-black/15 focus:bg-white focus:ring-2 focus:outline-none"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {query && filteredAlgorithms.length === 0 && <p>No algorithms found.</p>}
        {categories.map((category) => {
          const isExpanded = query ? true : expandedCategory === category;
          const categoryAlgorithms = filteredAlgorithms.filter(
            (alg) => alg.category === category,
          );

          return (
            <div key={category}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleCategoryClick(category)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCategoryClick(category);
                  }
                }}
                className={`cursor-pointer select-none rounded-md mt-1.25 px-2 h-8 flex items-center text-lg font-medium ${
                  expandedCategory === category
                    ? "bg-main text-font"
                    : "hover:bg-muted"
                }`}
              >
                <p>{category}</p>
              </div>

              {isExpanded && (
                <ul>
                  {categoryAlgorithms.map((algorithm) => (
                    <li
                      key={algorithm.slug}
                      className={`cursor-pointer select-none rounded-md mt-1.75 px-2 ml-2.5 h-8 flex items-center ${
                        selected?.slug === algorithm.slug
                          ? "bg-bar text-white font-medium"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => onSelect(algorithm)}
                    >
                      {algorithm.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {isComparing && (
        <CompareMode
          algorithms={algorithms}
          firstAlgorithm={compareAlgorithms[0]}
          secondAlgorithm={compareAlgorithms[1]}
          onSelectFirst={onSelectCompareFirst}
          onSelectSecond={onSelectCompareSecond}
        />
      )}
      <button
        type="button"
        aria-pressed={isComparing}
        onClick={onToggleCompare}
        className={`mb-5 w-full rounded-md px-3 py-2 text-sm font-semibold transition  active:scale-96 ${
          isComparing
            ? "bg-bar text-white hover:text-gray-200"
            : "border border-black/15 bg-main text-black hover:text-gray-600"
        }`}
      >
        Compare
      </button>
    </div>
  );
}