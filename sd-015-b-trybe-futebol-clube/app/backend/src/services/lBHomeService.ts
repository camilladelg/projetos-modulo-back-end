import Team from '../database/models/Team';
import Match from '../database/models/Match';
import ImatchesGoals from '../interfaces/matchesGoals';
import IresultMatches from '../interfaces/resultMatches';

class LeaderboardsHomeServive {
  public getLeaderboardsHome = async () => {
    const times = await Team.findAll();
    const matches = await Match.findAll();

    const allMatches = times.map((time) => {
      const getAllMatches = matches.filter((match) => (
        match.homeTeam === time.id
        && match.inProgress === false))
        .map((matchGoals) => ({
          goalsFavor: matchGoals.homeTeamGoals,
          goalsOwn: matchGoals.awayTeamGoals,
        }));

      return this.homeTeamsResults(time.teamName, getAllMatches);
    });

    this.sortResults(allMatches);

    return allMatches;
  };

  public sortResults = (allMatches: IresultMatches[]) => {
    allMatches.sort((a, b) => a.goalsOwn - b.goalsOwn); // ordem crescente
    allMatches.sort((a, b) => b.goalsFavor - a.goalsFavor); // ordem decrescente
    allMatches.sort((a, b) => b.goalsBalance - a.goalsBalance);
    allMatches.sort((a, b) => b.totalVictories - a.totalVictories);
    allMatches.sort((a, b) => b.totalPoints - a.totalPoints);
  };

  public getGoals = (getAllMatches: ImatchesGoals[]) => {
    const goalsFavor = getAllMatches.reduce((acc, curr) => acc + curr.goalsFavor, 0);
    const goalsOwn = getAllMatches.reduce((acc, curr) => acc + curr.goalsOwn, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  public getTotalPoints = (getAllMatches: ImatchesGoals[]) => {
    const totalPoints = getAllMatches.reduce((acc, curr) => {
      if (curr.goalsFavor > curr.goalsOwn) return acc + 3;
      if (curr.goalsFavor === curr.goalsOwn) return acc + 1;
      return acc;
    }, 0);
    return totalPoints;
  };

  public getMatchesResults = (getAllMatches: ImatchesGoals[]) => {
    const totalVictories = getAllMatches.reduce((acc, curr) => {
      if (curr.goalsFavor > curr.goalsOwn) return acc + 1;
      return acc;
    }, 0);

    const totalDraws = getAllMatches.reduce((acc, curr) => {
      if (curr.goalsFavor === curr.goalsOwn) return acc + 1;
      return acc;
    }, 0);

    const totalLosses = getAllMatches.reduce((acc, curr) => {
      if (curr.goalsFavor < curr.goalsOwn) return acc + 1;
      return acc;
    }, 0);

    return { totalVictories, totalDraws, totalLosses };
  };

  public homeTeamsResults = (time: string, getAllMatches: ImatchesGoals[]) => {
    const totalGames = getAllMatches.length;
    const goals = this.getGoals(getAllMatches);
    const totalPoints = this.getTotalPoints(getAllMatches);
    const points = this.getMatchesResults(getAllMatches);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return { name: time,
      totalPoints,
      totalGames,
      totalVictories: points.totalVictories,
      totalDraws: points.totalDraws,
      totalLosses: points.totalLosses,
      goalsFavor: goals.goalsFavor,
      goalsOwn: goals.goalsOwn,
      goalsBalance: goals.goalsBalance,
      efficiency: Number(efficiency.toFixed(2)),
    };
  };
}

export default new LeaderboardsHomeServive();
