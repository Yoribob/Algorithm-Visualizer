import { mergeSort } from "./mergeSort";
import { ascendingNumber, descendingNumber } from "../../utils/comparators";
import { TestArrRaw, TestArrAsc, TestArrDes } from "@/lib/utils/presets";
describe("mergeSort test", () => {
  test("(ascending)", () => {
    const result = mergeSort(TestArrRaw, ascendingNumber);
    expect(result.sorted).toEqual(TestArrAsc);
  });

  test("(descending)", () => {
    const result = mergeSort(TestArrRaw, descendingNumber);
    expect(result.sorted).toEqual(TestArrDes);
  });
});