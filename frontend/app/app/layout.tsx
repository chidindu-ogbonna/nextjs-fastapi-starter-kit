"use client";
import {
  IconSettings,
  IconMenu2,
  IconLogout2,
  IconBrandWhatsapp,
  IconCheck,
  IconVideoPlus,
  IconDeviceTvOld,
  IconUser
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Providers from "./providers";
import { useAuth } from "contexts/auth-context";
import type { User } from "firebase/auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { clientAuth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { createContext, Suspense, useContext, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { LogoWord } from "@/components/icons";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Brand {
  id: string;
  name: string;
  isOwner: boolean;
}

const ThemeToggle = dynamic(() => import("./theme-toggle"), { ssr: false });

const NavItem = ({
  children,
  href,
  label,
  onClick,
  target,
  rel
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}) => {
  return (
    <Link href={href} onClick={onClick} target={target} rel={rel}>
      {children}
    </Link>
  );
};

const DashboardContext = createContext<{
  user: User | null;
  brands: Brand[] | null;
  activeBrand: Brand | null;
  isLoading: boolean;
} | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
}

function DesktopNav() {
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await clientAuth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r sm:w-1/5 bg-background sm:flex">
      <nav className="flex flex-col items-center w-3/4 gap-2 px-2 mx-auto sm:py-5">
        <Link href="/" className="flex items-center justify-start w-full mb-3">
          <LogoWord iconSize={1.5} textSize="text-xl" />
        </Link>
        <UserMenu />
        <NavItem href="/app" label="Create Video">
          <IconVideoPlus className="w-5 h-5" />
        </NavItem>
        <NavItem href="/app/videos" label="Videos">
          <IconDeviceTvOld className="w-5 h-5" />
        </NavItem>
        <NavItem href="/app/settings" label="Settings">
          <IconSettings className="w-5 h-5" />
        </NavItem>
      </nav>
      <nav className="flex flex-col items-center w-3/4 gap-4 px-2 mx-auto mt-auto sm:py-5">
        <ThemeToggle />

        <NavItem
          href="https://wa.me/+2348136260795"
          label="Customer Support"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandWhatsapp className="w-5 h-5" />
        </NavItem>

        <NavItem href="#" label="Logout" onClick={handleLogout}>
          <IconLogout2 className="w-5 h-5" />
        </NavItem>
      </nav>
    </aside>
  );
}

function MobileNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await clientAuth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavItemClick = (href: string, callback?: () => void) => {
    setOpen(false);
    if (callback) {
      callback();
    } else {
      router.push(href);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="sm:hidden">
        <LogoWord iconSize={1.5} textSize="text-lg" />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <IconMenu2 className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between pt-12 pb-4 sm:max-w-xs"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation links and authentication options
          </SheetDescription>

          <nav className="grid gap-3 text-lg font-medium">
            <UserMenu />

            <div className="mt-3"></div>

            <NavItem
              href="/app"
              label="Create Video"
              onClick={() => handleNavItemClick("/app")}
            >
              <IconVideoPlus className="w-5 h-5" />
            </NavItem>

            <NavItem
              href="/app/videos"
              label="Videos"
              onClick={() => handleNavItemClick("/app/videos")}
            >
              <IconDeviceTvOld className="w-5 h-5" />
            </NavItem>

            <NavItem
              href="/app/settings"
              label="Settings"
              onClick={() => handleNavItemClick("/app/settings")}
            >
              <IconSettings className="w-5 h-5" />
            </NavItem>
          </nav>
          <nav className="grid gap-3 text-lg font-medium">
            <ThemeToggle />

            <NavItem
              href="https://wa.me/+2348136260795"
              label="Customer Support"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleNavItemClick("https://wa.me/+2348136260795")}
            >
              <IconBrandWhatsapp className="w-5 h-5" />
            </NavItem>

            <NavItem href="#" label="Logout" onClick={handleLogout}>
              <IconLogout2 className="w-5 h-5" />
            </NavItem>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function UserMenu() {
  const { user, brands, activeBrand, isLoading } = useDashboard();

  const UserLoadingState = () => {
    return (
      <div className="flex gap-x-2 w-full">
        <div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-full h-4 rounded-md" />
        </div>
      </div>
    );
  };

  const UserNoAvatar = () => {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
        <IconUser className="w-5 h-5 text-secondary-foreground" />
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <div>
          <div className="flex items-center justify-start w-full px-2 py-2 border rounded-md cursor-pointer border-input gap-x-2">
            {!user ? (
              <UserLoadingState />
            ) : (
              <>
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                ) : (
                  <UserNoAvatar />
                )}
                <div className="flex flex-col text-xs font-medium">
                  <span className="text-muted-foreground">
                    {user?.displayName || user?.email?.split("@")[0] || ""}
                  </span>
                  <span>{activeBrand?.name}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Brands</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <DropdownMenuItem className="flex flex-col items-center justify-center">
            <Spinner className="w-6 h-6 my-2" />
            <span className="text-xs text-muted-foreground/50">
              Loading brands...
            </span>
          </DropdownMenuItem>
        ) : (
          brands?.map((brand) => (
            <DropdownMenuItem
              key={brand.id}
              className="flex items-center justify-start cursor-pointer"
            >
              {brand.name}
              {brand.isOwner && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (Owner)
                </span>
              )}
              {brand.id === activeBrand?.id && (
                <IconCheck className="w-4 h-4 mx-2 text-primary" />
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DashboardContext.Provider value={{ user, brands, activeBrand, isLoading }}>
      <Providers>
        <Suspense fallback={<div></div>}>
          <main className="flex flex-col w-full min-h-screen ml-auto sm:w-4/5 bg-muted/40">
            <DesktopNav />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
              <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <MobileNav />
              </header>
              <main className="flex-1 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </main>
        </Suspense>
      </Providers>
    </DashboardContext.Provider>
  );
}
