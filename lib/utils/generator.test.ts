import { generateBinaryTree } from "./generator";

describe("generateBinaryTree", () => {
  test.each([1, 17, 39, 99])(
    "provides a non-root target value for seed %i",
    (seed) => {
      const root = generateBinaryTree(5, 3, seed);
      expect(root).not.toBeNull();

      const firstChild = root?.leftNode ?? root?.rightNode;
      expect(firstChild).toBeDefined();
      expect(firstChild?.value).not.toBe(root?.value);
    },
  );
});
