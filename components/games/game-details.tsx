"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button-custom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import GameCard from "@/components/games/game-card";
import { Game } from "@/lib/data/games";

interface GameDetailsProps {
  game: Game;
  relatedGames: Game[];
}

export default function GameDetails({ game, relatedGames }: GameDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-card py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <h1 className="mb-2 font-montserrat text-3xl font-bold text-secondary md:text-4xl">
                {game.title}
              </h1>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="mb-6 text-lg text-muted-foreground">{game.tagline}</p>
              
              {game.status !== "Coming Soon" && (
                <div className="flex flex-wrap gap-4">
                  <Button size="lg">Play Now</Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="lg">
                        Download
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Download {game.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                        {game.downloadLinks?.playStore && (
                          <a
                            href={game.downloadLinks.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg bg-muted p-4 text-center transition-colors hover:bg-primary hover:text-background"
                          >
                            <span className="text-sm font-medium">Play Store</span>
                          </a>
                        )}
                        
                        {game.downloadLinks?.itchIo && (
                          <a
                            href={game.downloadLinks.itchIo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg bg-muted p-4 text-center transition-colors hover:bg-primary hover:text-background"
                          >
                            <span className="text-sm font-medium">Itch.io</span>
                          </a>
                        )}
                        
                        {game.downloadLinks?.uptodown && (
                          <a
                            href={game.downloadLinks.uptodown}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg bg-muted p-4 text-center transition-colors hover:bg-primary hover:text-background"
                          >
                            <span className="text-sm font-medium">Uptodown</span>
                          </a>
                        )}
                        
                        {game.downloadLinks?.myApp && (
                          <a
                            href={game.downloadLinks.myApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg bg-muted p-4 text-center transition-colors hover:bg-primary hover:text-background"
                          >
                            <span className="text-sm font-medium">My App</span>
                          </a>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Game Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 font-montserrat text-2xl font-bold text-primary md:text-3xl">
              Game Description
            </h2>
            <p className="mb-8 text-muted-foreground">{game.description}</p>
            
            {game.releaseDate && (
              <div className="mb-4">
                <span className="font-semibold text-foreground">Release Date: </span>
                <span className="text-muted-foreground">
                  {new Date(game.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            
            {game.platforms && game.platforms.length > 0 && (
              <div className="mb-8">
                <span className="font-semibold text-foreground">Platforms: </span>
                <span className="text-muted-foreground">
                  {game.platforms.join(", ")}
                </span>
              </div>
            )}
          </motion.div>

          {/* Screenshots */}
          {game.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="mb-6 font-montserrat text-2xl font-bold text-primary md:text-3xl">
                Screenshots
              </h2>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {game.screenshots.map((screenshot, index) => (
                    <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                      <div 
                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image
                          src={screenshot}
                          alt={`${game.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              
              {selectedImageIndex !== null && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                  onClick={() => setSelectedImageIndex(null)}
                >
                  <div className="relative mx-4 max-h-[90vh] max-w-[90vw]">
                    <button
                      onClick={() => setSelectedImageIndex(null)}
                      className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-card text-primary hover:bg-secondary hover:text-white"
                      aria-label="Close fullscreen image"
                    >
                      <X size={18} />
                    </button>
                    <Image
                      src={game.screenshots[selectedImageIndex]}
                      alt={`${game.title} screenshot ${selectedImageIndex + 1}`}
                      width={1200}
                      height={675}
                      className="max-h-[90vh] rounded-lg object-contain"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Related Games */}
          {relatedGames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="mb-6 font-montserrat text-2xl font-bold text-primary md:text-3xl">
                Related Games
              </h2>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedGames.map((relatedGame) => (
                  <GameCard key={relatedGame.id} game={relatedGame} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}