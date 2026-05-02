/** @format */
// components/news/NewsDetailClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import NewsCard from '@/components/news/news-card';
import type { NewsPost } from '@/lib/data/news';

interface NewsDetailClientProps {
  post: NewsPost;
  relatedPosts: NewsPost[];
}

export default function NewsDetailClient({
  post,
  relatedPosts,
}: NewsDetailClientProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <MainLayout>
      <article className="py-16">
        <div className="container mx-auto px-4">
          {/* Back Link with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/news" className="inline-flex">
              <span className="relative inline-flex items-center justify-center rounded-full border border-primary/35 bg-card/45 px-6 py-3 text-base font-semibold text-primary shadow-lg shadow-primary/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/55 hover:text-secondary hover:shadow-secondary/20 md:px-8 md:py-4 md:text-lg">
                Back to News
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </span>
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {formattedDate}
              </span>
              <span className="text-sm text-muted-foreground">
                By {post.author}
              </span>
            </div>
            <h1 className="mb-6 font-montserrat text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mb-10 aspect-video w-full overflow-hidden rounded-lg"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:font-montserrat prose-headings:text-primary prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              <h2 className="mb-8 font-montserrat text-2xl font-bold text-primary md:text-3xl">
                More News
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {relatedPosts.map((rp) => (
                  <NewsCard key={rp.id} post={rp} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </MainLayout>
  );
}
