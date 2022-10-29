import express from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import LoginController from '../controllers/loginController';

const loginRoute = express.Router();

const loginController = new LoginController();

loginRoute.post('/', loginMiddleware, loginController.login);
loginRoute.get('/validate', tokenMiddleware, loginController.validate);

export default loginRoute;
