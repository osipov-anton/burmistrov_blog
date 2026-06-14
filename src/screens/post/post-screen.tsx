import { type ComponentType } from "react";
import { currentPostId, getPostById, type PostConfig, type PostId, type PostLayout } from "./data";
import { AiVsFatPost } from "./posts/ai-vs-fat-post";
import { FromResentmentPost } from "./posts/from-resentment-post";
import { WellnessEconomyPost } from "./posts/wellness-economy-post";

const postLayouts: Record<PostLayout, ComponentType<{ post: PostConfig }>> = {
  "wellness-economy": WellnessEconomyPost,
  "ai-vs-fat": AiVsFatPost,
  "from-resentment": FromResentmentPost,
};

export function PostScreen({ postId = currentPostId }: { postId?: PostId } = {}) {
  const post = getPostById(postId);
  const Layout = postLayouts[post.layout];

  return <Layout post={post} />;
}
