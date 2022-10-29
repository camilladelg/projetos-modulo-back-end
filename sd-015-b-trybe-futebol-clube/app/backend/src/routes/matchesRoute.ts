import express from 'express';
import MatchesController from '../controllers/MatchesController';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const matchesRoute = express.Router();

matchesRoute.get('/', MatchesController.getAllMatches);
matchesRoute.post('/', tokenMiddleware, MatchesController.createMatches);
matchesRoute.patch('/:id/finish', tokenMiddleware, MatchesController.finishMatches);
matchesRoute.patch('/:id', tokenMiddleware, MatchesController.editMatches);

export default matchesRoute;
