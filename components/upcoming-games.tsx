import { getUpcomingGames } from "@/lib/api/espn/queries";

export async function UpcomingGames() {
  const games = await getUpcomingGames();

  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold tracking-wide py-4">Upcoming</h2>
      <div className="flex flex-col gap-1">
        {games.map((game, index) => (
          <div
            key={`game-${index}`}
            className="flex w-full justify-between border-b p-2"
          >
            <p>{game.gameName}</p>
            <p className="text-sm">{game.gameDate}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
