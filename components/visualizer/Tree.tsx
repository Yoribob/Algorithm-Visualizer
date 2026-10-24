import type { Tree, TreeNode } from "@/lib/types/tree";
import type { TreeStep } from "@/lib/types/steps";
import { Node } from "@/components/visualizer/Node";
import * as config from "@/lib/config/config.json";
import { useEffect, useRef, useState } from "react";

type TreeProps = {
  root: Tree;
  playbackSpeed: number;
  step?: TreeStep;
};

const CHILD_GAP = 16;
const CONNECTOR_HEIGHT = 24;
const NODE_DIAMETER = 48;
const TREE_PADDING = 32;

function measureTree(
  node: TreeNode,
  widths: Map<TreeNode, number>,
): { width: number; depth: number } {
  const left = node.leftNode ? measureTree(node.leftNode, widths) : null;
  const right = node.rightNode ? measureTree(node.rightNode, widths) : null;
  const leftSize = left?.width ?? 0;
  const rightSize = right?.width ?? 0;
  const width =
    leftSize && rightSize
      ? leftSize + CHILD_GAP + rightSize
      : leftSize || rightSize
        ? (leftSize || rightSize) + config.sizes.node_width
        : config.sizes.node_width;
  widths.set(node, width);
  return {
    width,
    depth: 1 + Math.max(left?.depth ?? 0, right?.depth ?? 0),
  };
}

export function Tree({ root, playbackSpeed, step }: TreeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(([entry]) => {
      setViewportSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  if (!root) {
    return <p className="text-center text-gray-500">No tree to display.</p>;
  }

  const widths = new Map<TreeNode, number>();
  const { width: treeWidth, depth: treeDepth } = measureTree(root, widths);
  const contentWidth = treeWidth + TREE_PADDING * 2;
  const contentHeight =
    treeDepth * NODE_DIAMETER +
    (treeDepth - 1) * CONNECTOR_HEIGHT +
    TREE_PADDING * 2;
  const scale = Math.min(
    1,
    viewportSize.width > 0 ? viewportSize.width / contentWidth : 1,
    viewportSize.height > 0 ? viewportSize.height / contentHeight : 1,
  );
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
    <div
      ref={viewportRef}
      className="flex h-full min-h-0 w-full min-w-0 max-w-full items-center justify-center overflow-hidden"
    >
      <div
        className="relative shrink-0"
        style={{
          width: contentWidth * scale,
          height: contentHeight * scale,
        }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width: contentWidth,
            height: contentHeight,
            padding: TREE_PADDING,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {renderNode(root)}
        </div>
      </div>
    </div>
  );
}
