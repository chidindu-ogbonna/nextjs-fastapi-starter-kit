import { cn } from "@/lib/utils";

export function Spinner({
  className,
  size = "h-5 w-5"
}: {
  className?: string;
  size?: string;
}) {
  return (
    <svg
      className={cn("animate-spin text-current", size, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M12 2a10 10 0 0110 10h-2a8 8 0 00-8-8V2z"
      ></path>
    </svg>
  );
}
