/** @format */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Game } from '@/lib/data/games';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const isComingSoon = game.status === 'Coming Soon';

  const cardClassName = `game-card group block h-full overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/80 shadow-xl transition-all duration-500 border border-white/10 ${
    !isComingSoon ? 'cursor-pointer hover:shadow-2xl' : 'opacity-75'
  } ${isComingSoon ? 'coming-soon' : ''}`;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={!isComingSoon ? { y: -5 } : undefined}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${
            !isComingSoon ? 'group-hover:scale-115' : ''
          }`}
          priority={priority}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute right-3 top-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Badge
              variant={
                game.status === 'Released'
                  ? 'default'
                  : game.status === 'Development'
                  ? 'secondary'
                  : 'outline'
              }
              className={`backdrop-blur-sm transition-all duration-300 border border-white/20 ${
                isComingSoon
                  ? 'group-hover:bg-secondary group-hover:text-background'
                  : ''
              }`}
            >
              {game.status}
            </Badge>
          </motion.div>
        </div>
      </div>

      <div className="p-5">
        <motion.h3
          className={`game-title mb-2 font-montserrat text-xl font-bold text-primary transition-colors duration-300 ${
            !isComingSoon ? 'group-hover:text-secondary' : ''
          }`}
          whileHover={!isComingSoon ? { scale: 1.02 } : undefined}
        >
          {game.title}
        </motion.h3>
        <p className="mb-4 text-sm text-muted-foreground">{game.tagline}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {game.genres.map((genre, index) => (
            <motion.div
              key={genre}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge
                variant="outline"
                className="rounded-full bg-muted/50 text-xs font-medium text-muted-foreground border-primary/20 hover:border-primary/40 transition-colors duration-300"
              >
                {genre}
              </Badge>
            </motion.div>
          ))}
        </div>
        {!isComingSoon && (
          <motion.span
            className="game-details-link inline-flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </motion.span>
        )}
      </div>
    </motion.div>
  );

  // Render: Coming Soon = static motion.div; Released/others = Link wrapping the card
  if (isComingSoon) {
    return <motion.div className={cardClassName}>{inner}</motion.div>;
  }

  return (
    <Link href={`/games/${game.id}`} className={cardClassName}>
      {inner}
    </Link>
  );
}
