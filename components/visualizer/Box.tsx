import type { CSSProperties } from "react";

type BoxProps = {
  label: string | number;
  playbackSpeed: number;
  isHighLighted?: boolean;
  isActive?: boolean;
  isFound?: boolean;
  isDiscarded?: boolean;
  compact?: boolean;
};

export function Box({
  label,
  playbackSpeed,
  isHighLighted,
  isActive,
  isFound,
  isDiscarded,
  compact = false,
}: BoxProps) {
  const backgroundColor = isFound
      ? "rgb(45, 156, 130)"
      : isActive
        ? "rgb(52, 152, 219)"
        : isDiscarded
          ? "rgb(75, 85, 99)"
        : isHighLighted
          ? "rgb(230, 126, 57)"
          : "var(--bar)";
  const style: CSSProperties & { "--playback-delay": string } = {
    backgroundColor,
    "--playback-delay": `${150 - playbackSpeed}ms`,
  };

  return (
    <div
      className={`flex h-14 shrink-0 items-center justify-center rounded-lg border border-black/10 px-2 text-white font-semibold ${
        compact ? "min-w-0 flex-1 text-xs" : "min-w-[65px] text-xl"
      }`}
      style={style}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${label}${isActive ? ", active index" : ""}${isDiscarded ? ", cut off" : ""}${isFound ? ", target found" : ""}`}
    >
      <span className="truncate" title={String(label)}>{label}</span>
    </div>
  );
}
