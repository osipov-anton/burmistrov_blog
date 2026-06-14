import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostScreen } from "@/screens/post/post-screen";
import { posts } from "@/screens/post/data";
import { SITE_AUTHOR, articleJsonLd } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function resolvePost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = resolvePost(slug);

  if (!post) {
    return {};
  }

  const { article } = post;
  const canonical = `/post/${post.slug}`;

  return {
    title: `${article.title} — ${SITE_AUTHOR}`,
    description: article.subtitle,
    authors: [{ name: SITE_AUTHOR }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
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
}

export default async function PostBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = resolvePost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.article.title,
              subtitle: post.article.subtitle,
              slug: post.slug,
            }),
          ),
        }}
      />
      <PostScreen postId={post.id} />
    </>
  );
}
