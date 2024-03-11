"use server";

import { NBA_TEAMS_STANDINGS } from "@/constants";
import { NBAScore, NBAScoresType } from "@/types";
import { unstable_noStore } from "next/cache";

const ESPN_API = process.env.ESPN_API_URL;

if (!ESPN_API) {
  throw new Error("ESPN_API_URL env is not defined");
}

export const getAllNBATeams = async () => {
  const res = await fetch(`${ESPN_API}/basketball/nba/teams`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};

export const getNBATeamBySlug = async (teamName: string) => {
  const res = await fetch(`${ESPN_API}/basketball/nba/teams/${teamName}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};

export const getNBATeamById = async (teamId: string) => {
  const res = await fetch(`${ESPN_API}/basketball/nba/teams/${teamId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};

export const getNBAScores = async (): Promise<NBAScore[]> => {
  unstable_noStore();
  const res = await fetch(`${ESPN_API}/basketball/nba/scoreboard`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const scores = data.events.map((event: NBAScoresType) => ({
    id: event.id,
    date: event.date,
    status: event.status.type.name,
    scores: event.competitions.map((competition) =>
      competition.competitors.map((competitor) => ({
        teamName: competitor.team.shortDisplayName,
        teamLogo: competitor.team.logo,
        score: competitor.score,
        winner: competitor.winner,
      }))
    ),
  }));

  return scores;
};

export const getNBAStandings = async () => {
  let eastStandings = [];
  let westStandings = [];

  for (const team of NBA_TEAMS_STANDINGS) {
    try {
      const res = await fetch(`${ESPN_API}/basketball/nba/teams/${team.city}`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        console.error(`Failed to fetch data for ${team}`);
        continue;
      }

      const data = await res.json();

      const teamData = {
        teamName: data.team.name,
        record: data.team.record.items[0].summary,
        conference: team.conference,
        teamLogo: data.team.logos[0].href,
      };

      if (team.conference === "East") {
        eastStandings.push(teamData);
      } else if (team.conference === "West") {
        westStandings.push(teamData);
      }
    } catch (err) {
      console.error(`Error fetching data for team: ${team}, error: ${err}`);
    }
  }

  const sortStandings = (a: { record: string }, b: { record: string }) => {
    const [aWins, aLosses] = a.record.split("-").map(Number);
    const [bWins, bLosses] = b.record.split("-").map(Number);
    return bWins - aWins || aLosses - bLosses; // Sort by wins, then by fewer losses
  };

  eastStandings.sort(sortStandings);
  westStandings.sort(sortStandings);

  return { east: eastStandings, west: westStandings };
};

export const getUpcomingGames = async () => {
  let upcoming: any[] = [];

  for (const team of NBA_TEAMS_STANDINGS) {
    try {
      const res = await fetch(`${ESPN_API}/basketball/nba/teams/${team.city}`);

      if (!res.ok) {
        console.error(`Failed to fetch data for ${team}`);
        continue;
      }

      const data = await res.json();

      upcoming.push({
        gameDate: data.team.nextEvent[0].date,
        gameName: data.team.nextEvent[0].shortName,
      });
      upcoming.sort((a, b) => {
        const dateA = a.gameDate ? new Date(a.gameDate) : null;
        const dateB = b.gameDate ? new Date(b.gameDate) : null;

        // Check if both dates are valid
        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        } else if (dateA) {
          return -1; // Assume items with valid dates come before items without
        } else if (dateB) {
          return 1; // Assume items without valid dates come after items with
        } else {
          return 0; // If neither item has a valid date, consider them equal
        }
      });

      upcoming = upcoming.filter(
        (game, index, self) =>
          index === self.findIndex((t) => t.gameDate === game.gameDate)
      );
    } catch (err) {
      console.error(`Error fetching data for team: ${team}, error: ${err}`);
    }
  }

  return upcoming;
};
