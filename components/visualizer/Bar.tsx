import type { CSSProperties } from "react";

type BarProps = {
  height: number;
  label: string | number;
  playbackSpeed: number;
  isHighLighted?: boolean;
  isActive?: boolean;
  isSorted?: boolean;
  compact?: boolean;
};

export function Bar({
  height,
  label,
  playbackSpeed,
  isHighLighted,
  isActive,
  isSorted,
  compact = false,
}: BarProps) {
  const backgroundColor = isActive
    ? "rgb(52, 152, 219)"
    : isSorted
      ? "rgb(45, 156, 130)"
      : isHighLighted
        ? "rgb(230, 126, 57)"
        : "var(--bar)";
  const style: CSSProperties & { "--playback-delay": string } = {
    height: height * 20 + 5,
    backgroundColor,
    "--playback-delay": `${150 - playbackSpeed}ms`,
  };

  return (
    <div
      className={`rounded-t-lg flex items-center justify-center overflow-hidden transition-[height] ease-in-out delay-[var(--playback-delay)] text-white font-semibold ${
        compact ? "min-w-0 flex-1 text-xs" : "w-[65px] text-xl"
      }`}
      style={style}
    >
      <span className="truncate">{label}</span>
    </div>
  );
}
