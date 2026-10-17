import { quickSortSimple } from "./quickSortSimple";
import { ascendingNumber, descendingNumber } from "../../utils/comparators";
import { TestArrRaw, TestArrAsc, TestArrDes } from "@/lib/utils/presets";
describe("quickSort test", () => {
  test("(ascending)", () => {
    const result = quickSortSimple(TestArrRaw, ascendingNumber);
    expect(result.sorted).toEqual(TestArrAsc);
  });

  test("(descending)", () => {
    const result = quickSortSimple(TestArrRaw, descendingNumber);
    expect(result.sorted).toEqual(TestArrDes);
  });
});