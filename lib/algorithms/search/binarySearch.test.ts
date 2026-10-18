import { binarySearch } from "./binarySearch";
import { TestArrAsc, TestArrDes, SearchFound, SearchNotFound } from "@/lib/utils/presets";
describe("binarySearch test", () => {
  test("(found ascending)", () => {
    const result = binarySearch(TestArrAsc, SearchFound, "ascending");
    expect(result.found).toEqual(true);
    expect(result.index).toEqual(TestArrAsc.indexOf(SearchFound));
    
  });
  test("(not found ascending)", () => {
    const result = binarySearch(TestArrDes, SearchNotFound, "ascending");
    expect(result.found).toEqual(false);
    expect(result.index).toBeNull();
  });
  test("(found descending)", () => {
    const result = binarySearch(TestArrDes, SearchFound, "descending");
    expect(result.found).toEqual(true);
    expect(result.index).toEqual(TestArrDes.indexOf(SearchFound));
    
  });
  test("(not found descending)", () => {
    const result = binarySearch(TestArrDes, SearchNotFound, "descending");
    expect(result.found).toEqual(false);
    expect(result.index).toBeNull();
  });
});