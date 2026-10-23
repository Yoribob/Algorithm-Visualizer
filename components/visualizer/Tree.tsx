import type { Tree, TreeNode } from "@/lib/types/tree";
import type { TreeStep } from "@/lib/types/steps";
import { Node } from "@/components/visualizer/Node";
import * as config from "@/lib/config/config.json";

type TreeProps = {
  root: Tree;
  playbackSpeed: number;
  step?: TreeStep;
};

const CHILD_GAP = 16;
const CONNECTOR_HEIGHT = 24;
const NODE_DIAMETER = 48;

function measureTree(node: TreeNode, widths: Map<TreeNode, number>): number {
  const leftWidth = node.leftNode ? measureTree(node.leftNode, widths) : 0;
  const rightWidth = node.rightNode ? measureTree(node.rightNode, widths) : 0;
  const width =
    leftWidth && rightWidth
      ? leftWidth + CHILD_GAP + rightWidth
      : leftWidth || rightWidth
        ? (leftWidth || rightWidth) + config.sizes.node_width
      : Math.max(config.sizes.node_width, leftWidth, rightWidth);
  widths.set(node, width);
  return width;
}

export function Tree({ root, playbackSpeed, step }: TreeProps) {
  if (!root) {
    return <p className="text-center text-gray-500">No tree to display.</p>;
  }

  const widths = new Map<TreeNode, number>();
  const treeWidth = measureTree(root, widths);
  const visitedIds = new Set(step?.visitedIds);
  const queueIds = new Set(step?.queueIds);

  function renderNode(node: TreeNode) {
    const isCurrent = step?.currentId === node.id;
    const isFound = isCurrent && step?.status === "found";
    const nodeWidth = widths.get(node)!;
    const leftWidth = node.leftNode ? widths.get(node.leftNode)! : 0;
    const rightWidth = node.rightNode ? widths.get(node.rightNode)! : 0;
    const childCenters = node.leftNode && node.rightNode
      ? [leftWidth / 2, leftWidth + CHILD_GAP + rightWidth / 2]
      : node.leftNode
        ? [leftWidth / 2]
        : [nodeWidth - rightWidth / 2];

    return (
      <div
        key={node.id}
        className="flex shrink-0 flex-col items-center"
        style={{ width: nodeWidth }}
      >
        <Node
          node={node}
          playbackSpeed={playbackSpeed}
          isCurrent={isCurrent && !isFound}
          isFound={isFound}
          isVisited={visitedIds.has(node.id) && !isCurrent}
          isQueued={queueIds.has(node.id)}
        />
        {(node.leftNode || node.rightNode) && (
          <div className="relative w-full">
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 -top-6 overflow-visible"
              width={nodeWidth}
              height={CONNECTOR_HEIGHT + NODE_DIAMETER}
              viewBox={`0 0 ${nodeWidth} ${CONNECTOR_HEIGHT + NODE_DIAMETER}`}
              fill="none"
            >
              {childCenters.map((center) => (
                <path
                  key={center}
                  d={`M ${nodeWidth / 2} 0 L ${center} ${CONNECTOR_HEIGHT + NODE_DIAMETER}`}
                  stroke="rgb(156 163 175)"
                />
              ))}
            </svg>
            <div
              className={`flex w-full pt-6 ${
                node.leftNode && node.rightNode
                  ? "justify-center"
                  : node.leftNode
                    ? "justify-start"
                    : "justify-end"
              }`}
            >
              {node.leftNode && node.rightNode ? (
                <div className="flex" style={{ gap: CHILD_GAP }}>
                  {renderNode(node.leftNode)}
                  {renderNode(node.rightNode)}
                </div>
              ) : node.leftNode ? (
                renderNode(node.leftNode)
              ) : (
                renderNode(node.rightNode!)
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 w-full min-w-0 overflow-auto">
      <div
        className="mx-auto min-h-full w-max px-8 py-8"
        style={{ minWidth: treeWidth }}
      >
        {renderNode(root)}
      </div>
    </div>
  );
}
