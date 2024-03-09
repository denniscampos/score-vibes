import { Loading } from "@/components/loader";
import { Scores } from "@/components/scores";
import { Standings } from "@/components/standings";
import { UpcomingGames } from "@/components/upcoming-games";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="p-4">
      <h1>NBA Vibes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Suspense fallback={<Loading />}>
          <Scores />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <UpcomingGames />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Standings />
        </Suspense>
      </div>
    </div>
  );
}
