import { NextFunction, Request, Response } from 'express';
import productShema from '../schemas/productsSchema';

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = productShema.validate(req.body);
  
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(parseInt(code, 10)).json({ error: message });
  }

  return next();
};