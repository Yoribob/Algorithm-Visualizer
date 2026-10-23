export interface TreeNode {
  id: string;
  value: number;
  leftNode: TreeNode | null;
  rightNode: TreeNode | null;
}

export type BinaryTree = TreeNode | null;
export type Tree = BinaryTree;