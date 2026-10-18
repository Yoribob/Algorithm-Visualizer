import { jumpSearch } from "./jumpSearch";
import { TestArrAsc, TestArrDes, SearchFound, SearchNotFound } from "@/lib/utils/presets";

describe("jumpSearch test", () => {
  test("(found ascending)", () => {
    const result = jumpSearch(TestArrAsc, SearchFound, "ascending");
    expect(result.found).toEqual(true);
    expect(result.index).toEqual(TestArrAsc.indexOf(SearchFound));
  });

  test("(not found ascending)", () => {
    const result = jumpSearch(TestArrAsc, SearchNotFound, "ascending");
    expect(result.found).toEqual(false);
    expect(result.index).toBeNull();
  });

  test("(found descending)", () => {
    const result = jumpSearch(TestArrDes, SearchFound, "descending");
    expect(result.found).toEqual(true);
    expect(result.index).toEqual(TestArrDes.indexOf(SearchFound));
  });
  test("(not found descending)", () => {
    const result = jumpSearch(TestArrDes, SearchNotFound, "descending");
    expect(result.found).toEqual(false);
    expect(result.index).toBeNull();
  });
});
