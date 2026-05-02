/** @format */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  X,
  Code,
  Palette,
  Gamepad2,
  Eye,
  Mail,
  Linkedin,
  Instagram,
  Github,
  Play,
  Star,
  Zap,
  Brain,
} from 'lucide-react';
import { Button } from '@/components/ui/button-custom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: 'Blender' | 'Unity' | 'Unreal' | 'Web/Apps' | 'Design';
  image: string;
  screenshots: string[];
  backstory: string;
  status: 'Completed' | 'In Progress' | 'Concept';
  videoUrl?: string;
}

const projects: Project[] = [
  {
    id: 'character-series',
    title: 'Fantasy Character Collection',
    description:
      'A series of detailed 3D characters inspired by anime and fantasy worlds.',
    tools: ['Blender', 'Substance Painter', 'Photoshop'],
    category: 'Blender',
    image:
      'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1600',
    screenshots: [
      'https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/7915255/pexels-photo-7915255.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    backstory:
      'Started as practice models, these characters became the foundation for understanding anatomy and stylized art.',
    status: 'Completed',
  },
  {
    id: 'game-prototype',
    title: 'Mystic Realms Prototype',
    description:
      'Early prototype of an open-world adventure game with RPG elements.',
    tools: ['Unity', 'C#', 'Blender'],
    category: 'Unity',
    image:
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1600',
    screenshots: [
      'https://images.pexels.com/photos/442577/pexels-photo-442577.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/442578/pexels-photo-442578.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    backstory:
      'My first attempt at creating the kind of immersive world I always dreamed of playing in.',
    status: 'In Progress',
  },
  {
    id: 'studio-website',
    title: 'Nngtw Studio Website',
    description:
      'Modern, responsive website for the indie game studio with dynamic animations.',
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web/Apps',
    image:
      'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1600',
    screenshots: [
      'https://images.pexels.com/photos/2007648/pexels-photo-2007648.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2007649/pexels-photo-2007649.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    backstory:
      'Building the digital presence for the studio while learning modern web development.',
    status: 'Completed',
  },
  {
    id: 'ui-concepts',
    title: 'Game UI/UX Concepts',
    description:
      'Interface designs for various game genres with focus on user experience.',
    tools: ['Figma', 'Adobe XD', 'Photoshop'],
    category: 'Design',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600',
    screenshots: [
      'https://images.pexels.com/photos/3183151/pexels-photo-3183151.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3183152/pexels-photo-3183152.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    backstory:
      'Designing interfaces that feel intuitive while maintaining the magic of gaming.',
    status: 'Completed',
  },
];

// ---------- icon-data (store component refs, not JSX) ----------
const skills = [
  { name: '3D Modeling', level: 85, icon: Palette },
  { name: 'Game Design', level: 75, icon: Gamepad2 },
  { name: 'Animation', level: 70, icon: Play },
  { name: 'Unity', level: 80, icon: Code },
  { name: 'Storytelling', level: 90, icon: Brain },
  { name: 'UI/UX Design', level: 85, icon: Eye },
];

const characterStats = [
  { stat: 'Creativity', value: 95, icon: Star },
  { stat: '3D Art', value: 85, icon: Palette },
  { stat: 'Game Design', value: 75, icon: Gamepad2 },
  { stat: 'Curiosity', value: 100, icon: Brain },
];

const socials = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: '#',
    color: 'hover:text-blue-400',
  },
  { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-400' },
  {
    icon: Instagram,
    label: 'Instagram',
    href: '#',
    color: 'hover:text-pink-400',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:reagan@nngtw.com',
    color: 'hover:text-green-400',
  },
];

// ---------- Component ----------
export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const categories = [
    'All',
    'Blender',
    'Unity',
    'Unreal',
    'Web/Apps',
    'Design',
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder: send contactForm somewhere
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
    alert('Quest scroll sent! (demo)');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.pexels.com/photos/1542009/pexels-photo-1542009.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero bg"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-card/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center px-6"
        >
          <div className="relative w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
            <Image
              src="/founder.jpg"
              alt="Reagan"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-3">
            <span className="text-primary">Reagan</span>{' '}
            <span className="text-secondary">Sagolsem</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Designer • 3D Artist • Indie Game Developer — building worlds for
            players to lose themselves in.
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() =>
                document
                  .getElementById('about')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Begin Quest
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="border-primary text-primary hover:bg-primary/10"
            >
              View Artifacts
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              Origin <span className="text-primary">Quest</span>
            </h2>
            <p className="text-muted-foreground">
              A lifelong gamer and anime/manga/manhwa enthusiast. What started
              as escapism became a drive to build — characters, levels, and
              worlds that spark wonder.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20"
              >
                <p className="text-muted-foreground leading-relaxed">
                  The journey began with Blender — late-night modeling sessions,
                  tutorials, and lots of trial-and-error. Each project taught
                  new problem solving and art techniques.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-secondary/20"
              >
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-primary">The Dream:</strong> Build
                  Nngtw — a small studio making immersive games and animated
                  stories.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-card to-muted/20 p-8 rounded-xl border border-primary/30 shadow-2xl"
            >
              <h3 className="font-montserrat text-xl font-bold text-primary mb-6 text-center">
                Character Stats
              </h3>
              <div className="space-y-4">
                {characterStats.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.stat}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            {item.stat}
                          </span>
                          <span className="text-sm text-primary">
                            +{item.value}
                          </span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Artifacts</span> & Relics
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of creations and experiments on the path to building
              immersive worlds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={`transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-background shadow-lg shadow-primary/30'
                    : 'border-primary/30 text-primary hover:bg-primary/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge
                        className={`absolute top-3 right-3 ${
                          project.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400 border-green-400/30'
                            : project.status === 'In Progress'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-400/30'
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <div className="p-6">
                      <h3 className="font-montserrat text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.slice(0, 3).map((tool) => (
                          <Badge
                            key={tool}
                            variant="outline"
                            className="text-xs border-primary/30"
                          >
                            {tool}
                          </Badge>
                        ))}
                        {project.tools.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs border-primary/30"
                          >
                            +{project.tools.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Abilities</span> & Power Stats
            </h2>
            <p className="text-muted-foreground">
              Skills acquired through countless hours of practice and
              experimentation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{skill.name}</span>
                    <span className="ml-auto text-primary font-bold">
                      Lv.{skill.level}
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-3" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-primary">Guild</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nngtw Studio — where individual creativity meets collaborative
              vision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-card to-muted/20 p-8 rounded-xl border border-primary/30 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-montserrat text-2xl font-bold text-primary mb-4">
                  Nngtw Studio
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  An indie game studio born from the vision of creating worlds
                  that matter. Starting small but dreaming big.
                </p>
                <Link href="/home">
                  <Button
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary/10"
                  >
                    Learn More About the Studio
                  </Button>
                </Link>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg border border-secondary/20">
                <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Coming Soon
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Epic fantasy worlds to explore</li>
                  <li>• Innovative gameplay mechanics</li>
                  <li>• Community-driven development</li>
                  <li>• Cross-platform experiences</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              Quest <span className="text-primary">Givers</span>
            </h2>
            <p className="text-muted-foreground">
              Ready to collaborate or just want to connect? Send a quest scroll!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-montserrat text-xl font-bold text-primary mb-6">
                Connect & Follow
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      className={`flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 ${s.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{s.label}</span>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-secondary/20 shadow-xl"
            >
              <h3 className="font-montserrat text-xl font-bold text-secondary mb-6">
                Send a Quest Scroll
              </h3>
              <form className="space-y-4" onSubmit={handleSubmitContact}>
                <Input
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="bg-background/50 border-muted focus:border-primary"
                />
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="bg-background/50 border-muted focus:border-primary"
                />
                <Textarea
                  placeholder="What quest do you have in mind?"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="bg-background/50 border-muted focus:border-primary"
                />
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-primary"
                >
                  Send Quest Scroll
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-primary/30">
          {selectedProject && (
            <>
              <DialogHeader className="flex items-center justify-between">
                <DialogTitle className="font-montserrat text-2xl font-bold text-primary">
                  {selectedProject.title}
                </DialogTitle>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="ml-4 p-2 rounded hover:bg-muted/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </DialogHeader>

              <div className="space-y-6 p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-primary mb-2">Description</h4>
                    <p className="text-muted-foreground mb-4">
                      {selectedProject.description}
                    </p>

                    <h4 className="font-bold text-primary mb-2">Backstory</h4>
                    <p className="text-muted-foreground italic">
                      {selectedProject.backstory}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary mb-2">Tools Used</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tools.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="border-primary/30"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="font-bold text-primary mb-2">Status</h4>
                    <Badge
                      className={`${
                        selectedProject.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400 border-green-400/30'
                          : selectedProject.status === 'In Progress'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-400/30'
                      }`}
                    >
                      {selectedProject.status}
                    </Badge>
                  </div>
                </div>

                {selectedProject.screenshots.length > 0 && (
                  <div>
                    <h4 className="font-bold text-primary mb-4">Screenshots</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.screenshots.map((s, i) => (
                        <div
                          key={i}
                          className="relative aspect-video rounded-lg overflow-hidden"
                        >
                          <Image
                            src={s}
                            alt={`${selectedProject.title} screenshot ${i + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
