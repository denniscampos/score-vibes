import { getNBAScores } from "@/lib/api/espn/queries";
import { Fragment } from "react";
import Image from "next/image";

export async function Scores() {
  const data = await getNBAScores();

  const scores = data.map((game) => ({
    gameId: game.id,
    gameDate: game.date,
    status: game.status,
    matchups: game.scores.map((comp) => {
      if (comp.length === 2) {
        return {
          team1: {
            name: comp[0].teamName,
            score: comp[0].score,
            logo: comp[0].teamLogo,
            winner: comp[0].winner,
          },
          team2: {
            name: comp[1].teamName,
            score: comp[1].score,
            logo: comp[1].teamLogo,
            winner: comp[1].winner,
          },
        };
      } else {
        return null;
      }
    }),
  }));

  const gameWinner = (status: string, winner?: boolean) => {
    if (status === "STATUS_FINAL") {
      return winner ? "" : "text-gray-400";
    }
  };

  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold tracking-wide py-4">Scores</h2>
      <div className="flex flex-col gap-3">
        {scores.map((game) => (
          <Fragment key={game.gameId}>
            {game.matchups.map((matchup, index) => (
              <div key={index} className="">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={matchup?.team1.logo ?? ""}
                      alt={""}
                      width={25}
                      height={25}
                    />
                    <p>{matchup?.team1.name}</p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${gameWinner(
                      game.status,
                      matchup?.team1.winner
                    )}`}
                  >
                    {matchup?.team1.score}
                  </p>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={matchup?.team2.logo ?? ""}
                      alt={""}
                      width={25}
                      height={25}
                    />
                    <p>{matchup?.team2.name}</p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${gameWinner(
                      game.status,
                      matchup?.team2.winner
                    )}`}
                  >
                    {matchup?.team2.score}
                  </p>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
