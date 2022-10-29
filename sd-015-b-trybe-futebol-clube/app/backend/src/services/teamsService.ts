import Team from '../database/models/Team';

class TeamsService {
  public getAllTeams = async () => {
    const teams = await Team.findAll();
    return { code: 200, teams };
  };

  public getTeamById = async (id: string) => {
    const team = await Team.findByPk(id);
    return { code: 200, team };
  };
}

export default new TeamsService();
