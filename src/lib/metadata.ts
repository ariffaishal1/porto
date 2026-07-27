import { Metadata } from "next";
import { profileData } from "@/data/profile";

export function generateBaseMetadata({
  title,
  description,
  path = "",
  ogImage = "/og-image.jpg",
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const siteName = profileData.name;
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} | ${profileData.role}`;
  const metaDescription = description || profileData.shortBio;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arif-faishal-nugraha.vercel.app";
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description: metaDescription,
    authors: [{ name: profileData.name }],
    creator: profileData.name,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${profileData.role}`,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
