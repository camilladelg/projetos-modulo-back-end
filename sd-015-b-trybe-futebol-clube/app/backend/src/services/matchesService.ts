import { Op } from 'sequelize';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/matchData';

class MatchesService {
  public getAllMatches = async (inProgress: string | undefined) => {
    if (!inProgress) {
      const matches = await Match.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });

      return { code: 200, matches };
    }
    const boolean = JSON.parse(inProgress);

    const matches = await Match.findAll({
      where: { inProgress: boolean },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, matches };
  };

  public createMatches = async (matcheData: IMatch) => {
    const inProgress = true;
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    } = matcheData;

    const times = await Team.findAll({
      where: { [Op.or]: [{ id: homeTeam }, { id: awayTeam }] },
    });

    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    if (times.length < 2) return { code: 404, message: 'There is no team with such id!' };

    const newMatch = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return { code: 201, newMatch };
  };

  public finishMatches = async (id: string) => {
    const match = await Match.findByPk(id);

    if (!match) return { code: 404, message: 'There is no match with such id!' };

    await Match.update({ inProgress: false }, { where: { id } });
    return { code: 200, message: 'Match finished successfully!' };
  };

  public editMatches = async (homeTeamGoals: number, awayTeamGoals: number, id: string) => {
    const match = await Match.findByPk(id);

    if (!match) return { code: 404, message: 'There is no match with such id!' };

    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { code: 200, message: 'Match edited successfully!' };
  };
}

export default new MatchesService();
