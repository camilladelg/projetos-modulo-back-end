import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schemas/loginShema';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  return next();
};

export default loginMiddleware;
