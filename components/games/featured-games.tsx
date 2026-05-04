"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button-custom";
import { getFeaturedGames } from "@/lib/data/games";

export default function FeaturedGames() {
  const featuredGames = getFeaturedGames();
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const selectedGame = featuredGames[selectedGameIndex];

  if (!selectedGame) return null;

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
            Featured <span className="text-primary">Games</span>
          </motion.h2>
          <p className="mt-4 text-muted-foreground">
            Explore our latest and most popular game releases.
          </p>
          <motion.div 
            className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Large Featured Game Card */}
        <motion.div
          key={selectedGame.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 relative aspect-video overflow-hidden rounded-xl shadow-2xl"
          whileHover={{ scale: 1.02 }}
        >
          {/* Video or Image Background */}
          {selectedGame.trailerUrl && selectedGame.status !== "Coming Soon" ? (
            <iframe
              src={selectedGame.trailerUrl}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Image
              src={selectedGame.coverImage}
              alt={selectedGame.title}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Game Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <motion.h3 
                  className="mb-4 font-montserrat text-3xl font-bold text-primary md:text-4xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {selectedGame.title}
                </motion.h3>
                
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {selectedGame.genres.map((genre) => (
                    <motion.span
                      key={genre}
                      className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-sm font-medium text-primary border border-primary/30"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 212, 0, 0.2)" }}
                    >
                      {genre}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* View Details Link */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link 
                href={`/games/${selectedGame.id}`}
                  className="group flex items-center gap-2 text-primary hover:text-secondary transition-all duration-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 hover:border-secondary/50"
                >
                <span className="hidden md:inline-block font-medium">See details</span>
                  <ArrowRight className="h-5 w-5 group-hover:text-secondary transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Smme Cards Row */}
        <motion.div 
          className="overflow-x-auto overflow-y-visible"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-4 pb-8 pt-4 px-4">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                  index === selectedGameIndex 
                    ? "ring-2 ring-primary shadow-xl shadow-primary/30 transform scale-105" 
                    : "hover:shadow-xl hover:shadow-secondary/30 hover:transform hover:scale-105"
                }`}
                onClick={() => setSelectedGameIndex(index)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-lg overflow-hidden">
                  <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Game Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-2 rounded-b-lg">
                  <h4 className={`text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                    index === selectedGameIndex 
                      ? "text-primary" 
                      : "text-white group-hover:text-secondary"
                  }`}>
                    {game.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View mes Link */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/games">
              <Button 
                variant="link" 
                size="lg"
                className="btn-secondary text-primary hover:text-secondary transition-all duration-300 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20"
              >
                View Games
              </Button>

              
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}