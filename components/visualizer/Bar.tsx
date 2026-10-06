import type { CSSProperties } from "react";

type BarProps = {
  height: number;
  label: string | number;
  playbackSpeed: number;
  isHighLighted?: boolean;
  isActive?: boolean;
  isSorted?: boolean;
};

export function Bar({
  height,
  label,
  playbackSpeed,
  isHighLighted,
  isActive,
  isSorted,
}: BarProps) {
  const backgroundColor = isActive
    ? "rgb(52, 152, 219)"
    : isSorted
      ? "rgb(45, 156, 130)"
      : isHighLighted
        ? "rgb(230, 126, 57)"
        : "rgb(90, 103, 130)";
  const style: CSSProperties & { "--playback-delay": string } = {
    height: height * 20,
    backgroundColor,
    "--playback-delay": `${150 - playbackSpeed}ms`,
  };

  return (
    <div
      className="flex w-[50px] items-center justify-center transition-[height] ease-in-out delay-[var(--playback-delay)]"
      style={style}
    >
      <span className="text-xl">{label}</span>
    </div>
  );
}
