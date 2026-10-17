import { binarySearch } from "./binarySearch";
import { TestArrAsc, SearchFound, SearchNotFound } from "@/lib/utils/presets";
describe("bubbleSort test", () => {
  test("(found)", () => {
    const result = binarySearch(TestArrAsc, SearchFound);
    expect(result.found).toEqual(true);
  });

  test("(not found)", () => {
    const result = binarySearch(TestArrAsc, SearchNotFound);
    expect(result.found).toEqual(false);
  });
});