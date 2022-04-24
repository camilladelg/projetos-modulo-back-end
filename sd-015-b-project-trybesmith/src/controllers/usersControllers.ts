import { Request, Response } from 'express';
import UsersService from '../services/usersService';

class UsersController {
  addUser = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const { code, token } = await UsersService.addUser({ username, classe, level, password });

    return res.status(code).json({ token });
  };
}

export default new UsersController();
