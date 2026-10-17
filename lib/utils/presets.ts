import { generateArrayNumber } from "./generator";

export function presetNumArray() {
  return generateArrayNumber(20, 100, 1);
}
export const TestArrRaw = [
  47, 83, 12, 65, 29, 91, 5, 58, 74, 36, 99, 21, 62, 8, 44, 77, 53, 16, 88, 31,
];
export const TestArrAsc = [
  5, 8, 12, 16, 21, 29, 31, 36, 44, 47, 53, 58, 62, 65, 74, 77, 83, 88, 91, 99,
];
export const TestArrDes = [
  99, 91, 88, 83, 77, 74, 65, 62, 58, 53, 47, 44, 36, 31, 29, 21, 16, 12, 8, 5,
];

export const SearchFound = 21; // uses TestArrAsc
export const SearchNotFound = 32 // uses TestArrDes