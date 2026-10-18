import { linearSearch } from "./linearSearch";
import { TestArrRaw, SearchFound, SearchNotFound } from "@/lib/utils/presets";
describe("linearSearch test", () => {
  test("(found)", () => {
    const result = linearSearch(TestArrRaw, SearchFound);
    expect(result.found).toEqual(true);
    expect(result.index).toEqual(TestArrRaw.indexOf(SearchFound));
  });

  test("(not found)", () => {
    const result = linearSearch(TestArrRaw, SearchNotFound);
    expect(result.found).toEqual(false);
    expect(result.index).toBeNull();
  });
});