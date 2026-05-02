import React from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="hud-root min-h-screen bg-background">
      <div className="hud-vignette" />
      <Navbar />
      <main className="hud-content">{children}</main>
      <Footer />
    </div>
  );
}