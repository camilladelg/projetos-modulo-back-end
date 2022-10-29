import { Request, Response } from 'express';
import LeaderboardsHomeServive from '../services/lBHomeService';

class LeaderboardsHomeController {
  teste = async (_req: Request, res: Response) => {
    const allMatches = await LeaderboardsHomeServive.getLeaderboardsHome();

    return res.status(200).json(allMatches);
  };
}

export default new LeaderboardsHomeController();
