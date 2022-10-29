import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  public getAllTeams = async (_req: Request, res: Response) => {
    const { code, teams } = await TeamsService.getAllTeams();

    return res.status(code).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, team } = await TeamsService.getTeamById(id);

    return res.status(code).json(team);
  };
}

export default new TeamsController();
