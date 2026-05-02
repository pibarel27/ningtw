"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NewsCard from "@/components/news/news-card";
import { Button } from "@/components/ui/button-custom";
import { getLatestNews } from "@/lib/data/news";

export default function LatestNews() {
  const latestNews = getLatestNews(3);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="font-montserrat text-3xl font-bold text-foreground md:text-4xl"
            whileHover={{ scale: 1.02 }}
          >
            Latest <span className="text-primary">News</span>
          </motion.h2>
          <p className="mt-4 text-muted-foreground">
            Stay updated with our latest announcements and developments.
          </p>
          <motion.div 
            className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {latestNews.map((post, index) => (
            <NewsCard key={post.id} post={post} priority={index === 0} />
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/news">
              <Button 
                variant="link" 
                size="lg"
                className="transition-all duration-300 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 text-primary hover:text-secondary"
              >
                Show More News
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}