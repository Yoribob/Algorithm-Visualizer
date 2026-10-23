import type { Tree, TreeNode } from "@/lib/types/tree";
import type { TreeStep } from "@/lib/types/steps";

export function BFS(
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

  const queue: TreeNode[] = [root];
  const visitedIds: string[] = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    visitedIds.push(node.id);

    if (node.value === target) {
      steps.push({
        currentId: node.id,
        visitedIds: [...visitedIds],
        queueIds: queue.slice(head).map((queuedNode) => queuedNode.id),
        searchTarget: target,
        status: "found",
      });
      return { found: true, id: node.id, steps };
    }

    if (node.leftNode) queue.push(node.leftNode);
    if (node.rightNode) queue.push(node.rightNode);

    steps.push({
      currentId: node.id,
      visitedIds: [...visitedIds],
      queueIds: queue.slice(head).map((queuedNode) => queuedNode.id),
      searchTarget: target,
      status: head === queue.length ? "not-found" : "checking",
    });
  }

  return { found: false, id: null, steps };
}
