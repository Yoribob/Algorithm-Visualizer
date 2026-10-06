"use client";

import { useState } from "react";
import type { AlgorithmEntry, Algorithm } from "@/lib/types/algorithm";
interface SidebarProps {
  algorithms: AlgorithmEntry;
  selected: Algorithm | null;
  onSelect: (algorithm: Algorithm) => void;
}

export function LeftSidebar({ algorithms, selected, onSelect }: SidebarProps) {
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
    <div className="flex flex-col w-1/6 h-screen bg-gray-400">
      <h1>Algorithms</h1>
      <input
        placeholder="Search for algorithm..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
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
              className="cursor-pointer select-none"
            >
              <p>{category}</p>
            </div>

            {isExpanded && (
              <ul>
                {categoryAlgorithms.map((algorithm) => (
                  <li
                    key={algorithm.slug}
                    className="cursor-pointer select-none"
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
  );
}
