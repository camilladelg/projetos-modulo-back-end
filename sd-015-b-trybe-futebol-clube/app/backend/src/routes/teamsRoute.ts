import express from 'express';
import TeamsController from '../controllers/teamsController';

const teamRoute = express.Router();

teamRoute.get('/', TeamsController.getAllTeams);
teamRoute.get('/:id', TeamsController.getTeamById);

export default teamRoute;
