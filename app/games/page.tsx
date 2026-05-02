/** @format */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import GameCard from '@/components/games/game-card';
import { games, GameGenre } from '@/lib/data/games';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button-custom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const allGenres: GameGenre[] = [
  'Strategy',
  'Puzzle',
  'Educational',
  'Multiplayer',
  'Survival',
  'Open-world',
  'Fantasy',
  'MMO',
];

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<GameGenre | 'All'>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredGames = games.filter((game) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      game.title.toLowerCase().includes(q) ||
      game.tagline.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q);

    const matchesGenre =
      selectedGenre === 'All' ||
      game.genres.includes(selectedGenre as GameGenre);

    return matchesSearch && matchesGenre;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedGenre !== 'All';

  return (
    <MainLayout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h1 className="font-montserrat text-4xl font-bold text-foreground md:text-5xl">
              Our <span className="text-primary">Games</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Explore our collection of immersive puzzles, strategic challenges,
              and innovative gaming experiences.
            </p>
            <div className="mx-auto mt-2 h-1 w-20 bg-secondary"></div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input pl-10"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex items-center gap-3">
                {/* Genre Filter Dropdown */}
                <DropdownMenu
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-card border-muted hover:border-primary transition-all duration-300"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {selectedGenre === 'All' ? 'All Genres' : selectedGenre}
                      </span>
                      <span className="sm:hidden">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-card border-muted"
                  >
                    <DropdownMenuItem
                      onClick={() => setSelectedGenre('All')}
                      className={`cursor-pointer transition-colors ${
                        selectedGenre === 'All'
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted hover:text-primary'
                      }`}
                    >
                      All Genres
                    </DropdownMenuItem>
                    {allGenres.map((genre) => (
                      <DropdownMenuItem
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`cursor-pointer transition-colors ${
                          selectedGenre === genre
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted hover:text-primary'
                        }`}
                      >
                        {genre}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <X className="h-4 w-4" />
                      Clear
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedGenre !== 'All' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                    Genre: {selectedGenre}
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-sm text-muted-foreground">
              {filteredGames.length === 0
                ? 'No games found'
                : `Showing ${filteredGames.length} ${
                    filteredGames.length === 1 ? 'game' : 'games'
                  }`}
              {hasActiveFilters && ' matching your criteria'}
            </p>
          </motion.div>

          {/* Games Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <GameCard game={game} priority={index < 3} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="rounded-xl bg-card p-12 shadow-lg border border-muted/50">
                  <div className="mb-4 text-6xl">🎮</div>
                  <h3 className="mb-3 font-montserrat text-2xl font-bold text-primary">
                    No Games Found
                  </h3>
                  <p className="mb-6 text-muted-foreground max-w-md mx-auto">
                    We couldn't find any games matching your search criteria.
                    Try adjusting your filters or search terms.
                  </p>
                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      className="bg-primary hover:bg-secondary"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
