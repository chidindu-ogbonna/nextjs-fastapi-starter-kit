"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <NextThemesProvider
      forcedTheme={isHomePage ? "light" : undefined}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
