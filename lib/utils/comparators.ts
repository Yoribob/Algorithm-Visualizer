import type { CompareFn } from "@/lib/types/algorithm";

export const ascendingNumber: CompareFn = (a, b) => a - b;
export const descendingNumber: CompareFn = (a, b) => b - a;
