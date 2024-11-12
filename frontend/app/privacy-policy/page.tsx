import React from "react";
import { Metadata } from "next";
import { LogoWord } from "@/components/icons";
import Link from "next/link";
import { PageFooter } from "app/page-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Vidiyo.ai",
  description: "Privacy Policy for Vidiyo.ai"
};

export default function PrivacyPolicy(): React.ReactElement {
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <LogoWord />
          </Link>
          <Link
            href="/app"
            className="text-primary text-sm hover:text-primary/80 transition-colors border px-2 py-2 rounded-md"
          >
            Back to App
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-card border p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
            Privacy Policy
          </h1>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Vidiyo.ai (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) respects
            your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            store the data you provide to us when using our services.
          </p>

          {[
            {
              title: "1. Information We Collect",
              content: (
                <>
                  <p className="mb-4">
                    We only collect the data that you voluntarily provide to us.
                    This includes:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>
                      <strong>Account Information:</strong> When you sign up or
                      use our services, you provide us with your name, email
                      address, and other contact information.
                    </li>
                    <li>
                      <strong>Script Data:</strong> Any text or script you
                      create or upload using our service.
                    </li>
                  </ul>
                </>
              )
            },
            {
              title: "2. How We Use Your Data",
              content: (
                <>
                  <p className="mb-4">
                    We use the information you provide for the following
                    purposes:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>
                      <strong>Providing Services:</strong> We store the data
                      used in creating scripts to deliver our service to you.
                    </li>
                    <li>
                      <strong>Service Improvement:</strong> If you use our
                      service, you consent to allow your content (such as
                      scripts) to be used to improve and train our AI models,
                      but we do not use your data for training if you explicitly
                      opt out.
                    </li>
                  </ul>
                </>
              )
            },
            {
              title: "3. Data Sharing",
              content: (
                <p className="mb-4">
                  We do not share your personal data with third parties except
                  when necessary to provide our services or as required by law.
                </p>
              )
            },
            {
              title: "4. Data Security",
              content: (
                <p className="mb-4">
                  We use commercially reasonable methods to secure the data you
                  provide, ensuring its protection from unauthorized access,
                  disclosure, or alteration.
                </p>
              )
            },
            {
              title: "5. User Rights",
              content: (
                <>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>
                      <strong>Access:</strong> Request access to your personal
                      information.
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal data from our systems.
                    </li>
                  </ul>
                </>
              )
            },
            {
              title: "6. Contact Us",
              content: (
                <>
                  <p className="mb-4">
                    If you have any questions regarding this Privacy Policy,
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
