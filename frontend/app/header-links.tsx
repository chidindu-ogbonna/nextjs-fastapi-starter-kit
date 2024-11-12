"use client";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomepageLink = ({
  name,
  sectionId,
  router,
  onLinkClick
}: {
  name: string;
  sectionId: string;
  router: AppRouterInstance;
  onLinkClick?: () => void;
}) => {
  useEffect(() => {
    const targetId = sectionId.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          router.push(sectionId, { scroll: false });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, [sectionId, router]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = sectionId.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    if (onLinkClick) {
      onLinkClick();
    }
  };
  return (
    <Link
      href={""}
      onClick={handleClick}
      className={`px-4 py-2 md:py-1 text-sm border border-input rounded-full cursor-pointer transition-colors duration-300 hover:bg-secondary hover:text-secondary-foreground`}
    >
      {name}
    </Link>
  );
};

export default function HeaderLinks({
  onLinkClick
}: {
  onLinkClick?: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* <HomepageLink
        name="How it works"
        sectionId="#how-it-works"
        router={router}
        onLinkClick={onLinkClick}
      /> */}
      <HomepageLink
        name="Features"
        sectionId="#features"
        router={router}
        onLinkClick={onLinkClick}
      />
      <HomepageLink
        name="Pricing"
        sectionId="#pricing"
        router={router}
        onLinkClick={onLinkClick}
      />
    </div>
  );
}
