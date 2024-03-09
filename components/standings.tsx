import { getNBAStandings } from "@/lib/api/espn/queries";
import Image from "next/image";

export async function Standings() {
  const standings = await getNBAStandings();

  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold tracking-wide py-4">Standings</h2>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-wide">Eastern Conference</h3>
        {standings.east.map((team, index) => (
          <div
            key={`team-${index}`}
            className="flex w-full justify-between border-b p-2"
          >
            <div className="flex gap-2">
              <Image
                src={team.teamLogo}
                alt={`${team.teamName} logo`}
                width={25}
                height={25}
              />
              <p>{team.teamName}</p>
            </div>
            <p className="text-sm font-semibold">{team.record}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-wide pt-4">
          Western Conference
        </h3>
        {standings.west.map((team, index) => (
          <div
            key={`team-${index}`}
            className="flex w-full justify-between border-b p-2"
          >
            <div className="flex gap-2">
              <Image
                src={team.teamLogo}
                alt={`${team.teamName} logo`}
                width={25}
                height={25}
              />
              <p>{team.teamName}</p>
            </div>
            <p className="text-sm font-semibold">{team.record}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
