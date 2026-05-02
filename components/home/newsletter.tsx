"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button-custom";
import { motion } from "framer-motion";

export default function Newsletter() {
  const handleJoinCommunity = useCallback(() => {
    window.open('https://discord.gg/S5TMq6ah', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hud-panel mx-auto max-w-2xl p-8"
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(255, 77, 166, 0.2)" }}
        >
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="font-montserrat text-2xl font-bold text-foreground md:text-3xl"
              whileHover={{ scale: 1.02 }}
            >
              Stay <span className="text-primary">Updated</span>
            </motion.h2>
            <p className="mt-2 text-muted-foreground">
              Subscribe to our newsletter for the latest news and game updates.
            </p>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="lg" className="btn-secondary"
                  onClick={handleJoinCommunity}
                >
                  Join Our Discord
                </Button>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}