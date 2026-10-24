import { DFS } from "./DFS";
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

describe("DFS test", () => {
  test("(found)", () => {
    const result = DFS(tree, 5);
    expect(result.found).toEqual(true);
    expect(result.id).toEqual("left");
  });

  test("(not found)", () => {
    const result = DFS(tree, 20);
    expect(result.found).toEqual(false);
    expect(result.id).toBeNull();
  });
});
