import { cn } from "@/lib/utils";
import "./globals.css";
import "./typography.css";

import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AuthProvider } from "contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "contexts/react-query-context";
import { ThemeProvider } from "contexts/theme-context";
import { defaultMetadata } from "@/lib/metadata";

export const metadata = {
  ...defaultMetadata,
  title: "Dashboard | Vidiyo"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              GeistSans.variable,
              GeistMono.variable,
              "flex min-h-screen w-full flex-col"
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
          <Analytics />
        </html>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
