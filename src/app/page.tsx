import type { Metadata } from "next";
import { HomeScreen } from "@/screens/home/home-screen";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_TITLE,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_AUTHOR,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd, websiteJsonLd]),
        }}
      />
      <HomeScreen />
    </>
  );
}
