import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { LogoWord } from "@/components/icons";
import { headers } from "next/headers";

export default function NotFound() {
  const headersList = headers();
  const referer = headersList.get("referer") || "/";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="absolute top-0 left-0 w-full py-10 px-4">
        <Link href="/">
          <LogoWord />
        </Link>
      </div>
      <h1 className="text-8xl font-bold font-gt mb-8">404</h1>
      <h2 className="text-2xl text-muted-foreground mb-8">
        Oops! Page Not Found
      </h2>
      <div className="flex gap-x-4 w-full mx-auto max-w-md items-center justify-center">
        <Link href={referer} passHref>
          <Button
            variant="default"
            icon={<IconArrowLeft className="h-5 w-5" />}
            className="text-sm flex items-center hover:bg-primary/90 transition-colors"
          >
            Go Back
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button
            variant="secondary"
            icon={<IconHome className="h-5 w-5" />}
            className="text-sm"
          >
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
