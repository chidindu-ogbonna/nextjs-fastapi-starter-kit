import React from "react";
import { Metadata } from "next";
import { LogoWord } from "@/components/icons";
import Link from "next/link";
import { PageFooter } from "app/page-footer";

export const metadata: Metadata = {
  title: "Terms of Service | Vidiyo.ai",
  description: "Terms of Service for Vidiyo.ai"
};

export default function TermsOfService(): React.ReactElement {
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <LogoWord />
          </Link>
          <Link
            href="/app"
            className="text-sm text-primary hover:text-primary/80 transition-colors border px-2 py-2 rounded-md"
          >
            Back to App
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-card border p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
            Terms of Service
          </h1>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Welcome to Vidiyo.ai (&quot;we,&quot; &quot;us,&quot;
            &quot;our&quot;). By using our website and services, you
            (&quot;user&quot; or &quot;you&quot;) agree to comply with the
            following Terms of Service.
          </p>

          {[
            {
              title: "1. Acceptance of Terms",
              content: (
                <p className="mb-4">
                  By accessing or using our services, you agree to these Terms
                  of Service, including any future modifications. If you do not
                  agree to these terms, you should discontinue using our
                  services.
                </p>
              )
            },
            {
              title: "2. Use of Services",
              content: (
                <>
                  <p className="mb-4">
                    Vidiyo.ai provides AI-powered services to help you create
                    scripts. By using our service, you agree to:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>
                      Provide accurate and complete information when creating
                      your account.
                    </li>
                    <li>Use the service for lawful purposes only.</li>
                    <li>
                      Not engage in any behavior that may damage or disrupt our
                      services.
                    </li>
                  </ul>
                </>
              )
            },
            {
              title: "3. Content Ownership and License",
              content: (
                <ul className="list-disc pl-8 mb-4 space-y-2">
                  <li>
                    <strong>Your Content:</strong> You retain ownership of any
                    content (including scripts) that you create or upload using
                    our services.
                  </li>
                  <li>
                    <strong>License to Improve AI:</strong> By using our
                    service, you grant us a non-exclusive license to use the
                    content you provide for the purpose of improving our AI
                    models. If you do not wish for your content to be used for
                    this purpose, you can notify us by emailing
                    promise@vidiyo.ai.
                  </li>
                </ul>
              )
            },
            {
              title: "4. Data Storage",
              content: (
                <p className="mb-4">
                  We only store the data that you provide to us, specifically
                  the data used in creating scripts. We do not store any
                  additional personal data unless you choose to provide it.
                </p>
              )
            },
            {
              title: "5. Account Termination",
              content: (
                <p className="mb-4">
                  We reserve the right to suspend or terminate your access to
                  our services at our discretion, including for violations of
                  these Terms of Service.
                </p>
              )
            },
            {
              title: "6. Limitation of Liability",
              content: (
                <p className="mb-4">
                  Vidiyo.ai is provided &quot;as is,&quot; and we disclaim all
                  warranties. We are not liable for any damages resulting from
                  the use of our services, to the maximum extent permitted by
                  law.
                </p>
              )
            },
            {
              title: "7. Changes to Terms",
              content: (
                <p className="mb-4">
                  We may modify these Terms of Service at any time. Continued
                  use of our services after any changes constitutes acceptance
                  of the revised terms.
                </p>
              )
            },
            {
              title: "8. Governing Law",
              content: (
                <p className="mb-4">
                  These Terms of Service are governed by and construed in
                  accordance with the laws of [Insert Jurisdiction].
                </p>
              )
            },
            {
              title: "9. Contact Us",
              content: (
                <>
                  <p className="mb-4">
                    If you have any questions regarding these Terms of Service,
                    please contact us at:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>
                      <strong>Name:</strong> Promise Ogbonna
                    </li>
                    <li>
                      <strong>Email:</strong> promise@vidiyo.ai
                    </li>
                  </ul>
                </>
              )
            }
          ].map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}

          <p className="text-sm text-muted-foreground mt-12 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
