import { linearSearch } from "./linearSearch";
import { TestArrRaw, SearchFound, SearchNotFound } from "@/lib/utils/presets";
describe("bubbleSort test", () => {
  test("(found)", () => {
    const result = linearSearch(TestArrRaw, SearchFound);
    expect(result.found).toEqual(true);
  });

  test("(not found)", () => {
    const result = linearSearch(TestArrRaw, SearchNotFound);
    expect(result.found).toEqual(false);
  });
});