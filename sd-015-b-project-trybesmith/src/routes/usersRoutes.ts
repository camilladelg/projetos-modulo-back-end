import { Router } from 'express';
import userMiddleware from '../middlewares/userMiddleware';
import usersControllers from '../controllers/usersControllers';

const usersRoutes = Router();

usersRoutes.post('/', userMiddleware, usersControllers.addUser);

export default usersRoutes;
