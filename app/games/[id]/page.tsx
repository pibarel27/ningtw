import MainLayout from "@/components/layout/main-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button-custom";
import GameDetails from "@/components/games/game-details";
import { getGameById, getRelatedGames, games } from "@/lib/data/games";

export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }));
}

export default function GameDetailsPage({ params }: { params: { id: string } }) {
  const game = getGameById(params.id);
  const relatedGames = getRelatedGames(params.id);

  if (!game) {
    return (
      <MainLayout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 font-montserrat text-3xl font-bold">Game Not Found</h1>
            <p className="mb-6 text-muted-foreground">The game you're looking for doesn't exist or has been removed.</p>
            <Link href="/games">
              <Button>Back to Games</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <GameDetails game={game} relatedGames={relatedGames} />
    </MainLayout>
  );
}