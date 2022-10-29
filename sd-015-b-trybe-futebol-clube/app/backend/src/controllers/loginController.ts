import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { code, message, user, token } = await LoginService.login(email, password);
    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json({ user, token });
  };

  public validate = async (req: Request, res: Response) => {
    const { data: { role } } = req.body.userToken;
    return res.status(200).json(role);
  };
}

export default LoginController;
