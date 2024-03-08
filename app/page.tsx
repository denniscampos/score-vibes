import { Scores } from "@/components/scores";
import { Standings } from "@/components/standings";
import { UpcomingGames } from "@/components/upcoming-games";

export default async function Home() {
  return (
    <div className="p-4">
      <h1>Score Vibes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Scores />
        <UpcomingGames />
        <Standings />
      </div>
    </div>
  );
}
