import { NextFunction, Request, Response } from 'express';
import userSchema from '../schemas/userSchema';

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(parseInt(code, 10)).json({ error: message });
  }

  return next();
};