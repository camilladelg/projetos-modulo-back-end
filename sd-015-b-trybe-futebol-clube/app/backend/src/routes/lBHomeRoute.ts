import express from 'express';
import LeaderboardsHomeController from '../controllers/lBHomeController';

const leaderboardsHomeRoute = express.Router();

leaderboardsHomeRoute.get('/home', LeaderboardsHomeController.teste);

export default leaderboardsHomeRoute;
