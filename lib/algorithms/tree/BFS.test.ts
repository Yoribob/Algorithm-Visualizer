import { BFS } from "./BFS";
import type { TreeNode } from "@/lib/types/tree";

const tree: TreeNode = {
  id: "root",
  value: 10,
  leftNode: {
    id: "left",
    value: 5,
    leftNode: null,
    rightNode: null,
  },
  rightNode: {
    id: "right",
    value: 15,
    leftNode: null,
    rightNode: null,
  },
};

describe("BFS test", () => {
  test("(found)", () => {
    const result = BFS(tree, 15);
    expect(result.found).toEqual(true);
    expect(result.id).toEqual("right");
  });

  test("(not found)", () => {
    const result = BFS(tree, 20);
    expect(result.found).toEqual(false);
    expect(result.id).toBeNull();
  });
});
