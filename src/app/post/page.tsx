import type { Metadata } from "next";
import { PostScreen } from "@/screens/post/post-screen";
import { currentPost } from "@/screens/post/data";
import { SITE_AUTHOR, articleJsonLd } from "@/lib/site";

const { article } = currentPost;

export const metadata: Metadata = {
  title: `${article.title} — ${SITE_AUTHOR}`,
  description: article.subtitle,
  authors: [{ name: SITE_AUTHOR }],
  alternates: { canonical: `/post/${currentPost.slug}` },
  openGraph: {
    type: "article",
    url: `/post/${currentPost.slug}`,
    title: article.title,
    description: article.subtitle,
    siteName: SITE_AUTHOR,
    authors: [SITE_AUTHOR],
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.subtitle,
    creator: SITE_AUTHOR,
  },
};

export default function PostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: article.title,
              subtitle: article.subtitle,
              slug: currentPost.slug,
            }),
          ),
        }}
      />
      <PostScreen />
    </>
  );
}
