import jwt from 'jsonwebtoken';
import IToken from '../interfaces/token';

const jwtConfig = {
  expiresIn: '10d',
  // algorithm: 'HS256',
};
const secret = 'secret';
export default (data: IToken) => jwt.sign({ data }, secret, jwtConfig);