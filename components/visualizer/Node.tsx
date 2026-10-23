import type { CSSProperties } from "react";
import type { TreeNode } from "@/lib/types/tree";

type NodeProps = {
  node: TreeNode;
  playbackSpeed: number;
  isCurrent?: boolean;
  isVisited?: boolean;
  isQueued?: boolean;
  isFound?: boolean;
};

export function Node({
  node,
  playbackSpeed,
  isCurrent = false,
  isVisited = false,
  isQueued = false,
  isFound = false,
}: NodeProps) {
  const backgroundColor = isFound
    ? "rgb(45, 156, 130)"
    : isCurrent
      ? "rgb(52, 152, 219)"
      : isVisited
        ? "rgb(230, 126, 57)"
        : isQueued
          ? "rgb(107, 114, 128)"
          : "var(--bar)";
  const style: CSSProperties & { "--playback-delay": string } = {
    backgroundColor,
    "--playback-delay": `${150 - playbackSpeed}ms`,
  };
  const state = isFound
    ? ", target found"
    : isCurrent
      ? ", current"
      : isVisited
        ? ", visited"
        : isQueued
          ? ", queued"
          : "";

  return (
    <div
      className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-black/10 text-white font-semibold"
      style={style}
      role="img"
      aria-label={`Node ${node.value}${state}`}
    >
      {node.value}
    </div>
  );
}
