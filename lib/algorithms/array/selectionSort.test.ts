import { selectionSort } from "./selectionSort";
import { ascendingNumber, descendingNumber } from "../../utils/comparators";
import { TestArrRaw, TestArrAsc, TestArrDes } from "@/lib/utils/presets";
describe("selectionSort test", () => {
  test("(ascending)", () => {
    const result = selectionSort(TestArrRaw, ascendingNumber);
    expect(result.sorted).toEqual(TestArrAsc);
  });

  test("(descending)", () => {
    const result = selectionSort(TestArrRaw, descendingNumber);
    expect(result.sorted).toEqual(TestArrDes);
  });
});