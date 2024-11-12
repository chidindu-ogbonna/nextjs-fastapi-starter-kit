"use client";

import { useEffect } from "react";
import { IconRefresh } from "@tabler/icons-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-accent-foreground mb-2">
          Omoooo! Something went wrong
        </h2>
        <p className="text-accent-foreground/50 mb-4">Please retry.</p>
        <button
          onClick={reset}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md text-primary-foreground bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <IconRefresh className="mr-2 h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
