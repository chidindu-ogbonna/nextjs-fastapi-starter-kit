import { IconSquareLetterV } from "@tabler/icons-react";

export function LogoIcon({
  className = "",
  size = 3
}: {
  className?: string;
  size?: number;
}) {
  return (
    <IconSquareLetterV
      className={className}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    />
  );
}

export function LogoWord({
  iconSize = 2,
  textSize = "text-3xl"
}: {
  iconSize?: number;
  textSize?:
    | "text-3xl"
    | "text-2xl"
    | "text-xl"
    | "text-lg"
    | "text-base"
    | "text-sm"
    | "text-xs";
}) {
  return (
    <div className="flex items-center">
      <LogoIcon size={iconSize} />
      <h1 className={`${textSize} font-bold font-gt tracking-wide`}>idiyo</h1>
    </div>
  );
}
