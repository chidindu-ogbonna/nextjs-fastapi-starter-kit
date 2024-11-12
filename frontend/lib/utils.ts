import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import countries from "i18n-iso-countries";
import { countryCodeEmoji } from "country-code-emoji";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export function countryToEmoji(countryName: string): {
  countryName: string;
  countryCode: string;
  emoji: string;
} {
  try {
    const countryCode = countries.getAlpha2Code(countryName, "en") || "";
    if (countryCode) {
      countryName = countries.getName(countryCode, "en") || countryName;
    }
    const emoji = countryCode ? countryCodeEmoji(countryCode) : "";
    return { countryName, countryCode, emoji };
  } catch (error) {
    console.error(`[countryToEmoji]: ${JSON.stringify(error)}`);
    return { countryName, countryCode: "", emoji: "" };
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter<T extends string>(
  str: T
): Capitalize<Lowercase<T>> {
  if (str.length === 0) return "" as Capitalize<Lowercase<T>>;
  return (str.charAt(0).toUpperCase() +
    str.slice(1).toLowerCase()) as Capitalize<Lowercase<T>>;
}

export function extractArrayJSONFromText<T>(text: string): {
  result?: T[];
  error?: string;
} {
  const match = text.match(/\[[\s\S]*?\]/);
  if (!match) {
    return { error: `No match found in text: ${text}` };
  }
  let jsonString = match[0].replace(/`{3}(json)?\s*|\s*`{3}/g, "").trim();
  // Remove trailing comma from the last object in the array
  jsonString = jsonString.replace(/,\s*(?=\s*\]$)/, "");
  const hasQuotedKeys = /\{\s*"[^"]+"\s*:/.test(jsonString);
  try {
    const jsonObject = hasQuotedKeys
      ? JSON.parse(jsonString)
      : JSON.parse(
          jsonString.replace(
            /(\w+):\s*("(?:[^"\\]|\\.)*"|[^,}\]]+)/g,
            '"$1": $2'
          )
        );
    if (
      Array.isArray(jsonObject) &&
      jsonObject.every((item) => typeof item === "object")
    ) {
      return { result: jsonObject as T[] };
    } else {
      return { error: "Extracted JSON is not an array of objects" };
    }
  } catch (error) {
    return { error: `Failed to parse JSON: ${JSON.stringify(error)}` };
  }
}

export const getView = (orientation: string) => {
  return orientation === "landscape" ? "horizontal" : "vertical";
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "status-completed";
    case "processing":
      return "status-processing";
    case "queued":
      return "status-queued";
    case "failed":
      return "status-failed";
    default:
      return "status-default";
  }
};

export function formatNairaAmount(amount: number | undefined): string {
  if (amount === undefined) return "N/A";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export const formatCurrency = ({
  amount,
  currency,
  locale
}: {
  amount: number;
  currency: string;
  locale: string;
}) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: currency.toLowerCase() === "usd" ? 2 : 0,
    maximumFractionDigits: currency.toLowerCase() === "usd" ? 2 : 0
  }).format(amount);
};

export interface DetailedCostPrice {
  currency: string;
  cost: number;
  costInSmallestUnit: number;
  breakdown: {
    baseCost: number;
    totalCost: number;
    creatorCost: number;
  };
  isTrial?: boolean;
}

export function estimateVideoDuration(
  text: string,
  wordsPerMinute: number = 200
): { durationInS: number; durationInMs: number } {
  if (!text.length) return { durationInS: 0, durationInMs: 0 };
  const wordCount = text.trim().split(/\s+/).length;
  const durationMinutes = wordCount / wordsPerMinute;
  const durationInS = Math.ceil(durationMinutes * 60);
  const durationInMs = durationInS * 1000;
  return { durationInS, durationInMs };
}
