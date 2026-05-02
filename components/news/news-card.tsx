"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { NewsPost } from "@/lib/data/news";

interface NewsCardProps {
  post: NewsPost;
  priority?: boolean;
}

export default function NewsCard({ post, priority = false }: NewsCardProps) {
  return (
    <Link href={`/news/${post.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="news-card group flex overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-lg">
      
    <div className="relative hidden w-1/3 sm:block overflow-hidden">
    <div className="relative h-full">
    <Image
      src={post.image}
      alt={post.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      priority={priority}
    />
  </div>
</div>
        
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center">
            <span className="text-sm font-medium text-primary">
              {format(new Date(post.date), "MMM d, yyyy")}
            </span>
          </div>
          
          <h3 className="news-title mb-2 font-montserrat text-xl font-bold text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{post.author}</span>
            <span className="read-more text-sm font-medium text-primary">
              Read more
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}