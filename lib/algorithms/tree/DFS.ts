import type { Tree, TreeNode } from "@/lib/types/tree";
import type { TreeStep } from "@/lib/types/steps";

export function DFS(
  root: Tree,
  target: number,
): { found: boolean; id: string | null; steps: TreeStep[] } {
  const steps: TreeStep[] = [];
  if (!root) {
    steps.push({
      currentId: null,
      visitedIds: [],
      queueIds: [],
      searchTarget: target,
      status: "not-found",
    });
    return { found: false, id: null, steps };
  }

  const stack: TreeNode[] = [root];
  const visitedIds: string[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;
    visitedIds.push(node.id);

    if (node.value === target) {
      steps.push({
        currentId: node.id,
        visitedIds: [...visitedIds],
        queueIds: stack.map((queuedNode) => queuedNode.id),
        searchTarget: target,
        status: "found",
      });
      return { found: true, id: node.id, steps };
    }

    if (node.rightNode) stack.push(node.rightNode);
    if (node.leftNode) stack.push(node.leftNode);

    steps.push({
      currentId: node.id,
      visitedIds: [...visitedIds],
      queueIds: stack.map((queuedNode) => queuedNode.id),
      searchTarget: target,
      status: stack.length === 0 ? "not-found" : "checking",
    });
  }

  return { found: false, id: null, steps };
}
