import Link from "next/link";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconMail
} from "@tabler/icons-react";
import { LogoWord } from "@/components/icons";

export const PageFooter = () => {
  return (
    <footer className="relative z-10 px-4 py-8 mt-20 bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <LogoWord />
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-8 mt-12 border-t">
          <div className="flex flex-col items-start mb-6 md:mb-0">
            <h3 className="font-medium mb-2">Contact</h3>
            <Link
              href="mailto:promise@vidiyo.ai"
              className="flex items-center text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconMail className="w-5 h-5 mr-2" />
              promise@vidiyo.ai
            </Link>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h3 className="font-medium mb-2 md:self-end">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                {
                  href: "https://www.linkedin.com/company/vidiyo-ai",
                  icon: IconBrandLinkedin,
                  label: "LinkedIn"
                },
                {
                  href: "https://twitter.com/vidiyo_ai",
                  icon: IconBrandX,
                  label: "X"
                },
                {
                  href: "https://www.youtube.com/@vidiyo.ai",
                  icon: IconBrandYoutube,
                  label: "YouTube"
                },
                {
                  href: "https://www.instagram.com/vidiyo.ai",
                  icon: IconBrandInstagram,
                  label: "Instagram"
                },
                {
                  href: "https://www.tiktok.com/@vidiyo.ai",
                  icon: IconBrandTiktok,
                  label: "TikTok"
                }
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-2 mt-8 md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex flex-row items-center">
            <Link
              href="/terms-of-service"
              className="hover:underline"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <span className="mx-2">•</span>
            <Link
              href="/privacy-policy"
              className="hover:underline"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </div>

          <p>
            Copyright © {new Date().getFullYear()} Vidiyo.ai, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
