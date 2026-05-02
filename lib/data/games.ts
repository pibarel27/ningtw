/** @format */

export type GameStatus = 'Development' | 'Coming Soon' | 'Released';
export type GameGenre =
  | 'Strategy'
  | 'Puzzle'
  | 'Educational'
  | 'Multiplayer'
  | 'Survival'
  | 'Open-world'
  | 'Fantasy'
  | 'MMO';

export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: GameStatus;
  genres: GameGenre[];
  coverImage: string;
  screenshots: string[];
  featured: boolean;
  releaseDate?: string;
  platforms?: string[];
  trailerUrl?: string;
  downloadLinks?: {
    playStore?: string;
    itchIo?: string;
    uptodown?: string;
    myApp?: string;
  };
}

export const games: Game[] = [
  {
    id: 'arithmetic-destination',
    title: 'Arithmetic Destination',
    tagline: 'A puzzle game navigating numbers to your destination.',
    description:
      'Challenge your mathematical prowess in this engaging puzzle game where you must navigate through a world of numbers to reach your destination. Solve equations, unlock new levels, and sharpen your arithmetic skills as you progress through increasingly complex challenges.',
    status: 'Development',
    genres: ['Strategy', 'Puzzle', 'Educational'],
    coverImage: '/Games/Arithmetic Destination/keyart.png',
    screenshots: [
      '/Games/Arithmetic Destination/screenshot1.jpg',
      '/Games/Arithmetic Destination/screenshot2.jpg',
      '/Games/Arithmetic Destination/screenshot3.jpg',
    ],
    featured: true,
    releaseDate: '2025-12-01',
    platforms: ['Android', 'iOS', 'Web'],
    trailerUrl: '/Games/Arithmetic Destination/trailer.mp4',
    downloadLinks: {},
  },
  {
    id: 'king-summon',
    title: 'King Summon',
    tagline: 'A Run-Chase multiplayer game.',
    description:
      'King Summon is an action-packed multiplayer game where players compete in run-chase challenges across dynamically generated environments. Team up with friends or go solo as you outrun and outsmart opponents, collecting resources and unlocking powerful abilities to become the ultimate summoner king.',
    status: 'Development',
    genres: ['Strategy', 'Multiplayer'],
    coverImage: '/Games/King Summon/keyart.jpg',
    screenshots: [
      '/Games/King Summon/screenshot1.jpg',
      '/Games/King Summon/screenshot2.jpg',
      '/Games/King Summon/screenshot3.jpg',
    ],
    featured: true,
    releaseDate: '2025-08-15',
    platforms: ['PC', 'Android', 'iOS'],
    trailerUrl: '/Games/King Summon/trailer.mp4',
    downloadLinks: {},
  },
  {
    id: 'on-earth',
    title: 'On Earth',
    tagline: 'An open-world survival game on an island.',
    description:
      "Stranded on a mysterious island, you must gather resources, craft tools, and build shelter to survive the harsh elements and wildlife. Explore the vast, procedurally generated terrain, discover hidden secrets, and unravel the island's mysterious past as you fight to stay alive in this immersive open-world survival experience.",
    status: 'Coming Soon',
    genres: ['Survival', 'Open-world'],
    coverImage: '/Games/On Earth/keyart.png',
    screenshots: [
      '/Games/On Earth/screenshot1.jpg',
      '/Games/On Earth/screenshot2.jpg',
      '/Games/On Earth/screenshot3.jpg',
    ],
    featured: true,
    trailerUrl: '/Games/On Earth/trailer.mp4',
  },
  {
    id: 'bored-zombie',
    title: 'Bored Zombie',
    tagline: 'Days in the life of a zombie in the human world.',
    description:
      'Experience life from the perspective of a sentient zombie trying to blend into human society. Navigate everyday situations with a humorous twist as you manage your decay, avoid zombie hunters, and maybe even find friendship or romance in this quirky life simulator that challenges the traditional zombie narrative.',
    status: 'Coming Soon',
    genres: ['Strategy', 'Open-world', 'MMO'],
    coverImage: '/Games/Bored Zombie/keyart.png',
    screenshots: [
      '/Games/Bored Zombie/screenshot1.jpg',
      '/Games/Bored Zombie/screenshot2.jpg',
      '/Games/Bored Zombie/screenshot3.jpg',
    ],
    featured: false,
    trailerUrl: '/Games/Bored Zombie/trailer.mp4',
  },
  {
    id: 'the-vastness',
    title: 'The Vastness',
    tagline: 'A fantasy open-world where multi-beings struggle to survive.',
    description:
      'Explore a vast fantasy realm where diverse species and magical beings coexist in a delicate balance. Choose your race, each with unique abilities and challenges, as you navigate political alliances, territorial conflicts, and ancient prophecies. Build settlements, engage in diplomacy or warfare, and shape the fate of this expansive world in an MMO experience that evolves with player choices.',
    status: 'Coming Soon',
    genres: ['Survival', 'Open-world', 'Fantasy', 'Strategy', 'MMO'],
    coverImage: '/Games/The Vastness/keyart.png',
    screenshots: [
      '/Games/The Vastness/screenshot1.jpg',
      '/Games/The Vastness/screenshot2.jpg',
      '/Games/The Vastness/screenshot3.jpg',
    ],
    featured: true,
    trailerUrl: '/Games/The Vastness/trailer.mp4',
  },
];

export function getFeaturedGames() {
  return games.filter((game) => game.featured && game.status !== 'Coming Soon');
}

export function getGameById(id: string) {
  return games.find((game) => game.id === id);
}

export function getRelatedGames(id: string, limit = 3) {
  const currentGame = getGameById(id);
  if (!currentGame) return [];

  return games
    .filter(
      (game) =>
        game.id !== id &&
        game.genres.some((genre) => currentGame.genres.includes(genre))
    )
    .slice(0, limit);
}
