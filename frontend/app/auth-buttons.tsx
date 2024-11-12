"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { useAuth } from "../contexts/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4 md:gap-2 md:flex-row ">
      <Link href={user ? "/app" : "/login"} className="w-full md:w-auto">
        <Button
          className="w-full px-6 rounded-full"
          size={"default"}
          variant={"default"}
        >
          {user ? "Go to Dashboard" : "Log in"}
        </Button>
      </Link>
      <Link href="/app">
        <Button
          className="w-full rounded-full"
          size={"default"}
          variant={"secondary"}
        >
          Get Started
          <IconArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}
