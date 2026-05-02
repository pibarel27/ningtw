/** @format */
// app/news/[id]/page.tsx

import { notFound } from 'next/navigation';
import type { NewsPost } from '@/lib/data/news';
import { getNewsById, getLatestNews } from '@/lib/data/news';
import NewsDetailClient from '@/components/news/NewsDetailClient';

// This tells Next to statically generate one page per news ID
export async function generateStaticParams() {
  const posts = getLatestNews(); // your array of NewsPost
  return posts.map((post) => ({ id: post.id }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const post = getNewsById(params.id);
  if (!post) return notFound();
  const relatedPosts = getLatestNews(3).filter((p) => p.id !== params.id);

  // Render the client component that has all the animations/UI
  return <NewsDetailClient post={post} relatedPosts={relatedPosts} />;
}
