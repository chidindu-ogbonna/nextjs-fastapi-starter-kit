import React from "react";
import { LogoWord } from "@/components/icons";
import dynamic from "next/dynamic";
import { PageFooter } from "./page-footer";
import { defaultMetadata } from "@/lib/metadata";

const AuthButtons = dynamic(() => import("./auth-buttons"), {
  ssr: false
});
const HeaderLinks = dynamic(() => import("./header-links"), {
  ssr: false
});

export const metadata = { ...defaultMetadata };

export default async function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b text-foreground bg-background">
      <div className="fixed inset-0 bg-center bg-no-repeat bg-cover bg-hero-pattern"></div>

      <div className="relative z-10">
        <header className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <LogoWord />
          <div className="hidden gap-4 sm:flex">
            <HeaderLinks />
          </div>

          <div className="hidden sm:block">
            <AuthButtons />
          </div>
        </header>

        <main className="px-4 py-10 mx-auto text-center max-w-7xl md:py-16 sm:px-6 lg:px-8">
          <div>LOOK BEYOND THE HORIZON and Africa Hate it here</div>
        </main>
      </div>

      <PageFooter />
    </div>
  );
}
