"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Target, Users, Shield, Heart, TrendingUp } from "lucide-react";
import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button-custom";
import ReviewSystem from "@/components/reviews/review-system";

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="about-hero py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-montserrat text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">
              About <span className="text-primary">Nngtw Studio</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground md:text-2xl">
              Where imagination meets innovation, and every game tells a story worth exploring.
            </p>
            <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-primary to-secondary"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Culture Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Mission & Vision */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="about-section-card"
              >
                <div className="value-icon">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-primary">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Nngtw Studio, we create immersive gaming experiences that challenge minds and captivate hearts. We believe games should be more than just entertainment—they should inspire creativity, foster strategic thinking, and create memorable experiences that resonate with players long after they've set down their controllers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="about-section-card"
              >
                <div className="value-icon">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-primary">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where games serve as a bridge between entertainment and education, between fantasy and reality. Our goal is to push the boundaries of what games can achieve, creating experiences that not only entertain but also inspire, educate, and bring people together.
                </p>
              </motion.div>
            </div>

        {/* Founders Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
        >
      <h2 className="font-montserrat text-3xl font-bold text-primary md:text-4xl">
        Meet the Team
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        The minds behind Nngtw Studio.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-stretch">

      {/* Reagan  */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="founder-card text-center"
      >
        <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full shadow-xl">
          <Image
            src="/founder.jpg"
            alt="Reagan Sagolsem"
            fill
            className="object-cover"
          />
        </div>

       <a
  href="/portfolio"
  target="_blank"
  rel="noopener noreferrer"
  className="founder-name text-2xl font-bold text-primary hover:text-secondary transition"
>
  Reagan Sagolsem
</a>

        <p className="text-secondary font-medium">
          Founder & Creative Director
        </p>

        <p className="mt-4 text-muted-foreground">
          "Games have the power to transform how we think, learn, and connect."
        </p>
      </motion.div>

      {/* Pibarel - RIGHT */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="founder-card text-center"
      >
        <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full shadow-xl">
          <Image
            src="/Pibarel.png"
            alt="Pibarel Maisnam"
            fill
            className="object-cover"
          />
        </div>

        <a
    href="https://pibarel.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="founder-name text-2xl font-bold text-primary hover:text-secondary transition"
  >
    Pibarel Maisnam
  </a>

        <p className="text-secondary font-medium">
          Chief Executive Officer
        </p>

        <p className="mt-4 text-muted-foreground">
          Helping shape the studio’s direction by blending creativity with strategy and innovation.
        </p>
      </motion.div>

    </div>
  </div>
</section>
          </div>

          {/* Culture Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 about-section-card"
          >
            <div className="value-icon">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="mb-6 font-montserrat text-2xl font-bold text-primary">
              Our Culture
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Creativity, collaboration, and curiosity form the cornerstone of our studio culture. We embrace challenges, celebrate diversity of thought, and approach each project with a blend of technical precision and artistic passion. Our small but dedicated team brings together diverse perspectives, united by a common love for creating meaningful gaming experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-montserrat text-3xl font-bold text-primary md:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The principles that guide everything we do at Nngtw Studio.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="value-card"
            >
              <div className="value-icon">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-montserrat text-xl font-bold text-primary">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly explore new ideas, technologies, and approaches to create unique gaming experiences that stand out in the industry.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="value-card"
            >
              <div className="value-icon">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-montserrat text-xl font-bold text-primary">Quality</h3>
              <p className="text-muted-foreground">
                We are committed to crafting polished, well-designed games that offer both technical excellence and artistic value.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="value-card"
            >
              <div className="value-icon">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-montserrat text-xl font-bold text-primary">Player-Focused</h3>
              <p className="text-muted-foreground">
                We design with players in mind, valuing their feedback and creating experiences that resonate with diverse audiences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="value-card"
            >
              <div className="value-icon">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-montserrat text-xl font-bold text-primary">Integrity</h3>
              <p className="text-muted-foreground">
                We believe in ethical game design, transparent communication, and building honest relationships with our community.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="value-card"
            >
              <div className="value-icon">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-montserrat text-xl font-bold text-primary">Inclusivity</h3>
              <p className="text-muted-foreground">
                We strive to create games that are accessible and welcoming to players from all backgrounds and ability levels.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="value-card"
            >
              <div className="value-icon">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-montserrat text-xl font-bold text-primary">Growth</h3>
              <p className="text-muted-foreground">
                We embrace continuous learning, seeking to improve our craft and expand our horizons with each new project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews & Donate Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-montserrat text-3xl font-bold text-primary md:text-4xl">
              Community Feedback
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Share your thoughts about our games and studio. Your feedback helps us create better experiences.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <ReviewSystem />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}