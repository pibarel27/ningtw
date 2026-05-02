/** @format */
// lib/data/news.ts

export type NewsCategory =
  | 'Game Updates'
  | 'Studio News'
  | 'Events'
  | 'Releases'
  | 'Development';

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  date: string;
  image: string;
  featured: boolean;
  author: string;
  tags: string[];
}

export const newsPosts: NewsPost[] = [
  {
    id: 'studio-launch',
    title: 'Nngtw Studio Officially Launches',
    excerpt:
      'Introducing Nngtw Studio, a new game development team focused on creating immersive worlds of exploration and strategy.',
    content: `
      <p>Today marks the official launch of Nngtw Studio...</p>
    `,
    category: 'Studio News',
    date: '2025-04-15',
    image:
      'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?...',
    featured: true,
    author: 'Reagan V.',
    tags: ['announcement', 'launch', 'indie studio'],
  },
  {
    id: 'arithmetic-beta',
    title: 'Arithmetic Destination Enters Beta Testing',
    excerpt:
      'Our educational puzzle game has reached a significant milestone with closed beta testing now underway.',
    content: `
      <p>We're excited to announce that Arithmetic Destination...</p>
    `,
    category: 'Development',
    date: '2025-03-28',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true,
    author: 'Dev Team',
    tags: ['beta', 'testing', 'educational games', 'puzzle'],
  },
  {
    id: 'king-summon-preview',
    title: 'First Look: King Summon Gameplay Revealed',
    excerpt:
      'Check out the first gameplay footage from our upcoming multiplayer strategy game.',
    content: `
      <p>Today we're thrilled to give you the first look at King Summon...</p>
    `,
    category: 'Game Updates',
    date: '2025-03-10',
    image:
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: false,
    author: 'Marketing Team',
    tags: ['preview', 'gameplay', 'multiplayer', 'strategy'],
  },
  {
    id: 'devcon-announcement',
    title: 'Nngtw Studio to Attend DevCon East 2025',
    excerpt:
      'Meet our team at the upcoming game developers conference this summer.',
    content: `
      <p>We're excited to announce that Nngtw Studio will be attending DevCon East 2025...</p>
    `,
    category: 'Events',
    date: '2025-02-22',
    image:
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: false,
    author: 'Events Team',
    tags: ['conference', 'event', 'demo', 'networking'],
  },
  {
    id: 'on-earth-concept',
    title: 'On Earth: Concept Art Revealed',
    excerpt:
      'Get a glimpse of the visual style for our upcoming survival game set on a mysterious island.',
    content: `
      <p>Today we're sharing the first concept art for On Earth...</p>
    `,
    category: 'Development',
    date: '2025-01-15',
    image:
      'https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true,
    author: 'Art Team',
    tags: ['concept art', 'survival game', 'open world', 'visual design'],
  },
];

export function getLatestNews(limit = 5): NewsPost[] {
  return newsPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getNewsById(id: string): NewsPost | undefined {
  return newsPosts.find((post) => post.id === id);
}

export function getNewsByCategory(category: NewsCategory): NewsPost[] {
  return newsPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedNews(limit = 3): NewsPost[] {
  return newsPosts
    .filter((post) => post.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export const newsCategories: NewsCategory[] = [
  'Game Updates',
  'Studio News',
  'Events',
  'Releases',
  'Development',
];
