import MainLayout from "@/components/layout/main-layout";
import HeroSection from "@/components/home/hero-section";
import FeaturedGames from "@/components/games/featured-games";
import LatestNews from "@/components/home/latest-news";
import Newsletter from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <div id="featured-games">
        <FeaturedGames />
      </div>
      <LatestNews />
      <Newsletter />
    </MainLayout>
  );
}