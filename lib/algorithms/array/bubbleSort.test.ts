import { bubbleSort } from "./bubbleSort";
import { ascendingNumber, descendingNumber } from "../../utils/comparators";
import { TestArrRaw, TestArrAsc, TestArrDes } from "@/lib/utils/presets";
describe("bubbleSort test", () => {
  test("(ascending)", () => {
    const result = bubbleSort(TestArrRaw, ascendingNumber);
    expect(result.sorted).toEqual(TestArrAsc);
  });

  test("(descending)", () => {
    const result = bubbleSort(TestArrRaw, descendingNumber);
    expect(result.sorted).toEqual(TestArrDes);
  });
});