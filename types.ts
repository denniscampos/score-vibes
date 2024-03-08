export type NBAScoresType = {
  id: string;
  date: string;
  status: {
    type: {
      name: string;
    };
  };
  competitions: {
    competitors: {
      team: {
        shortDisplayName: string;
        logo: string;
      };
      score: number;
    }[];
  }[];
};

export type NBAScore = {
  id: string;
  date: string;
  status: string;
  scores: {
    teamName: string;
    score: string;
    teamLogo: string;
  }[][];
};
