"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button-custom";
import NewsCard from "@/components/news/news-card";
import MainLayout from "@/components/layout/main-layout";
import { newsCategories, getLatestNews, getNewsByCategory, NewsCategory } from "@/lib/data/news";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "All">("All");
  const featuredNews = getLatestNews(1)[0];
  const newsList = activeCategory === "All" 
    ? getLatestNews().filter(post => post.id !== featuredNews.id) 
    : getNewsByCategory(activeCategory as NewsCategory).filter(post => post.id !== featuredNews.id);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-card py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h1 className="font-montserrat text-4xl font-bold text-foreground md:text-5xl">
              Latest <span className="text-primary">News</span>
            </h1>
            <div className="mx-auto mt-2 h-1 w-20 bg-secondary"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-lg bg-muted shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch">
              <div className="relative hidden min-h-[320px] md:block md:min-h-[420px]">
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="mb-2 inline-block rounded-full bg-card px-3 py-1 text-xs font-medium text-primary">
                  {featuredNews.category}
                </span>
                
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-primary md:text-3xl">
                  {featuredNews.title}
                </h2>
                
                <p className="mb-6 text-muted-foreground">
                  {featuredNews.excerpt}
                </p>
                
                <div className="mb-6 flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(featuredNews.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  
                  <span className="text-sm text-muted-foreground">
                    By {featuredNews.author}
                  </span>
                </div>
                
                <Link href={`/news/${featuredNews.id}`}>
                  <Button>Read Full Article</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 overflow-x-auto"
          >
            <div className="flex min-w-max space-x-4 pb-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`relative text-sm font-medium transition-colors ${
                  activeCategory === "All"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                All
                {activeCategory === "All" && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                    initial={{ left: 0 }}
                    animate={{ left: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
              
              {newsCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                      initial={{ left: 0 }}
                      animate={{ left: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 gap-8">
            {newsList.map((post, index) => (
              <NewsCard key={post.id} post={post} priority={index < 2} />
            ))}
          </div>
          
          {newsList.length === 0 && (
            <div className="rounded-lg bg-card p-8 text-center shadow-lg">
              <p className="text-lg text-muted-foreground">
                No news articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}