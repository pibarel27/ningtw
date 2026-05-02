/** @format */

'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
} from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import ContactForm from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <MainLayout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h1 className="font-montserrat text-4xl font-bold text-foreground md:text-5xl">
              Contact <span className="text-secondary">Us</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Have questions or want to collaborate? Reach out to us through any
              of the channels below.
            </p>
            <div className="mx-auto mt-2 h-1 w-20 bg-secondary"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-8 font-montserrat text-2xl font-bold text-primary">
                Get In Touch
              </h2>

              <div className="mb-10 space-y-6">
                <div className="flex items-start">
                  <Mail className="mr-4 text-primary" />
                  <div>
                    <h3 className="mb-1 font-montserrat text-lg font-semibold">
                      Email
                    </h3>
                    <a
                      href="mailto:nngtwstudio@gmail.com"
                      className="text-muted-foreground transition-colors hover:text-secondary"
                    >
                      studio@nngtw.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-4 text-primary" />
                  <div>
                    <h3 className="mb-1 font-montserrat text-lg font-semibold">
                      Address
                    </h3>
                    <p className="text-muted-foreground">
                      Singjamei, Imphal East
                      <br />
                      Manipur 795008
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mb-6 font-montserrat text-2xl font-bold text-primary">
                Follow Us
              </h2>

              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/nngtwstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-primary hover:text-background"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>

                <a
                  href="https://instagram.com/nngtwstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-primary hover:text-background"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="https://twitter.com/nngtwstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-primary hover:text-background"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>

                <a
                  href="https://linkedin.com/company/nngtwstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-primary hover:text-background"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href="https://discord.gg/nngtwstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-primary hover:text-background"
                  aria-label="Discord"
                >
                  <MessageSquare size={20} />
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="mt-10 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14395.694806336534!2d93.93821258634828!3d24.814994043805766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37492bb9f5be0f57%3A0xee65f0eb47f9bf34!2sSingjamei%2C%20Imphal%2C%20Manipur!5e0!3m2!1sen!2sin!4v1716397347619!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nngtw Studio Location"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="mb-8 font-montserrat text-2xl font-bold text-primary">
                Send Us a Message
              </h2>

              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
