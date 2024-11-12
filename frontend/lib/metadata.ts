import { type Metadata } from "next";

const title = "Automated Content Creation with AI - Vidiyo";
const description =
  "Vidiyo.ai enables brands and business to create content without the need for expensive creation using AI.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://vidiyo.ai"),
  title,
  description,
  applicationName: "Vidiyo",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/icons/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icons/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/icons/favicon-16x16.png"
    },
    { rel: "manifest", url: "/icons/site.webmanifest" },
    { rel: "mask-icon", url: "/icons/safari-pinned-tab.svg", color: "#5bbad5" },
    { rel: "shortcut icon", url: "/favicon.ico" }
  ],
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-config": "/icons/browserconfig.xml",
    "theme-color": "#ffffff",
    "mobile-web-app-capable": "yes"
  },
  appleWebApp: {
    title,
    startupImage: "/icons/apple-touch-icon.png",
    capable: true,
    statusBarStyle: "black-translucent"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@vidiyo.ai",
    images: "/landing-page-image.png"
  },
  openGraph: {
    type: "website",
    url: "https://vidiyo.ai",
    siteName: "Vidiyo",
    title,
    description,
    images: "/landing-page-image.png"
  }
};
