import type { TreeNode } from "@/lib/types/tree";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateBinaryTree(
  size: number,
  range: number,
  seed: number,
): TreeNode | null {
  if (!Number.isInteger(size) || size < 0) {
    throw new RangeError("Tree size must be a positive integer.");
  }

  if (!Number.isInteger(range) || range <= 0) {
    throw new RangeError("Value range must be a positive integer.");
  }

  if (size === 0) {
    return null;
  }

  const rand = mulberry32(seed);
  const createNode = (index: number): TreeNode => ({
    id: `${index}`,
    value: Math.floor(rand() * range),
    leftNode: null,
    rightNode: null,
  });

  const root = createNode(0);
  const availableSlots: {
    parent: TreeNode;
    side: "leftNode" | "rightNode";
  }[] = [
    { parent: root, side: "leftNode" },
    { parent: root, side: "rightNode" },
  ];

  for (let index = 1; index < size; index++) {
    const slotIndex = Math.floor(rand() * availableSlots.length);
    const [slot] = availableSlots.splice(slotIndex, 1);
    const node = createNode(index);
    if (index === 1 && range > 1 && node.value === root.value) {
      node.value = (node.value + 1) % range;
    }
    slot.parent[slot.side] = node;
    availableSlots.push(
      { parent: node, side: "leftNode" },
      { parent: node, side: "rightNode" },
    );
  }

  return root;
}

export type ArrayPreset =
  | "random"
  | "nearly-sorted"
  | "reversed"
  | "already-sorted"
  | "few-unique-values";

export function generateArrayNumber(
  size: number,
  range: number,
  seed: number,
  preset: ArrayPreset = "random",
  sortOrder: "ascending" | "descending" = "ascending",
) {
  const rand = mulberry32(seed);
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(rand() * range));
  }

  if (preset === "random") {
    return array;
  }

  const compare = sortOrder === "ascending"
    ? (a: number, b: number) => a - b
    : (a: number, b: number) => b - a;

  if (preset === "already-sorted" || preset === "reversed" || preset === "nearly-sorted") {
    array.sort(compare);

    if (preset === "reversed") {
      return array.reverse();
    }

    if (preset === "nearly-sorted") {
      const swapCount = Math.max(1, Math.floor(size * 0.1));
      for (let i = 0; i < swapCount; i++) {
        const index = Math.floor(rand() * (size - 1));
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
      }
    }

    return array;
  }

  const uniqueCount = Math.min(5, size - 1, range);
  const minUniqueCount = Math.min(3, uniqueCount);
  const count = minUniqueCount + Math.floor(rand() * (uniqueCount - minUniqueCount + 1));
  const values = Array.from({ length: range }, (_, index) => index);

  for (let i = 0; i < count; i++) {
    const index = i + Math.floor(rand() * (range - i));
    [values[i], values[index]] = [values[index], values[i]];
  }

  const uniqueValues = values.slice(0, count);
  const result = uniqueValues.slice();
  while (result.length < size) {
    result.push(uniqueValues[Math.floor(rand() * uniqueValues.length)]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const index = Math.floor(rand() * (i + 1));
    [result[i], result[index]] = [result[index], result[i]];
  }

  return result;
}
