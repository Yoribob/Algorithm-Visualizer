import { insertionSort } from "./insertionSort";
import { ascendingNumber, descendingNumber } from "../../utils/comparators";
import { TestArrRaw, TestArrAsc, TestArrDes } from "@/lib/utils/presets";
describe("insertionSort test", () => {
  test("(ascending)", () => {
    const result = insertionSort(TestArrRaw, ascendingNumber);
    expect(result.sorted).toEqual(TestArrAsc);
  });

  test("(descending)", () => {
    const result = insertionSort(TestArrRaw, descendingNumber);
    expect(result.sorted).toEqual(TestArrDes);
  });
});