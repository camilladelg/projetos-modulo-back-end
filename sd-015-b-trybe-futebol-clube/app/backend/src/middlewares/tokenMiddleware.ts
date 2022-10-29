import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const secret = await readFile('jwt.evaluation.key', 'utf-8');

    const decode = jwt.verify(token, secret);

    req.body.userToken = decode;
    console.log(decode);

    return next();
  } catch (error: any) {
    console.log(error);
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};
