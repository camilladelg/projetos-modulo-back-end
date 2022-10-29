import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const { code, matches } = await MatchesService.getAllMatches(inProgress as string | undefined);

    return res.status(code).json(matches);
  };

  public createMatches = async (req: Request, res: Response) => {
    const { code, message, newMatch } = await MatchesService.createMatches(req.body);

    if (message) return res.status(code).json({ message });
    return res.status(code).json(newMatch);
  };

  public finishMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, message } = await MatchesService.finishMatches(id);

    return res.status(code).json({ message });
  };

  public editMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { code, message } = await MatchesService.editMatches(homeTeamGoals, awayTeamGoals, id);

    return res.status(code).json({ message });
  };
}

export default new MatchesController();
