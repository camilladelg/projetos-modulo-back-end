import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import ITokenData from '../interfaces/TokenData';

const jwtConfig = {
  expiresIn: '10d',
};

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

const token = (data: ITokenData) => jwt.sign({ data }, secret, jwtConfig);

export default token;
